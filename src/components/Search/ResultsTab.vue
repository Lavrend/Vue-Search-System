<template lang="pug">
  .results-tab
    .results-tab__title(:title="query")
      | {{ query }}
      svgicon.results-tab__history-icon(v-if="isHistory" icon="history" custom)

    .results-tab__content
      .results-tab__empty-list(v-if="!getTotalItemsCount")
        | Couldn't find any repositories matching
      transition(name="transition-scale" mode="out-in")
        ul.results-tab__list(:key="getListUniqKey")
          ResultsItem.results-tab__list-item(
            v-for="item in getPaginationItems"
            :item="item"
            :key="item.id"
          )

      .results-tab__pagination-panel
        uiPagination.results-tab__pagination(
          :total="getTotalItemsCount"
          :minPages="2"
          @changePage="onChangePage"
        )
</template>

<script>
import _paginate from '@/utils/paginate';

import ResultsItem from '@/components/Search/ResultsItem';
import uiPagination from '@/ui/Pagination';

export default {
  name: 'results-tab',

  components: {
    ResultsItem,
    uiPagination,
  },

  props: {
    items: {
      type: Array,
      default: () => [],
    },

    query: {
      type: String,
      default: '',
    },

    isHistory: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      currentPage: 1,
    };
  },

  computed: {
    getListUniqKey() {
      return `${this.currentPage}_${this.query}`;
    },

    getTotalItemsCount() {
      return this.items.length;
    },

    getPaginationItems() {
      const paginationData = _paginate(this.items, this.currentPage);
      return paginationData.items;
    },
  },

  methods: {
    onChangePage(page = 1) {
      this.currentPage = page;
    },
  },
};
</script>

<style lang="scss">
.results-tab {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow-y: auto;

  &__title {
    height: 30px;
    margin-bottom: $indent-sm;
    line-height: 30px;
    color: $white;
    fill: $white;
    font-weight: bold;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: none;
  }

  &__history-icon {
    width: 1em;
    height: 1em;
    margin-top: $indent-xs;
  }

  &__empty-list {
    padding: $indent-lg;
    font-weight: bold;
    color: $grey-7;
  }

  &__list {
    padding: 0 $indent-lg;
  }

  &__list-item {
    display: flex;
    justify-content: flex-start;
  }

  &__pagination-panel {
    margin: $indent-md 0;
  }

  @media screen and (max-width: $mobileScreenWidth) {
    position: relative;
    height: auto;
    margin-bottom: $indent-lg;
    background: $blue-4;
    border-radius: $borderRadius;
    overflow: visible;
    display: block !important;

    &:last-child {
      margin-bottom: 0;
    }

    &__title {
      padding: 0 $indent-md;
      font-size: 20px;
      text-align: left;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    &__content {
      padding-bottom: $indent-md;
      background: rgba($white, 0.9);
      border-radius: $borderRadius;
      box-shadow: $boxShadow-black;
    }

    &__list-item {
      flex-direction: column;
    }

    &__pagination-panel {
      margin: 0;
      margin-top: $indent-md;
    }
  }
}
</style>
