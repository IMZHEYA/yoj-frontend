import { UserControllerService } from './../../generated/services/UserControllerService';
// initial state
import ACCESS_ENUM from "@/access/accessEnum";
import { StoreOptions } from "vuex";

export default {
  namespaced: true,
  //存状态变量
  state: () => ({
    loginUser: {
      userName: "未登录",
    },
  }),
  //执行了这个actions,就调用mutation,更新用户名 未登录->诨号无敌鸭
  actions: {
    //todo 改成从远程请求获取登录信息
    async getLoginUser({ commit, state }, payload) {
    const res = await UserControllerService.getLoginUserUsingGet();
    if (res.code === 0) {
      commit("updateUser", res.data);
    } else {
      commit("updateUser", {
        ...state.loginUser,
        userRole: ACCESS_ENUM.NOT_LOGIN,
      });
    }
    },
  },
  //修改状态变量
  mutations: {
    //外层可以传递payload参数来改变状态
    updateUser(state, payload) {
      state.loginUser = payload;
    },
  },
} as StoreOptions<any>;
