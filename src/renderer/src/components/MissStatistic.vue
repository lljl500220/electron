<template>
  <div class="statistic-card card">
    <el-statistic :title="props.title" :value="props.rate"></el-statistic>
    <div class="statistic-footer">
      <div class="footer-item">
        <span>缺失率</span>
        <span class="green">
              <el-icon>
                <CaretTop />
              </el-icon>
            </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  ArrowRight,
  CaretBottom,
  CaretTop,
  Warning,
} from '@element-plus/icons-vue'
interface Props {
  title:string,
  rate:string
}

const props = defineProps<Props>()
</script>

<style scoped lang="less">
.card {
  overflow: hidden;
  position: relative;
  width: calc(20% - 2px);
  //border: #b3e19d 1px solid;
  margin: 1px;
  border-radius: 4px;
  padding-top: 10px;
  box-shadow: inset 0 3px 4px 3px rgb(55, 162, 255),
  inset 3px 0 4px 3px rgb(55, 162, 255),
    inset -3px 0 4px 3px rgb(55, 162, 255),
  inset 0 -3px 4px 3px rgb(55, 162, 255);
  transition: transform 300ms linear;
  transform: scale(0.8,0.8);
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
