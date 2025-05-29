<script setup lang="ts">
import { ref } from 'vue'

const targetUrl = ref('')
const results = ref<string[]>([])
const loading = ref(false)

const runCrawler = async () => {
  if (!targetUrl.value) return
  loading.value = true
  try {
    results.value = await window.electronAPI.startCrawler(targetUrl.value)
  } catch (error) {
    console.error('爬取失败:', error)
    results.value = []
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div style="padding: 20px">
    <var-input v-model="targetUrl" placeholder="输入目标网址"></var-input>
    <var-button type="primary" @click="runCrawler" :loading="loading"> 开始爬取 </var-button>

    <div v-if="results.length > 0" style="margin-top: 20px">
      <p>共抓取 {{ results.length }} 个链接：</p>
      <ul>
        <li v-for="link in results" :key="link">{{ link }}</li>
      </ul>
    </div>
  </div>
</template>
