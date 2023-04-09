<template>
  <main class="main">
    <div class="title"></div>
    <div class="left">
      <div>
        <gui-zhou-map></gui-zhou-map>
      </div>
    </div>
    <div class="center">
    </div>
    <div class="right">
    </div>
  </main>
</template>

<script setup lang="ts">
import GuiZhouMap from "../components/GuiZhouMap.vue";
import {onMounted, ref} from "vue";
const main:any = ref(null)
let rem = ref('15px')
const ping = async () => {
  let a:number[] =  await window.api.ping()
  console.log(a)
  rem.value = a[0] / 100 + 'px'
  document.getElementsByTagName('html')[0].style['font-size'] = rem.value
}

setTimeout(()=>{
  ping()
},500)

onMounted(() => {
})
</script>

<style scoped lang="less">
.main{
  width: 100%;
  display: flex;
  height: 100%;
  background: url("../assets/img.png");
  background-size: cover;
}
.title{
  width: 100%;
  height: 3rem;
  background: yellow;
  position: absolute;
  background: url("../assets/顶部背景.png");
  background-size: cover;
}
.left {
  width: 40rem;
}
.center{
  width: 29rem;
  margin-left: 1rem;
}
.right{
  width: 29rem;
  margin-left: 1rem;
}
</style>
