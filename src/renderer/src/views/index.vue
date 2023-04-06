<template>
  <loading v-if="isLoading"></loading>
</template>

<script setup lang="ts">
import Loading from '../components/loading.vue'
import { ref } from 'vue'

const isLoading = ref(true)
</script>

<style scoped lang="less"></style>
