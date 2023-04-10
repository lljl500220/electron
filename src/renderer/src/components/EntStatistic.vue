<template>
  <el-row>
    <el-col v-for="item in props.param" :span="item.span">
      <el-statistic :title="item.title" :value="item.value"></el-statistic>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
interface Props {
  param:Statistic[]
}
interface Statistic {
  title:string,
  value:number,
  span:number
}

const props = defineProps<Props>()

</script>

<style scoped lang="less">
:deep(.el-col){
  margin-top: 5px;
  text-align: center;
  .el-statistic__head{
    color: #fff;
  }
  .el-statistic__content{
    color: #fff;
  }
}
</style>
