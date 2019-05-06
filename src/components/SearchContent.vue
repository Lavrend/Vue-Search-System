<template lang="pug">
  .search-content
    transition(name="transition-scale" mode="out-in")
      .search-content__wrapper(v-if="getResultsLength" :key="`search-content-${getHistoryLength}`")
        ResultHeader.search-content__header(@changeTab="changeTab" @closeTab="closeTab")
        ResultBody.search-content__body(:transitionName="transitionName" @closeTab="closeTab")
</template>

<script>
import { mapState, mapGetters } from 'vuex';

import ResultHeader from '@/components/SearchResult/ResultHeader';
import ResultBody from '@/components/SearchResult/ResultBody';

export default {
  name: 'search-content',

  components: {
    ResultHeader,
    ResultBody,
  },

  computed: {
    ...mapState('search', [
      'currentItem',
      'transitionName',
    ]),

    ...mapGetters('search', [
      'getHistoryLength',
      'getResultsLength',
    ]),
  },

  methods: {
    changeTab(item) {
      this.$store.dispatch('search/setTransitionName', item);
      this.$store.dispatch('search/clearHistoryItem');
      this.$store.dispatch('search/setCurrentItem', item.id);
    },

    closeTab(item) {
      this.$store.dispatch('search/closeActiveHistory', item);
    },
  },
};
</script>

<style lang="scss">
.search-content {
  position: relative;
  width: 100%;
  height: 100%;
  max-width: $maxWidth-searchResult;
  margin: 0 auto;

  &__wrapper {
    width: 100%;
    height: 100%;
    background: rgba($white, 0.9);
    border-radius: $borderRadius;
    box-shadow: $boxShadow-black;
    overflow: hidden;
  }

  &__tab-content--history {
    background: $yellow-1;
  }

  @media screen and (max-width: $screenWidth-mobile) {
    padding: 0;

    &__wrapper {
      height: 100%;
      background: none;
      border-radius: 0;
      box-shadow: none;
    }

    &__header {
      display: none;
    }

    &__tab-content--history {
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
      background: $yellow-4;
    }
  }
}
</style>
