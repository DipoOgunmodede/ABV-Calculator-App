<template>
    <div v-for="(preset, index) in spiritPresets" :key="index">
        {{ preset.name }}
        <label :for="`shot-input-${index}`">Volume</label>
        <input type="range" :id="`shot-input-${index}`" name="volume" min="0" v-model="preset.spiritQuantity" step="25"
            max="100">
        {{}}
        <button @click.prevent="addPreset(index)">Add preset!</button>
    </div>
</template>
<script>
export default {

    data() {
        return {
            spiritPresets: [
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
                    name: "40%er",
                    spiritABV: 40,
                    spiritQuantity: 25
                },
                {
                    name: "37.5%er",
                    spiritABV: 37.5,
                    spiritQuantity: 25
                }

            ]
        }

    },
    methods: {
        addPreset(index) {
            this.$emit("preset-added", this.spiritPresets[index])
            //this works by selecting the current index from the spiritsPreset array and emitting the entire object to the parent component
        }
    }
}
</script>