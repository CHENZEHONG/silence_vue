<style>
    .calendar {
        display: flex;
        justify-content: space-between;
        /*max-width: 68.33333%;*/
        background: #FFFFFF;
    }

    .calendar-left {
        padding: 17px 17px;
        color: #000;
        overflow: hidden;
    }

    .calendar-left-day {
        font-weight: 400;
        font-size: 2.5rem;
    }

    .calendar-left-week {
        position: relative;
        font-size: 1.125rem;
        font-weight: 400;

    }

    .calendar-left-week::after {
        position: absolute;
        content: '';
        border-top: 2px solid #2cd07e;
        height: 2px;
        width: 100px;
        left: 0;
        top: 100%;
        margin-top: 8px;
    }

    .calendar-left-date {
        margin-top: 24px;
        font-size: .875rem;
        font-weight: 400;
    }

    .calendar-right {
        width: 75%;
        background: #212732;
    }

    .calendar-head {
        display: flex;
        justify-content: space-between;
        font-size: 2.25rem;
        padding: 17px 30px;
    }

    .calendar-week {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
        text-align: center;
        /*background: #607D8B;*/
    }

    .calendar-day {
        display: grid;
        grid-template-rows: auto;
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
    }

    .calendar-day-item {
        text-align: center;
        padding: 17px 13px;
    }

    .selected-day {
        background: #31425C;
    }
</style>
<template>
    <div class="calendar">
        <div class="calendar-left">
            <div class="calendar-left-day">{{selectedDay}}</div>
            <div class="calendar-left-week">{{selectedWeek}}</div>
            <div class="calendar-left-date">{{this.$moment().format('MMMM YYYY' )}}</div>
        </div>
        <div class="calendar-right">
            <!-- 日历头部 -->
            <div class="calendar-head">
                <div>{{this.$moment().format('MMMM')}}</div>
                <div>+</div>
            </div>
            <!-- 星期 -->
            <div class="calendar-week">
                <div>SUN</div>
                <div>MON</div>
                <div>TUE</div>
                <div>WED</div>
                <div>THU</div>
                <div>FRI</div>
                <div>SAT</div>
            </div>
            <div class="calendar-day">
                <div v-for="(item,index) in days" :key="index" class="calendar-day-item"
                     :style="{visibility:item===0?'hidden':''}"
                     @click="clickDate(item)" :class="item===selectedDay?'selected-day':''">
                    {{item}}
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                selectedDay: this.$moment().date(),
                selectedWeek: this.$moment().format('dddd'),
            }
        },
        computed: {
            days() {
                return this.initCalendar()
            }
        },
        created() {
        },
        methods: {
            initCalendar() {
                let calArg = [];
                // 获取当月天数
                let currentMonthDays = this.$moment(this.date).daysInMonth();
                // 获取当月1日为星期几
                let currentWeekday = this.$moment(this.date).date(1).weekday();
                // if (currentWeekday === 7) {
                //
                // } else {
                //     for (let i = 0; i < currentWeekday; i++) {
                //         calArg.push(0)
                //     }
                // }
                if(currentWeekday !== 7 || currentWeekday !== 1){
                    for (let i = 0; i < currentWeekday; i++) {
                        calArg.push(0)
                    }
                }
                for (let i = 0; i <= currentMonthDays; i++) {
                    calArg.push(i)
                }
                return calArg
            },
            clickDate(item) {
                this.selectedDay = item;
                // 拼接选择的日期 YYYY-MM-DD
                let temp = this.$moment().format('YYYY-MM') + '-' + this.selectedDay;
                this.selectedWeek = this.$moment(temp).format('dddd');
            }
        }
    }
</script>