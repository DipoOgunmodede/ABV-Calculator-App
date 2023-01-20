<template>
    <div class="my-10 flex flex-col">
        <label class="text-gray-300" :ref="`preset-label-${index}`" :for="`shot-input-${index}`">{{ presetName }}</label>
        <input type="range" :id="`shot-input-${index}`" name="volume" min="0" :value="presetQuantity"
            @change="updatePreset($event)" step="25" max="100" list="tickmarks" class="measure-selector my-4">
        <datalist id="tickmarks">
            <option value="25" label="25ml"></option>
            <option value="50" label="2"></option>
            <option value="75" label="3"></option>
            <option value="100" label="4"></option>
        </datalist>
        <!-- this is hella confusing BUT this index has been passed down from the parent component. There is an array of spirit presets, and the index is passed from that array on the parent data object to this child object -->
        <div class="flex justify-center"><button
                class="px-4 py-2 hover:border-gray text-gray-300 hover:text-white rounded border-2 border-secondary "
                @click.prevent="emitSelectedPresetIndex(index)">Add {{ calculateMeasure }}</button></div>
    </div>
</template>
<script>
export default {
    props: {
        index: { type: Number, required: true },
        presetName: { type: String, required: false, default: '' },
        presetABV: { type: Number, required: false, default: 0 },
        presetQuantity: { type: Number, required: false, default: 0 },
    },
    methods: {
        emitSelectedPresetIndex() {
            this.$emit('presetAdded', this.index);
            //this.index here is referring to the index in props above
            // this.$refs["preset-container"].scrollIntoView({ behavior: "smooth" });
            //doesn't work: doesn't scroll into view at all let alone smoothly
        },

        updatePreset(event) {
            const payload = {
                value: event.target.value,
                index: this.index
            };
            this.$emit('presetMeasureChanged', payload)
        }
    },
    computed: {
        calculateMeasure() {
            return `${this.presetQuantity}ml`;
        }
    }
}
</script>   