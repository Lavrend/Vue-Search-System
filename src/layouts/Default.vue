<template lang="pug">
  .layout-default
    LayoutHeader.layout-default__header

    main.layout-default__content
      transition(name="transition-zoom" mode="out-in")
        slot

    transition(name="transition-fade")
      .layout-default__overlay(v-show="hasModalActive")
    transition(name="transition-scale")
      Modal.layout-default__modal(v-show="hasModalActive")
</template>

<script>
import { mapGetters } from 'vuex';

import LayoutHeader from '@/components/Header';
import Modal from '@/components/Modal';

export default {
  name: 'layout-default',

  components: {
    LayoutHeader,
    Modal,
  },

  computed: {
    ...mapGetters('app', [
      'hasModalActive',
    ]),
  },
};
</script>

<style lang="scss">
.layout-default {
  position: relative;
  width: 100%;
  height: 100%;
  background: url('~@/assets/images/computer.jpg'), url($bgDefaultpageBase64);
  background-size: cover;
  background-position: center;

  display: flex;
  flex-flow: column nowrap;

  overflow: hidden;

  &__header {
    background: $blue-5;
  }

  &__content {
    width: 100%;
    height: calc(100vh - #{$height-header});
    min-width: $minWidth-app;
    background-color: rgba($white, 0.8);

    overflow: hidden;
  }

  &__overlay {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: rgba($black,  0.5);

    // Need for display the overlay correct
    z-index: $zIndexOverlay;
  }
}
</style>
