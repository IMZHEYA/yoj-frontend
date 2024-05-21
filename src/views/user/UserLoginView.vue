<template>
  <div id="userLoginView">
    <h3 style="margin-bottom: 16px">用户登录</h3>
    <a-form
      label-align="left"
      auto-label-width
      style="max-width: 480px; margin: 0 auto"
      :model="form"
      @submit="handleSubmit"
    >
      <a-form-item field="" label="账号">
        <a-input v-model="form.userAccount" placeholder="请输入账号" />
      </a-form-item>
      <a-form-item field="userPassword" tooltip="密码不少于8位" label="密码">
        <a-input-password
          v-model="form.userPassword"
          placeholder="请输入密码"
        />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit">登录</a-button>

        <a-button type="primary" style="margin-left: 300px ">注册</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import message from "@arco-design/web-vue/es/message";
import { UserLoginRequest } from "../../../generated/models/UserLoginRequest";
import { UserControllerService } from "../../../generated/services/UserControllerService";

import { reactive } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const router = useRouter();
const store = useStore();
const form = reactive({
  userAccount: "",
  userPassword: "",
} as UserLoginRequest);
const handleSubmit = async (data: any) => {
  const res = await UserControllerService.userLoginUsingPost(form);
  //登录成功，跳转到主页
  await store.dispatch("user/getLoginUser");
  if (res.code === 0) {
    router.push({
      path: "/",
      replace: true, //替换当前页面， 就是返回也不会返回到登录页面了
    });
  } else {
    message.error("登录失败," + res.message);
  }
};
</script>
