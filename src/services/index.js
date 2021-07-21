import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.VUE_APP_MAIN_AP,
  // timeout: 2000,
  headers: {
    'Access-Control-Allow-Origin': process.env.VUE_APP_MAIN_AP,
  },
});

export const decentralized = axios.create({
  baseURL: process.env.VUE_APP_DECENTRALIZED,
  // timeout: 2000,
  headers: {
    'Access-Control-Allow-Origin': process.env.VUE_APP_DECENTRALIZED,
  },
});

export const product = axios.create({
  baseURL: process.env.VUE_APP_PRODUCT,
  // timeout: 2000,
  headers: {
    'Access-Control-Allow-Origin': process.env.VUE_APP_PRODUCT,
  },
});

export const users = axios.create({
  baseURL: process.env.VUE_APP_USERS,
  // timeout: 2000,
  headers: {
    'Access-Control-Allow-Origin': process.env.VUE_APP_USERS,
  },
});

export const store = axios.create({
  baseURL: process.env.VUE_APP_STORE,
  // timeout: 2000,
  headers: {
    'Access-Control-Allow-Origin': process.env.VUE_APP_STORE,
  },
});