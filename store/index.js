const state = () => ({
  //すべての記事
  allPosts : null,
  //メンバー一覧
  members  : null
});

const getters = {
  //すべての記事
  allPosts(state){
    return state.allPosts;
  },
  //メンバー一覧
  members(state){
    return state.members;
  }
}

const mutations = {
  //すべての記事を保存
  saveAllPosts(state, allPosts){
    state.allPosts = allPosts;
  },
  //メンバー一覧を保存
  saveMembers(state, members){
    state.members = members;
  }
}

const actions = {
  /*
  * 全記事取得
  */
  async fetchAllPost({ state, commit }){
    if(state.allPosts){
      return;
    }
    const res = await this.$axios.$get('/custom/v0/all')
    .catch((err) => {
      console.error(err)
    });
    await commit('saveAllPosts', res);
    return res;
  },
  /*
  * メンバー一覧取得
  */
  async fetchMembers({ state, commit }){
    if(state.members){
      return;
    }
    const res = await this.$axios.$get('/custom/v0/members')
    .catch((err) => {
      console.error(err)
    });
    await commit('saveMembers', res);
    return res;
  }
}

export {
  state,
  getters,
  mutations,
  actions
}