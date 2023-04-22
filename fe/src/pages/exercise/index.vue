<template>
  <div class="global-coupon-list-wraper">
    <explain :explainName="state.explainName"></explain>
    <div v-for="(item, index) in echartsList" :key="index" class="parent-div ">
      <div v-for="(series, index) in item.option.series">
        <van-button
          type="primary"
          class="add-btn"
          @click="addData($event, series)"
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
      <div ref="echart" id="exercise" class="echart"></div>
      <div
        v-if="item.option.series[0].data.length"
        class="showtables" 
        @click="showTableData(item)"
      >
        <!-- <van-icon name="orders-o" color="#999" /> -->
        <img src="../../static/images/orders.png" alt="" />
      </div>
      <div 
        v-if="item.option.series[0].data.length === 0"
        class="empty"
      >There is no data.</div>
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
      :others="others"
      :tableHeaderother ='tableHeaderother'
      @onClickCloseIcon="closeTable"
    >
    </table-popup>
  </div>
</template>

<script lang="ts">
import { ref, reactive, defineComponent, SetupContext } from 'vue'
import {
  setExerciseStep,
  getExerciseStep,
  setCalorie,
  getCalorie
} from '@/api/exercise'
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
      echartsList: [
        {
          name: 'exercise',
          option: {
            title: {
              text: 'exercise'
            },
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'cross',
                crossStyle: {
                  color: '#999'
                }
              }
            },

            toolbox: {
              feature: {
                dataView: { show: false, readOnly: false },
                magicType: { show: true, type: ['line', 'bar'] },
                restore: { show: true },
                saveAsImage: { show: true }
              }
            },
            legend: {
              data: ['step', 'calory'],
              x:'105px',
              y:'10px',
      
            },
            xAxis: [
              {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                axisPointer: {
                  type: 'shadow'
                },
                axisLabel: {
                  // rotate: 45
                }
              }
            ],
            yAxis: [
              {
                type: 'value',
                name: 'step',
                axisLabel: {
                  formatter: '{value}',
                  rotate: 75
                }
              },
              {
                type: 'value',
                name: 'calory',
                axisLabel: {
                  formatter: '{value}',
                  rotate: -60
                }
              }
            ],
            series: [
              {
                name: 'step',
                type: 'bar',
                tooltip: {
                  valueFormatter: function (value: string) {
                    return value
                  }
                },
                data: []
              },
              {
                name: 'calory',
                type: 'line',
                yAxisIndex: 1,
                tooltip: {
                  valueFormatter: function (value: string) {
                    return value + ' cal'
                  }
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
      others:[],
      tableHeaderother:[]
    }
  },
  mounted() {
    this.echartsList.forEach((item, index) => {
      item.option.series.forEach((ele, i) => {
        this.getData(ele.name)
      })
    })
  },

  setup(props: {}, context: SetupContext) {
    const state: State = reactive({
      explainName: 'Exercise Data',
      title: 'Add Exercise Data',
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
      this.tableHeader = [],
      this.tableHeaderother = []
      this.$nextTick(() => {
        
          this.tableTitle = 'Exercise Data'
          this.others = item.option.series
          this.tableHeaderother = item.option.xAxis[0].data
       
      })
    },
    closeTable() {
      this.tablePopupIsShow = false
    },
    openIntroduce(e: any, type: string) {
      this.textPopupIsShow = true
      if (type === 'step') {
        this.textPopupTitle = 'Introduction of step'
        this.text =
          'Step count is how many steps you take in a day. Pedometers and digital activity trackers can help you count your steps. Such devices count steps for all of the activities that generate them, such as walking, running, going up and down stairs, cross-country skiing and even doing chores.'
      } else {
        this.textPopupTitle = 'Introduction of calory'
        this.text =
          'Calory is a unit of energy. We tend to associate calories with food. Our bodies "burn" calories from food through metabolism, which uses enzymes to break down carbohydrates into glucose and other sugars, fats into glycerin and fatty acids, and proteins into amino acids. These molecules are then transported through the bloodstream to cells, where they can either be taken up for immediate use or enter the final metabolic stage, where they react with oxygen to release their stored energy.'
      }
    },
    closeText() {
      this.textPopupIsShow = false
    },
    addData(e: any, series: any) {
      if (series.name === 'step') {
        this.placeholder = 'steps'
        if (series.data.length) {
          this.state.title = 'Modify step data'
        } else {
          this.state.title = 'Add step data'
        }
      } else if (series.name === 'calory') {
        this.placeholder = 'cal'
        if (series.data.length) {
          this.state.title = 'Modify calory data'
        } else {
          this.state.title = 'Add calory data'
        }
      }
      this.popupType = series.name
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
      if (type === 'step') {
        getExerciseStep(uid)
          .then(res => {
            this.handleGetData(type, res)
          })
          .catch(error => {
            Dialog.alert({
              message: error
            })
          })
      } else {
        getCalorie(uid)
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
      if (type === 'step') {
        setExerciseStep(uid, values)
          .then(res => {
            this.handleSetData(type, res)
            this.onClickCloseIcon()
          })
          .catch(error => {
            Dialog.alert({
              message: error
            })
          })
      } else {
        setCalorie(uid, values)
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
      // const echartDom = this.$refs.echart as HTMLElement
       const echartDom =document.getElementById('exercise') as HTMLElement
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
          if (type === 'step') {
            item.option.series[0].data = seriesData as any
          } else {
            item.option.series[1].data = seriesData as any
          }
          this.breatheRateData = true
          myChart.setOption(item.option, true)
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
  height: 600px;
}
.title {
  text-align: center;
  font-size: 20px;
  padding: 20px;
}
.add-btn {
  width: 130px;
  margin-bottom: 20px;
}
.introduce-btn {
  width: 130px;
  float: right;
  margin-bottom: 20px;
}
.showtables {
  position: absolute;
  right: 113px;
  top: 133px;
  & > img {
    width: 20px;
    height: 20px;
  }
}
.parent-div {
  position: relative;
}
.empty {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 50%;
  font-size: 30px;
  width: 100%;
  text-align: center;
  color: rgba(0, 0, 0, 0.4);
}
</style>
