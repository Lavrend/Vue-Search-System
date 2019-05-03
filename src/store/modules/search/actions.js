/**
 * Actions for the Search module
 */

import Vue from 'vue';
import types from './types';

import config from '@/config';

export default {
  async setHistory({ dispatch, commit, state }, { query }) {
    // TODO Simple query will return only 30 entries... need use API pagination
    // TODO move to AppCore
    const result = await Vue.http.get(`search/repositories?q=${query}+in:name,description`);
    const currentHistoryLength = state.history.length;

    commit(types.SET_HISTORY, {
      id: currentHistoryLength + 1,
      items: result.data.items,
      createdAt: Date.now(),
      query,
    });

    dispatch('setLimitHistory');
  },

  setLimitHistory({ dispatch, commit, state }) {
    const items = state.history.slice(-config.HISTORY_LIMIT);

    commit(types.SET_LIMIT_HISTORY, {
      items,
    });

    dispatch('setCurrentTab', {
      tabIndex: items.length - 1,
    });

    dispatch('setCurrentHistoryActiveId', {
      id: items[items.length - 1].id,
    });
  },

  setCurrentHistoryItem({ dispatch, commit, state }, { id }) {
    const items = state.history;

    commit(types.SET_CURRENT_HISTORY_ITEM, {
      item: items.find(item => item.id === id),
    });

    dispatch('setCurrentHistoryActiveId', {
      id,
    });
  },

  clearCurrentHistoryItem({ dispatch, commit }) {
    commit(types.CLEAR_CURRENT_HISTORY_ITEM);
    dispatch('setCurrentHistoryActiveId', {
      id: 0,
    });
  },

  setCurrentTab({ commit }, { tabIndex }) {
    commit(types.SET_CURRENT_TAB, {
      tabIndex,
    });
  },

  setCurrentHistoryActiveId({ commit }, { id }) {
    commit(types.SET_CURRENT_HISTORY_ACTIVE_ID, {
      id,
    });
  },

  setCurrentModalItem({ commit }, { item }) {
    commit(types.SET_CURRENT_MODAL_ITEM, {
      item,
    });
  },
};
