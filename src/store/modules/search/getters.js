/**
 * Getters for the Search module
 */

export default {
  getHistoryLength(state) {
    return state.historyData.length;
  },

  getResultsLength(state) {
    return state.resultsData.length;
  },

  hasHistoryItem(state) {
    return !!state.historyItem;
  },
};
