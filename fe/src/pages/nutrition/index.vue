<template>
  <div class="global-coupon-list-wraper">
    <explain :explainName="state.explainName"></explain>
    <div v-for="(item, index) in echartsList" :key="index" class="parent-div">
      <van-button
        type="primary"
        class="add-btn"
        @click="addData($event, item)"
        >{{
          item.option.series[0].data.length
            ? `Modify ${item.option.title.text} data`
            : `Add ${item.option.title.text} data`
        }}</van-button
      >
      <van-button
        type="primary"
        class="introduce-btn"
        @click="openIntroduce($event, item.name)"
        >Introduction</van-button
      >
      <div :ref="item.name" :type="item.name" :id='item.name' class="echart"></div>
      <div class="showtables" @click="showTableData(item)">
        <!-- <van-icon name="orders-o" color="#999" /> -->
        <img src="../../static/images/orders.png" alt="" />
      </div>
    </div>
    <footer-nav></footer-nav>
    <add-data-popup
      v-if="state.showDialog"
      :isShow="state.showDialog"
      :title="state.title"
      :type="popupType"
      :placeholder="placeholder"
      :dataName="dataName"
      @onClickCloseIcon="onClickCloseIcon"
      @onSubmit="onSubmit"
    ></add-data-popup>
    <text-popup
      :is-show="textPopupIsShow"
      :title="textPopupTitle"
      :text="text"
      @onClickCloseIcon="closeText"
    ></text-popup>
    <table-popup
      :is-show="tablePopupIsShow"
      :title="tableTitle"
      :text="tableData"
      :heards="tableHeader"
      :others="others"
      :tableHeaderother ='tableHeaderother'
      @onClickCloseIcon="closeTable"
    >
    </table-popup>
  </div>
</template>

<script lang="ts">
import { ref, reactive, defineComponent, SetupContext } from 'vue'
import { getNutrition, setNutrition } from '@/api/nutrition'
import { useStore } from 'vuex'
import { StateProps } from '@/store'
import Explain from '@/components/header-explain/index.vue'
import FooterNav from '@/components/footer-nav/index.vue'
import { Popup, Dialog, Button } from 'vant'
import AddDataPopup from '../../components/data-popup/index.vue'
import TextPopup from '../../components/text-popup/index.vue'
import TablePopup from '../../components/table-date-popup/index.vue'
import * as echarts from 'echarts'

type State = {
  [x: string]: any
  explainName: string
}

export default defineComponent({
  components: {
    Explain,
    FooterNav,
    [Dialog.name]: Dialog,
    [Button.name]: Button,
    [Popup.name]: Popup,
    'add-data-popup': AddDataPopup,
    'text-popup': TextPopup,
    'table-popup':TablePopup
  },
  data() {
    return {
      dataName: [
        'cereals_and_tubers',
        'animal_food',
        'legumes_and_nuts',
        'vegetables_and_fruits',
        'pure_energy_food'
      ],
      echartsList: [
        {
          name: 'nutrition',
          option: {
            title: {
              text: 'nutrition_intake'
            },
             tooltip:{
              show:true,
             trigger: 'item',
              formatter: '{a} <br/>{b} : {c} ({d}%)'
            },
            legend: {
              top: 'bottom'
            },
            toolbox: {
              show: true,
              feature: {
                mark: { show: true },
                dataView: { show: false, readOnly: false },
                restore: { show: true },
                // magicType: { show: true, type: ['line', 'pie'] },
                saveAsImage: { show: true }
              }
            },
            series: [
              {
                name: 'Nutrition Chart',
                type: 'pie',
                radius: [5, 80],
                center: ['50%', '50%'],
                roseType: 'area',
                itemStyle: {
                  borderRadius: 8

                },
                data: []
              }
            ]
          }
        }
      ],
      popupType: '',
      breatheRateData: false,
      bloodOxygenData: false,
      placeholder: '',
      textPopupIsShow: false,
      textPopupTitle: '',
      text: '',
      tableData: [],
      tableTitle: '',
      tableHeader: [],
      tablePopupIsShow: false,
      others: [],
      tableHeaderother: []
    }
  },
  mounted() {
    this.echartsList.forEach((item, index) => {
      this.getData(item.name)
    })
  },

  setup(props: {}, context: SetupContext) {
    const state: State = reactive({
      explainName: 'Nutriture',
      title: 'Add Nutriture Data',
      showDialog: false
    })
    return {
      state
    }
  },
  methods: {
    showTableData(item: any) {
      this.tablePopupIsShow = true
      this.tableTitle = ''
      this.tableData = []
      ;(this.tableHeader = []), (this.tableHeaderother = [])
      this.$nextTick(() => {
        console.log(item.option)
        this.tableTitle = item.option.title.text
        this.tableHeader = item.option.series[0].data.map((item:any)=>{return item.name})
        this.tableData = item.option.series[0].data.map((item:any)=>{return item.value})
        //   this.tableHeader = item.option.xAxis.data
      })
    },
    closeTable() {
      this.tablePopupIsShow = false
    },
    openIntroduce(e: any, type: string) {
      this.textPopupIsShow = true
      if (type === 'nutrition') {
        this.textPopupTitle = 'Introduction of nutrition_intake'
        this.text =
          'A balanced diet can promote height and intelligence. It can provide all kinds of proteins, vitamins and other nutrients needed by the human body, ensure that the human body fully ingests the nutrients needed for growth and development, and promote the growth of height and intelligence. A balanced diet can also accelerate the digestion and absorption of food, avoid physiological disorders, reduce the damage to the stomach and intestines, and keep the body healthy.'
      }
    },
    closeText() {
      this.textPopupIsShow = false
    },
    addData(e: any, item: any) {
      if (item.name === 'nutrition') {
        this.placeholder = 'gram'
        if (item.option.series[0].data.length) {
          this.state.title = 'Modify nutrition_intake data'
        } else {
          this.state.title = 'Add nutrition_intake data'
        }
      }
      this.popupType = item.name
      this.state.showDialog = true
    },
    onClickCloseIcon() {
      this.state.showDialog = false
    },
    onSubmit(values: any, type: string) {
      const uid = window.sessionStorage.uid
      this.addEchartsData(uid, values, type)
    },
    getData(type: string) {
      const uid = window.sessionStorage.uid
      if (type === 'nutrition') {
        getNutrition(uid)
          .then(res => {
            this.handleGetData(type, res)
          })
          .catch(error => {
            Dialog.alert({
              message: error
            })
          })
      }
    },
    addEchartsData(uid: number, values: any, type: string) {
      if (type === 'nutrition') {
        setNutrition(uid, values)
          .then(res => {
            this.handleSetData(type, res)
            this.onClickCloseIcon()
          })
          .catch(error => {
            Dialog.alert({
              message: error
            })
          })
      }
    },
    handleGetData(type: string, res: any) {
     const echartDom =document.getElementById(type) as HTMLElement
      
      let myChart = echarts.init(echartDom)
      const { code, data } = res.data
      if (code === 0) {
        let seriesData: any[] = []
        for (let key in data) {
          seriesData.push({
            value: data[key],
            name: key
          })
        }
        this.echartsList.forEach((item, index) => {
          if (item.name === type) {
            item.option.series[0].data = seriesData as any
            this.breatheRateData = true
            myChart.setOption(item.option, true)
          }
        })
      }
    },
    handleSetData(type: string, res: any) {
      const { code, message } = res.data
      if (code === 0) {
        Dialog.alert({ message: 'Add Successfully!' })
        this.getData(type)
      } else if (code === 1) {
        Dialog.alert({ message: 'Modify Successfully!' })
        this.getData(type)
      } else {
        Dialog.alert({ message })
      }
    }
  }
})
</script>

<style lang="less" scoped>
.echart {
  width: 100%;
  height: 400px;
}
.title {
  text-align: center;
  font-size: 20px;
  padding: 20px;
}
.introduce-btn {
  float: right;
}
.showtables {
  position: absolute;
  right: 56px;
  top: 48px;
  & > img {
    width: 20px;
    height: 20px;
  }
}
.parent-div {
  position: relative;
}
</style>
