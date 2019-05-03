import Vue from 'vue';

// https://www.npmjs.com/package/vue-svgicon
// Icons get from https://fontawesome.com/icons
// and https://www.svgrepo.com/
import * as svgicon from 'vue-svgicon';
import '@/compiledIcons';

import ui_svgicon from '@/ui/svgicon';

Vue.use({
  install(instance) {
    const getIcon = (key) => {
      const icon = svgicon.icons[key];

      return icon || {};
    };

    instance.svgicon = getIcon;
    instance.prototype.$svgicon = getIcon;
  },
});

// Interlayer for vue-svgicon component
Vue.component('svgicon', ui_svgicon);
