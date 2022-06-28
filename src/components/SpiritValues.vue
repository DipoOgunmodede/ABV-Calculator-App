<template>
    <fieldset class="spiritValuesContainer">
        <label :for="`spirit-${index}`" class="text-center">Spirit name</label>
        <input type="text" :id="`spirit-${index}`" :value="modelValue.name" placeholder="Enter your alcohol name e.g. Vodka" @input="updateValue('name', $event.target.value)" />
        <label :for="`total-drink-abv-${index}`" class="w-full flex flex-col my-4">{{ modelValue.name }}ABV in
            %</label>
        <input :id="`total-drink-abv-${index}`" :value="modelValue.spiritABV" placeholder="Enter the alcohol %"
            class="m-4 p-4 text-3xl text-center focus-within:outline-dashed focus:outline-green-500 focus:outline-4"
            type="number" min="0" @input="updateValue('spiritABV', $event.target.value)" />

        <label :for="`total-alcohol-quantity-${index}`" class="w-full flex flex-col my-4">{{ modelValue.name }} Quantity in
            ml</label>
        <input :id="`total-alcohol-quantity-${index}`" :value="modelValue.spiritQuantity" placeholder="Enter your alcohol quantity in millilitres"
            class="m-4 p-4 text-3xl text-center focus-within:outline-dashed focus:outline-green-500 focus:outline-4"
            type="number" min="0" @input="updateValue('spiritQuantity', $event.target.value)" />
    </fieldset>
</template>
<script>
export default {
    props: {
        modelValue: {
            type: Object,
            required: true
        },
        index: {
            type: Number,
            required: true
        }
    },
    methods: {
        updateValue(key, value) {
            this.$emit("update:modelValue", { ...this.item, [key]: value });
        }
    }
}

</script>

<!-- Problems so far:

Writing a function to add a new component on click

Rounding problems with floating point calculation (7.1999999 rounding to 7.19) -->
<!-- add a new function to generate unique indexes -->