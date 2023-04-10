<template>
  <div class="map-img rem-15 img-pos"><img :src="mapImg" alt="map"/></div>
  <div class="jt-img rem-15 img-pos"><img :src="jt" alt="jt"/></div>
  <div class="lbx-img rem-15 img-pos"><img :src="lbx" alt="lbx"/></div>
  <div class="map rem-15" ref="map"></div>
</template>

<script lang="ts" setup>
import jt from '../assets/jt.png'
import mapImg from '../assets/map.png'
import lbx from '../assets/lbx.png'
import {onMounted, reactive, ref} from "vue";
import * as echarts from 'echarts'
import guizhou from "../json/guizhou.json"
import lps from "../json/lps.json"
import qxn from "../json/qxn.json"
import qdn from "../json/qdn.json"
import as from "../json/as.json"
import bj from "../json/bj.json"
import gy from "../json/gy.json"
import tr from "../json/tr.json"
import zy from "../json/zy.json"
import qn from "../json/qn.json"

const map: any = ref(null)

const option = reactive({
  grid:{
    top:0,
    bottom:0,
    left:0,
    right:0
  },
  series: [
    {
      name: "数据名称",
      type: "map",
      map: "",
      label: {
        show: true, formatter: (param: any) => {
          if (param.name.length > 5) {
            return param.name.slice(0, 4) + "\n" + param.name.slice(5)
          }
        },
        color: '#fff',
        fontSize:'0.6rem',
        fontFamily: 'FangSong'
      },
      layoutCenter: ["50%", "50%"], //位置
      // layoutSize: "100%",
      select:{
        itemStyle:{
          areaColor: '#3262de',
        },
        label:{
          color: '#000',
          fontSize: '1rem',
          fontWeight: 'bold'
        }
      },
      itemStyle: {
        normal: {
          areaColor: 'rgba(45,197,203,0.5)', //rgba设置透明度0
          borderColor: '#fff',
          borderWidth: 1,
          shadowColor: 'rgba(0,54,255, 1)',
          shadowBlur: 150
        },
        emphasis: {
          areaColor: '#708fe0',
          shadowColor: 'rgba(0,54,255, 1)',
          shadowBlur: 150
        }
      },
    },
  ],

})

const mapList = [guizhou,gy,lps,zy,as,bj,tr,qxn,qn,qdn]
//改变地图
const changeMap = (name:string,index:number) =>{
  option.series[0].map = name
  map.value && echarts.dispose(map.value)
  echarts.registerMap(name, mapList[index])
  const chart = echarts.init(map.value)
  chart.setOption(option)
}

defineExpose({changeMap})

onMounted(() => {
})
</script>

<style scoped lang="less">
.img-pos {
  pointer-events: none;
  position: absolute;
  margin: auto;
  left: 12.5rem;
  top: 5rem;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.rem-15 {
  width: 15rem;
  height: 15rem;
}

@keyframes jtAnimation {
  0% {
    transform: rotate(0deg) scale(1.4, 1.4);
  }
  100% {
    transform: rotate(-360deg) scale(1.4, 1.4);
  }
}

@keyframes lbxAnimation {
  0% {
    transform: rotate(0deg) scale(1.1, 1.1);
  }
  100% {
    transform: rotate(360deg) scale(1.1, 1.1);
  }
}

.map-img {
  opacity: 0.8;
  z-index: 1;
}

.lbx-img {
  animation: lbxAnimation 10s linear infinite;
  z-index: 3;
}

.jt-img {
  animation: jtAnimation 5s linear infinite;
  z-index: 2;
}

.map {
  position: absolute;
  left: 12.5rem;
  top: 5rem;
  z-index: 10;
}
</style>
