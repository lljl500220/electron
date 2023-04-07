<template>
  <div class="left">
  </div>
  <div class="center">

  </div>
  <div class="right">

  </div>
</template>

<script setup lang="ts">

const ping = async () => {
  let a =  await window.api.ping()
  console.log(a)
}
setTimeout(()=>{
  ping()
},4000)
</script>

<style scoped lang="less">
.main{
  width: 100%;
  height: 100%;
}
</style>
