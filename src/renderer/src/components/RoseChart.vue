<template>
  <div class="rose-chart-dom" ref="roseChart"></div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import {reactive, ref} from "vue";

const roseChart:any = ref(null)

const option = reactive({
  tooltip: {
    trigger: "item",
    formatter: "{b} : {c}(万元)({d}%)",
  },
  legend: {
    icon: "rect",
    orient: "vertical",
    right: 10,
    textStyle: {
      color: "#83C3E9",
    },
  },
  graphic: {
    show: true,
    type: "text",
    left: "34%",
    top: "48%",
    style: {
      textAlign: "center",
    },
  },
  series: [
    {
      radius: ["20%", "70%"],
      center: ["35%", "50%"],
      roseType: "area",
      type: "pie",
      avoidLabelOverlap: false,
      label: {
        formatter: "{d}%",
        fontWeight: 'normal',
        fontSize: '0.8rem',
        color: 'rgb(55, 162, 255)',
      },
      itemStyle: {
        borderRadius: 2
      },
      labelLine:{
        normal:{
          length:5
        }
      },
      data: [],
      emphasis: {
        itemStyle: {
          shadowBlur: 0,
          shadowOffsetX: 0,
          shadowColor: "rgba(0, 0, 0, 0.5)",
        },
      },
    },
  ],
})

const initChart = (data: any[]) => {
  roseChart.value && echarts.dispose(roseChart.value)
  option.series[0].data = data
  const chart = echarts.init(roseChart.value)
  chart.setOption(option, false)
}
defineExpose({initChart})
</script>

<style scoped lang="less">
.rose-chart-dom {
  width: 100%;
  height: calc(100% - 2rem);
}
</style>
