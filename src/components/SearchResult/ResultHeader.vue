<template lang="pug">
  nav.result-header
    ResultHeaderItem.result-header__item(
      v-for="item in resultsData"
      :key="`result-header-item-${item.id}`"
      :label="getItemLabel(item)"
      :isActive="hasItemActive(item)"
      @changeTab="changeTab(item)"
    )

    transition(name="transition-scale")
      ResultHeaderItem.result-header__item(
        v-if="hasHistoryItem"
        :label="historyItem.query"
        :isActive="hasHistoryItem"
        isHistory
        @closeTab="closeTab"
      )
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import ResultHeaderItem from '@/components/SearchResult/ResultHeaderItem';

export default {
  name: 'result-header',

  components: {
    ResultHeaderItem,
  },

  computed: {
    ...mapState('search', [
      'resultsData',
      'currentItem',
      'historyItem',
    ]),

    ...mapGetters('search', [
      'hasHistoryItem',
    ]),
  },

  methods: {
    getItemLabel(item) {
      return item.query ? `${item.id}. ${item.query}` : '';
    },

    hasItemActive(item) {
      return !this.hasHistoryItem && this.currentItem === item.id;
    },

    changeTab(item) {
      if (this.currentItem === item.id) return;
      this.$emit('changeTab', item);
    },

    closeTab() {
      this.$emit('closeTab', this.historyItem);
    },
  },
};
</script>

<style lang="scss">
.result-header {
  height: $height-resultHeader;
  font-size: 16px;
  font-weight: bold;
  line-height: 1;
  display: flex;

  @media screen and (max-width: $screenWidth-mobile) {
    display: none;
  }
}
</style>
