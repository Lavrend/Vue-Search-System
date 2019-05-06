/**
 * Actions for the App module
 */

import types from './types';

export default {
  setPageReady({ commit }, ready) {
    commit(types.SET_APP_READY, ready);
  },

  setHistoryActive({ commit, state }, active) {
    if (state.isHistoryActive === active) return;
    commit(types.SET_HISTORY_ACTIVE, active);
  },

  historyToggle({ dispatch, state }) {
    const active = !state.isHistoryActive;

    dispatch('setHistoryActive', active);
  },

  openModal({ commit }, { name, data }) {
    commit(types.SET_MODAL_ACTIVE, {
      name,
      data,
    });
  },

  closeModal({ commit }) {
    commit(types.SET_MODAL_ACTIVE, null);
  },
};
