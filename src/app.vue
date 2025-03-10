<template>
  <div>
    <button @click="handleCall">CALL API</button>
  </div>
</template>
<script setup lang="ts">
import { createSession } from './api/oauth';

const handleCall = () => {
  createSession({ phone: 'test' })
}
</script>