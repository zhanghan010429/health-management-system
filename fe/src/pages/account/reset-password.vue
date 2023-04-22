<template>
    <!-- Reset password -->
    <div class="forgetpwd-wraper">
        <explain :explainName="state.explainName"></explain>

        <!-- <div class="find-pwd-process">            
            <img src="./images/flow2.png" width="100%" height="100%" alt="The second step of retrieving the password" />
        </div> -->
        <div class="account-container">
            <form class="account-container-form" v-on:submit="complete">
                <p>
                    <span class="pwd-ico"></span>
                    <input type="password" placeholder="Please enter new password." class="pwd" v-model.lazy.trim="state.pwd" v-focus v-blur />
                </p>
                <p>
                    <span class="pwd-ico"></span>
                    <input type="password" placeholder="Please confirm the password." class="pwd" v-model.lazy.trim="state.confirmPwd" v-focus
                        v-blur />
                </p>
                <p>
                    <input type="submit" value="Finish" class="account-btn" />
                </p>
            </form>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import Explain from '@/components/header-explain/index.vue'

import { focus, blur } from '@/mixins/directive'
import { validatePhone, validatePassword } from '@/utils/index'
import { resetPassword } from '@/api/auth'
import { Dialog } from 'vant'

export default defineComponent({
    components: {
        Explain
    },
    directives: {
        focus,
        blur
    },
    setup(props: {}, context: {}) {
        const router = useRouter()
        const route = useRoute()
        const state = reactive({
            explainName: 'The second step of retrieving the password',
            phone: '',
            pwd: '',
            confirmPwd: ''
        })

        state.phone = route.query.phone as string
        if (!validatePhone(state.phone)) {
            router.back()
        }

        function complete() {
            if (!validatePassword(state.pwd)) {
                return Dialog.alert({
                    message: 'Please enter a password of at least 6 digits.'
                })
            }

            if (state.pwd !== state.confirmPwd) {
                return Dialog.alert({
                    message: 'The two entered passwords are inconsistent. Please enter it again!'
                })
            }

            resetPassword(state.phone, state.pwd)
                .then(res => {
                    const { code, data, message } = res.data
                    if (code === 0) {
                        Dialog.alert({
                            message: 'Password changed successfully.'
                        })
                        router.replace({ name: 'Login' })
                    } else {
                        Dialog.alert({
                            message
                        })
                    }
                })
                .catch(error => {
                    return Dialog.alert({
                        message: error
                    })
                })
        }

        return {
            state,
            complete
        }
    }
})
</script>

<style scoped lang="less" rel="stylesheet/less">
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
