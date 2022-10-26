<template lang="pug">
  aside.history-sidebar(:class="getSidebarClass")
    .history-sidebar__wrapper
      .history-sidebar__empty(v-if="!getHistoryLength") No history
      nav.history-sidebar__items-list
        .history-sidebar__item(
          v-for="item in historyData"
          :key="item.id"
          :class="getItemClass(item)"
          @click="activeHistory(item)"
        )
          .history-sidebar__item-label {{ getItemLabel(item) }}
          .history-sidebar__item-count {{ getItemCountLabel(item.items.length) }}
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
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
      'historyData',
      'currentItem',
    ]),

    ...mapGetters('search', [
      'getHistoryLength',
    ]),

    getSidebarClass() {
      return {
        'history-sidebar--active': this.isHistoryActive,
      };
    },
  },

  methods: {
    ...mapActions('search', [
      'setTransitionName',
      'setActiveHistory',
    ]),

    getItemClass(item) {
      return {
        'history-sidebar__item--active': this.currentItem === item.id,
      };
    },

    getItemLabel(item) {
      return `${item.id}. (${_dateFormat.getDateTime(item.createdAt)}) - ${item.query}`;
    },

    getItemCountLabel(count) {
      return _numeral(count).format('0[.]0a');
    },

    activeHistory(item) {
      if (this.currentItem === item.id) return;

      this.setTransitionName(item);
      this.setActiveHistory(item);
    },
  },
};
</script>

<style lang="scss">
.history-sidebar {
  position: absolute;
  width: 30%;
  height: calc(100% - #{$height-header});
  min-width: $minWidth-sidebar;
  left: 0;
  top: $height-header;
  background: $grey-3;
  border-right: 1px solid $grey-4;
  box-shadow: $shadow-sidebar;
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

    &:hover {
      transform: translateX($indent-md);
      color: $blue-6;
    }

    &--active {
      transform: translateX($indent-md);
      color: $blue-6;
      cursor: default;
    }
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
