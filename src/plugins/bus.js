import Vue from 'vue';

Vue.use({
  install() {
    const bus = new Vue();

    // Vue prototype helper
    Vue.bus = bus;
    Vue.prototype.$bus = bus;
  },
});
