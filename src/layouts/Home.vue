<template lang="pug">
    main.layout-home__content
      transition(name="transition-zoom" mode="out-in")
        slot
</template>

<script>
import LayoutHeader from '@/components/Header';

export default {
  name: 'layout-home',

  components: {
    LayoutHeader,
  },
};
</script>

<style lang="scss">
.layout-home {
  position: relative;
  width: 100%;
  height: 100%;
  background: $dark;

  display: flex;
  flex-flow: column nowrap;

  &__header {
    position: absolute;
    width: 100%;
    height: $height-header;
    min-width: $minWidth-app;
    text-align: left;

    // Need for display the layer correct (above content layer)
    z-index: $zIndex-200;
  }

  &__header-wrapper {
    width: 100%;
    height: 100%;
    max-width: $maxWidth-app;
    margin: 0 auto;
    padding: 0 $indent-lg;

    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__logo {
    font-size: 20px;
    font-weight: bold;
    white-space: nowrap;
    color: $white;
    flex: 0;
  }

  &__logo {
    font-size: 20px;
    font-weight: bold;
    white-space: nowrap;
    color: $white;
  }

  &__content {
    width: 100%;
    height: 100%;
    min-width: $minWidth-app;
    color: $white;

    // overflow-y: auto;
    overflow: hidden;
  }
}
</style>
