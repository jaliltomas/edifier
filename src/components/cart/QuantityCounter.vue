<template>

  <div id="add-to-cart-quantity">
    <span class="space">Cantidad:</span>
    <div id="quantity-counter">
      <button class="quantity-component" @click="decrementQuantity">
        -
      </button>
      <input type="number" min="1" max="99" id="quantity" placeholder="1" v-model="quantity"/>
      <button class="quantity-component" @click="incrementQuantity">
        +
      </button>
    </div>
  </div>

</template>

<script>

import Vue from 'vue'

export default Vue.extend({
  name: 'QuantityCounter',

  data () {
    return {
      quantity: this.$attrs.quantity ? this.$attrs.quantity : 1,
      productId: this.$attrs.productId
    }
  },

  methods: {
    incrementQuantity () {
      this.quantity + 1 >= 99 ? this.quantity = 99 : this.quantity++
      this.$emit('quantityChanged', this.quantity, this.productId)
    },

    decrementQuantity () {
      this.quantity - 1 <= 0 ? this.quantity += 0 : this.quantity--
      this.$emit('quantityChanged', this.quantity, this.productId)
    }
  }
})
</script>

<style scoped lang="scss">

#add-to-cart-quantity {
  display: flex;
  height: 100%;
  color: #8b8b8b;
  padding: 0 0 0 1em;
  justify-content: space-between;
  align-items: center;
}

#quantity-counter {
  display: flex;
  justify-content: space-between;
  align-items: center;

  #quantity {
    margin: 0;
    padding: 0;
    max-width: 3em;
    height: fit-content;
    border: none;
    text-align: center;
    background-color: #ffffff00;
    color: #000000;
  }

  .quantity-component {
    padding: 0;
    color: #202020;
    width: 1.5em;
    height: 1.5em;
    border: none;
    background-color: #dfdfdf;
    border-radius: 100%;
    font-size: 16px;
    font-weight: 500;
  }
}

.space {
  margin-right: 20px;
}

</style>
