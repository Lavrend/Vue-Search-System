<template lang="pug">
  .result-body-list(:class="getListClass")
    ResultHeaderItem.result-body-list__title(
      :label="label"
      :isActive="isActive"
      :isHistory="isHistory"
      @closeTab="closeTab"
    )

    .result-body-list__content
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
          :minPages="2"
          @changePage="onChangePage"
        )
</template>

<script>
import _paginate from '@/utils/paginate';

import ResultHeaderItem from '@/components/SearchResult/ResultHeaderItem';
import ResultBodyItem from '@/components/SearchResult/ResultBodyItem';
import uiPagination from '@/ui/Pagination';

export default {
  name: 'result-body-list',

  components: {
    ResultHeaderItem,
    ResultBodyItem,
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

    closeTab(event) {
      this.$emit('closeTab', event);
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

    &--history {
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
      background: $yellow-4;
    }
  }
}
</style>
