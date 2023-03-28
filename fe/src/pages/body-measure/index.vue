<template>
    <div class="global-coupon-list-wraper">
        <explain :explainName="state.explainName"></explain>
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

type State = {
    [x: string]: any
    explainName: string
}

export default defineComponent({
    components: {
        Explain,
        FooterNav
    },

    setup(props: {}, context: SetupContext) {
        const store = useStore<StateProps>();
        const state: State = reactive({
            explainName: '身体测量',
        });
        return {
            state
        };
    }
});
</script>

<style lang="less" scoped>

</style>
