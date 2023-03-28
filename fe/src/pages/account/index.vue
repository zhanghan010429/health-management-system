<template>
    <div class="account-warper">
        <explain :explainName="explainName" :isAccount="isAccount"></explain>
        <img src="https://search-operate.cdn.bcebos.com/b8293d29b7c194330ef6dae455e272da.jpeg" alt="" class="title-img" />

        <div class="account-check">
            <router-link tag="div" :to="{ name: 'Login' }" replace active-class="this-account-model"
                class="account-check-btn">
                <span>登录</span>
            </router-link>
            <router-link tag="div" :to="{ name: 'Regist' }" replace active-class="this-account-model"
                class="account-check-btn">
                <span>注册</span>
            </router-link>
        </div>

        <router-view></router-view>
    </div>
</template>

<script lang="ts" scoped>
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import Explain from '@/components/header-explain/index.vue'

export default defineComponent({
    components: {
        Explain
    },
    setup() {
        const router = useRouter()

        if (window.sessionStorage.uid) {
            router.replace({
                path: '/home'
            })
        }

        return {
            isAccount: true,
            explainName: '欢迎来到健康管理系统'
        }
    }
})
</script>

<style scoped lang="less" rel="stylesheet/less">
.account-check {
    display: flex;
    flex-flow: row nowrap;

    .account-check-btn {
        flex: 1;
        position: relative;
        height: 50px;
        cursor: pointer;

        span {
            display: block;
            position: absolute;
            width: 100px;
            height: 32px;
            left: 50%;
            top: 8px;
            margin-left: -50px;
            line-height: 32px;
            text-align: center;
            font-size: 15px;
            color: #b4b4b4;
        }

        &.this-account-model span {
            border-bottom: 2px solid #ffb000;
            color: #4c4c4c;
        }
    }
}

.account-warper {
    width: 100%;
    height: 100%;
}

.title-img {
    width: 80%;
    display: flex;
    margin: 20px auto;
}
</style>
