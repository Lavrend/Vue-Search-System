/**
 * Actions for the Engine module
 */

import Vue from 'vue';
import types from './types';

export default {
  async setItems({ commit }, { search }) {
    // TODO may be need AppCore class
    const result = await Vue.http.get(`search/repositories?q=${search}+in:name,description`);

    commit(types.SET_ITEMS, {
      items: result.data.items,
    });
  },
};
