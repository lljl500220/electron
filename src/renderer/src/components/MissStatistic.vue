<template>
  <div class="statistic-card card">
    <el-statistic style="position:relative;z-index: 2;" :title="props.title" :value="props.rate"></el-statistic>
    <div style="position:relative;z-index: 2;" class="statistic-footer">
      <div class="footer-item">
        <span>缺失率</span>
        <span class="green">
              <el-icon>
                <CaretTop />
              </el-icon>
            </span>
      </div>
    </div>
    <div class="bg-1" :style="{top: `calc(${top})`}"></div>
    <div class="bg-2" :style="{top: `calc(${top})`}"></div>
    <div class="bg-3" :style="{top: `calc(${top})`}"></div>
  </div>
</template>

<script setup lang="ts">
import {
  ArrowRight,
  CaretBottom,
  CaretTop,
  Warning,
} from '@element-plus/icons-vue'
import {ref} from "vue";
interface Props {
  title:string,
  rate:string
}

const props = defineProps<Props>()

const top =ref('-' + props.rate + " + -90%")
console.log(top.value)
</script>

<style scoped lang="less">
.card {
  overflow: hidden;
  position: relative;
  width: calc(20% - 2px);
  //border: #b3e19d 1px solid;
  background-color: rgba(55, 162, 255);
  margin: 1px;
  border-radius: 4px;
  padding-top: 10px;
  box-shadow: inset 0 3px 4px 3px rgb(55, 162, 255),
  inset 3px 0 4px 3px rgb(55, 162, 255),
    inset -3px 0 4px 3px rgb(55, 162, 255),
  inset 0 -3px 4px 3px rgb(55, 162, 255);
  transition: transform 300ms linear;
  transform: scale(0.8,0.8);
  .bg-1{
    position: absolute;
    top: -110%;
    left: -50%;
    width: 200%;
    height: 200%;
    border-radius: 45%;
    z-index: 1;
    background-color: rgba(0,0,0,0.3);
    //transform-origin: 10px;
    animation: missingRate 8s linear infinite;
  }
  .bg-2{
    .bg-1();
    //background-color: rgba(24,154,234,0.1);;
    animation-delay: 1000ms;
  }
  .bg-3{
    .bg-1();
    animation-delay: 2000ms;
  }
}
@keyframes missingRate {
  0%{
    transform: rotate(0deg);
  }
  100%{
    transform: rotate(-360deg);
  }
}
.card:before{
  content: '';
  width: 100%;
  height: 200%;
  bottom: 0;
  left: -100%;
  position: absolute;
  transform-origin: right bottom;
  background-color: rgba(255,255,255,0.5);
  transition: transform 500ms;
}
.card:hover:before{
  transform: rotate(40deg);
}
.card:hover{
  transform: scale(1,1);
}
:deep(.el-statistic__head){
  color: white;
  font-size: 1rem;
}
:deep(.el-statistic__content){
  color: white;
}
.green{
  color: red;
}
</style>
