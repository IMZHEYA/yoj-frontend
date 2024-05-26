import router from "@/router";
import store from "@/store";
import ACCESS_ENUM from "./accessEnum";
import checkAccess from "./checkAccess";

router.beforeEach(async (to, from, next) => {
  let loginUser = store.state.user.loginUser;
  //之前没有登录过，自动登录
  if (!loginUser || !loginUser.userRole) {
    console.log(loginUser.userName);
    //await异步是为了等用户登录成功后，再执行后续的代码
    await store.dispatch("user/getLoginUser");
    loginUser = store.state.user.loginUser;
  }
  const needAccess = (to.meta?.access as string) ?? ACCESS_ENUM.NOT_LOGIN;
  //要跳转的页面必须要登录
  if (needAccess !== ACCESS_ENUM.NOT_LOGIN) {
    //如果没登录,跳转到登录页面
    if (
      !loginUser ||
      !loginUser.userRole ||
      loginUser.userRole == ACCESS_ENUM.NOT_LOGIN
    ) {
      next(`/user/login?redirect=${to.fullPath}`);
      return;
    }
    //如果已经登录了，但是权限不足，那么跳转到无权限界面
    if (!checkAccess(loginUser, needAccess)) {
      next("/noAuth");
      return;
    }
  }
  next();
});
