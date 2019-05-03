<template lang="pug">
  aside.history-sidebar(:class="getSidebarClass")
    .history-sidebar__wrapper
      .history-sidebar__empty(v-if="!historyLength") No history
      nav.history-sidebar__items-list
        .history-sidebar__item(
          v-for="item, index in history"
          :key="item.id"
          :class="getItemClass(item, index)"
          @click="onHistoryItemClick(item, index)"
        )
          .history-sidebar__item-label {{ getItemLabel(item) }}
          .history-sidebar__item-count {{ getItemCountLabel(item.items.length) }}
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import config from '@/config';

import _numeral from 'numeral';
import _dateFormat from '@/utils/date-format';

export default {
  name: 'sidebar-component',

  data() {
    return {
      menuItems: config.navMenu,
    };
  },

  computed: {
    ...mapState('app', [
      'isHistoryActive',
    ]),

    ...mapState('search', [
      'history',
      'currentActiveItemId',
    ]),

    ...mapGetters('search', [
      'historyLength',
    ]),

    getSidebarClass() {
      return {
        'history-sidebar--active': this.isHistoryActive,
      };
    },
  },

  methods: {
    getItemClass(item, index) {
      return {
        'history-sidebar__item--active': item.id === this.currentActiveItemId && !this.hasDisableItem(index),
        'history-sidebar__item--disable': this.hasDisableItem(index), // current active tabs will not used
      };
    },

    getItemLabel(item) {
      return `${item.id}. (${_dateFormat.getDateTime(item.createdAt)}) - ${item.query}`;
    },

    getItemCountLabel(count) {
      return _numeral(count).format('0[.]0a');
    },

    hasDisableItem(index) {
      return index + 1 > this.historyLength - config.HISTORY_LIMIT;
    },

    closeHistory() {
      this.$store.dispatch('app/setHistoryActive', { active: false });
    },

    onHistoryItemClick(item, index) {
      if (this.hasDisableItem(index) || item.id === this.currentActiveItemId) return;
      this.$store.dispatch('search/setCurrentHistoryItem', { id: item.id });
      this.closeHistory();
    },
  },
};
</script>

<style lang="scss">
.history-sidebar {
  position: absolute;
  width: 30%;
  height: calc(100% - #{$headerHeight});
  min-width: $sidebarMinWidth;
  left: 0;
  top: $headerHeight;
  background: $grey-3;
  border-right: 1px solid $grey-4;
  box-shadow: $sidebarShadow;
  text-align: left;
  opacity: 0;

  user-select: none;

  transition: transform .3s ease, opacity .2s ease .1s;
  transform: translateX(-100%);
  overflow-y: auto;

  &--active {
    opacity: 1;
    transform: translateX(0);
  }

  &__wrapper {
    width: 100%;
    padding: $indent-lg $indent-md;
  }

  &__empty {
    width: 100%;
    color: $grey-6;
    font-weight: normal;
    text-align: center;
  }

  &__items-list {
    width: 100%;
    font-size: 20px;
  }

  &__item {
    width: 100%;
    padding:  $indent-sm $indent-md;
    font-size: 16px;
    font-weight: bold;
    border-bottom: 1px solid transparent;
    color: $grey-7;
    transition: all .3s ease;
    cursor: pointer;

    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;

    &:not(.history-sidebar__item--disable):hover {
      transform: translateX($indent-md);
      color: $blue-6;
    }
  }

  &__item--active {
    transform: translateX($indent-md);
    color: $blue-6;
    cursor: default;
  }

  &__item--disable {
    font-weight: normal;
    color: $grey-6;
    cursor: default;
  }

  &__item-label {
    max-width: 100%;
    word-wrap: break-word;
  }

  &__item-count {
    margin-left: $indent-lg;
    text-align: right;
    flex: 1;
  }
}
</style>
