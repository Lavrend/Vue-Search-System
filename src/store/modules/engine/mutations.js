/**
 * Mutations for the Engine module
 */

import types from './types';

export default {
  [types.SET_ITEMS](state, { items }) {
    state.items = items;
  },
};
