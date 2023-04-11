<template>
  <div ref="lineChart" class="line-chart-dom"></div>
</template>

<script setup lang="ts">
import {reactive, ref} from "vue";
import * as echarts from 'echarts';

const lineChart = ref(null)

const option = reactive({
  tooltip:{
    trigger:'axis',
  },
  legend: {
    data: ['交易金额','加油量'],
    textStyle: {
      color: 'rgb(55, 162, 255)',
    },
  },
  grid:{
    bottom: 30
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: [],
    axisLabel: {
      color: 'rgb(55, 162, 255)',
    },
  },
  yAxis: [
    {
      type: "value",
      name: '万元',
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
        show: true,
        lineStyle: {
          color: "#1A2C6B",
          type: "dashed",
        },
      },
    },
    {
      type: "value",
      name: '万升',
      axisLine: {
        // 轴线
        show: true,
        lineStyle: {
          type: "line",
        },
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: "#1A2C6B",
          type: "dashed",
        },
      },
      axisLabel: {
        color: 'rgb(55, 162, 255)',
      },
      nameTextStyle: {
        color: 'rgb(55, 162, 255)',
      },
    },
  ],
  series: [
    {
      data: [],
      type: 'line',
      name: '交易金额',
      yAxisIndex: 0,
      itemStyle: {
        color: 'rgb(128, 255, 165)'
      },
      areaStyle: {
        opacity: 0.8,
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: 'rgb(128, 255, 165)'
          },
          {
            offset: 1,
            color: 'rgb(1, 191, 236)'
          }
        ])
      },
      smooth: true
    },
    {
      data: [],
      name: '加油量',
      type: 'line',
      yAxisIndex: 1,
      itemStyle: {
        color: 'rgb(55, 162, 255)'
      },
      areaStyle: {
        opacity: 0.8,
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: 'rgb(55, 162, 255)'
          },
          {
            offset: 1,
            color: 'rgb(116, 21, 219)'
          }
        ])
      },
      smooth: true
    }
  ]
})

const initChart = (data: number[][], xData: string[]) => {
  echarts.dispose(lineChart.value)
  const chart = echarts.init(lineChart.value)
  option.xAxis.data = xData
  option.series[0].data = data[0]
  option.series[1].data = data[1]
  chart.setOption(option, false)
}

defineExpose({initChart})
</script>

<style scoped lang="less">
.line-chart-dom {
  width: 100%;
  height: 14rem;
}
</style>
