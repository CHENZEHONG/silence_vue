<style>
    .chat {
        height: 100vh;
        width: 84vw;
        background: #48515F;
        color: #FFF;
        overflow: auto;
        display: flex;
    }

    .chat-left {
        width: 25%;
        height: 100%;
    }

    .chat-right {
        position: relative;
        width: 75%;
        height: 100%;
        background: #E1E1E1;
    }

    .msg-list {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding-top: 50px;
    }

    .msg-list-item {
        background: #FFFFFF;
        padding: 17px 25px;
        color: #000;
    }

    .msg-list-item + .msg-list-item {
        margin-top: 17px;
    }

    .msg-bar {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: 0 30px;
        height: 50px;
        border-top: 4px solid #E1E1E1;
        background: #FFFFFF;
        overflow: hidden;
    }

    .msg-bar input {
        height: 100%;
        width: 80%;
        outline: none;
        border: 0;
        font-size: 16px;

    }

    .msg-bar-tool {

    }

    .msg-bar-tool-send {
        color: #FFFFFF;
        background: #2cd07e;
    }

    .chat-left-friend-item-active {
        background: #31425C;
        color: #000;
    }
</style>
<template>
    <div class="chat">
        <div class="chat-left">
            <div>search bar</div>
            <div class="chat-left-friend">
                <div class="chat-left-friend-item" v-for="(item,index) in friendList"
                     :class="index===friendSelect?'chat-left-friend-item-active':''" v-on:click="changeFriend(index)"
                     :key="index">
                    {{item.name}}
                </div>
            </div>
        </div>
        <div class="chat-right">
            <div class="msg-list" ref="msg-list">
                <!--                <div class="msg-list-item">something message</div>-->
            </div>
            <div class="msg-bar">
                <input type="text" placeholder="type your message" @keydown.enter="sendMsg" v-model="typeMsg">
                <div class="msg-bar-tool">
                    <div class="msg-bar-tool-send" @click="sendMsg">send</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                typeMsg: '',
                friendList: [
                    {name: 'David'},
                    {name: 'Ryan'},
                ],
                friendSelect: 0,
                sayFrom: 'xiaohong',
                sayTo: ''
            }
        },
        methods: {
            changeFriend: function (i) {
                this.friendSelect = i;
                this.sayTo = this.friendList[i].name;
            },
            sendMsg: function () {
                this.$nextTick(() => {
                    let newMsg = document.createElement('div');
                    newMsg.classList.add('msg-list-item');
                    newMsg.innerText = this.typeMsg;
                    this.$refs['msg-list'].append(newMsg);
                })
                this.$socket.emit('sendPrivateMessage', {
                    sayFrom: this.sayFrom,
                    sayFromId: this.$socket.id,
                    sayTo: this.sayTo,
                    sayMsg: this.typeMsg,
                });
            }
        },
        sockets: {
            disconnect() {
                console.log('socket 断开连接');
            },
            connect() {
                console.log('socket 已经连接了！');
                // this.$socket.emit()
            },
            receivePrivateMessage(msg) {
                this.$nextTick(() => {
                    let reMsg = document.createElement('div');
                    reMsg.classList.add('msg-list-item');
                    reMsg.innerText = msg.sayMsg;
                    this.$refs['msg-list'].append(msg.sayMsg);
                });
            }
        }
    }
</script>