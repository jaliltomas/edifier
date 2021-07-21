<template>
  <div id="shop">

    <div id="header">
      <h1>TIENDA</h1>
      <div id="links">
        <router-link to="/">HOME SHOP</router-link> / <span>TIENDA</span>
      </div>
    </div>

    <div id="categories-and-products" v-if="!loading">

      <div id="categories-list-wrapper">
        <h4>CATEGORIAS</h4>
        <ul id="categories-list">
          <li class="category" v-for="category in categories" :key="category.id"
            :class="{ selected: category.id.toString() === filters.categoryId}"
            @click="setCategoryFilter(category.id.toString())">

            <h5 class="category-header">{{ category.name }}</h5>
          </li>
        </ul>
      </div>

      <span id="result-count" v-if="$refs.products">
        Mostrando {{ pageItemsCount }} resultados
      </span>

      <paginate name="products" class="products-list" ref="products" :list="filteredProducts" :per="6">
        <li class="product" v-for="product in paginated('products')" :key="product.id">
          <div class="product-overlay">

            <div class="overlay-buttons">
              <button class="overlay-button" @click="addToCartAndPushRoute({ product: product, quantity: 1 })">
                <font-awesome-icon class="icon" :icon="['fas', 'shopping-cart']"/>
              </button>
              <button class="overlay-button details-button" @click="goToProductDetails(product.id)">Detalles</button>
              <button class="overlay-button" @click="addToFavorites(product)">
                <font-awesome-icon :icon="['fas', 'heart']" class="icon"/>
              </button>
            </div>

          </div>

          <img class="product-img" :src="storageAp + product.pictures.big[0]"
            :alt="product.title" :title="product.title">

          <h4 class="product-name">{{ product.title }}</h4>
          <p class="product-price">${{ product.retail_price }}</p>
        </li>
      </paginate>

    </div>
    <div v-else>Loading....</div>

    <paginate-links for="products" :async="true"></paginate-links>

  </div>
</template>

<script>

import Vue from 'vue'
import { mapActions, mapGetters, mapMutations } from 'vuex'
import VuePaginate from 'vue-paginate'

Vue.use(VuePaginate)

export default {
  name: 'Shop',

  data () {
    return {
      categories: [],
      products: [],
      filters: {
        categoryId: this.$router.currentRoute.query.cid ? this.$router.currentRoute.query.cid.toString() : null
      },
      loading: true,
      error: false,
      paginate: ['products']
    }
  },

  computed: {
    storageAp () { return process.env.VUE_APP_STORAGE_AP },
    defaultToken () { return this.getDefaultToken() },
    filteredProducts () { return this.getFilteredProducts() },
    pageItemsCount () { return this.$refs.products.pageItemsCount.replace('of', 'de') }
  },

  watch: {
    async defaultToken () {
      this.getPageContent()
    }
  },

  methods: {
    ...mapGetters({
      getToken: 'auth/GET_TOKEN',
      getDefaultToken: 'auth/GET_DEFAULT_TOKEN',
      getCategories: 'products/GET_CATEGORIES',
      getProducts: 'products/GET_PRODUCTS'
    }),

    ...mapActions({
      retrieveCategories: 'products/RETRIEVE_CATEGORIES',
      retrieveProducts: 'products/RETRIEVE_PRODUCTS'
    }),

    ...mapMutations({
      addToCart: 'cart/ADD_ITEM',
      addToFavorites: 'favorites/ADD_ITEM'
    }),

    async getPageContent () {
      try {
        // if categories or products are not found on the state, retrieve them from server
        this.categories = this.getCategories() ? this.getCategories() : await this.retrieveCategories()
        this.products = this.getProducts() ? this.getProducts() : await this.retrieveProducts()
      } catch (error) {
        this.error = true
        console.error(error)
      }
      // no matter if we fail or not, we are done loading todo: we show the error message when we are done
      this.loading = false
    },

    getFilteredProducts () {
      // get the products array
      let fp = this.products
      if (this.filters.categoryId) {
        fp = this.filterByCategory(fp, this.filters.categoryId)
      }
      return fp
    },

    filterByCategory (array, categoryId) {
      // find the name of the category that we have
      const category = this.categories.find(p => categoryId.toString() === p.id.toString())
      return array.filter(p => p.category === category.name)
    },

    setCategoryFilter (categoryId) {
      if (this.filters.categoryId !== categoryId) {
        // set the new filter (since the filtered products array is computed it automatically updates the view)
        this.filters.categoryId = categoryId
        // update the URL
        this.$router.replace({ path: 'shop', query: { cid: categoryId } })
      } else {
        this.filters.categoryId = null
        this.$router.replace({ path: 'shop', query: null })
      }
    },

    goToProductDetails (productId) {
      this.$router.push({ path: 'product-view', query: { pid: productId } })
    },

    addToCartAndPushRoute (productToAdd) {
      this.addToCart(productToAdd)
      this.$router.push({ path: '/cart' })
    }
  },

  async created () {
    if (this.getToken()) {
      this.getPageContent()
    } else {
      this.error = true
    }
  }
}
</script>

<style scoped lang="scss">

@import '@/assets/vars.scss';

a {
  font-weight: 600;
}

h4 {
  margin: 0;
}

#shop {
  display: flex;
  flex-direction: column;
}

#categories-and-products {
  display: flex;
  flex-wrap: wrap;
  position: relative;
}

#categories-list-wrapper {
  display: flex;
  flex-direction: column;
  flex: 0 0 auto;
  margin: 0 3em 0 0;

  h4 {
    margin: 0 0 1.5em 0;
  }
}

#categories-list {
  flex-direction: column;
}

#result-count {
  display: flex;
  flex: 1 0 100%;
  height: fit-content;
  position: absolute;
  left: 26%;
  font-size: .8em;
  color: #909090;

  @media only screen and (max-width: 700px) {
    position: initial;
    left: initial;
    top: initial;
    justify-content: center;
  }
}

.category-header {
  padding: 1em;
  font-weight: 500;
}

.category {
  margin: .4em 0 .4em 0;
  cursor: pointer;
}

.selected {
  background-color: #303030;
  color: #f5f5f5;
}

.products-list {
  display: flex;
  flex-wrap: wrap;
  flex: 1;
  margin: 2em 0 0 0;
}

.product {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: fit-content;
  text-align: center;
  margin: 0 auto 3em auto;
  flex: 0 1 30%;

  @media only screen and (max-width: 700px) {
    flex: 0 1 100%;
    margin: 1em auto 2em auto;
  }
}

.product-name {
  margin: .4em 0 0 0;
}

.product-price {
  color: #b0b0b0;
  margin: .4em;
}

.product-img {
  width: $relatedProductImgWidth;
  height: $relatedProductImgHeight;
  object-fit: contain;
}

.product-overlay {
  position: absolute;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  height: $relatedProductImgHeight;
  width: 100%;
  opacity: 0%;
  background-color: #ffffffd0;

  &:hover {
    opacity: 100%
  }
}
.overlay-buttons {
  display: flex;
  justify-content: center;
}

.overlay-button {
  padding: .5em;
  margin: 0 .2em 0 .2em;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #00000000;
  color: #303030;
  border: 1px solid #303030;

  &:hover {
    background-color: #303030;
    color: #FFFFFF;
  }
}

.details-button {
  background-color: #303030;
  color: #f5f5f5;
  padding: .5em 1em .5em 1em;
}

</style>

<style lang="scss" >

.paginate-links {
  display: flex;
  justify-content: flex-end;
}

.number {
  min-width: 35px;
  min-height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 .1em 0 .1em;
  border: 1px solid #e0e0e0;

  a {
    font-weight: 400;
    cursor: pointer;
    padding: .4em;
  }
}

.active {

  background-color: #303030;
  a {
    color: #f5f5f5;
  }
}
</style>
