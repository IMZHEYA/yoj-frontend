<template>
  <a-row id="globalHeader" align="center" :wrap="false">
    <a-col flex="auto">
      <a-menu
        mode="horizontal"
        :selected-keys="secretedKeys"
        @menu-item-click="doMenuClick"
      >
        <a-menu-item
          key="0"
          :style="{ padding: 0, marginRight: '38px' }"
          disabled
        >
          <div class="title-bar">
            <img class="logo" src="../assets/icon22.jpg" />
            <div class="title">Y OJ</div>
          </div>
        </a-menu-item>
        <a-menu-item v-for="item in visibleRoutes" :key="item.path">
          {{ item.name }}
        </a-menu-item>
      </a-menu>
    </a-col>
    <a-col flex="100px">
      <div>
        <a-dropdown trigger="hover">
          <a-avatar shape="circle">
            <template
              v-if="loginUser && loginUser.userRole as string !== ACCESS_ENUM.NOT_LOGIN"
            >
              <template v-if="userAvatar">
                <img alt="avatar" :src="userAvatar" class="userAvatar" />
              </template>
              <template v-else>
                <a-avatar>
                  <IconUser />
                </a-avatar>
              </template>
            </template>
          </a-avatar>
          <!--登录时 鼠标悬停头像显示个人信息和退出登录，未登录时只显示登录 -->
          <template #content>
            <template
              v-if="loginUser && loginUser.userRole as 
string !== ACCESS_ENUM.NOT_LOGIN"
            >
              <a-doption>
                <template #icon>
                  <icon-idcard />
                </template>
                <template #default>
                  <a-anchor-link>个人信息</a-anchor-link>
                </template>
              </a-doption>
              <a-doption>
                <template #icon>
                  <icon-poweroff />
                </template>
                <template #default>
                  <a-anchor-link @click="logout">退出登录 </a-anchor-link>
                </template>
              </a-doption>
            </template>
            <template v-else>
              <a-doption>
                <template #icon>
                  <icon-user />
                </template>
                <template #default>
                  <a-anchor-link href="/user/login">登录 </a-anchor-link>
                </template>
              </a-doption>
            </template>
          </template>
        </a-dropdown>
      </div>
    </a-col>
  </a-row>
</template>

<script setup lang="ts">
import { routes } from "../router/routes";
import { useRouter } from "vue-router";
import { computed, ref } from "vue";
import { useStore } from "vuex";
import checkAccess from "@/access/checkAccess";
import ACCESS_ENUM from "../access/accessEnum";
import { UserControllerService } from "../../generated";
const router = useRouter();
const secretedKeys = ref(["/"]);

router.afterEach((to, from, failure) => {
  secretedKeys.value = [to.path];
});
const doMenuClick = (key: string) => {
  router.push({
    path: key,
  });
};
const store = useStore();
const loginUser = store.state.user.loginUser;
const userAvatar = loginUser.userAvatar;
const visibleRoutes = computed(() => {
  return routes.filter((item, index) => {
    if (item.meta?.hideInMenu) {
      return false;
    }
    //根据权限过滤菜单
    if (
      !checkAccess(store.state.user.loginUser, item?.meta?.access as string)
    ) {
      return false;
    }
    return true;
  });
});
//退出登录
const logout = () => {
  UserControllerService.userLogoutUsingPost();
  location.reload;
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.title-bar {
  display: flex;
  align-items: center;
}
.logo {
  height: 48px;
}
.title {
  color: #444;
  margin-left: 16px;
}
</style>
