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

  [types.SET_CURRENT_TAB](state, { tabIndex }) {
    state.currentTab = tabIndex;
  },
};
