<template>
  <form id="abvCalc" class="max-w-48 flex flex-col">
    <fieldset class="spiritValuesContainer" v-for="(spirit, index) in spirits" :key="index">
      <label class="justify-center w-full flex flex-col my-4">{{ spirit.name }} ABV in %</label>
      <input class="m-4 p-4 text-3xl text-center focus-within:outline-dashed focus:outline-green-500 focus:outline-4"
        type="number" min="0" v-model="spirit.spiritABV" id="ABV" :placeholder="spirit.spiritABV" />

      <label class="justify-center w-full flex flex-col my-4">{{ spirit.name }} quantity in ml</label>
      <input class="m-4 p-4 text-3xl text-center focus-within:outline-dashed focus:outline-green-500 focus:outline-4"
        type="number" min="0" v-model="spirit.spiritQuantity" id="alcoholQuantity"
        :placeholder="spirit.spiritQuantity" />
    </fieldset>

    <label class="justify-center w-full flex flex-col my-4">Mixer quantity in ml</label>
    <input class="m-4 p-4 text-3xl text-center focus-within:outline-dashed focus:outline-green-500 focus:outline-4"
      type="number" min="0" v-model="mixerQuantity" id="mixerQuantity" :placeholder="mixerQuantity" />

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
  data() {
    return {
      spirits: [
        {
          name: "Vodka",
          spiritABV: 37.5,
          spiritQuantity: 25,
        },
        {
          name: "Gin",
          spiritABV: 40,
          spiritQuantity: 50,
        },
        {
          name: "Rum",
          spiritABV: 40,
          spiritQuantity: 100,
        },
        {
          name: "Whiskey",
          spiritABV: 40,
          spiritQuantity: 50,
        },
        {
          name: "Tequila",
          spiritABV: 40,
          spiritQuantity: 50,
        }
        ,
        {
          name: "Absinthe",
          spiritABV: 89.9,
          spiritQuantity: 25,
        }
      ],
      mixers: [{
        "name": "Coke",
        "mixerQuantity": 330
      }]

    }
  },
  methods: {
  },
  computed: {
    calculateMixersTotalQuantity() {
      return this.mixers.reduce((acc, mixer) => {
        return acc + mixer.mixerQuantity
      }, 0)
    },
    calculateABVOfTotalDrink(){
      
      return this.spirits.reduce((acc, spirit) => {

        totalAlcoholInSpirit += spirit.spiritQuantity * spirit.spiritABV / 100;

      }, 0);
    },
    abvToDecimal() {
      return this.spiritABV / 100
    },
    calculateTotalAlcoholQuantity() {
      return this.createArrayOfSpirits.reduce((acc, spirit) => {
        return acc + spirit.spiritQuantity
      })

      //  return this.spiritQuantity * this.abvToDecimal
    },
    totalDrinkQuantity() {
      return this.mixerQuantity + this.spiritQuantity
    },
    calculateTotalDrinkABV() {
      if (this.totalDrinkQuantity !== 0) {
        return (
          (this.calculateTotalAlcoholQuantity / this.totalDrinkQuantity) *
          100
        ).toFixed(2)
      }
      return ''
    },
    computedABVColourClasses() {
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
    computeTotalAlcoholColourClasses() {
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
