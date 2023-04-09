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
            :dataName="dataName"
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
    setBody,
    getBody,
    getTemperature,
    setTemperature
} from '@/api/bodyMeasure';
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
                    name: 'body',
                    dataName: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dece'],
                    option: {
                        title: {
                            text: '身体'
                        },
                        tooltip: {
                            trigger: 'axis'
                        },
                        legend: {
                            data: ['height', 'weight', 'bmi', 'body_fat_rate']
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
                                magicType: { show: true, type: ['line', 'bar'] },
                                saveAsImage: { show: true }
                            },
                            orient: 'vertical'
                        },
                        xAxis: {
                            type: 'category',
                            data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dece']
                        },
                        yAxis: {
                            type: 'value'
                        },
                        series: [
                            {
                                name: 'height',
                                type: 'line',
                                data: []
                            },
                            {
                                name: 'weight',
                                type: 'line',
                                data: []
                            },
                            {
                                name: 'bmi',
                                type: 'line',
                                data: []
                            },
                            {
                                name: 'body_fat_rate',
                                type: 'line',
                                data: []
                            }
                        ]
                    }
                },
                {
                    name: 'body_temperature',
                    dataName: ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'],
                    option: {
                        title: {
                            text: 'Temperature of body',
                            top: '0px'
                        },
                        tooltip: {
                            trigger: 'axis'
                        },
                        legend: {
                            top: '20px'
                            
                        },
                        toolbox: {
                            top: '100px',
                            show: true,
                            feature: {
                            dataView: { readOnly: false },
                            magicType: { type: ['line', 'bar'] },
                            restore: {},
                            saveAsImage: {}
                            },
                            orient: 'vertical'
                        },
                        xAxis: {
                            type: 'category',
                            boundaryGap: false,
                            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                        },
                        yAxis: {
                            type: 'value',
                            axisLabel: {
                            formatter: '{value} °C'
                            }
                        },
                        series: [
                            {
                            name: 'body_temperature_highest',
                            type: 'line',
                            data: [],
                            markPoint: {
                                data: [
                                    { type: 'max', name: 'Max' },
                                    { type: 'min', name: 'Min' }
                                ]
                            },
                            markLine: {
                                data: [{ type: 'average', name: 'Avg' }]
                            }
                            },
                            {
                            name: 'body_temperature_lowest',
                            type: 'line',
                            data: [],
                            markPoint: {
                                data: [{ name: '周最低', value: 36, xAxis: 1, yAxis: -1.5 }]
                            },
                            markLine: {
                                data: [
                                { type: 'average', name: 'Avg' },
                                [
                                    {
                                    symbol: 'none',
                                    x: '90%',
                                    yAxis: 'max'
                                    },
                                    {
                                    symbol: 'circle',
                                    label: {
                                        position: 'start',
                                        formatter: 'Max'
                                    },
                                    type: 'max',
                                    name: '最高点'
                                    }
                                ]
                                ]
                            }
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
            text: '',
            dataName: []
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
            explainName: '身体数据',
            title: '添加身体数据',
            showDialog: false
        });
        return {
            state,
        };
    },
    methods: {
        openIntroduce(e:any, type:string) {
            this.textPopupIsShow = true;
            if (type === 'height') {
                this.textPopupTitle = '身高介绍';
                this.text = '身高是指从头顶点(v)至地面的垂距 [1]  。一般以“厘米”（cm）作单位，也较经常用“米”（m）。 [2]  身高是人体纵向部分的长度，源于人体的纵向生长，受遗传因素的影响较大。女孩比男孩身高发育的早，在12-13岁为快速增长时期，到19-23岁开始停止增长，而男孩身高发育的晚，在15-16岁为快速增长时期，到20-25岁停止增长，四肢长骨和脊椎骨均已完成骨化，身高就停止增长了。影响身高的因素很多，如遗传、营养、体育运动、环境、生活习惯、种族、内分泌、性成熟早晚（初潮年龄18岁比11岁者平均高出5厘米）、远近亲婚配、医学进步等等。'
            }
            else if (type === 'weight') {
                this.textPopupTitle = '体重介绍';
                this.text = '体重（body weight）：裸体或穿着已知重量的工作衣称量得到的身体重量 [1]  。在中医体重为病状名。身体倦怠沉重。素问·《阴阳应象大论》：“年五十，体重，耳目不聪矣。”体重增长除与骨的增长关系密切以外，还与肌肉，脂肪等的增长有关系。体重增长趋势：在青春期，肌肉的发育比较突出。当身高迅速增长时，肌肉以增加长度为主而明显增长；身高生长缓慢下来时，肌肉以增粗肌纤维为主而明显增长，于是体重随之增加。'
            }
            else if (type === 'bmi') {
                this.textPopupTitle = 'bmi介绍';
                this.text = '身体质量指数，是BMI（Body Mass Index [4]  ）指数，简称体质指数，是国际上常用的衡量人体胖瘦程度以及是否健康的一个标准。计算公式为：BMI=体重÷身高2。（体重单位：千克；身高单位：米。）BMI由19世纪中期的比利时通才凯特勒最先提出。'
            }
            else if (type === 'body_fat_rate') {
                this.textPopupTitle = '体脂率介绍';
                this.text = '体脂率是指人体内脂肪重量在人体总体重中所占的比例，又称体脂百分数，它反映人体内脂肪含量的多少。肥胖会提高罹患各种疾病的风险。例如，高血压、糖尿病、高血脂等。而打算怀孕的女性也不能忽视肥胖引起的妊娠并发症与难产的风险。'
            }
            else if (type === 'body_temperature_highest') {
                this.textPopupTitle = '体温（高温）介绍';
                this.text = '人体正常体温平均在36～37℃之间（腋窝），超出37.3℃就是发热，37.3～38℃是低烧，38.1～40℃是高烧。40℃ 以上随时有生命危险。'
            }
            else if (type === 'body_temperature_lowest') {
                this.textPopupTitle = '体温（低温）介绍';
                this.text = '人体正常体温平均在36～37℃之间（腋窝），超出37.3℃就是发热，37.3～38℃是低烧，38.1～40℃是高烧。40℃ 以上随时有生命危险。'
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
            this.name = item.name;
            this.dataName = item.dataName;
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
            if (name === 'body') {
                getBody(uid, type)
                    .then(res => {
                        this.handleGetData(type, res, name)
                    })
                    .catch(error => {
                        Dialog.alert({
                            message: error
                        })
                    })
            }
            else {
                getTemperature(uid, type)
                    .then(res => {
                        this.handleGetData(type, res, name)
                    })
                    .catch(error => {
                        Dialog.alert({
                            message: error
                        })
                    })
            }
                
        },
        addEchartsData(uid: number, values: any, type: string, name: string) {
            if (name === 'body') {
                setBody(uid, type, values)
                    .then(res => {
                        this.handleSetData(type, res, name)
                        this.onClickCloseIcon()
                    })
                    .catch(error => {
                        Dialog.alert({
                            message: error
                        })
                    })
            }
            else {
                setTemperature(uid, type, values)
                    .then(res => {
                        this.handleSetData(type, res, name)
                    })
                    .catch(error => {
                        Dialog.alert({
                            message: error
                        })
                    })
            }
                
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
