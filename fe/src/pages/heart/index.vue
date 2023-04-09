<template>
    <div class="global-coupon-list-wraper">
        <explain    
            :explainName="state.explainName"
        ></explain>
        <div 
            v-for="(item, index) in echartsList"
            :key="index"
        >
            <div v-for="(series, index) in item.option.series">
            <van-button
                type="primary"
                class="add-btn"
                @click="addData($event, series, item)"
            >
                {{series.data.length ? `修改${series.name}数据` : `添加${series.name}数据`}}
            </van-button>
            <van-button
                type="primary"
                class="introduce-btn"
                @click="openIntroduce($event, series.name)"
            >{{series.name}}介绍</van-button>

            </div>
            <div
                :ref="item.name" 
                :type="item.name"
                class="echart"
            ></div>
           
        </div>
        <footer-nav></footer-nav>

        <add-data-popup
            v-if="state.showDialog"
            :isShow="state.showDialog"
            :title="state.title"
            :type="popupType"
            :name="name"
            :placeholder="placeholder"
            @onClickCloseIcon="onClickCloseIcon"
            @onSubmit="onSubmit"
        ></add-data-popup>

        <text-popup
            :is-show="textPopupIsShow"
            :title="textPopupTitle"
            :text="text"
            @onClickCloseIcon="closeText"
        ></text-popup>
    </div>
</template>

<script lang="ts">
import {
    ref,
    reactive,
    defineComponent,
    SetupContext
} from 'vue';
import {
    getHeart,
    setHeart
} from '@/api/heart';
import { useStore } from 'vuex';
import { StateProps } from '@/store';
import Explain from '@/components/header-explain/index.vue';
import FooterNav from '@/components/footer-nav/index.vue';
import { Popup, Dialog, Button } from 'vant'
import AddDataPopup from '../../components/data-popup/index.vue';
import TextPopup from '../../components/text-popup/index.vue';
import * as echarts from 'echarts';

type State = {
    [x: string]: any
    explainName: string
}

export default defineComponent({
    components: {
        Explain,
        FooterNav,
        [Dialog.name]: Dialog,
        [Button.name]:Button,
        [Popup.name]: Popup,
        'add-data-popup': AddDataPopup,
        'text-popup': TextPopup
    },
    data() {
        return {
            echartsList: [
                {
                    name: 'heart',
                    option: {
                        title: {
                            text: '基本情况',
                            top: '0px'
                        },
                        tooltip: {
                            trigger: 'axis'
                        },
                        legend: {
                            data: ['heart_rate', 'aerobic_fitness', 'sleep_duration'],
                            top: '20px'
                        },
                        grid: {
                            left: '3%',
                            right: '4%',
                            bottom: '3%',
                            containLabel: true
                        },
                        toolbox: {
                            show: true,
                            feature: {
                            dataView: { show: true, readOnly: false },
                            magicType: { show: true, type: ['line', 'bar'] },
                            restore: { show: true },
                            saveAsImage: { show: true }
                            },
                            orient: 'vertical',
                            top: '100px'
                        },
                        xAxis: {
                            type: 'category',
                            boundaryGap: false,
                            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                        },
                        yAxis: {
                            type: 'value'
                        },
                        series: [
                            {
                                name: 'heart_rate',
                                type: 'line',
                                stack: 'Total',
                                data: []
                            },
                            {
                                name: 'aerobic_fitness',
                                type: 'line',
                                stack: 'Total',
                                data: []
                            },
                            {
                                name: 'sleep_duration',
                                type: 'line',
                                stack: 'Total',
                                data: []
                            }
                        ]
                    }
                },
                {
                    name: 'pressure',
                    option: {
                    title: {
                        text: '血压情况',
                        top: '0px'
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data: ['systolic_blood_pressure', 'diastolic_blood_pressure'],
                        top: '20px'
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    toolbox: {
                        show: true,
                        feature: {
                        dataView: { show: true, readOnly: false },
                        magicType: { show: true, type: ['line', 'bar'] },
                        restore: { show: true },
                        saveAsImage: { show: true }
                        },
                        orient: 'vertical',
                        top: '100px'
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [
                        {
                            name: 'systolic_blood_pressure',
                            type: 'line',
                            stack: 'Total',
                            data: []
                        },
                        {
                            name: 'diastolic_blood_pressure',
                            type: 'line',
                            stack: 'Total',
                            data: []
                        }
                    ]
                }

                }
            ],
            popupType: '',
            name: '',
            breatheRateData: false,
            bloodOxygenData: false,
            placeholder: '',
            textPopupIsShow: false,
            textPopupTitle: '',
            text: ''
        }
    },
    mounted() {
        this.echartsList.forEach((item, index) => {
            item.option.series.forEach((ele, i) => {
                this.getData(ele.name, item.name);
            })
        })
    },

    setup(props: {}, context: SetupContext) {
        const state: State = reactive({
            explainName: '心脏数据',
            title: '添加心脏数据',
            showDialog: false
        });
        return {
            state,
        };
    },
    methods: {
        openIntroduce(e:any, type:string) {
            this.textPopupIsShow = true;
            if (type === 'heart_rate') {
                this.textPopupTitle = '心率介绍';
                this.text = '心率是指正常人安静状态下每分钟心跳的次数，也叫安静心率，一般为60～100次/分，可因年龄、性别或其他生理因素产生个体差异。一般来说，年龄越小，心率越快，老年人心跳比年轻人慢，女性的心率比同龄男性快，这些都是正常的生理现象。安静状态下，成人正常心率为60～100次/分钟，理想心率应为55～70次/分钟（运动员的心率较普通成人偏慢，一般为50次/分钟左右）。'
            }
            else if (type === 'aerobic_fitness') {
                this.textPopupTitle = '有氧适能介绍';
                this.text = '有氧适能是指人体摄取、运输和利用氧的能力。它是实现有氧工作的基础，故又可称为有氧工作能力，有氧适能水平愈高，有氧工作能力愈强。'
            }
            else if (type === 'sleep_duration') {
                this.textPopupTitle = '睡眠时长介绍';
                this.text = '睡眠时间是指人及动物的一种自然生理现象,意识是自然的、通常为有规律的暂时中止,在此期间体力得到恢复的过程时间，能达到闭目安息，大脑皮质处于休息状态。成年人最佳睡眠时间为晚上22点至早上6点。睡眠时间可分为间断睡眠和连续睡眠，一般生活中所指的睡眠时间是指一天内总的睡眠时间，即所有处于睡眠状态的时间总和。人体生物钟建议晚上22点前入睡，早上7点前起床。早睡早起，增强免疫力，有利于抗击病毒的侵入，从而提高工作效率。'
            }
            else if (type === 'systolic_blood_pressure') {
                this.textPopupTitle = '收缩压介绍';
                this.text = '收缩压是当人的心脏收缩时，动脉内的压力上升，心脏收缩的中期，动脉内压力最高，此时血液对血管内壁的压力称为收缩压，亦称高压。根据《中国高血压指南》，90~119称为正常血压，120~139称为正常高值。140以上称为高血压。关于正常高值群体，根据流行病学研究的数据，10 年后心血管风险比血压水平110mmHg 的人群增加 1 倍以上。其中，血 压 120～129 和 130～139mmHg 的中年人群，10 年后分别有 45% 和 64% 成为高血压患者。关于高血压群体，140～159属1级高血压（低度），160～179属2级高血压（中度），180以上属3级高血压（重度）'
            }
            else if (type === 'diastolic_blood_pressure') {
                this.textPopupTitle = '舒张压介绍';
                this.text = '舒张压就是当人的心脏舒张时，动脉血管弹性回缩时，产生的压力称为舒张压，又叫低压。心脏舒张时，主动脉压下降，在心舒末期动脉血压处于最低值称为舒张压。根据《2020国际高血压学会全球高血压实践指南》：成人正常的舒张压为＜85mmHg(11.33kPa) ，血压的单位为毫米汞柱（mmHg）或千帕（kPa)，1千帕≈7.5mmHg。具体来说，低于85称为正常值，85~89称为正常高值。低压≥90mmHg的称为高血压。其中，90～99属1级高血压，＞100属2级高血压。'
            }
        },
        closeText() {
            this.textPopupIsShow = false;
        },
        addData(e:any, series: any, item: any) {
            this.placeholder = ''
            if (series.data.length) {
                this.state.title = `修改${series.name}数据`
            }
            else {
                this.state.title = `添加${series.name}数据`
            }

            this.popupType = series.name;
            this.name = item.name
            this.state.showDialog = true;
        },
        onClickCloseIcon() {
            this.state.showDialog = false;
        },
        onSubmit(values: any, type: string, name: string) {
            const uid = window.sessionStorage.uid;
            this.addEchartsData(uid, values, type, name)
        },
        getData(type: string, name: string) {
            const uid = window.sessionStorage.uid;
                getHeart(uid, type)
                    .then(res => {
                        this.handleGetData(type, res, name)
                    })
                    .catch(error => {
                        Dialog.alert({
                            message: error
                        })
                    })
        },
        addEchartsData(uid: number, values: any, type: string, name: string) {
                setHeart(uid, type, values)
                    .then(res => {
                        this.handleSetData(type, res, name)
                        this.onClickCloseIcon()
                    })
                    .catch(error => {
                        Dialog.alert({
                            message: error
                        })
                    })
        },
        handleGetData(type: string, res: any, name: string) {
            const echartDom = this.$refs[name] as HTMLElement;
            let myChart = echarts.init(echartDom);
            const { code, data } = res.data;
            if (code === 0) {
                let xAxisData: string[] = [];
                let seriesData: any[] = [];
                for (let key in data) {
                    xAxisData.push(key);
                    seriesData.push(data[key]);
                }
                this.echartsList.forEach((item, index) => {
                    if (item.name === name) {
                        item.option.series.forEach((ele, i) => {
                            if (ele.name === type) {
                                ele.data = seriesData as any;
                            }
                        })
                        this.breatheRateData = true;
                        myChart.setOption(item.option);
                    }
                })
            }
        },
        handleSetData(type: string, res: any, name: string) {
            const { code, message } = res.data
            if (code === 0) { 
                Dialog.alert({ message: '添加成功' })
                this.getData(type, name);
            }
            else if (code === 1) {
                Dialog.alert({ message: '修改成功' });
                this.getData(type, name);
            } 
            else {
                Dialog.alert({ message })
            }
        }
    }
    
});
</script>

<style lang="less" scoped>
.echart {
    width: 100%;
    height: 600px;
}
.title {
    text-align: center;
    font-size: 20px;
    padding: 20px;

}
.add-btn {
    width: 190px;
    margin-bottom: 20px;
    padding: 30px;

}
.introduce-btn {
    width: 190px;
    float: right;
    margin-bottom: 20px;
    padding: 30px;
}
</style>
