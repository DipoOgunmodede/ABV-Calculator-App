<template>
  <form id="abvCalc" class="max-w-48 flex flex-col">
    <label class="justify-center w-full flex flex-col my-4">Spirit ABV in %</label>
    <input class="m-4 p-4 text-3xl text-center focus-within:outline-dashed focus:outline-green-500 focus:outline-4"
      type="number" min="0" v-model="spiritABV" id="ABV" placeholder="37.5" />

    <label class="justify-center w-full flex flex-col my-4">Spirit quantity in ml</label>
    <input class="m-4 p-4 text-3xl text-center focus-within:outline-dashed focus:outline-green-500 focus:outline-4"
      type="number" min="0" v-model="spiritQuantity" id="alcoholQuantity" placeholder="50" />
    <label class="justify-center w-full flex flex-col my-4">Mixer quantity in ml
      <input class="m-4 p-4 text-3xl text-center focus-within:outline-dashed focus:outline-green-500 focus:outline-4"
        type="number" min="0" v-model="mixerQuantity" id="mixerQuantity" placeholder="330" />
    </label>
  </form>

  <div class="results">
    <p>
      Your drink is
      <span :class="computedABVColourClasses" class="font-bold">{{
          `${calculateTotalDrinkABV}% ABV`
      }}</span>
    </p>
    <p>
      There is
      <span class="font-bold" :class="computeTotalAlcoholColourClasses">{{ calculateTotalAlcoholQuantity }}ml</span>
      of alcohol in your drink
    </p>
  </div>
</template>

<script>
export default {
  data () {
    return {
      spiritABV: 37.5,
      spiritQuantity: 50,
      mixerQuantity: 330
    }
  },
  computed: {
    abvToDecimal () {
      return this.spiritABV / 100
    },
    calculateTotalAlcoholQuantity () {
      return this.spiritQuantity * this.abvToDecimal
    },
    totalDrinkQuantity () {
      return this.mixerQuantity + this.spiritQuantity
    },
    calculateTotalDrinkABV () {
      if (this.totalDrinkQuantity !== 0) {
        return (
          (this.calculateTotalAlcoholQuantity / this.totalDrinkQuantity) *
          100
        ).toFixed(2)
      }
      return ''
    },
    computedABVColourClasses () {
      const totalDrinkABV = this.calculateTotalDrinkABV

      if (
        totalDrinkABV < 2.8
      ) {
        return 'text-green-400'
      }

      if (
        totalDrinkABV >= 2.8 &&
      totalDrinkABV < 6
      ) {
        return 'text-green-600'
      }

      if (
        totalDrinkABV < 10
      ) {
        return 'text-amber-400'
      }
      if (totalDrinkABV >= 10) {
        return 'text-red-600'
      }

      return ''
    },
    computeTotalAlcoholColourClasses () {
      const totalAlcoholQuantity = this.calculateTotalAlcoholQuantity
      if (totalAlcoholQuantity < 25) {
        return 'text-green-400'
      }
      if (
        totalAlcoholQuantity >= 25 &&
      totalAlcoholQuantity < 50
      ) {
        return 'text-green-600'
      }

      if (
        totalAlcoholQuantity >= 50 &&
      totalAlcoholQuantity < 75
      ) {
        return 'text-amber-400'
      }
      if (totalAlcoholQuantity >= 75) {
        return 'text-red-600'
      }
      return ''
    }
  }
}
</script>
