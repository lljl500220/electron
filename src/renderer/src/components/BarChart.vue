<template>
  <div class="bar-chart-dom" ref="barChart"></div>
</template>

<script setup lang="ts">
import {reactive, ref} from "vue";
import * as echarts from "echarts";

const barChart:any = ref(null)

const option = reactive({
  grid:{
    bottom:30
  },
  tooltip:{
    trigger:'item',
    valueFormatter: (value:any) =>  value
  },
  xAxis: {
    type: 'category',
    boundaryGap: true,
    data: ['0#','89#','92#','95#','98#','M100'],
    axisLabel: {
      color: 'rgb(55, 162, 255)',
    },
  },
  yAxis: {
    type: 'value',
    name: '万升',
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
      data: [120, 200, 150, 80, 70, 110],
      type: 'bar',
      barWidth:'20',
      showBackground: true,
      backgroundStyle: {
        color: 'rgba(180, 180, 180, 0.2)'
      }
    }
  ]
})

const initChart = (data: number[],formatter:Function) => {
  barChart.value && echarts.dispose(barChart.value)
  option.tooltip.valueFormatter = formatter
  option.series[0].data = data
  const chart = echarts.init(barChart.value)
  chart.setOption(option, false)
}
defineExpose({initChart})
</script>

<style scoped lang="less">
.bar-chart-dom{
  width: 100%;
  height: 14rem;
}
</style>
