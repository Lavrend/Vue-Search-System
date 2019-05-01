/**
 * Actions for the Search module
 */

import Vue from 'vue';
import types from './types';

export default {
  async setItems({ commit }, { query }) {
    // TODO may be need AppCore class
    const result = await Vue.http.get(`search/repositories?q=${query}+in:name,description`);

    commit(types.SET_ITEMS, {
      items: result.data.items,
    });
  },
};
