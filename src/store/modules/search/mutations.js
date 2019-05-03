/**
 * Mutations for the Search module
 */

import types from './types';

export default {
  [types.SET_HISTORY](state, payload) {
    state.history.push(payload);
  },

  [types.SET_LIMIT_HISTORY](state, { items }) {
    state.limitHistory = items;
  },

  [types.SET_CURRENT_HISTORY_ITEM](state, { item }) {
    state.currentHistoryItem = item;
  },

  [types.CLEAR_CURRENT_HISTORY_ITEM](state) {
    state.currentHistoryItem = null;
  },

  [types.SET_CURRENT_TAB](state, { tabIndex }) {
    state.currentTab = tabIndex;
  },

  [types.SET_CURRENT_HISTORY_ACTIVE_ID](state, { id }) {
    state.currentActiveItemId = id;
  },
};
