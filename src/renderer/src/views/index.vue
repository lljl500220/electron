<template>
  <div class="content">
    <div class="title"></div>
    <main class="main">
      <div class="left">
        <div class="map-content content-border">
          <div class="title-img">
            <span>接入数据总量</span>
          </div>
          <ent-statistic :param="mapStatistic"></ent-statistic>
          <div class="btn-content left">
            <el-button v-for="(item,index) in mapBtnLeft" @click="mapChange(item,index)"
                       :class="{active:isActive === index}">{{ item }}
            </el-button>
          </div>
          <div class="btn-content right">
            <el-button v-for="(item,index) in mapBtnRight" @click="mapChange(item,index+5)"
                       :class="{active:isActive === index+5}">{{ item }}
            </el-button>
          </div>
          <gui-zhou-map ref="map"></gui-zhou-map>
        </div>
        <div class="ent-content content-border">
          <div class="title-img">
            <span>企业档案</span>
          </div>
          <ent-statistic :param="entStatistic"></ent-statistic>
        </div>
        <div class="table-content content-border">
          <div class="title-img">
            <span>实时订单</span>
          </div>
          <business-table></business-table>
        </div>
      </div>
      <div class="center">
        <div class="line-chart content-border">
          <div class="title-img">
            <span>加油站经营情况趋势图(月)</span>
          </div>
          <line-chart ref="lineChart"></line-chart>
        </div>
        <div class="rose-chart content-border">
          <div class="title-img">
            <span>各地加油站加油金额占比(上月)</span>
          </div>
          <rose-chart ref="roseChart"></rose-chart>
        </div>
        <div class="bar-chart content-border">
          <div class="title-img">
            <span>各油品交易情况(上月)</span>
          </div>
          <bar-chart ref="barChart"></bar-chart>
        </div>
      </div>
      <div class="right content-border">
        <div class="title-img">
          <span>预警模块</span>
        </div>
        <div class="pie-chart">
          <pie-chart ref="pieChart"></pie-chart>
        </div>
        <div class="stack-bar">
          <stack-bar-chart ref="stackBar"></stack-bar-chart>
        </div>
        <div class="statistic-box">
          <miss-statistic v-for="(item,index) in missRate" :title="item.title" :rate="item.rate"
                        :key="index">
          </miss-statistic>
          <span>各地州数据缺失率</span>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import GuiZhouMap from "../components/GuiZhouMap.vue";
import {onMounted, reactive, ref} from "vue";
import EntStatistic from "../components/EntStatistic.vue";
import BusinessTable from "../components/BusinessTable.vue";
import LineChart from "../components/LineChart.vue";
import RoseChart from "../components/RoseChart.vue";
import BarChart from "../components/BarChart.vue";
import StackBarChart from "../components/StackBarChart.vue";
import PieChart from "../components/PieChart.vue";
import MissStatistic from "../components/MissStatistic.vue";

//主内容框
const main: any = ref(null)
const map: any = ref(null)
const lineChart: any = ref(null)
const roseChart: any = ref(null)
const barChart: any = ref(null)
const stackBar: any = ref(null)
const pieChart: any = ref(null)

const lineData = reactive({
  xData: ['贵州省', '贵阳市', '六盘水', '遵义市', '安顺市', '毕节市', '铜仁市', '黔南州', '黔西南', '黔东南'],
  data: [
    [1, 2, 3, 4, 5, 6, 7, 3, 1, 4],
    [2, 3, 4, 5, 6, 7, 8, 4, 5, 1,]
  ],
})

const roseData = reactive({
  data: [
    {value: 101, name: '贵阳市', select: true},
    {value: 102, name: '六盘水'},
    {value: 103, name: '遵义市'},
    {value: 104, name: '安顺市'},
    {value: 105, name: '毕节市'},
    {value: 106, name: '铜仁市'},
    {value: 107, name: '黔南州'},
    {value: 108, name: '黔西南'},
    {value: 109, name: '黔东南'},
  ],
})

const barData = reactive({
  data: [100, 233, 133, 234, 125, 145],
  formatter: (value) => {
    return value + "万元"
  }
})

const stackBarData = reactive({
  data: [[{value: 101},
    {value: 102},
    {value: 103},
    {value: 104},
    {value: 105},
    {value: 106},
    {value: 107},
    {value: 108},
    {value: 109}], [
    {value: 101},
    {value: 102},
    {value: 103},
    {value: 104},
    {value: 105},
    {value: 106},
    {value: 107},
    {value: 108},
    {value: 109},
  ]]
})

const pieData = reactive({
  data: [
    {value: 101, name: '贵阳市'},
    {value: 102, name: '六盘水'},
    {value: 103, name: '遵义市'},
    {value: 104, name: '安顺市'},
    {value: 105, name: '毕节市'},
    {value: 106, name: '铜仁市'},
    {value: 107, name: '黔南州'},
    {value: 108, name: '黔西南'},
    {value: 109, name: '黔东南'},
  ]
})
const missRate = ref([
  {title: '贵阳市', data: [0.5, 0.4, 0.3, 0.2],rate:'10%'},
  {title: '六盘水', data: [0.5, 0.4, 0.3, 0.2],rate:'10%'},
  {title: '遵义市', data: [0.5, 0.4, 0.3, 0.2],rate:'10%'},
  {title: '安顺市', data: [0.5, 0.4, 0.3, 0.2],rate:'10%'},
  {title: '毕节市', data: [0.5, 0.4, 0.3, 0.2],rate:'10%'},
  {title: '铜仁市', data: [0.5, 0.4, 0.3, 0.2],rate:'10%'},
  {title: '黔南州', data: [0.5, 0.4, 0.3, 0.2],rate:'10%'},
  {title: '黔西南', data: [0.5, 0.4, 0.3, 0.2],rate:'10%'},
  {title: '黔东南', data: [0.5, 0.4, 0.3, 0.2],rate:'10%'},
])

const resetChart = (name, index) => {
  map.value.changeMap(name, index)
  lineChart.value.initChart(lineData.data, lineData.xData)
  roseChart.value.initChart(roseData.data)
  barChart.value.initChart(barData.data, barData.formatter)
  stackBar.value.initChart(stackBarData.data)
  pieChart.value.initChart(pieData.data)
  entStatistic.value[0].value = index
}

//初始化rem大小
let rem = ref('15px')
const ping = async () => {
  //@ts-ignore
  let a: number[] = await window.api.ping()
  rem.value = a[0] / 100 + 'px'
  localStorage.setItem('rem', (a[0] / 100).toString())
  document.getElementsByTagName('html')[0].style['font-size'] = rem.value
  document.getElementsByTagName('html')[0].style['height'] = a[1] + 'px'
  document.getElementsByTagName('html')[0].style['width'] = a[0] + 'px'
  document.getElementsByTagName('body')[0].style['height'] = a[1] + 'px'
  document.getElementsByTagName('body')[0].style['width'] = a[0] + 'px'
  resetChart('贵州', 0)
}

//线形图

//两个展示信息的内容
const mapStatistic = ref([
  {title: '累计加油量(万升)', value: 1000, span: 12},
  {title: '累计交易金额(万元)', value: 2000, span: 12}
])

const entStatistic = ref([
  {title: '企业入驻总数', value: 1000, span: 8},
  {title: '企业建档总数', value: 2000, span: 8},
  {title: '税控系统安装总数', value: 2000, span: 8}
])

//地图按钮
const isActive = ref(0)
const mapBtnLeft = ['贵州省', '贵阳市', '六盘水', '遵义市', '安顺市']
const mapBtnRight = ['毕节市', '铜仁市', '黔南州', '黔西南', '黔东南']

//按钮改变
const mapChange = (name: string, index: number) => {
  isActive.value = index
  map.value.changeMap(name, index)
  resetChart(name, index)
}

setTimeout(() => {
  ping()
}, 500)

onMounted(() => {
})
</script>

<style scoped lang="less">
.content {
  width: 100%;
  height: 100%;
  background: url("../assets/img.png");
  background-size: cover;

  .title {
    width: 100%;
    min-height: 48px;
    height: 4rem;
    background: url("../assets/顶部背景.png");
    background-size: cover;
  }

  .main {
    width: 100%;
    display: flex;
    height: calc(100% - 4rem);
    background: url("../assets/img.png");
    background-size: cover;

    .left {
      width: 40rem;
      height: 100%;

      .map-content {
        position: relative;
        height: 23rem;

        .btn-content {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          position: absolute;
          bottom: 2rem;
          width: 4rem;
          height: 15rem;
          text-align: center;

          :deep(.el-button) {
            position: relative;
            width: 4rem;
            margin: 0;
            color: #fff;
            font-size: 0.8rem;
            font-family: FangSong, sans-serif;
            border: none;
            z-index: 1;
            background: rgba(64, 169, 255, 0.3);
            outline: none;
            padding: 0.5em 1em;
          }

          button:hover {
            cursor: pointer;
            animation: jelly 0.5s;
          }

          @keyframes jelly {
            0%,
            100% {
              transform: scale(1, 1);
            }

            33% {
              transform: scale(0.9, 1.1);
            }

            66% {
              transform: scale(1.1, 0.9);
            }
          }

          .active {
            background-color: rgba(64, 169, 255, 0.8);
          }
        }

        .left {
          left: 1rem;
        }

        .right {
          right: 1rem;
        }
      }

      .ent-content {
        height: calc(100% - 41rem);
      }

      .table-content {
        height: 16rem
      }
    }

    .center {
      width: 29rem;
      margin-left: 1rem;

      .line-chart {
        height: 16rem
      }

      .rose-chart {
        height: calc(100% - 34rem)
      }

      .bar-chart {
        height: 16rem;
      }
    }

    .right {
      width: 29rem;
      height: calc(100% - 1rem);
      margin-left: 1rem;

      .pie-chart {
        width: 100%;
        height: calc((100% - 18rem) / 2);
      }

      .stack-bar {
        width: 100%;
        height: calc((100% - 18rem) / 2);
      }

      .statistic-box {
        text-align: center;
        width: 100%;
        height: 16rem;
        display: flex;
        flex-wrap: wrap;

        span {
          text-align: center;
          margin: auto;
          font-size: 1.3rem;
        }
      }
    }
  }

  .content-border {
    margin-top: 0.5rem;
    background: linear-gradient(to left, #2474b5, #2474b5) left top no-repeat,
    linear-gradient(to bottom, #2474b5, #2474b5) left top no-repeat,
    linear-gradient(to left, #2474b5, #2474b5) right top no-repeat,
    linear-gradient(to bottom, #2474b5, #2474b5) right top no-repeat,
    linear-gradient(to left, #2474b5, #2474b5) left bottom no-repeat,
    linear-gradient(to bottom, #2474b5, #2474b5) left bottom no-repeat,
    linear-gradient(to left, #2474b5, #2474b5) right bottom no-repeat,
    linear-gradient(to left, #2474b5, #2474b5) right bottom no-repeat;
    background-size: 2px 2rem, 2rem 2px, 2px 2rem, 2rem 2px;
  }

  .title-img {
    height: 2rem;
    width: 100%;
    text-align: center;
    background: url("../assets/title-bg1.png") center no-repeat;

    span {
      height: 2rem;
      line-height: 2rem;
    }
  }
}
</style>
