<template lang="pug">
  transition-group.result-body(
    :name="transitionName"
    tag="div"
    ref="resultBody"
  )
    ResultBodyList.result-body__list(
      v-if="hasHistoryItem"
      :key="getHistoryListKey"
      :label="historyItem.query"
      :items="historyItem.items ? historyItem.items : []"
      :isActive="hasHistoryItem"
      :ref="`bodyList_${historyItem.id}`"
      isHistory
      @changePage="scrollToHistory"
      @closeTab="closeTab"
    )

    ResultBodyList.result-body__list(
      v-for="item in resultsData"
      v-show="hasActiveItem(item)"
      :key="`result-body-list-${item.id}`"
      :label="getListLabel(item)"
      :items="getListItems(item)"
      :isActive="hasActiveItem(item)"
      :ref="`bodyList_${item.id}`"
      @changePage="scrollToList(item.id)"
    )
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import ResultBodyList from '@/components/SearchResult/ResultBodyList';

import _animate from '@/utils/animate';
import _delay from '@/utils/delay';

const offeset = 10;

export default {
  name: 'result-body',

  components: {
    ResultBodyList,
  },

  props: {
    transitionName: {
      type: String,
      default: 'transition-slide-right',
    },
  },

  computed: {
    ...mapState('search', [
      'resultsData',
      'historyItem',
      'currentItem',
    ]),

    ...mapGetters('search', [
      'getHistoryLength',
      'hasHistoryItem',
    ]),

    getHistoryListKey() {
      return `result-body-list-history-${this.getHistoryLength}_${this.historyItem.id}`;
    },
  },

  created() {
    this.$bus.$on('history:change', this.scrollToList);
  },

  beforeDestroy() {
    this.$bus.$off('history:change');
  },

  methods: {
    getListLabel(item) {
      return item.query ? `${item.id}. ${item.query}` : '';
    },

    getListItems(item) {
      return item.items || [];
    },

    hasActiveItem(item) {
      return !this.hasHistoryItem && this.currentItem === item.id;
    },

    closeTab() {
      this.$emit('closeTab', this.historyItem);
    },

    animateScroll(to = 0) {
      const element = this.$refs.resultBody.$el;

      const draw = (time) => {
        const newPos = (to - element.scrollTop) * time;

        element.scrollTop += newPos;
      };

      _animate(draw, 300, 'easeInQuad');
    },

    async scrollToList(ref) {
      // hack, delay after hide historyList
      await _delay(700);

      const element = this.$refs[`bodyList_${ref}`];
      let position = 0;

      if (element && element.length) {
        position = element[0].$el.offsetTop - offeset;
      }

      this.animateScroll(position);
    },

    scrollToHistory() {
      this.animateScroll(0);
    },
  },
};
</script>

<style lang="scss">
.result-body {
  position: relative;
  width: 100%;
  height: calc(100% - #{$height-resultHeader});

  @media screen and (max-width: $screenWidth-mobile) {
    height: 100%;
    padding: $indent-md;
    overflow-y: auto;
  }
}
</style>
