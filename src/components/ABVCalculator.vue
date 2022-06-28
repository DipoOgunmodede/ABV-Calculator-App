<template>
  <form id="abvCalc" class="max-w-48 flex flex-col text-center">
    <fieldset class="text-center flex justify-center">
      <label for="drink-name" class="font-bold">Drink name</label>
      <input type="text" id="drink-name" class="ml-4 text-blue-800" v-model="this.drink.drinkOptions.drinkName"
        placeholder="Name" />
    </fieldset>
    <spirit-values v-for="(spirit, index) in drink.spirits" :key="index" :name="spirit.name" :abv="spirit.spiritABV" :quantity="spirit.spiritQuantity"></spirit-values>
    <fieldset>  
      <button @click.prevent="pushNewMixer" class="border-2 border-green-500">Add new mixer</button>
    </fieldset>
    <fieldset v-for="(mixer, index) in drink.mixers" :key="index">
      <label :for="`mixer-total-quantity-${index}`" class="w-full flex flex-col my-4">Mixer quantity in ml</label>
      <input :id="`mixer-total-quantity-${index}`"
        class="m-4 p-4 text-3xl text-center focus-within:outline-dashed focus:outline-green-500 focus:outline-4"
        type="number" min="0" v-model="mixer.mixerQuantity" placeholder="330" />
    </fieldset>
    <fieldset>
      <label for="mixer-ice-toggle">Drinks have ice?</label>
      <input id="mixer-ice-toggle" class="ml-4 p-4" type="checkbox" v-model="drink.drinkOptions.mixersHaveIce" />
    </fieldset>
  </form>

  <div class="results text-center">
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
import SpiritValues from './SpiritValues.vue';
export default {
  data() {
    return {
      drink: {
        spirits: [
          {
            name: "Vodka",
            spiritABV: 40,
            spiritQuantity: 50
          },
          // {
          //     name: "Gin",
          //     spiritABV: 40,
          //     spiritQuantity: 50
          // },
          // {
          //     name: "Rum",
          //     spiritABV: 40,
          //     spiritQuantity: 50
          // },
          // {
          //     name: "Whiskey",
          //     spiritABV: 40,
          //     spiritQuantity: 50
          // },
          // {
          //     name: "Tequila",
          //     spiritABV: 40,
          //     spiritQuantity: 50
          // },
          // {
          //     name: "Triple Sec",
          //     spiritABV: 40,
          //     spiritQuantity: 50
          // }
        ],
        mixers: [{
          name: "Coke",
          mixerQuantity: 600,
        }],
        drinkOptions: {
          drinkName: "Miscellaneous",
          mixersHaveIce: false,
        },
      },
      appOptions: {
        numberOfDecimals: 2,
      }
    };
  },
  methods: {
    numberToFractionOfOne(num) {
      return num / 100;
    },
    fractionToPercentage(num) {
      return num * 100;
    },
    roundFloatingPoint(num, fixed) {
      // eslint-disable-next-line
      var re = new RegExp("^-?\\d+(?:.\\d{0," + (fixed || -1) + "})?");
      return num.toString().match(re)[0];
    },
    pushNewMixer(){
      return this.drink.spirits.push({
        name:'',
        spiritABV: 0,
        spiritQuantity:0
      })
    }
  },
  computed: {
    
    calculateMixersTotalQuantity() {
      return this.drink.mixers.reduce((acc, mixer) => {
        return acc + mixer.mixerQuantity;
      }, 0);
    },
    calculateSpiritsTotalQuantity() {
      return this.drink.spirits.reduce((acc, spirit) => {
        return acc + spirit.spiritQuantity;
      }, 0);
    },
    calculateTotalAlcoholQuantityToFloatingPoint() {
      let totalAlcoholQuantity = this.drink.spirits.reduce((acc, spirit) => {
        return acc + (spirit.spiritQuantity * this.numberToFractionOfOne(spirit.spiritABV));
      }, 0);
      return totalAlcoholQuantity;
    },
    calculateTotalAlcoholQuantity() {
      return this.roundFloatingPoint(this.calculateTotalAlcoholQuantityToFloatingPoint, this.appOptions.numberOfDecimals);
    },
    calculateTotalDrinkQuantity() {
      return this.drink.drinkOptions.mixersHaveIce ?
        ((this.calculateMixersTotalQuantity * 1.2) + this.calculateSpiritsTotalQuantity) :
        this.calculateMixersTotalQuantity + this.calculateSpiritsTotalQuantity;
    },
    calculateTotalDrinkABVToFloatingPoint() {
      let abvToFloatingPointPercentage = this.fractionToPercentage(this.calculateTotalAlcoholQuantityToFloatingPoint / this.calculateTotalDrinkQuantity);
      return abvToFloatingPointPercentage;
    },
    calculateTotalDrinkABV() {
      return this.roundFloatingPoint(this.calculateTotalDrinkABVToFloatingPoint, this.appOptions.numberOfDecimals);
    },
    computedABVColourClasses() {
      const totalDrinkABV = this.calculateTotalDrinkABVToFloatingPoint;
      if (totalDrinkABV < 2.8) {
        return "text-green-400";
      }
      if (totalDrinkABV >= 2.8 &&
        totalDrinkABV < 6) {
        return "text-green-600";
      }
      if (totalDrinkABV < 10) {
        return "text-amber-400";
      }
      if (totalDrinkABV >= 10) {
        return "text-red-600";
      }
      return "";
    },
    computeTotalAlcoholColourClasses() {
      const totalAlcoholQuantity = this.calculateTotalAlcoholQuantityToFloatingPoint;
      if (totalAlcoholQuantity < 25) {
        return "text-green-400";
      }
      if (totalAlcoholQuantity >= 25 &&
        totalAlcoholQuantity < 50) {
        return "text-green-600";
      }
      if (totalAlcoholQuantity >= 50 &&
        totalAlcoholQuantity < 75) {
        return "text-amber-400";
      }
      if (totalAlcoholQuantity >= 75) {
        return "text-red-600";
      }
      return "";
    }
  },
  components: { SpiritValues }
}

</script>
