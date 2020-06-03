import Vue from "vue";
import axios from 'axios';

Object.defineProperty(Vue.prototype, "axios", {
  value: axios
});
