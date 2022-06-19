<template>
    <fieldset class="spiritValuesContainer">
        <label :for="`spirit-${index}`" class="text-center">Spirit name</label>
        <input type="text" :id="`spirit-${index}`" v-model="spirit.spiritName" />
        <label :for="`total-drink-abv-${index}`" class="w-full flex flex-col my-4">{{ spirit.spiritName }} ABV in %</label>
        <input :id="`total-drink-abv-${index}`"
            class="m-4 p-4 text-3xl text-center focus-within:outline-dashed focus:outline-green-500 focus:outline-4"
            type="number" min="0" v-model="spirit.spiritABV" />

        <label :for="`total-alcohol-quantity-${index}`" class="w-full flex flex-col my-4">{{ name }} quantity in
            ml</label>
        <input :id="`total-alcohol-quantity-${index}`"
            class="m-4 p-4 text-3xl text-center focus-within:outline-dashed focus:outline-green-500 focus:outline-4"
            type="number" min="0" v-model="spirit.spiritQuantity" />
    </fieldset>
</template>

<script>
export default {
    props: ['name', 'abv', 'quantity'],
    data() {
        return {
            spirit:
            {
                //note to self: you can't mutate props, but you can set them as the value of a key/value pair inside the child component data object, and then on the parent object you can v-model the newly assigned value
                spiritName: this.name,
                spiritABV: this.abv,
                spiritQuantity: this.quantity
            },

        }
    }
}

</script>