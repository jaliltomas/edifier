/* eslint-disable */
import Home from "../components/views/Home.vue";
import Products from "../components/views/Products.vue";
import ProductDetails from "../components/views/ProductDetails.vue";
import ProductFavorite from "../components/views/ProductsFavorites.vue";
import Shop from "../components/views/Shop.vue";
import Cart from "../components/cart/Cart.vue";
import Login from "../components/auth/Login.vue";
import Recovery from "../components/auth/Recovery.vue";
import Signup from "../components/auth/Signup.vue";
import Profile from "../components/auth/Profile.vue";
import Checkout from "../components/views/Checkout.vue";
import CheckoutNotification from "../components/views/CheckoutNotification.vue";
import OrderDetails from "../components/auth/utils/UserDetailsOrder.vue";
import ContactAccount from "../components/views/ContactAccount";
import AppDowload from "../components/views/AppDowload";
import AboutUs from "../components/views/AboutUs";

import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

import store from "../store/index";

const routes = [
  { path: "/", component: Home, name: "home" },
  { path: "/products", component: Products, name: "products" },
  {
    path: "/product-details/:brand/:keywords",
    component: ProductDetails,
    name: "product_details"
  },
  {
    path: "/product-favorite",
    component: ProductFavorite,
    name: "product_favorite"
  },
  {
    path: "/cart",
    component: Cart,
    name: "cart"
  },
  { path: "/login", component: Login, name: "login" },
  { path: "/recovery", component: Recovery, name: "recovery" },
  { path: "/signup", component: Signup, name: "signup" },
  {
    path: "/profile",
    component: Profile,
    name: "profile",
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/order_details",
    component: OrderDetails,
    name: "order_details",
    meta: {
      requiresAuth: true
    }
  },
  { path: "/checkout", component: Checkout, name: "checkout" },
  {
    path: "/checkout_notification",
    component: CheckoutNotification,
    name: "checkout_notifiction"
  },
  {
    path: "/contact",
    component: ContactAccount,
    name: "contact"
  },
  {
    path: "/app_dowload",
    component: AppDowload,
    name: "app_dowload"
  },
  {
    path: "/about_us",
    component: AboutUs,
    name: "aboutUs"
  },
  {
    path: "*",
    redirect: "/"
  }
];

const router = new VueRouter({
  mode: "history",
  scrollBehavior(to, from) {
    if (to.name == "products" && from.name == to.name) {
      return {};
    } else {
      return {
        x: 0,
        y: 0
      };
    }
  },
  base: process.env.BASE_URL,
  routes
});

router.beforeEach(async (to, from, next) => {
  const authUser = store.getters["auth/AUTHENTICATED"];

  // Verifico Autenticacion
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!authUser) {
      next({ path: "/login" });
    } else {
      next();
    }
  } else {
    next(); // make sure to always call next()!
  }
});

export default router;
