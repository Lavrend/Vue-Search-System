// ============
// Search module for AppCore
// ============
import Vue from 'vue';

class SearchCore {
  async getSearchData(query = '', page = 1, pageSize = 100) {
    // TODO Simple query will return only 30 entries... need use API pagination
    const res = await Vue.http.get(`search/repositories?q=${query}+in:name,description&page=${page}&per_page=${pageSize}`);

    return res.data;
  }

  // TODO add filters
}

export default SearchCore;
