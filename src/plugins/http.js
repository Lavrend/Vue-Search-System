// Use Axios
// Details: https://github.com/axios/axios

import Vue from 'vue';
import Axios from 'axios';

import config from '@/config';

Axios.defaults.headers.common.Accept = 'application/json';

Vue.use({
  install() {
    const http = Axios.create({
      baseURL: config.API_HOST,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Vue prototype helper
    Vue.http = http;
    Vue.prototype.$http = http;
  },
});
