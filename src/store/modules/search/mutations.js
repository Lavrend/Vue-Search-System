/**
 * Mutations for the Search module
 */

import types from './types';

export default {
  [types.SET_HISTORY_DATA](state, data) {
    state.historyData.unshift(data);
  },

  [types.SET_RESULTS_DATA](state, data) {
    state.resultsData = data;
  },

  [types.SET_CURRENT_ITEM](state, itemId) {
    state.currentItem = itemId;
  },

  [types.SET_HISTORY_ITEM](state, item) {
    state.historyItem = item;
  },

  [types.CLEAR_HISTORY_ITEM](state) {
    state.historyItem = null;
  },

  [types.SET_CURRENT_MODAL_ITEM](state, item) {
    state.currentModalItem = item;
  },

  [types.SET_TRANSITION_NAME](state, newName) {
    state.transitionName = newName;
  },
};
