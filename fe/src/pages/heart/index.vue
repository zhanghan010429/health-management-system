<template>
    <div class="global-coupon-list-wraper">
        <explain :explainName="state.explainName"></explain>
        <div ref="heart" class="echart"></div>
        <div ref="blood" class="echart"></div>
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
        const echartDom = this.$refs.heart as HTMLElement;
        let myChart = echarts.init(echartDom);
        const option = {
            title: {
                text: '基本情况'
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: ['心率', '有氧适能', '睡眠时长']
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            toolbox: {
                feature: {
                saveAsImage: {}
                }
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
                name: '心率',
                type: 'line',
                stack: 'Total',
                data: [120, 132, 101, 134, 90, 230, 210]
                },
                {
                name: '有氧适能',
                type: 'line',
                stack: 'Total',
                data: [220, 182, 191, 234, 290, 330, 310]
                },
                {
                name: '睡眠时长',
                type: 'line',
                stack: 'Total',
                data: [150, 232, 201, 154, 190, 330, 410]
                }
            ]
        };
        myChart.setOption(option);

        const bloodDom = this.$refs.blood as HTMLElement;
        let bloodDomChart = echarts.init(bloodDom);

        const bloodDomOption = {
            title: {
                text: '血压情况'
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: ['收缩压', '舒张压']
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            toolbox: {
                feature: {
                saveAsImage: {}
                }
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
                name: '收缩压',
                type: 'line',
                stack: 'Total',
                data: [120, 132, 101, 134, 90, 230, 210]
                },
                {
                name: '舒张压',
                type: 'line',
                stack: 'Total',
                data: [220, 182, 191, 234, 290, 330, 310]
                }
            ]
        };
        bloodDomChart.setOption(bloodDomOption);
    },

    setup(props: {}, context: SetupContext) {
        const store = useStore<StateProps>();
        const state: State = reactive({
            explainName: '心脏状况',
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
    height: 450px;
}

</style>
