<template>
    <!-- count down wraper -->
    <div class="count-down-wraper">
        <input type="button" v-if="!state.disable" v-model="state.btnName" class="get-code get-code-off" @click="getCode" />
        <input type="button" v-if="state.disable" v-model="state.btnName" class="get-code get-code-on" disabled />
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { validatePhone } from '@/utils/index'
import { getPhoneCode } from '@/api/auth'
import { Dialog } from 'vant'

interface Props {
    phone: string
}

export default defineComponent({
    props: {
        phone: {
            type: String,
            required: true
        }
    },
    setup(props: Props, context: {}) {
        const state = reactive({
            btnName: '获取验证码',
            disable: false
        })

        function getCode() {
            if (!validatePhone(props.phone)) {
                return Dialog.alert({
                    message: 'The format of mobile phone number is incorrect.Please enter it again!'
                })
            }

            state.disable = true

            let num: number = 60
            const timer: number = setInterval(() => {
                num -= 1
                state.btnName = 'Try again in'+ num + 'seconds'
                if (num < 1) {
                    state.disable = false
                    state.btnName = 'Get Vertification Code'
                    clearInterval(timer)
                }
            }, 1000)

            getPhoneCode(props.phone)
                .then(res => {
                    const { code, data, message } = res.data
                    Dialog.alert({
                        message: code === 0 ? `SMS verification code：${data}` : message
                    })
                })
                .catch(error => {
                    Dialog.alert({
                        message: 'Failed to obtain the SMS verification code. Please try again!'
                    })
                })
        }

        return {
            state,
            getCode
        }
    }
})
</script>

<style scoped lang="less">
.get-code {
    position: absolute;
    right: 10px;
    top: 8px;
    width: 90px;
    height: 30px;
    background-color: #fff;
    font-size: 13px;
}

.get-code-on {
    color: #b4b4b4;
}

.get-code-off {
    color: #2577e3;
}
</style>
