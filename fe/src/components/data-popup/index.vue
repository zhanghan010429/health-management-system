<template>
    <van-popup
        :show="isShow"
        closeable
        close-icon="close"
        position="bottom"
        @click-close-icon="onClickCloseIcon"
        :style="{ height: '60%' }"
    >
        <div class="title">{{ title }}</div>
        <van-form @submit="onSubmit">
            <van-cell-group inset>
                <template v-for="(item, index) in dataName">
                    <van-field
                        v-model="form[item]"
                        :name="item"
                        :label="item"
                        :placeholder="placeholder"
                    />
                </template>
            </van-cell-group>
            <div style="margin: 16px;">
                <van-button round block type="primary" native-type="submit">
                    submit
                </van-button>
            </div>
        </van-form>
    </van-popup>
</template>

<script lang="ts">
import {
    ref,
    reactive,
    defineComponent,
    SetupContext
} from 'vue';
import { Popup, Dialog,Button } from 'vant'

type State = {
    [x: string]: any
}

export default defineComponent({
    components: {
        [Dialog.name]: Dialog,
        [Button.name]:Button,
        [Popup.name]: Popup
    },
    props: {
        title: {
            type: String,
            required: true
        },
        isShow: {
            type: Boolean,
            required: true
        },
        type: {
            type: String,
            required: true
        },
        placeholder: {
            type: String,
            required: true
        },
        dataName: {
            type: Array,
            default: ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun']
        },
        name: {
            type: String,
            required: true
        }
    },
    data() {
        return {
        }
    },
    mounted() {},

    setup(props: {}, context: SetupContext) {
        const form = ref({
            Mon: '',
            Tue: '',
            Wed: '',
            Thur: '',
            Fri: '',
            Sat: '',
            Sun: ''
        });
       
        const state: State = reactive({
            showDialog: false
        });
        return {
            state,
            form
        };
    },
    methods: {
        onClickCloseIcon() {
            this.$emit('onClickCloseIcon');
        },
        onSubmit(values: any) {
            this.$emit('onSubmit', values, this.type, this.name);
        }
    }
});
</script>

<style lang="less" scoped>
.title {
    text-align: center;
    font-size: 20px;
    padding: 20px;

}
</style>
