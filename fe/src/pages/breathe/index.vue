<template>
    <div class="global-coupon-list-wraper">
        <explain
            :explainName="state.explainName"
            v-on:addSomeData="addBreatheData"
        ></explain>
        <van-button 
            type="primary"
            class="add-btn"
            @click="addBreatheData"
        >添加数据</van-button>
        <div ref="echart" class="echart"></div>
        <div ref="bloodOxygen" class="echart"></div>
        <div ref="vitalCapacity" class="echart"></div>
        <footer-nav></footer-nav>
        <van-dialog v-model:show="state.showDialog" title="添加呼吸相关数据" show-cancel-button>
            <van-form @submit="onSubmit">
                <van-cell-group inset>
                    <template v-for="(item, index) in respiratoryRate">
                        <van-field
                            v-model="form[item]"
                            :name="item"
                            :label="item"
                            placeholder="呼吸频率（次/分）"
                        />
                    </template>
                   
                </van-cell-group>
                <div style="margin: 16px;">
                    <van-button round block type="primary" native-type="submit">
                        提交
                    </van-button>
                </div>
            </van-form>
        </van-dialog>

    </div>
</template>

<script lang="ts">
import {
    ref,
    reactive,
    computed,
    ComputedRef,
    defineComponent,
    SetupContext
} from 'vue';
import {setBreatheData} from '@/api/breathe';
import { useStore } from 'vuex';
import { StateProps } from '@/store';
import Explain from '@/components/header-explain/index.vue';
import FooterNav from '@/components/footer-nav/index.vue';
import { Dialog,Button } from 'vant'
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
        [Button.name]:Button
    },
    data() {
        return {
            respiratoryRate: ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun']
        }
    },
    mounted() {
        const echartDom = this.$refs.echart as HTMLElement;
        let myChart = echarts.init(echartDom);
        const option = {
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
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    data: [120, 200, 150, 80, 70, 110, 130],
                    type: 'bar',
                    showBackground: true,
                    backgroundStyle: {
                        color: 'rgba(180, 180, 180, 0.2)'
                    }
                }
            ]
        };
        myChart.setOption(option);

        const bloodOxygen = this.$refs.bloodOxygen as HTMLElement;
        let bloodOxygenCharts = echarts.init(bloodOxygen);
        const bloodOxygenOption = {
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
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    data: [120, 200, 150, 80, 70, 110, 130],
                    type: 'bar',
                    showBackground: true,
                    backgroundStyle: {
                        color: 'rgba(180, 180, 180, 0.2)'
                    }
                }
            ]
        };
        bloodOxygenCharts.setOption(bloodOxygenOption);

        const vitalCapacity = this.$refs.vitalCapacity as HTMLElement;
        let vitalCapacityCharts = echarts.init(vitalCapacity);
        const vitalCapacityOption = {
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
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    data: [120, 200, 150, 80, 70, 110, 130],
                    type: 'bar',
                    showBackground: true,
                    backgroundStyle: {
                        color: 'rgba(180, 180, 180, 0.2)'
                    }
                }
            ]
        };
        vitalCapacityCharts.setOption(vitalCapacityOption);

        

        

    },

    setup(props: {}, context: SetupContext) {
        const form = ref({
            Mon: '',
            Tue: '',
            Wed: '',
            Thur: '',
            Fri: '',
            Sat: '',
            Sun: ''
        });
        const onSubmit = (values: any) => {
            const uid = window.sessionStorage.uid;
            setBreatheData(uid, values)
                .then(res => {
                    const { code, message } = res.data
                    if (code === 0) {
                        
                        // Dialog.alert({ message: '注册成功' })
                    } else {
                        // Dialog.alert({ message })
                    }
                })
                .catch(error => {
                    // Dialog.alert({
                    //     message: error
                    // })
                })
        };
        const store = useStore<StateProps>();
        const state: State = reactive({
            explainName: '呼吸状况',
            showDialog: false
        });
        return {
            state,
            form,
            onSubmit
        };
    },
    methods: {
        addBreatheData() {
            this.state.showDialog = true;
        }

    }
    
});
</script>

<style lang="less" scoped>
.echart {
    width: 100%;
    height: 400px;
}

</style>
