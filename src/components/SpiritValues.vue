<template>
    <fieldset class="spiritValuesContainer">
        <label :for="`spirit-${index}`" class="text-center">Spirit name </label>
        <input type="text" :id="`spirit-${index}`" placeholder="Enter your alcohol name e.g. Vodka"
            @input="$emit('update:name', $event.target.value)" :value="name"  class="bg-inherit"/>
        <label :for="`total-drink-abv-${index}`" class="w-full flex flex-col my-4">{{ name }} ABV in
            %</label>
        <input :id="`total-drink-abv-${index}`" placeholder="Enter the alcohol %"
            class="m-4 p-4 text-3xl text-center focus-within:outline-dashed focus:outline-green-500 focus:outline-4 bg-inherit"
            type="number" min="0" @input="$emit('update:spiritABV', $event.target.value)" :value="spiritABV" />

        <label :for="`total-alcohol-quantity-${index}`" class="w-full flex flex-col my-4">{{ name }} Quantity
            in
            ml</label>
        <input :id="`total-alcohol-quantity-${index}`" placeholder="Enter your alcohol quantity in millilitres"
            class="m-4 p-4 text-3xl text-center focus-within:outline-dashed focus:outline-green-500 focus:outline-4 bg-inherit "
            type="number" min="0" @input="$emit('update:spiritQuantity', $event.target.value)"
            :value="spiritQuantity" />
    </fieldset>
    <!-- to do: add button to remove spirit 
        <button @click.prevent="" class="text-red-500">Delete this spirit</button> -->
</template>
<script>
export default {
    props: {
        name: { type: String, required: false, default: '' },
        spiritABV: { type: Number, required: false, default: 0 },
        spiritQuantity: { type: Number, required: false, default: 0 },
    },
}

</script>

<!-- Problems so far:

Writing a function to add a new component on click

Rounding problems with floating point calculation (7.1999999 rounding to 7.19) -->
<!-- add a new function to generate unique indexes -->
<!-- form field validation, avoid number fields being negative. validate maximums -->
