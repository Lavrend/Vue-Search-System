<template lang="pug">
  .search-results
    transition(name="transition-scale" mode="out-in")
      .search-results__content(v-if="getLimitHistoryLength" :key="`results-${getLimitHistoryLength}`")
        nav.search-results__nav-tabs
          a.search-results__tab(
            v-for="item, index in limitHistory"
            :key="`tab-${index}`"
            :class="getTabClass(index)"
            :title="getQueryLabel(index)"
            @click="changeTab(index, item.id)"
          ) {{ getQueryLabel(index) }}

          transition(name="transition-scale")
            a.search-results__tab(
              v-if="hasTabHistoryActive"
              :class="getTabHistoryClass"
            )
              svgicon.search-results__tab-icon(icon="history" custom)
              span.search-results__tab-label {{ currentHistoryItem.query }}

        transition-group.search-results__tab-body(:name="transitionName" tag="div")
          ResultsTab.search-results__tab-content(
            v-if="hasTabHistoryActive"
            :key="`tab-content-${getLimitHistoryLength}`"
            :class="getTabContentHistoryClass"
            :query="currentHistoryItem.query"
            :items="currentHistoryItem.items ? currentHistoryItem.items : []"
            isHistory
          )

          ResultsTab.search-results__tab-content(
            v-for="item, index in limitHistory"
            v-show="!hasTabHistoryActive && currentTab === index"
            :key="`tab-content-${index}`"
            :class="getTabContentClass(index)"
            :query="getQueryLabel(index)"
            :items="getQueryItems(index)"
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
      'currentHistoryItem',
      'currentTab',
    ]),

    getTitle() {
      if (!this.limitHistory[this.currentTab]) return '';
      return this.limitHistory[this.currentTab].query;
    },

    getLimitHistoryLength() {
      return this.limitHistory.length;
    },

    getTabHistoryClass() {
      return {
        [`search-results__tab--${this.getLimitHistoryLength}`]: true,
        'search-results__tab--active': this.hasTabHistoryActive,
        'search-results__tab--history': true,
      };
    },

    getTabContentHistoryClass() {
      return {
        [`search-results__tab-content--${this.getLimitHistoryLength}`]: true,
        'search-results__tab-content--active': !this.hasTabHistoryActive,
        'search-results__tab-content--history': true,
      };
    },

    hasTabHistoryActive() {
      return !!this.currentHistoryItem;
    },
  },

  methods: {
    getTabClass(index) {
      return {
        [`search-results__tab--${index}`]: true,
        'search-results__tab--active': !this.hasTabHistoryActive && this.currentTab === index,
      };
    },

    getTabContentClass(index) {
      return {
        [`search-results__tab-content--${index}`]: true,
        'search-results__tab-content--active': !this.hasTabHistoryActive && this.currentTab === index,
      };
    },

    getQueryLabel(index) {
      const item = this.limitHistory[index];

      return item && item.query ? `${item.id}. ${item.query}` : '';
    },

    getQueryItems(index) {
      const item = this.limitHistory[index];

      return item && item.items ? item.items : [];
    },


    changeTab(tabIndex, tabId) {
      if (!this.hasTabHistoryActive && this.currentTab === tabIndex) return;
      this.transitionName = this.currentTab < tabIndex ? 'transition-slide-left' : 'transition-slide-right';

      this.$store.dispatch('search/clearCurrentHistoryItem');

      this.$store.dispatch('search/setCurrentHistoryActiveId', {
        id: tabId,
      });

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
    font-size: 16px;
    font-weight: bold;
    line-height: 1;
    display: flex;
  }

  &__tab {
    padding: $indent-md $indent-lg;
    background: $grey-4;
    border-right: 1px solid $grey-5;
    border-bottom: 3px solid $grey-5;
    color: $grey-7;
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

  &__tab--history {
    background: $yellow-4;
    color: $white;
    fill: $white;
  }

  &__tab-icon {
    width: 1em;
    height: 1em;
    margin-right: $indent-md;
  }

  &__tab-body {
    position: relative;
    width: 100%;
    height: calc(100% - #{$tabHeight});
  }

  &__tab-content--history {
    background: $yellow-1;
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

    &__tab-content--history {
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
      background: $yellow-4;
    }
  }
}
</style>
