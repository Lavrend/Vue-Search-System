<template lang="pug">
  .result-body-list(:class="getListClass" ref="listWrapper")
    ResultHeaderItem.result-body-list__title(
      :label="label"
      :isActive="isActive"
      :isHistory="isHistory"
      @closeTab="closeTab"
    )

    .result-body-list__content
      ResultFilter.search-content__filter(
        v-model="currentFilter"
        :items="items"
        @emptyFilter="onEmptyFilter"
        @changeFilter="onChangefilter"
        @changeSort="onChangeSort"
      )

      .result-body-list__empty(v-if="!getTotalItemsCount")
        | Couldn't find any repositories matching

      transition(name="transition-scale" mode="out-in")
        ul.result-body-list__items(:key="getListUniqKey")
          ResultBodyItem.result-body-list__item(
            v-for="item in getPaginationItems"
            :item="item"
            :key="item.id"
          )

      .result-body-list__pagination-panel
        uiPagination.result-body-list__pagination(
          :total="getTotalItemsCount"
          :current="currentPage"
          :minPages="2"
          @changePage="onChangePage"
        )
</template>

<script>
import _paginate from '@/utils/paginate';
import _sortBy from '@/utils/sortBy';

import ResultHeaderItem from '@/components/SearchResult/ResultHeaderItem';
import ResultBodyItem from '@/components/SearchResult/ResultBodyItem';
import ResultFilter from '@/components/SearchResult/ResultFilter';

import uiPagination from '@/ui/Pagination';

export default {
  name: 'result-body-list',

  components: {
    ResultHeaderItem,
    ResultBodyItem,
    ResultFilter,
    uiPagination,
  },

  props: {
    items: {
      type: Array,
      default: () => [],
    },

    label: {
      type: [String, Number],
      default: '',
    },

    isActive: {
      type: Boolean,
      default: false,
    },

    isHistory: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      currentPage: 1,
      currentFilter: '',
      filteredItems: null,

      currentSortKey: 'shortName',
      currentSortOrder: 'none',
    };
  },

  computed: {
    getListClass() {
      return {
        'result-body-list--active': this.isActive,
        'result-body-list--history': this.isHistory,
      };
    },

    getListUniqKey() {
      return `${this.currentPage}_${this.query}_${this.currentFilter}_${this.currentSortKey}_${this.currentSortOrder}`;
    },

    getTotalItemsCount() {
      return this.getFilteredItems.length;
    },

    getFilteredItems() {
      return this.filteredItems || this.items;
    },

    getSortedItems() {
      if (this.currentSortKey === 'shortName' && this.currentSortOrder === 'none') return this.getFilteredItems;
      return _sortBy(this.getFilteredItems, this.currentSortKey, this.currentSortOrder);
    },

    getPaginationItems() {
      const paginationData = _paginate(this.getSortedItems, this.currentPage);
      return paginationData.items;
    },
  },

  methods: {
    onChangePage(page = 1) {
      this.currentPage = page;
      this.$refs.listWrapper.scrollTo(0, 0);
      this.$emit('changePage');
    },

    closeTab(event) {
      this.$emit('closeTab', event);
    },

    onEmptyFilter() {
      this.filteredItems = null;
      this.currentFilter = '';
      this.currentPage = 1;
    },

    onChangefilter({ items, filter }) {
      this.filteredItems = items;
      this.currentFilter = filter;
      this.currentPage = 1;
    },

    onChangeSort({ key, sort }) {
      this.currentSortKey = key;
      this.currentSortOrder = sort;
      this.currentPage = 1;
    },
  },
};
</script>

<style lang="scss">
.result-body-list {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow-y: auto;

  &__title {
    height: 30px;
    margin-bottom: $indent-sm;
    padding: 0 $indent-md;
    font-size: 20px;
    line-height: 30px;
    color: $white;
    fill: $white;
    font-weight: bold;
    display: none;
  }

  &__empty {
    padding: $indent-lg;
    font-weight: bold;
    color: $grey-7;
  }

  &__items {
    padding: 0 $indent-lg;
  }

  &__pagination-panel {
    margin: $indent-md 0;
  }

  &--history {
    background: $yellow-1;
  }

  @media screen and (max-width: $screenWidth-mobile) {
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
      display: flex;
    }

    &__content {
      padding-bottom: $indent-md;
      background: rgba($white, 0.9);
      border-radius: $borderRadius;
      box-shadow: $boxShadow-black;
    }

    &__pagination-panel {
      margin: 0;
      margin-top: $indent-md;
    }

    &__pagination-panel--top {
      display: none;
    }

    &--history {
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
      background: $yellow-4;
    }
  }
}
</style>
