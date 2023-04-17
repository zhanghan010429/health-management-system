<template>
    <van-popup
        :show="isShow"
        closeable
        close-icon="close"
        position="bottom"
        @click-close-icon="onClickCloseIcon"
        :style="{ height: '80%' }"
    >
        <div class="title">{{ title }}</div>
        <p class="introduction-text">{{ text }}</p>
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
        text: {
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
        return {
            
        };
    },
    methods: {
        onClickCloseIcon() {
            this.$emit('onClickCloseIcon');
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
.introduction-text{
    padding: 20px;
    width: 100%;
    box-sizing: border-box;
    padding-top: 0;
    line-height: 26px;
}
</style>
