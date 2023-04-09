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
                @click="openIntroduce($event, item.name)"
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
            placeholder: '',
            textPopupIsShow: false,
            textPopupTitle: '',
            text: ''
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
        openIntroduce(e:any, type:string) {
            this.textPopupIsShow = true;
            if (type === 'breatheRate') {
                this.textPopupTitle = '呼吸频率介绍';
                this.text = '呼吸频率为一种形容每分钟呼吸的次数的医学术语，胸部的一次起伏就是一次呼吸，即一次吸气一次呼气。每分钟呼吸的次数称为呼吸频率。呼吸是人体内外环境之间进行气体交换的必需过程，人体通过呼吸而吸进氧气、呼出二氧化碳，从而维持正常的生理功能。'
            }
            else if (type === 'bloodOxygen') {
                this.textPopupTitle = '血氧介绍';
                this.text = '血氧，是指血液中的氧气，人体正常血氧饱和度为95%以上。血液中含氧量越高，人的新陈代谢就越好。当然血氧含量高并不是一个好的现象，人体内的血氧都是有一定的饱和度，过低会造成机体供氧不足，过高会导致体内细胞老化。'
            }
            else if (type === 'vitalCapacity') {
                this.textPopupTitle = '肺活量介绍';
                this.text = '肺活量（vital capacity）是指在最大吸气后尽力呼气的气量。包括潮气量、补吸气量和补呼气量三部分。潮气量是指一次呼吸周期中肺吸入或呼出的气量，在潮气量之外再吸入的最大气量为补吸气量，在潮气量之外再呼出的最大气量为补呼气量，最大呼气后残留在肺内的气量为余气量。存在较大的个体差异。受年龄、性别、身材、呼吸肌强弱及肺和胸廓弹性等因素的影响。一般说，身体越强壮，它就越大。研究表明，它与最大吸氧量存在很高的相关。常用作评价人体素质的指标。'
            }
        },
        closeText() {
            this.textPopupIsShow = false;
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
                        this.onClickCloseIcon()
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
                        this.onClickCloseIcon()
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
            const echartDom = this.$refs[type] as HTMLElement;
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
