<template>
    <div>
        <explain :explainName="state.explainName"></explain>

        <div class="find-pwd-process">
            <img src="./images/flow1.png" width="100%" height="100%" alt="The first step of retrieving the password." />
        </div>
        <div class="account-container">
            <form class="account-container-form" v-on:submit.prevent="next">
                <p>
                    <span class="phone-ico"></span>
                    <input type="tel" placeholder="Please enter your mobile phone number." maxlength="11" class="phone" v-model="state.phone" v-focus
                        v-blur />
                </p>
                <p>
                    <span class="code-ico"></span>
                    <input type="text" placeholder="Please enter the verification code." maxlength="6" class="code" v-model="state.code" v-focus
                        v-blur />
                    <count-down :phone="state.phone"></count-down>
                </p>
                <p>
                    <input type="submit" value="Next Step" class="account-btn" />
                </p>
            </form>
        </div>
    </div>
</template>

<script lang="ts" scoped>
import { defineComponent, reactive } from 'vue'
import { useRouter } from 'vue-router'

import { Dialog } from 'vant'
import Explain from '@/components/header-explain/index.vue'
import CountDown from '@/components//count-down/index.vue'

import { focus, blur } from '@/mixins/directive'

import { validatePhone } from '@/utils/index'

export default defineComponent({
    components: {
        Explain,
        CountDown
    },
    directives: {
        focus,
        blur
    },
    setup(props: {}, context: {}) {
        const router = useRouter()

        const state = reactive({
            explainName: 'The first step of retrieving the password.',
            phone: '',
            code: ''
        })

        function next() {
            if (!validatePhone(state.phone)) {
                return Dialog.alert({
                    message: 'The format of mobile phone number is incorrect.Please enter it again!'
                })
            }

            router.replace({
                path: '/account/reset-password',
                query: {
                    phone: state.phone
                }
            })
        }

        return {
            state,
            next
        }
    }
})
</script>

<style lang="less" scoped>
@import './health-app-account.less';

.find-pwd-process {
    width: 100%;
    height: 35px;
    margin: 15px auto;
}

@media only screen and (min-width: 768px) {
    .find-pwd-process {
        height: 60px;
    }
}
</style>
