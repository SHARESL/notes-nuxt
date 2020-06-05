const state = () => ({
  newPosts : null
});

const getters = {
  newPosts(state){
    return state.newPosts;
  }
}

const mutations = {
  saveNewPosts(state, newPosts) {
    state.newPosts = newPosts;
  }
}

const actions = {
  async fetchNewPosts({ commit }){
    const res = await this.$axios.$get('http://localhost/notes/wp-json/wp/v2/posts?per_page=9')
    .catch((err) => {
      console.error(err)
    });
    await commit('saveNewPosts', res);
    return res;
  }
}

export {
  state,
  getters,
  mutations,
  actions
}