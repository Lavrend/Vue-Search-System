/**
 * Catalog Engine Module
 */

import state from './state';
import getters from './getters';
import actions from './actions';
import mutations from './mutations';

export default {
  name: 'engine',
  namespaced: true,
  actions,
  getters,
  mutations,
  state,
};
