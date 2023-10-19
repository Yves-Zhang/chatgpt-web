const state: any = {
  isAgree: true,
};

const loginStore = {
  namespace:'loginStore',
  state,
  getters: {},
  mutations: {
    upDateIsAgree(state: any, isAgree: boolean) {
      state.isAgree = isAgree
    }
  },
  actions: {
    agreeRules(context:any, isAgree: boolean){
      context.commit('upDateIsAgree', isAgree)
    }
  }
};

export default loginStore;
