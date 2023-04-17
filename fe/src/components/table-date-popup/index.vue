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

    <table class="tables" style="">
      <th v-for="(item, index) in heards" :key="index" style="word-break: break-all;">{{ item }}</th>
      <tr>
        <td align="center" v-for="(item, index) in text" :key="index">
          {{ item }}
        </td>
      </tr>
    </table>
    <table class="tables">
      <th></th>
      <th v-for="(item, index) in tableHeaderother" :key="index">{{ item }}</th>
      <tr v-for="(items, index) in others" :key="index">
        <td>{{ items.name }}</td>
        <td align="center" v-for="(iitem, idx) in items.data" :key="idx">
          {{ iitem }}
        </td>
      </tr>
    </table>
  </van-popup>
</template>

<script lang="ts">
import { ref, reactive, defineComponent, SetupContext } from 'vue'
import { Popup, Dialog, Button } from 'vant'

export default defineComponent({
  components: {
    [Dialog.name]: Dialog,
    [Button.name]: Button,
    [Popup.name]: Popup
  },
  props: {
    title: {
      type: String
    },
    isShow: {
      type: Boolean,
      required: true
    },
    text: {
      type: Array
    },
    heards: {
      type: Array,
      default: []
    },
    others: {
      type: Array,
      default: []
    },
    tableHeaderother: {
      type: Array,
      default: []
    }
  },
  data() {
    return {}
  },
  mounted() {},

  setup(props: {}, context: SetupContext) {
    return {}
  },
  methods: {
    onClickCloseIcon() {
      this.$emit('onClickCloseIcon')
    }
  }
})
</script>

<style lang="less" scoped>
.title {
  text-align: center;
  font-size: 20px;
  padding: 20px;
}
.introduction-text {
  padding: 20px;
  width: 100%;
  box-sizing: border-box;
  padding-top: 0;
  line-height: 26px;
}
.tables {
  width: 100%;
}
</style>
