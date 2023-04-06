<template>
  <div class="loading-main">
    <div class="loading-text">
      <span>请</span>
      <span>稍</span>
      <span>后</span>
      <span>.</span>
      <span>.</span>
      <span>.</span>
    </div>
    <div class="loading"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

onMounted(() => {
  document.querySelectorAll('span').forEach((span, index) => {
    span.style.setProperty('--delay', `${index * 150}ms`)
  })
})
</script>
<style scoped lang="less">
body html {
  display: flex;
  text-align: center;
  margin: 0;
  overflow: hidden;
}

.loading-main{
  width: 100%;
  height: 100%;
  background-color: transparent;
}

.loading {
  width: 20rem;
  height: 2rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  border-radius: 12px;
  margin: auto;
  -webkit-box-reflect: below 1px linear-gradient(transparent, #0005);
}

.loading::before {
  content: '';
  position: absolute;
  inset: 0;
  /* 默认角度是从上到下，90deg 逆时针旋转后变成从左到右渐变 */
  background: linear-gradient(
    90deg,
    var(--gradient-color-1),
    var(--gradient-color-2),
    var(--gradient-color-3),
    var(--gradient-color-4),
    var(--gradient-color-1),
    var(--gradient-color-2),
    var(--gradient-color-3),
    var(--gradient-color-4),
    var(--gradient-color-1)
  );
  background-size: 200%;
  border-radius: 12px;
  animation: flow 3s linear infinite;
}

/* 使用一个和 ::before 相同的 作为霓虹灯特效 */
.loading::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    var(--gradient-color-1),
    var(--gradient-color-2),
    var(--gradient-color-3),
    var(--gradient-color-4),
    var(--gradient-color-1),
    var(--gradient-color-2),
    var(--gradient-color-3),
    var(--gradient-color-4),
    var(--gradient-color-1)
  );
  background-size: 200%;
  filter: blur(10px);
  border-radius: 12px;
  animation: flow 3s linear infinite;
}

@keyframes flow {
  0% {
    background-position: 0 0;
  }

  0% {
    background-position: 200% 0;
  }
}

.loading-text {
  width: 20rem;
  height: 2rem;
  position: absolute;
  top: calc(50% - 3rem);
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-around;
}

div span {
  display: inline-block;
  color: white;
  font-size: 1.5rem;
  font-family: FangSong, serif;
  animation: jump 1.5s infinite;
  animation-delay: var(--delay);
}

@keyframes jump {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}
</style>
