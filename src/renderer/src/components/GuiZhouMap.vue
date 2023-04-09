<template>
  <div class="map-img rem-17 img-pos"><img :src="mapImg" alt="map"/></div>
  <div class="jt-img rem-17 img-pos"><img :src="jt" alt="jt"/></div>
  <div class="lbx-img rem-17 img-pos"><img :src="lbx" alt="lbx"/></div>
  <div class="map rem-17" ref="map"></div>

</template>

<script lang="ts" setup>
import jt from '../assets/jt.png'
import mapImg from '../assets/map.png'
import lbx from '../assets/lbx.png'
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

const x = () => {
  
}
</script>

<style scoped lang="less">
.img-pos {
  pointer-events: none;
  position: absolute;
  margin: auto;
  left: 10rem;
  top: 10rem;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
.rem-17{
  width: 15rem;
  height: 15rem;
}

@keyframes jtAnimation {
  0% {
    transform: rotate(0deg) scale(1.4,1.4);
  }
  100% {
    transform: rotate(-360deg) scale(1.4,1.4);
  }
}

@keyframes lbxAnimation {
  0% {
    transform: rotate(0deg) scale(1.1,1.1);
  }
  100% {
    transform: rotate(360deg) scale(1.1,1.1);
  }
}

.map-img{
  opacity: 0.8;
  z-index: 1;
}

.lbx-img{
  animation: lbxAnimation 10s linear infinite;
  z-index: 3;
}

.jt-img {
  animation: jtAnimation 5s linear infinite;
  z-index: 2;
}

.map{
  position: absolute;
  left: 10rem;
  top: 10rem;
}
</style>
