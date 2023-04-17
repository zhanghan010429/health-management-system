<template>
  <div class="global-coupon-list-wraper">
    <explain :explainName="state.explainName"></explain>
    <div v-for="(item, index) in echartsList" :key="index" class="parent-div">
      <div v-for="(series, index) in item.option.series" :key="index">
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
import { getHeart, setHeart } from '@/api/heart'
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
          name: 'heart',
          option: {
            title: {
              text: 'basic_heart_state',
              top: '0px'
            },
            tooltip: {
              trigger: 'axis'
            },
            legend: {
              data: ['heart_rate', 'aerobic_fitness', 'sleep_duration'],
              top: '25px'
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
                dataView: { show: false, readOnly: false },
                magicType: { show: true, type: ['line', 'bar'] },
                restore: { show: true },
                saveAsImage: { show: true }
              },
              orient: 'vertical',
              top: '100px'
            },
            xAxis: {
              type: 'category',
              boundaryGap: false,
              data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
              type: 'value'
            },
            series: [
              {
                name: 'heart_rate',
                type: 'line',
                data: []
              },
              {
                name: 'aerobic_fitness',
                type: 'line',
                data: []
              },
              {
                name: 'sleep_duration',
                type: 'line',
                data: []
              }
            ]
          }
        },
        {
          name: 'pressure',
          option: {
            title: {
              text: 'blood_pressure_state',
              top: '0px'
            },
            tooltip: {
              trigger: 'axis'
            },
            legend: {
              data: ['systolic_blood_pressure', 'diastolic_blood_pressure'],
              top: '25px'
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
                dataView: { show: false, readOnly: false },
                magicType: { show: true, type: ['line', 'bar'] },
                restore: { show: true },
                saveAsImage: { show: true }
              },
              orient: 'vertical',
              top: '100px'
            },
            xAxis: {
              type: 'category',
              boundaryGap: false,
              data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
              type: 'value'
            },
            series: [
              {
                name: 'systolic_blood_pressure',
                type: 'line',
                data: []
              },
              {
                name: 'diastolic_blood_pressure',
                type: 'line',
                data: []
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
      explainName: 'Heart Data',
      title: 'Add Heart Data',
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
        this.tableTitle = item.option.title.text
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
      if (type === 'heart_rate') {
        this.textPopupTitle = 'Introduction of heart_rate'
        this.text =
          'Heart rate refers to the number of heartbeat per minute in the quiet state of normal people, also known as the quiet heart rate, which is generally 60 to 100 times per minute. It can be different depending on age, gender or other physiological factors. In general, the younger the age, the higher the heart rate, heart rate of older people is slower than young people, heart rate of women is faster than men of the same age, these are normal physiological phenomena. In the quiet state, the normal heart rate of adults is 60 ~ 100 times per minute, and the ideal heart rate is 55 ~ 70 times per minute.'
      } else if (type === 'aerobic_fitness') {
        this.textPopupTitle = 'Introduction of aerobic_fitness'
        this.text =
          'Aerobic fitness refers to the the ability of body to ingest, transport and use oxygen. It is the basis of aerobic work, so it can also be called aerobic work capacity, the higher the aerobic fitness level, the stronger the aerobic work capacity.'
      } else if (type === 'sleep_duration') {
        this.textPopupTitle = 'Intriduction of sleep_duration'
        this.text =
          'Sleep time refers to a natural physiological phenomenon of humans and animals. Consciousness is a natural, usually regular, temporary suspension, during which the physical strength is restored, the eyes can be closed and the cerebral cortex is at rest. The best time for adults to sleep is between 22 p.m. and 6 a.m. Sleep time can be divided into intermittent sleep and continuous sleep. In general life, the sleep time refers to the total sleep time in a day, that is, the total time of all sleeping states. The body clock recommends falling asleep by 22pm and waking up by 7am. Go to bed early and get up early to enhance immunity, which is conducive to fighting the invasion of viruses, thus improving work efficiency.'
      } else if (type === 'systolic_blood_pressure') {
        this.textPopupTitle = 'Introduction of systolic_blood_pressure'
        this.text =
          'Systolic blood pressure is when the heart contracts, the pressure inside the artery rises, the middle of the heart contraction, the arterial pressure is the highest, at this time the blood pressure on the inner wall of the blood vessel is called systolic blood pressure, also known as high pressure. 90 to 119mmHg is called normal blood pressure, and 120 to 139mmHg is called normal high value. Above 140mmHg is called hypertension.'
      } else if (type === 'diastolic_blood_pressure') {
        this.textPopupTitle = 'Introduction diastolic_blood_pressure'
        this.text =
          'Diastolic blood pressure is when the human heart diastolic, arterial blood vessel elastic retraction, the pressure produced is called diastolic blood pressure, also known as low pressure. When the heart diastole, the aortic pressure drops, and the end of the systolic artery pressure is at its lowest value called diastolic pressure. Specifically, a value below 85mmHg is considered normal, and 85 to 89mmHg is considered normal high. Low pressure ≥90mmHg is called hypertension.'
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
      getHeart(uid, type)
        .then(res => {
          console.log(name,'===============')
          this.handleGetData(type, res, name)
        })
        .catch(error => {
          Dialog.alert({
            message: error
          })
        })
    },
    addEchartsData(uid: number, values: any, type: string, name: string) {
      setHeart(uid, type, values)
        .then(res => {
          this.handleSetData(type, res, name)
          this.onClickCloseIcon()
        })
        .catch(error => {
          Dialog.alert({
            message: error
          })
        })
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
        Dialog.alert({ message: 'Add Successfully!' })
        this.getData(type, name)
      } else if (code === 1) {
        Dialog.alert({ message: 'Modify Successfully!' })
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
  top: 317px;
  & > img {
    width: 20px;
    height: 20px;
  }
}
.second {
  right: 6px !important;
  top: 243px !important;
}
.parent-div {
  position: relative;
}
</style>
