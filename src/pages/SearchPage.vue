<template lang="pug">
  section.page-search
    .page-search__header
      .page-search__btn-history(
        :class="getHistoryBtnClass"
        title="Query history"
        @click="toggleHistory"
      )
        span.page-search__history-label Query history
        svgicon.page-search__history-icon(icon="history" custom)
      SearchPanel.page-search__search

    .page-search__content
      .page-search__empty-results(v-if="!historyLength")
        | Type a query in the search field
      SearchResults.page-search__results

    .page-search__sidebar-overlay(v-if="isHistoryActive" @click="toggleHistory")
    HistorySidebar.page-search__history-sidebar
</template>

<script>
import { mapState, mapGetters } from 'vuex';

import SearchPanel from '@/components/Search/SearchPanel';
import SearchResults from '@/components/Search/SearchResults';
import HistorySidebar from '@/components/History';

export default {
  name: 'page-search',

  components: {
    SearchPanel,
    SearchResults,
    HistorySidebar,
  },

  computed: {
    ...mapState('app', [
      'isHistoryActive',
    ]),

    ...mapGetters('search', [
      'historyLength',
    ]),

    getHistoryBtnClass() {
      return {
        'page-search__btn-history--active': this.isHistoryActive,
      };
    },
  },

  beforeRouteLeave(to, from, next) {
    this.$store.dispatch('app/setHistoryActive', { active: false });
    next();
  },

  methods: {
    toggleHistory() {
      this.$store.dispatch('app/historyToggle');
    },
  },
};
</script>

<style lang="scss">
$pageSearchHeaderHeight: $headerHeight;

.page-search {
  position: relative;
  height: 100%;
  text-align: center;

  display: flex;
  flex-direction: column;

  &__header {
    width: 100%;
    height: $pageSearchHeaderHeight;
    padding: 0 $indent-lg;
    background: $grey-1;
    border-bottom: 1px solid $grey-3;
    box-shadow: $boxShadow-dark;

    display: flex;
    align-items: center;

    // Need for display the layer correct (after main header, before content and sidebar)
    z-index: $zIndex-200;
  }

  &__btn-history {
    margin-right: $indent-md;
    padding: $indent-sm $indent-md;
    font-weight: bold;
    font-size: 15px;
    border: 1px solid $grey-4;
    border-radius: $borderRadius / 2;
    color: $blue-5;
    fill: $blue-5;
    opacity: 0.6;
    cursor: pointer;
    transition: all .5s ease;

    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-wrap: nowrap;
    flex: 0;

    &:hover {
      text-decoration: underline;
      opacity: 1;
    }

    &:active {
      color: lighten($blue-6, 25%);
      fill: lighten($blue-6, 25%);
    }
  }

  &__btn-history--active {
    border-color: $blue-4;
    background: $blue-4;
    color: $white;
    fill: $white;

    &:active {
      background: lighten($blue-6, 25%);
      color: $white;
      fill: $white;
    }
  }

  &__history-label {
    margin-right: $indent-sm;
    white-space: nowrap;
  }

  &__history-icon {
    width: 1em;
    height: 1em;
  }

  &__content {
    width: 100%;
    height: calc(100% - #{$pageSearchHeaderHeight});
    padding: $indent-md $indent-lg;
    overflow: hidden;
  }

  &__empty-results {
    padding: $indent-md;
    font-weight: bold;
    color: $blue-5;
  }

  &__sidebar-overlay {
    position: absolute;
    width: 100%;
    height: 100%;
  }

  @media screen and (max-width: $mobileScreenWidth) {
    &__header {
      padding: 0 $indent-md;
    }

    &__btn-history {
      padding: $indent-md - 1;
    }

    &__history-label {
      display: none;
    }

    &__content {
      padding: 0;
    }
  }
}
</style>
