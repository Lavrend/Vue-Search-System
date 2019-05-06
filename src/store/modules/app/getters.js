/**
 * Getters for the App module
 */

export default {
  hasModalActive(state) {
    return state.currentModal && state.currentModal.name;
  },
};
