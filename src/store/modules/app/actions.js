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

  setModalActive({ dispatch, commit }, { active, item }) {
    commit(types.SET_MODAL_ACTIVE, active);

    dispatch('search/setCurrentModalItem', {
      item,
    }, {
      root: true,
    });
  },
};
