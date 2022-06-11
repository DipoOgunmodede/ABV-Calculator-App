<template>
  <form id="abvCalc" class="max-w-48 flex flex-col">
    <fieldset>
      <legend>Drink name</legend>
      <input type="text" class="text-center" v-model="this.drink.drinkOptions.drinkName" placeholder="Name" />
    </fieldset>
    <fieldset class="spiritValuesContainer" v-for="(spirit, index) in drink.spirits" :key="index">

      <input type="text" />
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
      type="number" min="0" v-model="calculateMixersTotalQuantity" id="mixerQuantity" :placeholder="mixerQuantity" />
    <label></label>
    <input type="checkbox" />
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
      <span class="font-bold" :class="computeTotalAlcoholColourClasses">{{ calculateTotalAlcoholQuantity
      }}ml</span>
      of alcohol in your drink
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      drink: {
        spirits: [
          {
            name: 'Vodka',
            spiritABV: 37.5,
            spiritQuantity: 25
          },
          {
            name: 'Gin',
            spiritABV: 40,
            spiritQuantity: 0
          },
          {
            name: 'Rum',
            spiritABV: 40,
            spiritQuantity: 0
          },
          {
            name: 'Whiskey',
            spiritABV: 40,
            spiritQuantity: 0
          },
          {
            name: 'Tequila',
            spiritABV: 40,
            spiritQuantity: 0
          },
          {
            name: 'Absinthe',
            spiritABV: 89.9,
            spiritQuantity: 0
          }
        ],
        mixers: [{
          name: 'Coke',
          mixerQuantity: 330,
        }],
        drinkOptions: {
          drinkName: 'Miscellaneous',
          mixerHasIce: false,
        },

      },
      appOptions: {
        numberOfDecimals: 2,
      }

    }
  }
  ,
  methods: {
    numberToFractionOfOne(num) {
      return num / 100
    },
    fractionToPercentage(num) {
      return num * 100
    },

    roundFloatingPoint(num, fixed) {
      // eslint-disable-next-line
      var re = new RegExp('^-?\\d+(?:\.\\d{0,' + (fixed || -1) + '})?');
      return num.toString().match(re)[0];
    }
  },

  computed: {
    calculateMixersTotalQuantity() {
      return this.drink.mixers.reduce((acc, mixer) => {
        return acc + mixer.mixerQuantity
      }, 0)
    },

    calculateSpiritsTotalQuantity() {
      return this.drink.spirits.reduce((acc, spirit) => {
        return acc + spirit.spiritQuantity
      }, 0)
    },

    calculateTotalAlcoholQuantityToFloatingPoint() {

      let totalAlcoholQuantity = this.drink.spirits.reduce((acc, spirit) => {
        return acc + (spirit.spiritQuantity * this.numberToFractionOfOne(spirit.spiritABV))
      }, 0);
      return totalAlcoholQuantity;

    },
    calculateTotalAlcoholQuantity() {
      return this.roundFloatingPoint(this.calculateTotalAlcoholQuantityToFloatingPoint, this.appOptions.numberOfDecimals);
    },

    calculateTotalDrinkQuantity() {
      return (this.calculateMixersTotalQuantity + this.calculateSpiritsTotalQuantity)
    },
    calculateTotalDrinkABVToFloatingPoint() {
      let abvToFloatingPointPercentage = this.fractionToPercentage(this.calculateTotalAlcoholQuantityToFloatingPoint / this.calculateTotalDrinkQuantity);
      return abvToFloatingPointPercentage
    },
    calculateTotalDrinkABV() {
      return this.roundFloatingPoint(this.calculateTotalDrinkABVToFloatingPoint, this.appOptions.numberOfDecimals);
    },

    computedABVColourClasses() {
      const totalDrinkABV = this.calculateTotalDrinkABVToFloatingPoint

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
      const totalAlcoholQuantity = this.calculateTotalAlcoholQuantityToFloatingPoint
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
