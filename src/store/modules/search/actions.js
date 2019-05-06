/**
 * Actions for the Search module
 */

import types from './types';

import AppCore from '@/core';
import config from '@/config';

export default {
  async setHistoryData({ dispatch, commit, state }, { query }) {
    const result = await AppCore.search.getSearchData(query);
    const currentHistoryLength = state.historyData.length;

    commit(types.SET_HISTORY_DATA, {
      id: currentHistoryLength + 1,
      items: result.items,
      createdAt: Date.now(),
      query,
    });

    dispatch('setItems');
  },

  setItems({ dispatch, commit, state }) {
    const items = state.historyData.slice(0, config.HISTORY_LIMIT);

    commit(types.SET_RESULTS_DATA, items);
    dispatch('setCurrentItem', items[0].id);
  },

  setCurrentItem({ commit }, itemId) {
    commit(types.SET_CURRENT_ITEM, itemId);
  },

  setHistoryItem({ commit }, item) {
    commit(types.SET_HISTORY_ITEM, item);
  },

  clearHistoryItem({ commit }) {
    commit(types.CLEAR_HISTORY_ITEM);
  },

  setTransitionName({ commit, state }, newItem) {
    const transitionName = state.currentItem > newItem.id ? 'transition-slide-left' : 'transition-slide-right';

    commit(types.SET_TRANSITION_NAME, transitionName);
  },

  setActiveHistory({ dispatch, getters, state }, item) {
    if (getters.hasHistoryItem) {
      dispatch('clearHistoryItem');
    }

    if (state.resultsData.find(foundItem => foundItem.id === item.id)) {
      dispatch('setCurrentItem', item.id);
    } else {
      dispatch('setCurrentItem', item.id);
      dispatch('setHistoryItem', item);
    }

    dispatch('app/setHistoryActive', false, { root: true });
  },

  closeActiveHistory({ dispatch, state }) {
    const lastItem = state.resultsData[0];

    dispatch('setTransitionName', lastItem);
    dispatch('clearHistoryItem');
    dispatch('setCurrentItem', lastItem.id);
  },

  setCurrentModalItem({ commit }, item) {
    commit(types.SET_CURRENT_MODAL_ITEM, item);
  },
};
