<template>
  <form id="abvCalc" class="max-w-48 flex flex-col [&>*]:my-2 text-white">
    <fieldset class="flex justify-center">
      <label for="drink-name" class="font-bold">Drink name</label>
      <input type="text" id="drink-name" placeholder="e.g. Long Island Iced Tea" class="ml-4 bg-inherit text-white" v-model="this.drink.drinkOptions.drinkName">
    </fieldset>
    <div v-for="(spirit, index) in drink.spirits" :key="index" :index="index">
      <spirit-values v-model:name="spirit.name" v-model:spiritABV.number="spirit.spiritABV"
        v-model:spiritQuantity.number="spirit.spiritQuantity" />
      <!-- Because an event is emitted when the value is updated in the child, this keeps the prop in sync between parent and child components -->
    </div>
    <fieldset class="text-goldfusion" v-for="(mixer, index) in drink.mixers" :key="index">
      <label :for="`mixer-${index}`">Mixer name </label>
      <input type="text" :id="`mixer-${index}`" placeholder="Enter your mixer name e.g. Cola" v-model="mixer.name" class="bg-inherit" />
      <label :for="`mixer-total-quantity-${index}`" class="w-full flex flex-col my-4">{{  mixer.name  }} quantity in
        ml</label>
      <input :id="`mixer-total-quantity-${index}`"
        class="m-4 p-4 text-3xl  focus-within:outline-dashed focus:outline-green-500 focus:outline-4 text-center bg-inherit"
        type="number" min="0" v-model="mixer.mixerQuantity" placeholder="330" />
    </fieldset>
    <fieldset>
      <button @click.prevent="addSpirit" class="px-4 py-2 border-2 text-primary border-tertiary">Add new spirit</button>
      <button @click.prevent="addMixer" class="px-4 py-2 border-2 text-quaternary border-tertiary mt-2 xs:mt-0 xs:ml-4">Add new mixer</button>
      <button @click.prevent="exportDrink" class="w-full px-4 my-2 py-2 border-2 border-quaternary text-primary" id="export-current-drink">Export current
        list</button>
    </fieldset>
    <fieldset>
      <label for="mixer-ice-toggle" class="text-white pr-2">Drinks have ice?</label>
      <input id="mixer-ice-toggle" class="ml-4" type="checkbox" v-model="drink.hasIce" />
      <small v-if="drink.hasIce" class="ml-4 block text-quaternary">(1.2x total mixer multiplier)</small>
    </fieldset>
  </form>

  <div class="results text-quaternary">
    <p>
      Your drink is
      <span :class="computedABVColourClasses" class="font-bold">{{
         `${calculateTotalDrinkABV}% ABV` 
        }}</span>
    </p>
    <p>
      There {{ calculateTotalAlcoholQuantity > 0 ? "are" : "is" }}
      <span class="font-bold" :class="computeTotalAlcoholColourClasses">{{  calculateTotalAlcoholQuantity 
        }}ml ({{  roundFloatingPoint(calculateTotalAlcoholQuantity / 10, appOptions.numberOfDecimals)  }} units)</span>
      of alcohol in your drink
    </p>
  </div>
  <div ref="preset-container" class="py-4 px-8" id="preset-container">
    <preset-input v-for="(preset, index) in spiritPresets" :key="index" :index="index" :presetName="preset.name"
      :presetQuantity="preset.spiritQuantity" @presetMeasureChanged="updatePresetInArray" @presetAdded="addPreset"
      :presetABV="preset.spiritABV" />
  </div>
</template>

<script>
import SpiritValues from './SpiritValues.vue';
import PresetInput from './PresetInput.vue';
export default {
  data() {
    return {
      drink: {
        spirits: [

        ],
        mixers: [],
        hasIce: false,

        mixersPresets: [{}],
        drinkOptions: {
          drinkName: "",

        },
      },
      spiritPresets: [
        {
          name: "Vodka",
          spiritABV: 40,
          spiritQuantity: 25
        },
        {
          name: "Gin",
          spiritABV: 40,
          spiritQuantity: 25
        },
        {
          name: "Rum",
          spiritABV: 40,
          spiritQuantity: 25
        },
        {
          name: "Whiskey",
          spiritABV: 40,
          spiritQuantity: 25
        },
        {
          name: "Tequila",
          spiritABV: 40,
          spiritQuantity: 25
        },
        {
          name: "Triple Sec",
          spiritABV: 40,
          spiritQuantity: 25
        },
        {
          name: "Jägermeister",
          spiritABV: 35,
          spiritQuantity: 25
        },

        {
          name: "40% spirit",
          spiritABV: 40,
          spiritQuantity: 25
        },
        {
          name: "37.5% spirit",
          spiritABV: 37.5,
          spiritQuantity: 25
        },
      ],
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
      return parseFloat(num.toFixed(fixed));
    },
    addSpirit() {
      this.drink.spirits.push({
        name: '',
        spiritABV: 0,
        spiritQuantity: 0
      })
    },
    addMixer() {
      this.drink.mixers.push({
        name: '',
        mixerQuantity: 0
      })
    },
    addPreset(payload) {
      console.log(payload);
      const preset = this.spiritPresets[payload];
      //if this preset naem and ABV already exists in drinks.spirits, update the quantity
      const existingPreset = this.drink.spirits.find(spirit => spirit.name.toLowerCase() === preset.name.toLowerCase() && spirit.spiritABV === preset.spiritABV);
      if (existingPreset) {
        existingPreset.spiritQuantity += preset.spiritQuantity;
      } else {
        const presetObject = { ...preset };
        this.drink.spirits.push(presetObject);
      }

    },
    updatePresetInArray(payload) {
      console.log(payload);
      this.spiritPresets[payload.index].spiritQuantity = parseInt(payload.value);
    },
    exportDrink() {
      //export a text list of all spirits and mixers in the drink
      const drinkName = this.drink.drinkOptions.drinkName;
      const drinkSpirits = this.drink.spirits;
      const drinkMixers = this.drink.mixers;
      const drinkMixersText = drinkMixers.map(mixer => `${mixer.name} ${mixer.mixerQuantity}ml`).join("\n");
      const drinkHasIce = this.drink.hasIce;
      const drinkSpiritsText = drinkSpirits.map(spirit => `${spirit.name} ${spirit.spiritQuantity}ml (${spirit.spiritABV}%)`).join("\n");
      let drinkList = `Check out this crazy 🤪 drink I just created.\n\nSpirits:\n${drinkName} ${drinkSpiritsText} \nMixers:\n ${drinkMixersText} ${drinkHasIce ? "with ice" : ""} \nI call it ${drinkName}. It's ${this.calculateTotalDrinkABV}% alcohol by volume and has ${this.roundFloatingPoint(this.calculateTotalAlcoholQuantity / 10, this.appOptions.numberOfDecimals)} units of alcohol in it!`;

      const button = document.getElementById("export-current-drink");
      //transition background colour
      button.classList.add("animate-[pulse_0.3s_ease-in-out_3]");
      setTimeout(() => {
        button.classList.remove("animate-[pulse_0.3s_ease-in-out_3]");
      }, 900);
      navigator.clipboard.writeText(drinkList);

      console.log(drinkList);
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
      let tot = this.calculateMixersTotalQuantity + this.calculateSpiritsTotalQuantity;
      return this.drink.hasIce ? tot * 1.2 : tot;
    },
    calculateTotalDrinkABV() {
      if (this.calculateTotalAlcoholQuantity === 0) {
        return 0;
      }
      return this.roundFloatingPoint(this.calculateTotalDrinkABVToFloatingPoint, this.appOptions.numberOfDecimals);
    },
    calculateTotalDrinkABVToFloatingPoint() {
      if (this.calculateTotalAlcoholQuantity === 0) {
        return 0;
      }
      let abvToFloatingPointPercentage = this.fractionToPercentage(this.calculateTotalAlcoholQuantityToFloatingPoint / this.calculateTotalDrinkQuantity);
      return abvToFloatingPointPercentage;
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
  components: { SpiritValues, PresetInput }
}

</script>
