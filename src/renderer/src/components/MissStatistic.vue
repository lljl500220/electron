<template>
  <div class="statistic-card" style="width: 20%">
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
