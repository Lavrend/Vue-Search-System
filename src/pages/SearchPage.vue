<template lang="pug">
  section.page-search
    .page-search__header
      SearchPanel.page-search__search

    .page-search__content
      h1.page-search__title
        | Search
      .page-search__pagination-panel
        uiPagination.page-search__pagination(:total="itemsLength")

      ul.list
        li.list-item(v-for="item in items")
          | {{ item.full_name }}
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import SearchPanel from '@/components/SearchPanel';
import uiPagination from '@/ui/Pagination';

export default {
  name: 'page-search',

  components: {
    SearchPanel,
    uiPagination,
  },

  // TODO add ListComponent
  computed: {
    ...mapState('search', [
      'items',
    ]),

    ...mapGetters('search', [
      'itemsLength',
    ]),
  },
};
</script>

<style lang="scss">
.page-search {
  position: relative;
  height: 100%;
  text-align: center;

  &__header {
    width: 100%;
    height: $headerHeight;
    padding: 0 $indent-lg;
    background: $grey-1;
    border-bottom: 1px solid $grey-3;
  }

  &__content {
    height: 100%;
    padding-bottom: $indent-md;
    overflow-y: auto;
  }

  &__title {
    color: $blue-4;
    margin-bottom: 0;
  }

  &__pagination-panel {
    height: 50px;
  }

  &__spinner {
    width: 50px;
    height: 50px;
  }
}
</style>
