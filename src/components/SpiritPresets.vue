<template>
    <div v-for="(preset, index) in spiritPresets" :key="index">
        {{ preset.name }}
        <label :for="`shot-input-${index}`">Volume</label>
        <input type="range" :id="`shot-input-${index}`" name="volume" min="0" value="25" step="25" max="250">
    </div>
    <button @click.prevent="addSpirit">Add preset</button>
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

    }
}
</script>