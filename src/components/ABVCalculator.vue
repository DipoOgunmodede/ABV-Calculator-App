<template>
  <form id="abvCalc" class="max-w-48 flex flex-col">
    <label class="justify-center w-full flex flex-col my-4"
      >Spirit ABV in %
      <input
        class="m-4 p-4 text-3xl text-center focus-within:outline-dashed focus:outline-green-500 focus:outline-4"
        type="number"
        v-model="spiritABV"
        id="ABV"
        placeholder="37.5"
      />
    </label>
    <label class="justify-center w-full flex flex-col my-4"
      >Spirit quantity in ml
      <input
        class="m-4 p-4 text-3xl text-center focus-within:outline-dashed focus:outline-green-500 focus:outline-4"
        type="number"
        v-model="spiritQuantity"
        id="alcoholQuantity"
        placeholder="50"
      />
    </label>
    <label class="justify-center w-full flex flex-col my-4"
      >Mixer quantity in ml
      <input
        class="m-4 p-4 text-3xl text-center focus-within:outline-dashed focus:outline-green-500 focus:outline-4"
        type="number"
        v-model="mixerQuantity"
        id="mixerQuantity"
        placeholder="330"
      />
    </label>
  </form>

  <div class="results">
    <p>Your drink is <span :class="computedABVColourClasses" class="font-bold">{{ `${calculateTotalDrinkABV}% ABV` }}</span>
    </p>
    <p>
      There is <span class="font-bold" :class="computeTotalAlcoholColourClasses">{{ calculateTotalAlcoholQuantity }}ml</span> of alcohol in your drink
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      spiritABV: 37.5,
      spiritQuantity: 50,
      mixerQuantity: 330,
    };
  },
  computed: {
    abvToDecimal() {
      return this.spiritABV / 100;
    },
    calculateTotalAlcoholQuantity() {
      return this.spiritQuantity * this.abvToDecimal;
    },
    totalDrinkQuantity() {
      return this.mixerQuantity + this.spiritQuantity;
    },
    calculateTotalDrinkABV() {
      return this.totalDrinkQuantity == 0
        ? 0
        : (
            (this.calculateTotalAlcoholQuantity / this.totalDrinkQuantity) *
            100
          ).toFixed(2);
    },
    computedABVColourClasses(){
    
      if (this.calculateTotalDrinkABV >=2.8 && this.calculateTotalDrinkABV < 6){
        return "text-green-600";
      }

      if (this.calculateTotalDrinkABV >= 6 && this.calculateTotalDrinkABV < 10){
        return "text-amber-400";
      }
       if (this.calculateTotalDrinkABV >= 10){
        return "text-red-600";
      }
      
        return "text-green-400";
    },
     computeTotalAlcoholColourClasses(){

        if (this.calculateTotalAlcoholQuantity >=25 && this.calculateTotalAlcoholQuantity < 50){
        return "text-green-600";
      }

      if (this.calculateTotalAlcoholQuantity >=50 && this.calculateTotalAlcoholQuantity < 75){
        return "text-amber-400";
      }
      if (this.calculateTotalAlcoholQuantity >=75){
         return "text-red-600";
      }
     return "text-green-400";
    }
  },
};
</script>