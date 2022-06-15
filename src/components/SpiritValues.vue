<template>
<fieldset class="spiritValuesContainer">
      <!-- <label :for="`spirit-${index}`" class="text-center">Spirit name</label>        -->
      <!-- <input type="text" :id="`spirit-${index}`" :value="name" /> -->
      <label :for="`total-drink-abv-${index}`" class="w-full flex flex-col my-4">{{ name }} ABV in %</label>
      <input :id="`total-drink-abv-${index}`"
        class="m-4 p-4 text-3xl text-center focus-within:outline-dashed focus:outline-green-500 focus:outline-4"
        type="number" min="0" :value="ABV"  />

      <label :for="`total-alcohol-quantity-${index}`" class="w-full flex flex-col my-4">{{ name }} quantity in
        ml</label>
      <input :id="`total-alcohol-quantity-${index}`"
        class="m-4 p-4 text-3xl text-center focus-within:outline-dashed focus:outline-green-500 focus:outline-4"
        type="number" min="0" />
    </fieldset>
</template>

<script>
    export default{
        props: ['name', 'abv', 'quantity'],
        data(){
            return{
                    spirit:
                        {
                            spiritName:'Gin',
                            spiritABV:40,
                            spiritQuantity:100
                        },
                    
                }
            }
        }
    
</script>