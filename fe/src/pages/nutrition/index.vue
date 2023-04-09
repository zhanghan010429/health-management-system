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
            :dataName="dataName"
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
    getNutrition, 
    setNutrition,
} from '@/api/nutrition';
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
            dataName: ['cereals_and_tubers', 'animal_food', 'legumes_and_nuts', 'vegetables_and_fruits', 'pure_energy_food'],
            echartsList: [
                {
                    name: 'nutrition',
                    option: {
                        title: {
                            text: '营养摄入'
                        },
                        legend: {
                            top: 'bottom'
                        },
                        toolbox: {
                            show: true,
                            feature: {
                            mark: { show: true },
                            dataView: { show: true, readOnly: false },
                            restore: { show: true },
                            saveAsImage: { show: true }
                            }
                        },
                        series: [
                            {
                                name: 'nutrition Chart',
                                type: 'pie',
                                radius: [5, 80],
                                center: ['50%', '50%'],
                                roseType: 'area',
                                itemStyle: {
                                    borderRadius: 8
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
            this.getData(item.name);
        })
    },

    setup(props: {}, context: SetupContext) {
        const state: State = reactive({
            explainName: '营养状况',
            title: '添加营养状况数据',
            showDialog: false
        });
        return {
            state,
        };
    },
    methods: {
        openIntroduce(e:any, type:string) {
            this.textPopupIsShow = true;
            if (type === 'nutrition') {
                this.textPopupTitle = '营养摄入介绍';
                this.text = '健康的营养摄入标准为：保证每天足够的能量摄入，包括蛋白质、碳水化合物和脂肪的供应。同时摄入足够的微量营养素，包括维生素、矿物质等。摄入足够的水分以及膳食纤维。根据年龄和性别差异，不同人的营养标准可以有所调整。根据中国营养学会推荐的食物摄入量，一般健康成人每天奶及奶制品300g，大豆及坚果类25-35g，畜禽肉40-75g，水产品40-75g，蛋类40-50g，蔬菜类300-500g，水果类200-350g，谷薯类250-400g（全谷物和杂豆50-150g，薯类50-100g），油25-30g，盐＜6g，饮水1500-1700ml。'
            }
        },
        closeText() {
            this.textPopupIsShow = false;
        },
        addData(e:any, item: any) {
            if (item.name === 'nutrition') {
                this.placeholder = '%'
                if (item.option.series[0].data.length) {
                    this.state.title = '修改营养摄入数据'
                    
                }
                else {
                    this.state.title = '添加营养摄入数据'
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
            if (type === 'nutrition') {
                getNutrition(uid)
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
            if (type === 'nutrition') {
                setNutrition(uid, values)
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
                let seriesData: any[] = [];
                for (let key in data) {
                    seriesData.push({
                        value: data[key],
                        name: key
                    });
                }
                this.echartsList.forEach((item, index) => {
                    if (item.name === type) {
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
