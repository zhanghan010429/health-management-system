<template>
  <div class="global-coupon-list-wraper">
    <explain :explainName="state.explainName"></explain>
    <div v-for="(item, index) in echartsList" :key="index">
      <div v-for="(series, index) in item.option.series">
        <van-button
          type="primary"
          class="add-btn"
          @click="addData($event, series, item)"
        >
          {{
            series.data.length
              ? `Modify ${series.name} data`
              : `Add ${series.name} data`
          }}
        </van-button>
        <van-button
          type="primary"
          class="introduce-btn"
          @click="openIntroduce($event, series.name)"
          >Introduction</van-button
        >
      </div>
      <div :ref="item.name" :type="item.name" :id="item.name" class="echart"></div>
      <div
        class="showtables"
        @click="showTableData(item)"
        :class="{ second: index == 1 }"
      >
        <img src="../../static/images/orders.png" alt="" />
      </div>
    </div>
    <footer-nav></footer-nav>

    <add-data-popup
      v-if="state.showDialog"
      :isShow="state.showDialog"
      :title="state.title"
      :type="popupType"
      :name="name"
      :dataName="dataName"
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
      :others="others"
      :tableHeaderother="tableHeaderother"
      @onClickCloseIcon="closeTable"
    >
    </table-popup>
  </div>
</template>

<script lang="ts">
import { ref, reactive, defineComponent, SetupContext } from 'vue'
import {
  setBody,
  getBody,
  getTemperature,
  setTemperature
} from '@/api/bodyMeasure'
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
          name: 'body',
          dataName: [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sept',
            'Oct',
            'Nov',
            'Dece'
          ],
          option: {
            title: {
              text: 'body_basic_data',
              x:'10px',
              y:'0px',
            },
            tooltip: {
              trigger: 'axis'
            },
            legend: {
              data: ['height', 'weight', 'bmi', 'body_fat_rate'],
              x:'10px',
              y:'25px',
            },
            grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
            },
            toolbox: {
              show: true,
              feature: {
                magicType: { show: true, type: ['line', 'bar'] },
                restore: { show: true },
                saveAsImage: { show: true }
              },
              orient: 'vertical'
              
            },
            xAxis: {
              type: 'category',
              data: [
                'Jan',
                'Feb',
                'Mar',
                'Apr',
                'May',
                'Jun',
                'Jul',
                'Aug',
                'Sept',
                'Oct',
                'Nov',
                'Dece'
              ]
            },
            yAxis: {
              type: 'value'
            },
            series: [
              {
                name: 'height',
                type: 'line',
                data: []
              },
              {
                name: 'weight',
                type: 'line',
                data: []
              },
              {
                name: 'bmi',
                type: 'line',
                data: []
              },
              {
                name: 'body_fat_rate',
                type: 'line',
                data: []
              }
            ]
          }
        },
        {
          name: 'body_temperature',
          dataName: ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'],
          option: {
            title: {
              text: 'body_temperature',
              top: '-2px'
            },
            tooltip: {
              trigger: 'axis'
            },
            legend: {
              top: '22px'
            },
            grid: {
              left: '16%',
              right: '10%',
              bottom: '3%'
            },
            toolbox: {
              top: '100px',
              show: true,
              feature: {
                dataView: { show: false, readOnly: false },
                magicType: { type: ['line', 'bar'] },
                restore: { show: true },
                saveAsImage: {}
              },
              orient: 'vertical'
            },
            xAxis: {
              type: 'category',
              boundaryGap: false,
              data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
              type: 'value',
              min:function(value){
                return value.min
              },
             
              axisLabel: {
                formatter: '{value} °C'
              },
            },
            series: [
              {
                name: 'body_temperature_highest',
                type: 'line',
                data: [],
                markPoint: {
                  data: [
                    { type: 'max', name: 'Max' },
                    { type: 'min', name: 'Min' },
                  ]
                },
                markLine: {
                  data: [{ type: 'average', name: 'Avg' }]
                }
              },
              {
                name: 'body_temperature_lowest',
                type: 'line',
                data: [],
                markPoint: {
                  data: [{ name: 'lowest point', value: 36, xAxis: 1, yAxis: -1.5 }]
                },
                markLine: {
                  data: [
                    { type: 'average', name: 'Avg' },
                    [
                      {
                        symbol: 'none',
                        x: '90%',
                        yAxis: 'max'
                      },
                      {
                        symbol: 'circle',
                        label: {
                          position: 'start',
                          formatter: 'Max'
                        },
                        type: 'max',
                        name: 'highest points'
                      }
                    ]
                  ]
                }
              }
            ]
          }
        }
      ],
      popupType: '',
      name: '',
      breatheRateData: false,
      bloodOxygenData: false,
      placeholder: '',
      textPopupIsShow: false,
      textPopupTitle: '',
      text: '',
      dataName: [],
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
      item.option.series.forEach((ele, i) => {
        this.getData(ele.name, item.name)
      })
    })
  },

  setup(props: {}, context: SetupContext) {
    const state: State = reactive({
      explainName: 'Body Data',
      title: 'Add Body Data',
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
      this.tableHeaderother = []
      this.$nextTick(() => {
        console.log(item.option)
        this.tableTitle = 'Body Data'
        this.others = item.option.series
        // this.tableHeaderother = item.option.xAxis[0].data
        // this.others = item.option.series
        this.tableHeaderother = item.option.xAxis.data
      })
    },
    closeTable() {
      this.tablePopupIsShow = false
    },
    openIntroduce(e: any, type: string) {
      this.textPopupIsShow = true
      if (type === 'height') {
        this.textPopupTitle = 'Introduction of height'
        this.text =
          'Height is the vertical distance from the apex to the ground. Generally "centimeter" (cm) as the unit, also more often used "meter" (m). Height is the length of the longitudinal part of the human body. It comes from the longitudinal growth of the human body and is greatly influenced by genetic factors.Many factors affect height, such as genetics, nutrition, sports, environment, lifestyle, ethnicity, endocrinology, early sexual maturity (menarche at 18 is on average 5cm longer than at 11), distant inbreeding, medical advances, and so on.'
      } else if (type === 'weight') {
        this.textPopupTitle = 'Introduction of weight'
        this.text =
          'Body weight measured naked or wearing a known weight of work clothes. In addition to bone growth, body weight increase is closely related to the growth of muscle, fat and so on. Weight gain trend: During puberty, muscle development is more prominent. When the height increases rapidly, the muscle mainly increases in length and obviously increases. When height growth slows down, muscle increases significantly, mainly by thickening muscle fibers, and weight increases accordingly.'
      } else if (type === 'bmi') {
        this.textPopupTitle = 'Introduction of bmi'
        this.text =
          'Body Mass Index (BMI) (Body Mass Index ) is a commonly used international standard to measure the degree of obesity and fitness of human body. The formula is bmi= weight ÷ height * height.'
      } else if (type === 'body_fat_rate') {
        this.textPopupTitle = 'Introduction of body_fat_rate'
        this.text =
          'Body fat rate refers to the proportion of body fat weight in the total body weight, also known as body fat percentage, which reflects the amount of fat content in the body. Obesity increases the risk of various diseases. For example, hypertension, diabetes, hyperlipidemia and so on. And women trying to get pregnant should not ignore the risk of pregnancy complications and obstructed labor caused by obesity.'
      } else if (type === 'body_temperature_highest') {
        this.textPopupTitle = 'Introduction of body_temperature_highest'
        this.text =
          'The average normal body temperature is between 36 ~ 37℃ (armpit), above 37.3℃ is fever, 37.3 ~ 38℃ is low fever, 38.1 ~ 40℃ is high fever. Life is in danger at any time above 40℃. '
      } else if (type === 'body_temperature_lowest') {
        this.textPopupTitle = 'Introduction of body_temperature_lowest'
        this.text =
          'The average normal body temperature is between 36 ~ 37℃ (armpit), above 37.3℃ is fever, 37.3 ~ 38℃ is low fever, 38.1 ~ 40℃ is high fever. Life is in danger at any time above 40℃. '
      }
    },
    closeText() {
      this.textPopupIsShow = false
    },
    addData(e: any, series: any, item: any) {
      this.placeholder = ''
      if (series.data.length) {
        this.state.title = `Modify ${series.name} data`
      } else {
        this.state.title = `Add ${series.name} data`
      }

      this.popupType = series.name
      this.name = item.name
      this.dataName = item.dataName
      this.state.showDialog = true
    },
    onClickCloseIcon() {
      this.state.showDialog = false
    },
    onSubmit(values: any, type: string, name: string) {
      const uid = window.sessionStorage.uid
      this.addEchartsData(uid, values, type, name)
    },
    getData(type: string, name: string) {
      const uid = window.sessionStorage.uid
      if (name === 'body') {
        getBody(uid, type)
          .then(res => {
            this.handleGetData(type, res, name)
            this.onClickCloseIcon()
          })
          .catch(error => {
            Dialog.alert({
              message: error
            })
          })
      } else {
        getTemperature(uid, type)
          .then(res => {
            this.handleGetData(type, res, name)
            this.onClickCloseIcon()
          })
          .catch(error => {
            Dialog.alert({
              message: error
            })
          })
      }
    },
    addEchartsData(uid: number, values: any, type: string, name: string) {
      if (name === 'body') {
        setBody(uid, type, values)
          .then(res => {
            this.handleSetData(type, res, name)
            this.onClickCloseIcon()
          })
          .catch(error => {
            Dialog.alert({
              message: error
            })
          })
      } else {
        setTemperature(uid, type, values)
          .then(res => {
            this.handleSetData(type, res, name)
            this.onClickCloseIcon()
          })
          .catch(error => {
            Dialog.alert({
              message: error
            })
          })
      }
    },
    handleGetData(type: string, res: any, name: string) {
     const echartDom =document.getElementById(name) as HTMLElement   
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
          if (item.name === name) {
            item.option.series.forEach((ele, i) => {
              if (ele.name === type) {
                ele.data = seriesData as any
              }
            })
            this.breatheRateData = true
            myChart.setOption(item.option, true)
          }
        })
      }
    },
    handleSetData(type: string, res: any, name: string) {
      const { code, message } = res.data
      if (code === 0) {
        Dialog.alert({ message: 'Add successfully!' })
        this.getData(type, name)
      } else if (code === 1) {
        Dialog.alert({ message: 'Modify successfully!' })
        this.getData(type, name)
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
  height: 600px;
}
.title {
  text-align: center;
  font-size: 20px;
  padding: 20px;
}
.add-btn {
  width: 190px;
  margin-bottom: 20px;
  padding: 30px;
}
.introduce-btn {
  width: 190px;
  float: right;
  margin-bottom: 20px;
  padding: 30px;
}
.showtables {
  position: absolute;
  right: 7px;
  top: 369px;
  & > img {
    width: 20px;
    height: 20px;
  }
}
.second {
  right: 6px !important;
  top: 1228px !important;
}
.parent-div {
  position: relative;
}
</style>
