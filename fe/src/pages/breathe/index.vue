<template>
    <div class="global-coupon-list-wraper">
        <explain    :explainName="state.explainName"></explain>
        <div 
            v-for="(item, index) in echartsList"
            :key="index"
        >
            <van-button
                type="primary"
                class="add-btn"
                @click="addData($event, item)"
            >{{item.option.series[0].data.length ? `修改${item.option.title.text}数据` : `添加${item.option.title.text}数据`}}</van-button>
            <van-button
                type="primary"
                class="introduce-btn"
                @click="openIntroduce"
            >{{item.option.title.text}}介绍</van-button>
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
            :placeholder="placeholder"
            @onClickCloseIcon="onClickCloseIcon"
            @onSubmit="onSubmit"
        ></add-data-popup>
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
    setBreatheData, 
    getBreatheData,
    setBloodOxygenData,
    getBloodOxygenData,
    setVitalApacityData,
    getVitalApacityData
} from '@/api/breathe';
import { useStore } from 'vuex';
import { StateProps } from '@/store';
import Explain from '@/components/header-explain/index.vue';
import FooterNav from '@/components/footer-nav/index.vue';
import { Popup, Dialog,Button } from 'vant'
import AddDataPopup from '../../components/data-popup/index.vue';
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
        'add-data-popup': AddDataPopup
    },
    data() {
        return {
            echartsList: [
                {
                    name: 'breatheRate',
                    option:  {
                        title: {
                            text: '呼吸频率'
                        },
                        toolbox: {
                            show: true,
                            feature: {
                            dataView: { show: true, readOnly: false },
                            magicType: { show: true, type: ['line', 'bar'] },
                            restore: { show: true },
                            saveAsImage: { show: true }
                            }
                        },
                        xAxis: {
                            type: 'category',
                            data: []
                        },
                        yAxis: {
                            type: 'value'
                        },
                        series: [
                            {
                                data: [],
                                type: 'bar',
                                showBackground: true,
                                backgroundStyle: {
                                    color: 'rgba(180, 180, 180, 0.2)'
                                }
                            }
                        ]
                    }
                },
                {
                    name: 'bloodOxygen',
                    option: {
                        toolbox: {
                            show: true,
                            feature: {
                            dataView: { show: true, readOnly: false },
                            magicType: { show: true, type: ['line', 'bar'] },
                            restore: { show: true },
                            saveAsImage: { show: true }
                            }
                        },
                        title: {
                            text: '血氧'
                        },
                        xAxis: {
                            type: 'category',
                            data: []
                        },
                        yAxis: {
                            type: 'value'
                        },
                        series: [
                            {
                                data: [],
                                type: 'bar',
                                showBackground: true,
                                backgroundStyle: {
                                    color: 'rgba(180, 180, 180, 0.2)'
                                }
                            }
                        ]
                    }
                },
                {
                    name: 'vitalCapacity',
                    option: {
                        title: {
                            text: '肺活量'
                        },
                        toolbox: {
                            show: true,
                            feature: {
                            dataView: { show: true, readOnly: false },
                            magicType: { show: true, type: ['line', 'bar'] },
                            restore: { show: true },
                            saveAsImage: { show: true }
                            }
                        },
                        xAxis: {
                            type: 'category',
                            data: []
                        },
                        yAxis: {
                            type: 'value'
                        },
                        series: [
                            {
                                data: [],
                                type: 'bar',
                                showBackground: true,
                                backgroundStyle: {
                                    color: 'rgba(180, 180, 180, 0.2)'
                                }
                            }
                        ]
                    }
                }
            ],
            popupType: '',
            breatheRateData: false,
            bloodOxygenData: false,
            placeholder: ''
        }
    },
    mounted() {
        this.echartsList.forEach((item, index) => {
            this.getData(item.name);
        })
    },

    setup(props: {}, context: SetupContext) {
        const state: State = reactive({
            explainName: '呼吸状况',
            title: '添加呼吸数据',
            showDialog: false
        });
        return {
            state,
        };
    },
    methods: {
        openIntroduce() {

        },
        addData(e:any, item: any) {
            if (item.name === 'breatheRate') {
                this.placeholder = '次/分'
                if (item.option.series[0].data.length) {
                    this.state.title = '修改呼吸频率数据'
                    
                }
                else {
                    this.state.title = '添加呼吸频率数据'
                }
            }
            else if (item.name === 'bloodOxygen') {
                this.placeholder = '百分比（%）'
                if (item.option.series[0].data.length) {
                    this.state.title = '修改血氧数据'
                }
                else {
                    this.state.title = '添加血氧数据'
                }
            }
            else if (item.name === 'vitalCapacity') {
                this.placeholder = '毫升（ml）'
                if (item.option.series[0].data.length) {
                    this.state.title = '修改肺活量数据'
                }
                else {
                    this.state.title = '添加肺活量数据'
                }
            }
            this.popupType = item.name;
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
            if (type === 'breatheRate') {
                getBreatheData(uid)
                    .then(res => {
                        this.handleGetData(type, res)
                    })
                    .catch(error => {
                        Dialog.alert({
                            message: error
                        })
                    })
            }
            else if (type === 'bloodOxygen') {
                getBloodOxygenData(uid)
                    .then(res => {
                        this.handleGetData(type, res)
                    })
                    .catch(error => {
                        Dialog.alert({
                            message: error
                        })
                    });
            }
            else if (type === 'vitalCapacity') {
                getVitalApacityData(uid)
                    .then(res => {
                        this.handleGetData(type, res)
                    })
                    .catch(error => {
                        Dialog.alert({
                            message: error
                        })
                    });
    

            }
        },
        addEchartsData(uid: number, values: any, type: string) {
            if (type === 'breatheRate') {
                setBreatheData(uid, values)
                    .then(res => {
                        this.handleSetData(type, res)
                    })
                    .catch(error => {
                        Dialog.alert({
                            message: error
                        })
                    })
            }
            else if (type === 'bloodOxygen') {
                setBloodOxygenData(uid, values)
                    .then(res => {
                        this.handleSetData(type, res)
                    })
                    .catch(error => {
                        Dialog.alert({
                            message: error
                        })
                    })
            }
            else if (type === 'vitalCapacity') {
                setVitalApacityData(uid, values)
                    .then(res => {
                        this.handleSetData(type, res)
                    })
                    .catch(error => {
                        Dialog.alert({
                            message: error
                        })
                    })
            }
        },
        handleGetData(type: string, res: any) {
            console.log(type, 'tttt')
            const echartDom = this.$refs[type] as HTMLElement;
            console.log(echartDom, 'echartDom')
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
                    if (item.name === type) {
                        item.option.xAxis.data = xAxisData as any;
                        item.option.series[0].data = seriesData as any;
                        this.breatheRateData = true;
                        myChart.setOption(item.option);
                    }
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
    height: 400px;
}
.title {
    text-align: center;
    font-size: 20px;
    padding: 20px;

}
.introduce-btn {
    float: right;
}

</style>
