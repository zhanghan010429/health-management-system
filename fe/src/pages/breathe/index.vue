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
        >Intoduction</van-button
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
      @onClickCloseIcon="closeTable"
    >
    </table-popup>
  </div>
</template>

<script lang="ts">
import { ref, reactive, defineComponent, SetupContext } from 'vue'
import {
  setBreatheData,
  getBreatheData,
  setBloodOxygenData,
  getBloodOxygenData,
  setVitalApacityData,
  getVitalApacityData
} from '@/api/breathe'
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
    'table-popup': TablePopup
  },
  data() {
    return {
      echartsList: [
        {
          name: 'breatheRate',
          option: {
            title: {
              text: 'respiratory_rate'
            },
             tooltip:{
              show:true,
              trigger:'item'
            },
            toolbox: {
              show: true,

              feature: {
                dataView: {
                  show: false,
                  readOnly: false,
                  optionToContent: function (opt: any) {
                    var axisData = opt.xAxis[0].data
                    var series = opt.series
                    var table =
                      '<table style="width:100%;text-align:center;height:400px"><tbody><tr>' +
                      '<td>time</td>' +
                      '<td>average times per minute</td>' +
                      '</tr>'
                    for (var i = 0, l = axisData.length; i < l; i++) {
                      table +=
                        '<tr>' +
                        '<td>' +
                        axisData[i] +
                        '</td>' +
                        '<td>' +
                        series[0].data[i] +
                        '</td>' +
                        '</tr>'
                    }
                    table += '</tbody></table>'
                    return table
                  }
                },

                magicType: { show: true, type: ['line', 'bar'] },
                restore: { show: true },
                saveAsImage: { show: true }
              }
            },
            xAxis: {
              type: 'category',
              data: []
            },
            yAxis: {
              type: 'value'
            },
            series: [
              {
                data: [],
                type: 'bar',
                name: 'respiratory_rate',
                showBackground: true,
                backgroundStyle: {
                  color: 'rgba(180, 180, 180, 0.2)'
                }
              }
            ]
          }
        },
        {
          name: 'bloodOxygen',
          option: {
             tooltip:{
              show:true,
              trigger:'item'
            },
            toolbox: {
              show: true,
              feature: {
                dataView: {
                  show: false,
                  readOnly: false,
                  optionToContent: function (opt: any) {
                    var axisData = opt.xAxis[0].data
                    var series = opt.series
                    var table =
                      '<table style="width:100%;text-align:center;height:400px"><tbody><tr>' +
                      '<td>time</td>' +
                      '<td>average times per minute</td>' +
                      '</tr>'
                    for (var i = 0, l = axisData.length; i < l; i++) {
                      table +=
                        '<tr>' +
                        '<td>' +
                        axisData[i] +
                        '</td>' +
                        '<td>' +
                        series[0].data[i] +
                        '</td>' +
                        '</tr>'
                    }
                    table += '</tbody></table>'
                    return table
                  }
                },
                magicType: { show: true, type: ['line', 'bar'] },
                restore: { show: true },
                saveAsImage: { show: true }
              }
            },
            title: {
              text: 'blood_oxygen'
            },
            xAxis: {
              type: 'category',
              data: []
            },
            yAxis: {
              type: 'value'
            },
            series: [
              {
                data: [],
                type: 'bar',
                showBackground: true,
                name:"blood_oxygen",
                backgroundStyle: {
                  color: 'rgba(180, 180, 180, 0.2)'
                }
              }
            ]
          }
        },
        {
          name: 'vitalCapacity',
          option: {
            title: {
              text: 'vital_capacity'
            },
             tooltip:{
              show:true,
              trigger:'item'
            },
            toolbox: {
              show: true,
              feature: {
                dataView: { show: false, readOnly: false },
                magicType: { show: true, type: ['line', 'bar'] },
                restore: { show: true },
                saveAsImage: { show: true }
              }
            },
            xAxis: {
              type: 'category',
              data: []
            },
            yAxis: {
              type: 'value'
            },
            series: [
              {
                data: [],
                type: 'bar',
                showBackground: true,
                name:"vital_capacity",
                backgroundStyle: {
                  color: 'rgba(180, 180, 180, 0.2)'
                }
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
      tablePopupIsShow: false
    }
  },
  mounted() {
    this.echartsList.forEach((item, index) => {
      this.getData(item.name)
    })
  },

  setup(props: {}, context: SetupContext) {
    const state: State = reactive({
      explainName: 'Breath State',
      title: 'Add respiratory_rate data',
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
      this.tableHeader = []
      this.$nextTick(() => {
        if (item.name == 'breatheRate') {
          console.log(item.option)
          this.tableTitle = item.option.title.text
          this.tableData = item.option.series[0].data
          this.tableHeader = item.option.xAxis.data
        } else if (item.name == 'bloodOxygen') {
          this.tableTitle = item.option.title.text
          this.tableData = item.option.series[0].data
          this.tableHeader = item.option.xAxis.data
        } else if (item.name == 'vitalCapacity') {
          this.tableTitle = item.option.title.text
          this.tableData = item.option.series[0].data
          this.tableHeader = item.option.xAxis.data
        }
      })
    },
    closeTable() {
      this.tablePopupIsShow = false
    },
    openIntroduce(e: any, type: string) {
      this.textPopupIsShow = true
      if (type === 'breatheRate') {
        this.textPopupTitle = 'Introduction of respiratory_rate'
        this.text =
          'Respiratory rate is the medical term for the number of breaths per minute. A rise and fall in the chest is a breath. The number of breaths per minute is called respiratory rate. Breathing is an essential process of gas exchange between the internal and external environment of the human body. Through breathing, the human body absorbs oxygen and exhales carbon dioxide, so as to maintain normal physiological functions.'
      } else if (type === 'bloodOxygen') {
        this.textPopupTitle = 'Introduction of blood_oxygen'
        this.text =
          'Blood oxygen refers to the oxygen in the blood. The normal blood oxygen saturation of the human body is above 95%. The higher the oxygen level in the blood, the better metabolism of a person is. Of course, high blood oxygen content is not a good phenomenon, the blood oxygen in the body is a certain degree of saturation, too low will cause insufficient oxygen supply, too high will lead to the aging of cells in the body.'
      } else if (type === 'vitalCapacity') {
        this.textPopupTitle = 'Introduction of vital_capacity'
        this.text =
          'Vital capacity is the amount of air necessary to exhale after maximum inhalation. It includes tidal volume, supplementary inspiratory volume and supplementary expiratory volume. Tidal volume refers to the amount of air inhaled or exhaled by the lung in a breathing cycle. The maximum amount of air re-inhaled beyond the tidal volume is the amount of supplementary inspiration, the maximum amount of air re-exhaled beyond the tidal volume is the amount of supplementary expiratory breath, and the amount remaining in the lung after the maximum expiratory breath is the residual amount. There are large individual differences. It is affected by age, sex, body size, respiratory muscle strength, lung and chest elasticity and other factors. Generally speaking, the stronger the body, the bigger it is. Studies have shown a strong correlation with maximum oxygen uptake. It is often used as an indicator to evaluate the quality of human body.'
      }
    },
    closeText() {
      this.textPopupIsShow = false
    },
    addData(e: any, item: any) {
      if (item.name === 'breatheRate') {
        this.placeholder = 'average times per minute'
        if (item.option.series[0].data.length) {
          this.state.title = 'Modify respiratory_rate Data'
        } else {
          this.state.title = 'Add respiratory_rate Data'
        }
      } else if (item.name === 'bloodOxygen') {
        this.placeholder = 'percent（%）'
        if (item.option.series[0].data.length) {
          this.state.title = 'Modify blood_oxygen data'
        } else {
          this.state.title = 'Add blood_oxygen data'
        }
      } else if (item.name === 'vitalCapacity') {
        this.placeholder = 'milliliter（ml）'
        if (item.option.series[0].data.length) {
          this.state.title = 'Modify vital_capacity data'
        } else {
          this.state.title = 'Add vital_capacity data'
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
      if (type === 'breatheRate') {
        getBreatheData(uid)
          .then(res => {
            console.log(res, '======')
            this.handleGetData(type, res)
          })
          .catch(error => {
            Dialog.alert({
              message: error
            })
          })
      } else if (type === 'bloodOxygen') {
        getBloodOxygenData(uid)
          .then(res => {
            this.handleGetData(type, res)
          })
          .catch(error => {
            Dialog.alert({
              message: error
            })
          })
      } else if (type === 'vitalCapacity') {
        getVitalApacityData(uid)
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
      if (type === 'breatheRate') {
        setBreatheData(uid, values)
          .then(res => {
            this.handleSetData(type, res)
            this.onClickCloseIcon()
          })
          .catch(error => {
            Dialog.alert({
              message: error
            })
          })
      } else if (type === 'bloodOxygen') {
        setBloodOxygenData(uid, values)
          .then(res => {
            this.handleSetData(type, res)
            this.onClickCloseIcon()
          })
          .catch(error => {
            Dialog.alert({
              message: error
            })
          })
      } else if (type === 'vitalCapacity') {
        setVitalApacityData(uid, values)
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
      console.log(type)
      const echartDom =document.getElementById(type) as HTMLElement
      let myChart = echarts.init(echartDom)
      const { code, data } = res.data
      if (code === 0) {
        let xAxisData: string[] = []
        let seriesData: any[] = []
        for (let key in data) {
          xAxisData.push(key)
          seriesData.push(data[key])
        }
        this.echartsList.forEach((item, index) => {
          if (item.name === type) {
            item.option.xAxis.data = xAxisData as any
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
        Dialog.alert({ message: 'Add successfully!' })
        this.getData(type)
      } else if (code === 1) {
        Dialog.alert({ message: 'Modify successfully!' })
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
  margin-top: 10px;
}
.global-coupon-list-wraper {
  // padding: 20px;
  box-sizing: border-box;
  // padding-top: 0;
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
  right: 120px;
  top: 60px;
  & > img {
    width: 20px;
    height: 20px;
  }
}
.parent-div {
  position: relative;
}
</style>
