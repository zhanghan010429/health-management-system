<template>
    <div class="account-container">
        <div class="account-container-form">
            <p>
                <span class="phone-ico"></span>
                <input type="tel" placeholder="Please input your phone number." maxlength="11" class="phone" v-model="state.phone" v-focus v-blur />
            </p>
            <p>
                <input type="text" placeholder="Please input your name." class="phone" v-model="state.name" v-focus v-blur />
            </p>
            <p>
                <input type="text" placeholder="Please input your age." class="phone" v-model="state.age" v-focus v-blur />
            </p>
            <p>
                <van-field v-model="fieldValue" is-link readonly label="Gender" placeholder="Please select your gender." @click="showPicker = true" />
                <van-popup v-model:show="showPicker" round position="bottom">
                    <van-picker :columns="columns" @cancel="showPicker = false" @confirm="onConfirm" />
                </van-popup>
            </p>
            <p>
                <span class="pwd-ico"></span>
                <input type="password" placeholder="Please enter a password of at least 6 digits." class="pwd" v-model="state.pwd" v-focus v-blur />
            </p>
            <p>
                <span class="pwd-ico"></span>
                <input type="password" placeholder="Confirm your password." class="pwd" v-model="state.confirmPwd" v-focus v-blur />
            </p>
            <p>
                <input 
                    type="submit" 
                    value="Register" 
                    class="account-btn" 
                    @click="submitRegist"
                />
            </p>
        </div>
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
            { text: 'male', value: '1' },
            { text: 'female', value: '0clear' }
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
                    message: 'Mobile phone number needs to be 11 digits. Please enter it again!'
                })
            }

            if (!validatePassword(state.pwd)) {
                return Dialog.alert({
                    message: 'Password needs at least 6 digits. Please enter it again!'
                })
            }

            if (state.pwd !== state.confirmPwd) {
                return Dialog.alert({
                    message: 'The two entered passwords are inconsistent. Please enter it again!'
                })
            }

            regist(state.phone, state.pwd, state.gender, state.name, state.age)
                .then(res => {
                    const { code, message } = res.data
                    if (code === 0) {
                        Dialog.alert({ message: 'Register successfully. Go to login ~' })
                        setTimeout(() => {
                            router.replace({
                                path: '/account/login'
                            })
                        }, 1000);
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
