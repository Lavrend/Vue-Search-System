/**
 * Mutations for the Search module
 */

import types from './types';

export default {
  [types.SET_ITEMS](state, { items }) {
    state.items = items;
  },
};
