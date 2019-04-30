<template lang="pug">
  section.page-engine
    .page-engine__content
      h1.page-engine__title
        | Search
      SearchPanel.page-engine__search

      .page-engine__pagination-panel
        uiPagination.page-engine__pagination(:total="itemsLength")

      ul.list
        li.list-item(v-for="item in items")
          | {{ item.full_name }}
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import SearchPanel from '@/components/SearchPanel';
import uiPagination from '@/ui/Pagination';

export default {
  name: 'page-engine',

  components: {
    SearchPanel,
    uiPagination,
  },

  // TODO add ListComponent
  computed: {
    ...mapState('engine', [
      'items',
    ]),

    ...mapGetters('engine', [
      'itemsLength',
    ]),
  },
};
</script>

<style lang="scss">
.page-engine {
  position: relative;
  height: 100%;
  text-align: center;

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
}
</style>
