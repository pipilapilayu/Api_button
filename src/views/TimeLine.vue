<script setup lang="ts">
import { reactive } from 'vue'

const data = reactive({
  timeLineData: [
    {
      content: 'Event start',
      timestamp: '2018-04-15'
    },
    {
      content: 'Approved',
      timestamp: '2018-04-13'
    },
    {
      content: 'Success',
      timestamp: '2018-04-11'
    }
  ]
})
</script>

<template>
  <el-timeline>
    <el-timeline-item
      v-for="(activity, index) in data.timeLineData"
      :key="index"
      :timestamp="activity.timestamp"
    >
      {{ activity.content }}
    </el-timeline-item>
  </el-timeline>
</template>

<style lang="scss"></style>
