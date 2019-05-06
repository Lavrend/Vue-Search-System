<template lang="pug">
  transition-group.result-body(:name="transitionName" tag="div")
    ResultBodyList.result-body__list(
      v-if="hasHistoryItem"
      :key="`result-body-list-history-${getHistoryLength}`"
      :label="historyItem.query"
      :items="historyItem.items ? historyItem.items : []"
      :isActive="hasHistoryItem"
      isHistory
      @closeTab="closeTab"
    )

    ResultBodyList.result-body__list(
      v-for="item in resultsData"
      v-show="hasActiveItem(item)"
      :key="`result-body-list-${item.id}`"
      :label="getListLabel(item)"
      :items="getListItems(item)"
      :isActive="hasActiveItem(item)"
    )
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import ResultBodyList from '@/components/SearchResult/ResultBodyList';

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
  },

  methods: {
    getListLabel(item) {
      return item.query ? `${item.id}. ${item.query}` : '';
    },

    getListItems(item) {
      return item.items ? item.items : [];
    },

    hasActiveItem(item) {
      return !this.hasHistoryItem && this.currentItem === item.id;
    },

    closeTab() {
      this.$emit('closeTab', this.historyItem);
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
