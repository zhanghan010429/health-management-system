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
                @click="addData($event, series)"
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
                ref="echart" 
                class="echart"
            ></div>
        </div>
        <footer-nav></footer-nav>
        <add-data-popup
            v-if="state.showDialog"
            :isShow="state.showDialog"
            :title="state.title"
            :type="popupType"
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
    setExerciseStep, 
    getExerciseStep,
    setCalorie,
    getCalorie
} from '@/api/exercise';
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
                    name: 'exercise',
                    option: {
                        tooltip: {
                            trigger: 'axis',
                            axisPointer: {
                                type: 'cross',
                                crossStyle: {
                                    color: '#999'
                                }
                            }
                        },
                        
                        toolbox: {
                            feature: {
                                dataView: { show: true, readOnly: false },
                                magicType: { show: true, type: ['line', 'bar'] },
                                restore: { show: true },
                                saveAsImage: { show: true }
                            }
                        },
                        legend: {
                            data: ['步数', '卡路里',]
                        },
                        xAxis: [
                            {
                                type: 'category',
                                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                                axisPointer: {
                                    type: 'shadow'
                                },
                                axisLabel: {
                                    rotate: 45
                                },
                            }
                        ],
                        yAxis: [
                            {
                                type: 'value',
                                name: '步数',
                                axisLabel: {
                                    formatter: '{value} 步',
                                    rotate: -90
                                }
                            },
                            {
                                type: 'value',
                                name: '卡路里',
                                axisLabel: {
                                    formatter: '{value} cal',
                                    rotate: -90
                                }
                            }
                        ],
                        series: [
                            {
                                name: '步数',
                                type: 'bar',
                                tooltip: {
                                    valueFormatter: function (value: string) {
                                        return value + ' 步';
                                    }
                                },
                                data: []
                            },
                            {
                                name: '卡路里',
                                type: 'line',
                                yAxisIndex: 1,
                                tooltip: {
                                    valueFormatter: function (value: string) {
                                        return value + ' cal';
                                    }
                                },
                                data: []
                            }
                        ]
                    }
                }
                
            ],
            popupType: '',
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
                this.getData(ele.name);
            })
        })
    },

    setup(props: {}, context: SetupContext) {
        const state: State = reactive({
            explainName: '运动数据',
            title: '添加运动数据',
            showDialog: false
        });
        return {
            state,
        };
    },
    methods: {
        openIntroduce(e:any, type:string) {
            this.textPopupIsShow = true;
            if (type === '步数') {
                this.textPopupTitle = '步数介绍';
                this.text = '人体每天摄入的总热量约为1800～2000千卡。走一万步等于消耗掉240～300千卡的热量，所消耗的热量约等于总摄入热量的1/7。对于大多数人而言，除去正常生活所需消耗的热量(约1500~1700千卡)，每天走一万步恰好能将多余的热量消耗掉。另外，生活中的步数是运动的一种方式，也有一定的健身效果，但强度较弱。他建议市民还是拿出一定的时间来健步走，保持运动强度。建议每天都要走够30分钟，大约2公里多的路。如果工作比较忙，可以在上下班多走2站地。'
            }
            else {
                this.textPopupTitle = '卡路里介绍';
                this.text = '卡路里，是一个能量单位。我们往往将卡路里与食品联系在一起，但实际上它们适用于含有能量的任何物质。简单地说，1卡路里的能量或热量可将1克水在一个大气压下的温度升高1摄氏度。1卡路里约等于4.1859焦耳(焦耳是物理学中常用的能量单位)。大多数人把卡路里与我们吃的或喝的东西联系在一起，就比如“这瓶汽水含有200卡路里”。实际上，食品包装上列出的卡路里是大卡，也被记做大写字母C，相当于将1000克水在1大气压下由14.5摄氏度提升到15.5摄氏度所需的热量，约等于4186焦耳的内能。 (1000卡路里=1大卡)。所以，实际上这听汽水含有20万卡路里（但不要担心，这一点也适用于锻炼——当练习图上说你慢跑2公里燃烧100大卡时，它的意思是10万卡路里）。在英文中，“calorie”（首字母小写）表示卡路里，约等于4.186焦耳，“Calorie”（首字母大写）表示大卡，约等于4186焦耳。'
            }
        },
        closeText() {
            this.textPopupIsShow = false;
        },
        addData(e:any, series: any) {
            
            if (series.name === '步数') {
                this.placeholder = '步'
                if (series.data.length) {
                    this.state.title = '修改步数数据'
                }
                else {
                    this.state.title = '添加步数数据'
                }
            }
            else if (series.name === '卡路里') {
                this.placeholder = 'cal'
                if (series.data.length) {
                    this.state.title = '修改卡路里数据'
                }
                else {
                    this.state.title = '添加卡路里数据'
                }
            }
            this.popupType = series.name;
            this.state.showDialog = true;
        },
        onClickCloseIcon() {
            this.state.showDialog = false;
        },
        onSubmit(values: any, type: string) {
            const uid = window.sessionStorage.uid;
            this.addEchartsData(uid, values, type)
        },
        getData(type: string) {
            const uid = window.sessionStorage.uid;
            if (type === '步数') {
                getExerciseStep(uid)
                    .then(res => {
                        this.handleGetData(type, res)
                    })
                    .catch(error => {
                        Dialog.alert({
                            message: error
                        })
                    })
            }
            else {
                getCalorie(uid)
                    .then(res => {
                        this.handleGetData(type, res)
                    })
                    .catch(error => {
                        Dialog.alert({
                            message: error
                        })
                    })
                
            }
        },
        addEchartsData(uid: number, values: any, type: string) {
            if (type === '步数') {
                setExerciseStep(uid, values)
                    .then(res => {
                        this.handleSetData(type, res)
                        this.onClickCloseIcon()
                    })
                    .catch(error => {
                        Dialog.alert({
                            message: error
                        })
                    })
            }
            else {
                setCalorie(uid, values)
                    .then(res => {
                        this.handleSetData(type, res)
                        this.onClickCloseIcon()
                    })
                    .catch(error => {
                        Dialog.alert({
                            message: error
                        })
                    })

            }
           
            
        },
        handleGetData(type: string, res: any) {
            const echartDom = this.$refs.echart as HTMLElement;
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
                    if (type === '步数') {
                        item.option.series[0].data = seriesData as any;
                    }
                    else {
                        item.option.series[1].data = seriesData as any;
                    }
                    this.breatheRateData = true;
                    myChart.setOption(item.option);
                })
            }
        },
        handleSetData(type: string, res: any) {
            const { code, message } = res.data
            if (code === 0) { 
                Dialog.alert({ message: '添加成功' })
                this.getData(type);
            }
            else if (code === 1) {
                Dialog.alert({ message: '修改成功' });
                this.getData(type);
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
    width: 130px;
    margin-bottom: 20px;

}
.introduce-btn {
    width: 130px;
    float: right;
    margin-bottom: 20px;
}

</style>
