<template>
    <div class="global-coupon-list-wraper">
        <explain :explainName="state.explainName"></explain>
        <div ref="nutrition" class="echart"></div>
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
        const echartDom = this.$refs.nutrition as HTMLElement;
        let myChart = echarts.init(echartDom);
        const option = {
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
                name: 'Nightingale Chart',
                type: 'pie',
                radius: [10, 120],
                center: ['50%', '50%'],
                roseType: 'area',
                itemStyle: {
                    borderRadius: 8
                },
                data: [
                    { value: 40, name: 'rose 1' },
                    { value: 38, name: 'rose 2' },
                    { value: 32, name: 'rose 3' },
                    { value: 30, name: 'rose 4' },
                    { value: 28, name: 'rose 5' },
                    { value: 26, name: 'rose 6' },
                    { value: 22, name: 'rose 7' },
                    { value: 18, name: 'rose 8' }
                ]
                }
            ]
        };
        myChart.setOption(option);

    },

    setup(props: {}, context: SetupContext) {
        const store = useStore<StateProps>();
        const state: State = reactive({
            explainName: '营养摄入',
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
