// ============
// Search module for AppCore
// ============
import Vue from 'vue';

class SearchCore {

  parseData(data = []) {
    const mapData = item => ({
      id: item.id,
      name: item.name,
      fullName: item.full_name,
      shortName: item.name.toLowerCase(),
      description: item.description,
      language: item.language,
      watchers: item.watchers,
      starsCount: item.stargazers_count,
      forks: item.forks,
      pushedAt: item.pushed_at,
      owner: {
        avatar: item.owner ? item.owner.avatar_url : '',
        login: item.owner ? item.owner.login : '',
        url: item.owner ? item.owner.html_url : '',
      },
    });

    return data.map(mapData);
  }

  async getSearchData(query = '', page = 1, pageSize = 100) {
    // TODO Simple query will return only 30 entries (max 100)... for more, need use API pagination
    const fields = ['name', 'description'];
    const res = await Vue.http.get(`search/repositories?q=${query}+in:${fields.toString()}&page=${page}&per_page=${pageSize}`);

    return this.parseData(res.data.items);
  }
}

export default SearchCore;
