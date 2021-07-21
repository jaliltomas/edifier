import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faFacebook, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons'

import {
  faHeart,
  faShoppingCart,
  faCartPlus,
  faUser,
  faTimes,
  faSortDown,
  faSearch,
  faBars,
  faHome,
  faTag,
  faStore
}
  from '@fortawesome/free-solid-svg-icons'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(
  faFacebook,
  faInstagram,
  faTwitter,
  faHeart,
  faShoppingCart,
  faTag, faStore,
  faCartPlus,
  faUser,
  faTimes,
  faSortDown,
  faSearch,
  faBars,
  faHome
)

Vue.component('font-awesome-icon', FontAwesomeIcon)
