<template>
    <div class="global-coupon-list-wraper">
        <explain :explainName="state.explainName"></explain>
        <div ref="echart" class="echart"></div>
        <div ref="bloodOxygen" class="echart"></div>
        <div ref="vitalCapacity" class="echart"></div>

        <footer-nav></footer-nav>
    </div>
</template>

<script lang="ts">
import {
    reactive,
    computed,
    ComputedRef,
    defineComponent,
    SetupContext
} from 'vue';
import { useStore } from 'vuex';
import { StateProps } from '@/store';
import Explain from '@/components/header-explain/index.vue';
import FooterNav from '@/components/footer-nav/index.vue';
import * as echarts from 'echarts';

type State = {
    [x: string]: any
    explainName: string
}

export default defineComponent({
    components: {
        Explain,
        FooterNav
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
        const store = useStore<StateProps>();
        const state: State = reactive({
            explainName: '呼吸状况',
        });
        return {
            state
        };
    }
});
</script>

<style lang="less" scoped>
.echart {
    width: 100%;
    height: 400px;
}

</style>
