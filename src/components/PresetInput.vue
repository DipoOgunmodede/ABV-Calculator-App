<template>
    <label :for="`shot-input-${index}`">{{ presetName }}</label>
    <input type="range" :id="`shot-input-${index}`" name="volume" min="0" :value="presetQuantity"
        @change="updatePreset($event)" step="25" max="100" list="tickmarks" class="measure-selector">
    <datalist id="tickmarks">
        <option value="25" label="1"></option>
        <option value="50" label="2"></option>
        <option value="75" label="3"></option>
        <option value="100" label="4"></option>
    </datalist>
    <!-- this is hella confusing BUT this index has been passed down from the parent component. There is an array of spirit presets, and the index is passed from that array on the parent data object to this child object -->
    <button @click.prevent="emitSelectedPresetIndex(index)">Add {{ calculateMeasure }}</button>
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
        },

        updatePreset(event) {
            const payload = {
                value: event.target.value, 
                index: this.index
            };
            this.$emit('presetMeasureChanged', payload)
        }
    },
    computed:{
        calculateMeasure() {
            return `${this.presetQuantity}ml`;
        }
    }
}
</script>   