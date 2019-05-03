<template lang="pug">
  vue-svgicon.ui-svgicon(
    :icon="icon"
    :width="getWidth"
    :height="getHeight"

    :name="name"
    :scale="scale"
    :dir="dir"
    :color="color"
    :fill="fill"
    :original="original"
  )
</template>

<script>
import Vue from 'vue';
import * as svgicon from 'vue-svgicon';

export default {
  name: 'ui-svgicon',

  components: {
    'vue-svgicon': svgicon,
  },

  props: {
    icon: {
      type: String,
      required: true,
      validator(icon) {
        if (!Vue.svgicon(icon).data) {
          console.error(`Undefined svgicon: ${icon}`);
          return false;
        }

        return true;
      },
    },

    width: {
      type: [String, Number],
      default: '',
    },

    height: {
      type: [String, Number],
      default: '',
    },

    // For set custom sizes from styles
    custom: {
      type: Boolean,
      default: false,
    },

    // Rarely used props for vue-svgicon
    name: String,
    scale: String,
    dir: String,
    color: String,
    fill: Boolean,
    original: Boolean,
  },

  computed: {
    currentIcon() {
      return this.$svgicon(this.icon);
    },

    getWidth() {
      if (this.custom) {
        return '';
      }

      if (this.width && typeof this.width === 'number') {
        return `${this.width}px`;
      }

      return this.width || String(this.currentIcon.width);
    },

    getHeight() {
      if (this.custom) {
        return '';
      }

      if (this.height && typeof this.height === 'number') {
        return `${this.height}px`;
      }

      return this.height || String(this.currentIcon.height);
    },
  },
};
</script>
