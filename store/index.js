const state = () => ({
  newPosts      : null,
  categoryPosts : {}
});

const getters = {
  newPosts(state){
    return state.newPosts;
  },
  categoryPosts(state){
    return state.categoryPosts;
  }
}

const mutations = {
  saveNewPosts(state, newPosts) {
    state.newPosts = newPosts;
  },
  saveCategoryPosts(state, {categoryPosts, categorySlug}) {
    state.categoryPosts[categorySlug] = categoryPosts;
  }
}

const actions = {
  /*
  * 新着一覧
  */
  async fetchNewPosts({ commit }, {paged}){
    const res = await this.$axios.$get('/custom/v0/feed', {
      params: {
        per_page : 9,
        paged    : paged ? paged : 1
      }
    })
    .catch((err) => {
      console.error(err)
    });
    await commit('saveNewPosts', res);
    return res;
  },
  /*
  * カテゴリー一覧取得
  */
  async fetchCategoryPosts({ commit }, {categorySlug, paged}){
    const res = await this.$axios.$get(`/custom/v0/category/${categorySlug}`, {
      params: {
        per_page   : 9,
        paged      : paged ? paged : 1
      }
    })
    .catch((err) => {
      console.error(err)
    });
    await commit('saveCategoryPosts', {
      categoryPosts : res,
      categorySlug
    });
    return res;
  }
}

export {
  state,
  getters,
  mutations,
  actions
}