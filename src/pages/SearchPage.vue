<template lang="pug">
  section.page-search
    .page-search__header
      SearchPanel.page-search__search

    .page-search__content
      .page-search__empty-results(v-if="!historyLength")
        | Type a query in the search field
      SearchResults.page-search__results
</template>

<script>
import { mapGetters } from 'vuex';

import SearchPanel from '@/components/Search/SearchPanel';
import SearchResults from '@/components/Search/SearchResults';

export default {
  name: 'page-search',

  components: {
    SearchPanel,
    SearchResults,
  },

  computed: {
    ...mapGetters('search', [
      'historyLength',
    ]),
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

  @media screen and (max-width: $mobileScreenWidth) {
    &__content {
      padding: 0;
    }
  }
}
</style>
