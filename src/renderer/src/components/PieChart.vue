<template>
  <div ref="pieChart" class="pie-chart-dom"></div>
</template>

<script setup lang="ts">
import {reactive, ref} from "vue";
import * as echarts from "echarts";

const pieChart: any = ref(null)
const option = reactive({
  tooltip: {
    trigger: 'item'
  },
  title: {// 第一个圆环标题
    text: '平台预警总数', // 主标题
    textStyle: { // 主标题样式
      color: 'rgb(55, 162, 255)',
      fontWeight: 'bold',
      fontSize: '1rem'
    },
    left: '49%',
    top: '40%',
    subtext: '244', // 副标题
    subtextStyle: { // 副标题样式
      color: 'rgb(55, 162, 255)',
      fontSize: '0.8rem',
      fontWeight: 'bold'
    },
    textAlign: 'center' // 主、副标题水平居中显示
  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: ['55%', '80%'],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 10,
        borderColor: 'rgb(55, 162, 255)',
        borderWidth: 1
      },
      label: {
        show: true,
        position: 'outside',
        color: 'rgb(55, 162, 255)',
        formatter: "{b}\n{c}次",
      },
      emphasis: {
        label: {
          show: true,
          fontSize: '1rem',
          fontWeight: 'bold',
          color: 'rgb(55, 162, 255)',
        }
      },
      labelLine: {
        show: false
      },
      data: []
    }
  ]
})

const initChart = (data: any[]) => {
  pieChart.value && echarts.dispose(pieChart.value)
  option.series[0].data = data
  const chart = echarts.init(pieChart.value)
  chart.setOption(option, false)
}
defineExpose({initChart})

</script>

<style scoped lang="less">
.pie-chart-dom {
  width: 100%;
  height: 100%;
}
</style>
