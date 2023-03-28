<template>
    <!-- 个人中心组件 -->
    <div class="personal-wraper">
        <explain :explainName="state.explainName"></explain>

        <!-- 个人信息 -->
        <div class="personal-msg-wraper">
            <div class="head">
                <img :src="state.userInfo.headpic" width="80" height="80" alt="头像" />
            </div>
            <div class="phone">
                <img src="./images/phone.png" width="30" height="30" class="phone-ico" alt="手机" />
                <span class="phone-num">{{ state.userInfo.phone }}</span>
            </div>
            <router-link tag="a" :to="{ path: '/personal-edit' }" class="setting"></router-link>
        </div>

        <footer-nav :navName="state.navName"></footer-nav>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'

import Explain from '@/components/header-explain/index.vue'
import FooterNav from '@/components/footer-nav/index.vue'

import { getUserInfo } from '@/api/personal'
import router from '@/router'
import { Dialog } from 'vant'

interface UserInfo {
    phone: string
    headpic: string
}

interface State {
    explainName: string
    navName: string
    userInfo: UserInfo
}

export default defineComponent({
    components: {
        Explain,
        FooterNav
    },
    setup(props: {}, context: {}) {
        const state: State = reactive<State>({
            explainName: '个人中心',
            navName: 'personal',
            userInfo: { phone: '', headpic: 'https://search-operate.cdn.bcebos.com/df98ac65f7f787e498d593ecfc1d75e1.jpeg' }
        })

        const uid: number = window.sessionStorage.uid
        if (uid) {
            _getUserInfo(uid)
        } else {
            router.push({ path: '/account/login' })
        }

        function _getUserInfo(id: number) {
            try {
                getUserInfo(id)
                    .then(res => {
                        console.log(res.data)
                        const { code, data, message } = res.data
                        if (code === 0) {
                            const { headpic, phone, name, gender, age } = data
                            state.userInfo.phone = phone
                        } else {
                            Dialog.alert({ message })
                        }
                    })
                    .catch(error => {
                        Dialog.alert({
                            message: error
                        })
                    })
            } catch (e) {
                router.push({ name: 'Login' })
            }
        }
        return {
            state
        }
    }
})
</script>

<style scoped lang="less" rel="stylesheet/less">
@import './health-app-personal.less';



</style>
