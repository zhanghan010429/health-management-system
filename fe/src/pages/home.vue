<template>
    <div class="global-coupon-list-wraper">
        <explain :explainName="state.explainName"></explain>
        <div class="title-wrap">
            <router-link v-for="(item, index) in state.classifyList" tag="a" :key="index" :to="{ path: item.path }"
                class="nav-tag">
                <van-nav-bar :title="item.name">
                    <template #right>
                        <van-icon name="arrow" size="18" />
                    </template>
                </van-nav-bar>
            </router-link>
        </div>

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
} from 'vue'
import { useStore } from 'vuex'
import { StateProps } from '@/store'
import { Skeleton, IndexBar, IndexAnchor, NavBar, Icon } from 'vant'
import Explain from '@/components/header-explain/index.vue'
import FooterNav from '@/components/footer-nav/index.vue'

type State = {
    [x: string]: any
    explainName: string
}

export default defineComponent({
    components: {
        Explain,
        FooterNav,
        [Skeleton.name]: Skeleton,
        [IndexBar.name]: IndexBar,
        [IndexAnchor.name]: IndexAnchor,
        [NavBar.name]: NavBar,
        [Icon.name]: Icon
    },

    setup(props: {}, context: SetupContext) {
        const store = useStore<StateProps>()
        const state: State = reactive({
            explainName: '健康管理',
            classifyList: [
                {
                    icon: '',
                    name: '呼吸',
                    path: '/breathe'
                },
                {
                    icon: '',
                    name: '运动',
                    path: '/exercise'
                },
                {
                    icon: '',
                    name: '营养摄入',
                    path: '/nutrition'
                },
                {
                    icon: '',
                    name: '心脏',
                    path: '/heart'
                },
                {
                    icon: '',
                    name: '身体测量',
                    path: '/body-measure'
                }
            ]
        })

        return {
            state
        }
    }
})
</script>

<style lang="less" scoped>
.title-wrap {
    margin: 8px;
    border-radius: 8px;
    overflow: hidden;
}
</style>
