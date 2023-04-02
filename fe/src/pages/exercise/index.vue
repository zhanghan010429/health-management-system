<template>
    <div class="global-coupon-list-wraper">
        <explain :explainName="state.explainName"></explain>
        <div ref="steps" class="echart"></div>
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
        const steps = this.$refs.steps as HTMLElement;
        let stepsChart = echarts.init(steps);
        const option = {
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
                }
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    name: '步数',
                    min: 0,
                    max: 250,
                    interval: 50,
                    axisLabel: {
                        formatter: '{value} 步'
                    }
                },
                {
                    type: 'value',
                    name: '卡路里',
                    min: 0,
                    max: 25,
                    interval: 5,
                    axisLabel: {
                        formatter: '{value} cal'
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
                    data: [
                        2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3
                    ]
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
                    data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
                }
            ]
        };
        stepsChart.setOption(option);

    },

    setup(props: {}, context: SetupContext) {
        const store = useStore<StateProps>();
        const state: State = reactive({
            explainName: '运动状况',
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
    height: 600px;
}

</style>
