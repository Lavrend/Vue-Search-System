/**
 * Actions for the App module
 */

import types from './types';

export default {
  setPageReady({ commit }, ready) {
    commit(types.SET_APP_READY, ready);
  },

  setHistoryActive({ commit }, { active }) {
    commit(types.SET_HISTORY_ACTIVE, active);
  },

  historyToggle({ state, dispatch }) {
    const active = !state.isHistoryActive;

    dispatch('setHistoryActive', {
      active,
    });
  },
};
