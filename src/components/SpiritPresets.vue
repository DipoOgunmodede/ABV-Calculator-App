<!-- <template>
    <div v-for="(preset, index) in spiritPresets" :key="index">
        {{ preset.name }}
        <label :for="`shot-input-${index}`"></label>
        <input type="range" :id="`shot-input-${index}`" name="volume" min="0" v-model="preset.spiritQuantity" step="25"
            max="100" list="tickmarks">
        <datalist id="tickmarks">
            <option value="25" label="1"></option>
            <option value="50" label="2"></option>
            <option value="75" label="3"></option>
            <option value="100" label="4"></option>
        </datalist>

        <button @click.prevent="addPreset(index)">Add {{ calculateMeasure(preset) }}!</button>
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
                    name: "40% spirit",
                    spiritABV: 40,
                    spiritQuantity: 25
                },
                {
                    name: "37.5% spirit",
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
        },
        calculateMeasure(preset) {
            if (preset.spiritQuantity === 100) {
                return 'quad'
            }
            if (preset.spiritQuantity === 75) {
                return 'triple'
            }
            if (preset.spiritQuantity === 50) {
                return 'double'
            }
            return 'single';

        }
    },
    computed:{
        
    }
}
</script> -->