<template lang="pug">
  section.modal
    .modal__position-wrapper
      .modal__container
        component.modal__content(:is="getCurrentModalName" :data="getCurrentModalData")

        uiButton.modal__btn-close(
          color="error"
          isRounded
          @click="closeModal"
        )
          svgicon.modal__btn-close-icon(icon="close" custom)
</template>

<script>
import { mapState } from 'vuex';
import uiButton from '@/ui/Button';

export default {
  name: 'modal-component',

  components: {
    ModalInfo: () => import('@/components/Modals/ModalInfo'),
    uiButton,
  },

  computed: {
    ...mapState('app', [
      'currentModal',
    ]),

    getCurrentModalName() {
      return this.currentModal && this.currentModal.name ? this.currentModal.name : 'ModalInfo';
    },

    getCurrentModalData() {
      return this.currentModal && this.currentModal.data ? this.currentModal.data : {};
    },
  },

  methods: {
    closeModal() {
      this.$store.dispatch('app/closeModal');
    },
  },
};
</script>

<style lang="scss">
.modal {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  padding: $indent-lg;

  // Need for display the layer correct (after overlay)
  z-index: $zIndexOverlay;

  &__position-wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__container {
    position: relative;
    width: $width-modal;
    min-width: $minWidth-app;
    max-width: $maxWidth-app;
    min-height: 25%;
    margin: 0 auto;
  }

  &__content {
    width: 100%;
    max-height: calc(100vh - #{$indent-md * 2});
    padding: $indent-lg;
  }

  &__btn-close {
    position: absolute;
    top: -$indent-sm;
    right: -$indent-sm;
    padding: $indent-sm;
    padding-bottom: $indent-sm - 2;
  }

  &__btn-close-icon {
    width: 2em;
    height: 2em;
  }
}
</style>
