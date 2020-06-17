const state = () => ({
  //すべての記事
  allPosts        : null,
  //現在の記事
  currentPost     : null,
  //カテゴリーページ すべて
  allCategories   : null,
  //カテゴリーページ 現在のカテゴリー
  currentCategory : null,
  //メンバー一覧
  members         : null,
  //現在のメンバー
  currentMember   : null,
  //タグ一覧
  allTags         : null,
  //現在のタグ
  currentTag      : null,
  //すべての固定ページ
  allPages        : null,
  //現在の固定ページ
  currentPage     : null,
  //メニューの開閉
  isMenuOpen      : false,
  pickup          : null,
  searchText      : null
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
  },
  //現在のメンバー
  currentMember(state){
    return state.currentMember;
  },
  //カテゴリーページ すべて
  allCategories(state){
    return state.allCategories;
  },
  //カテゴリーページ 現在のカテゴリー
  currentCategory(state){
    return state.currentCategory;
  },
  //すべてのタグ
  allTags(state){
    return state.allTags;
  },
  //現在のタグ
  currentTag(state){
    return state.currentTag;
  },
  //すべての固定ページ
  allPages(state){
    return state.allPages;
  },
  //現在の固定ページ
  currentPage(state){
    return state.currentPage;
  },
  //メニュー開閉フラグ
  isMenuOpen(state){
    return state.isMenuOpen;
  },
  //ピックアップ記事
  pickup(state){
    return state.pickup;
  },
  //検索キーワード
  searchText(state){
    return state.searchText;
  }
}

const mutations = {
  //すべての記事を保存
  saveAllPosts(state, allPosts){
    state.allPosts = allPosts;
  },
  //現在の記事をすべての記事からIDで検索して現在の記事を保存
  saveCurrentPostById(state, postId){
    if(!state.allPosts){
      return;
    }
    state.currentPost = state.allPosts.find( (post) => {
      return Number(post.id) === Number(postId)
    });
  },
  //現在の記事を保存
  saveCurrentPost(state, currentPost){
    state.currentPost = currentPost;
  },
  //すべてのカテゴリーを保存
  saveAllCategories(state, allCategories){
    state.allCategories = allCategories;
  },
  //すべてのカテゴリーからスラッグ名で検索して現在のカテゴリーを保存
  saveCurrentCategoryBySlug(state, categorySlug){
    if(!state.allCategories){
      return;
    }
    state.currentCategory = state.allCategories.find( (post) => {
      return post.slug === categorySlug
    });
  },
  //現在のカテゴリーを保存
  saveCurrentCategory(state, currentCategory){
    state.currentCategory = currentCategory;
  },
  //メンバー一覧を保存
  saveMembers(state, members){
    state.members = members;
  },
  saveCurrentMemberBySlug(state, memberSlug){
    if(!state.members){
      return;
    }
    state.currentMember = state.members.find( (post) => {
      return post.author_slug === memberSlug
    });
  },
  //現在のメンバーを保存
  saveCurrentMember(state, currentMember){
    state.currentMember = currentMember;
  },

  //すべてのタグを保存
  saveAllTags(state, allTags){
    state.allTags = allTags;
  },
  saveCurrentTagBySlug(state, tagSlug){
    if(!state.allTags){
      return;
    }
    state.currentTag = state.allTags.find( (tag) => {
      return tag.slug === tagSlug
    });
  },
  //現在のメンバーを保存
  saveCurrentTag(state, currentTag){
    state.currentTag = currentTag;
  },

  //すべての固定ページを保存
  saveAllPages(state, allPages){
    state.allPages = allPages;
  },
  saveCurrentPageBySlug(state, pageSlug){
    if(!state.allPages){
      return;
    }
    state.currentPage = state.allPages.find( (page) => {
      return page.slug === pageSlug
    });
  },
  //現在の固定ページを保存
  saveCurrentPage(state, currentPage){
    state.currentPage = currentPage;
  },

  toggleMenu(state){
    state.isMenuOpen = !state.isMenuOpen;
  },
  closeMenu(state){
    state.isMenuOpen = false;
  },
  //ピックアップを保存
  savePickup(state, posts){
    state.pickup = posts
  },
  //検索キーワードを保存
  saveSearchText(state, searchText){
    state.searchText = searchText;
  }
}

const actions = {
  /*
  * 全記事取得
  */
  async fetchAllPost({ state, commit }, postId = null){
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
  * 全カテゴリー取得
  */
  async fetchCategories({ state, commit }, categorySlug = null){
    const res = await this.$axios.$get('/wp/v2/categories')
    .catch((err) => {
      console.error(err)
    });
    await commit('saveAllCategories', res);
    if(categorySlug){
      await commit('saveCurrentCategoryBySlug', categorySlug);
    }
    return res;
  },
  /*
  * 全タグ取得
  */
  async fetchTags({ state, commit }, tagSlug = null){
    const res = await this.$axios.$get('/custom/v0/tags')
    .catch((err) => {
      console.error(err)
    });
    await commit('saveAllTags', res);
    if(tagSlug){
      await commit('saveCurrentTagBySlug', tagSlug);
    }
    return res;
  },
  /*
  * メンバー一覧取得
  */
  async fetchMembers({ state, commit }, memberSlug = null){
    const res = await this.$axios.$get('/custom/v0/members')
    .catch((err) => {
      console.error(err)
    });
    await commit('saveMembers', res);
    if(memberSlug){
      await commit('saveCurrentMemberBySlug', memberSlug);
    }
    return res;
  },

  /*
  * 固定ページ一覧取得
  */
  async fetchPages({ state, commit }, pageSlug = null){
    const res = await this.$axios.$get('/custom/v0/pages')
    .catch((err) => {
      console.error(err)
    });
    await commit('saveAllPages', res);
    if(pageSlug){
      await commit('saveCurrentPageBySlug', pageSlug);
    }
    return res;
  },

  //メニュー開閉
  toggleMenu({ state, commit }){
    commit('toggleMenu');
  },

  //メニューを閉じる
  closeMenu({ state, commit }){
    commit('closeMenu');
  },

  //検索キーワードを保存
  saveSearchText({state, commit}, {searchText}){
    commit('saveSearchText', searchText);
  }
}

export {
  state,
  getters,
  mutations,
  actions
}