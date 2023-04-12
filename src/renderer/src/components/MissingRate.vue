<template>
  <div class="gradient-border" id="box">Animated <br>CSS<br>Gradient Border</div>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";


onMounted(() => {
})

</script>

<style scoped lang="less">
#box {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 400px;
  height: 200px;
  color: white;
  font-family: 'Raleway';
  font-size: 2.5rem;
}
@keyframes animatedgradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
.gradient-border {
  --borderWidth: 3px;
  background: #1D1F20;
  position: relative;
  border-radius: var(--borderWidth);
}
.gradient-border:after {
  content: '';
  position: absolute;
  top: 2px;
  left: 2px;
  height: 2px;
  width: 2px;
  background: linear-gradient(60deg, #f79533, #f37055, #ef4e7b, #a166ab, #5073b8, #1098ad, #07b39b, #6fba82);
  border-radius: 2px;
  z-index: -1;
  animation: animatedgradient 3s ease alternate infinite;
  background-size: 300% 300%;
}

</style>
