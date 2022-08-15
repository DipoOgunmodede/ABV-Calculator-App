<template class="text-center">
  <link href="/dist/output.css" rel="stylesheet" />
  <main class="h-screen w-screen p-4 overflow-x-hidden">
    <ABVCalculator />
  </main>
</template>

<script>
import ABVCalculator from './components/ABVCalculator.vue'

export default {
  name: 'App',
  components: {
    ABVCalculator
  }
}
</script>