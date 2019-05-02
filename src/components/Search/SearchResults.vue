<template lang="pug">
  .search-results
    transition(name="transition-scale" mode="out-in")
      .search-results__content(v-if="limitHistory.length" :key="`results-${limitHistory.length}`")
        nav.search-results__nav-tabs
          a.search-results__tab(
            v-for="item, index in limitHistory"
            :key="`tab-${index}`"
            :class="getTabClass(index)"
            :title="getHistoryQuery(index)"
            @click="changeTab(index)"
          ) {{ getHistoryQuery(index) }}

        transition-group.search-results__tab-body(:name="transitionName" tag="div")
          ResultsTab.search-results__tab-content(
            v-for="item, index in limitHistory"
            v-show="currentTab === index"
            :key="`tab-content-${index}`"
            :class="getTabContentClass(index)"
            :query="getHistoryQuery(index)"
            :items="getHistoryItems(index)"
          )
</template>

<script>
import { mapState } from 'vuex';
import ResultsTab from '@/components/Search/ResultsTab';

export default {
  name: 'search-results',

  components: {
    ResultsTab,
  },

  data() {
    return {
      transitionName: 'transition-fade',
    };
  },

  computed: {
    ...mapState('search', [
      'limitHistory',
      'currentTab',
    ]),

    getTitle() {
      if (!this.limitHistory[this.currentTab]) return '';
      return this.limitHistory[this.currentTab].query;
    },
  },

  methods: {
    getTabClass(index) {
      return {
        [`search-results__tab--${index}`]: true,
        'search-results__tab--active': this.currentTab === index,
      };
    },

    getTabContentClass(index) {
      return {
        [`search-results__tab-content--${index}`]: true,
        'search-results__tab-content--active': this.currentTab === index,
      };
    },

    getHistoryQuery(index) {
      const item = this.limitHistory[index];

      return item && item.query ? `${item.id} - ${item.query}` : '';
    },

    getHistoryItems(index) {
      const item = this.limitHistory[index];

      return item && item.items ? item.items : [];
    },


    changeTab(tabIndex) {
      if (this.currentTab === tabIndex) return;

      this.transitionName = this.currentTab < tabIndex ? 'transition-slide-left' : 'transition-slide-right';
      this.$store.dispatch('search/setCurrentTab', {
        tabIndex,
      });
    },
  },
};
</script>

<style lang="scss">
$tabHeight: 40px;

.search-results {
  width: 100%;
  height: 100%;
  max-width: $searchListMaxWidth;
  margin: 0 auto;

  &__content {
    width: 100%;
    height: 100%;
    background: rgba($white, 0.9);
    border-radius: $borderRadius;
    box-shadow: $boxShadow-black;
    overflow: hidden;
  }

  &__nav-tabs {
    height: $tabHeight;
    font-size: 18px;
    font-weight: bold;
    line-height: 1;
    display: flex;
  }

  &__tab {
    padding: $indent-md $indent-lg;
    background: $grey-4;
    border-right: 1px solid $grey-5;
    border-bottom: 3px solid $grey-5;
    color: $grey-6;
    text-align: left;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    transition: all .5s ease;
    cursor: pointer;
    flex: 1;

    &:last-child {
      border-right: 0;
    }
  }

  &__tab:not(.search-results__tab--active):hover {
    background: $grey-2;
  }

  &__tab--active {
    background: $blue-3;
    border-bottom-color: $blue-4;
    color: $white;
    cursor: default;
  }

  &__tab-body {
    position: relative;
    width: 100%;
    height: calc(100% - #{$tabHeight});
  }

  @media screen and (max-width: $mobileScreenWidth) {
    padding: 0;

    &__title {
      display: none;
    }

    &__content {
      height: 100%;
      background: none;
      border-radius: 0;
      box-shadow: none;
    }

    &__nav-tabs {
      display: none;
    }

    &__tab-body {
      height: 100%;
      padding: $indent-md;
      overflow-y: auto;
    }
  }
}
</style>
