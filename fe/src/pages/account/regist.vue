<template>
    <div class="account-container">
        <form v-on:submit="submitRegist" class="account-container-form">
            <p>
                <span class="phone-ico"></span>
                <input type="tel" placeholder="请输入手机号" maxlength="11" class="phone" v-model="state.phone" v-focus v-blur />
            </p>
            <p>
                <input type="text" placeholder="请输入姓名" class="phone" v-model="state.name" v-focus v-blur />
            </p>
            <p>
                <input type="text" placeholder="请输入年龄" class="phone" v-model="state.age" v-focus v-blur />
            </p>
            <p>
                <van-field v-model="fieldValue" is-link readonly label="性别" placeholder="选择性别" @click="showPicker = true" />
                <van-popup v-model:show="showPicker" round position="bottom">
                    <van-picker :columns="columns" @cancel="showPicker = false" @confirm="onConfirm" />
                </van-popup>
            </p>
            <p>
                <span class="pwd-ico"></span>
                <input type="password" placeholder="请输入至少6位数的密码" class="pwd" v-model="state.pwd" v-focus v-blur />
            </p>
            <p>
                <span class="pwd-ico"></span>
                <input type="password" placeholder="确认密码" class="pwd" v-model="state.confirmPwd" v-focus v-blur />
            </p>
            <p>
                <input type="submit" value="注	册" class="account-btn" />
            </p>
        </form>
    </div>
</template>

<script lang="ts" scoped>
import { defineComponent, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { focus, blur } from '@/mixins/directive'

import { regist } from '@/api/auth'
import { validatePhone, validatePassword } from '@/utils/index'
import { Dialog, Picker, Popup, Field } from 'vant'

export default defineComponent({
    components: {
        [Picker.name]: Picker,
        [Popup.name]: Popup,
        [Field.name]: Field
    },
    directives: {
        focus,
        blur
    },
    setup(props: {}, context: {}) {
        const router = useRouter()

        const state = reactive({
            phone: '',
            name: '',
            age: '',
            gender: '',
            pwd: '',
            confirmPwd: ''
        })
        const columns = [
            { text: '男', value: '0' },
            { text: '女', value: '1' }
        ];
        let showPicker = ref(false);
        const fieldValue = ref('');

        const onConfirm = (selectedOptions: any) => {
            showPicker.value = false;
            fieldValue.value = selectedOptions.text;
            state.gender = selectedOptions.value;

        };
        function submitRegist() {
            if (!validatePhone(state.phone)) {
                return Dialog.alert({
                    message: '手机号码格式不正确，请重新输入！'
                })
            }

            if (!validatePassword(state.pwd)) {
                return Dialog.alert({
                    message: '密码需要至少6位数，请重新输入！'
                })
            }

            if (state.pwd !== state.confirmPwd) {
                return Dialog.alert({
                    message: '两次输入的密码不一致，请重新输入！'
                })
            }

            regist(state.phone, state.pwd, state.gender, state.name, state.age)
                .then(res => {
                    const { code, message } = res.data
                    if (code === 0) {
                        router.replace({
                            path: '/account/login'
                        })
                        Dialog.alert({ message: '注册成功' })
                    } else {
                        Dialog.alert({ message })
                    }
                })
                .catch(error => {
                    Dialog.alert({
                        message: error
                    })
                })
        }
        return {
            state,
            columns,
            fieldValue,
            onConfirm,
            submitRegist,
            showPicker
        }
    }
})
</script>

<style scoped lang="less" rel="stylesheet/less">
@import './health-app-account.less';
</style>
