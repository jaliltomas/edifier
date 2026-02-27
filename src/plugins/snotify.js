import Vue from 'vue';
import Snotify from 'vue-snotify';

import 'vue-snotify/styles/material.css';

const options = {
  toast: {
    position: "rightTop",
    timeout: 4000,
    showProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true
  }
};

Vue.use(Snotify, options);