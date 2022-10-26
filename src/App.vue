<template lang="pug">
  .app
    .app__loading(v-if="!isAppReady")
      | Loading...

    transition(name="transition-zoom" mode="out-in")
      component.app__wrapper(
        v-if="isAppReady"
        :is="getLayout"
      )
        router-view
</template>

<script>
import { mapState, mapActions } from 'vuex';

// Layouts
import LayoutHome from '@/layouts/Home';
import LayoutDefault from '@/layouts/Default';

export default {
  name: 'App',

  components: {
    LayoutHome,
    LayoutDefault,
  },

  computed: {
    ...mapState('app', [
      'isAppReady',
    ]),

    getLayout() {
      const metaLayout = this.$route.meta.layout;

      return metaLayout === 'home'
        ? 'LayoutHome'
        : 'LayoutDefault';
    },
  },

  mounted() {
    this.$nextTick(() => {
      this.setPageReady(true);
    });
  },

  methods: {
    ...mapActions('app', [
      'setPageReady',
    ]),
  },
};
</script>

<style lang="scss">
@import "~@/styles/app";

.app {
  position: relative;
  width: 100%;
  height: 100%;
  font-family: $mainFont;
  overflow: hidden;

  user-select: none;

  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  &__loading {
    width: 100%;
    padding: $indent-xl;
    font-size: 20px;
    color: $dark;
    text-align: center;
  }

  &__wrapper {
    width: 100%;
    height: 100%;
    overflow: hidden;

    @media screen and (max-width: $minWidth-app) {
      overflow-x: auto;
    }
  }
}
</style>
