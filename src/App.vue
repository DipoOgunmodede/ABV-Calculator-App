<template class="text-center">
  <link href="/dist/output.css" rel="stylesheet"/>
  <ABVCalculator />
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