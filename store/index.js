const state = () => ({
  //すべての記事
  allPosts    : null,
  //現在の記事
  currentPost : null,
  //メンバー一覧
  members     : null
});

const getters = {
  //すべての記事
  allPosts(state){
    return state.allPosts;
  },
  //現在の記事
  currentPost(state){
    return state.currentPost;
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
  saveCurrentPostById(state, postId){
    if(!state.allPosts){
      return;
    }
    state.currentPost = state.allPosts.find( (post) => {
      return Number(post.id) === Number(postId)
    });
  },
  saveCurrentPost(state, currentPost){
    state.currentPost = currentPost;
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
  async fetchAllPost({ state, commit }, postId = null){
    if(state.allPosts){
      return;
    }
    const res = await this.$axios.$get('/custom/v0/all')
    .catch((err) => {
      console.error(err)
    });
    await commit('saveAllPosts', res);
    if(postId){
      await commit('saveCurrentPostById', postId);
    }
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