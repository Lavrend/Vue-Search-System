/**
 * Mutations for the App module
 */

import types from './types';

export default {
  [types.SET_APP_READY](state, ready) {
    state.isAppReady = ready;
  },

  [types.SET_HISTORY_ACTIVE](state, active) {
    state.isHistoryActive = active;
  },

  [types.SET_MODAL_ACTIVE](state, active) {
    state.isModalActive = active;
  },
};
