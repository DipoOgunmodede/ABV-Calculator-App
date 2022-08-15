<template class="text-center">
  <link href="/dist/output.css" rel="stylesheet" />
  <main class="h-screen w-screen p-4 overflow-x-hidden flex flex-col items-center text-xl">
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
<style>
main * {
  @apply my-2;
}

[type="checkbox"] {
  -moz-transform: scale(2); /* FF */
  -webkit-transform: scale(2); /* Safari and Chrome */
  -o-transform: scale(2); /* Opera */
  transform: scale(2);
  @apply ml-2;
}
</style>