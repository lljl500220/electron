<template>
  <div class="stack-bar-chart-dom" ref="barChart"></div>
</template>

<script setup lang="ts">
import {reactive, ref} from "vue";
import * as echarts from "echarts";

const barChart:any = ref(null)

const option = reactive({
  grid:{
    // top:20
  },
  title:{
    text: '加油站关联数据对比',
    textStyle:{
      color: 'rgb(55, 162, 255)',
      fontSize: '1rem'
    },
    bottom: 10,
    right: '0'
  },
  tooltip:{
    trigger:'axis',
  },
  legend: {
    data: ['关联异常数','加油站数量'],
    left:0,
    bottom:'10',
    textStyle: {
      color: 'rgb(55, 162, 255)',
    },
  },
  xAxis: {
    type: 'category',
    boundaryGap: true,
    data: ['贵州省', '贵阳市', '六盘水', '遵义市', '安顺市','毕节市', '铜仁市', '黔南州', '黔西南', '黔东南'],
    axisLabel: {
      color: 'rgb(55, 162, 255)',
    },
  },
  yAxis: {
    type: 'value',
    name: '家',
    axisLine: {
      // 轴线
      show: true,
      lineStyle: {
        type: "line",
      },
    },
    axisLabel: {
      color: 'rgb(55, 162, 255)',
    },
    nameTextStyle: {
      color: 'rgb(55, 162, 255)',
    },
    splitLine: {
      show: false,
      lineStyle: {
        color: "#1A2C6B",
        type: "dashed",
      },
    },
  },
  series: [
    {
      name :'关联异常数',
      data: [120, 200, 150, 80, 70, 110],
      type: 'bar',
      stack:'add',
      barWidth:'20',
    },
    {
      name: '加油站数量',
      data: [120, 200, 150, 80, 70, 110],
      type: 'bar',
      stack: 'add',
      barWidth:'20',
    }
  ]
})

const initChart = (data: number[][]) => {
  barChart.value && echarts.dispose(barChart.value)
  option.series[0].data = data[0]
  option.series[1].data = data[1]
  const chart = echarts.init(barChart.value)
  chart.setOption(option, false)
}
defineExpose({initChart})
</script>

<style scoped lang="less">
.stack-bar-chart-dom{
  width: 100%;
  height: 100%;
}
</style>
