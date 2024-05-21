<template>
  <div id="userRegisterView">
    <h3 style="margin-bottom: 16px">用户注册</h3>
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
      <a-form-item field="checkPassword" tooltip="密码不少于8位" label="密码">
        <a-input-password
          v-model="form.checkPassword"
          placeholder="请确认密码"
        />
      </a-form-item>

      <a-form-item>
        <a-button type="primary" html-type="submit">注册</a-button>
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
import { UserRegisterRequest } from "../../../generated/models/UserRegisterRequest";

const router = useRouter();
const store = useStore();
const form = reactive({
  userAccount: "",
  userPassword: "",
  checkPassword: "",
} as UserRegisterRequest);
const handleSubmit = async (data: any) => {
  const res = await UserControllerService.userRegisterUsingPost(form);
  //注册成功，跳转到登录页面
  if (res.code === 0) {
    message.success("注册成功，请登录");
    router.push({
      path: "/user/login",
      replace: true, //替换当前页面， 就是返回也不会返回到注册页面了
    });
  } else {
    message.error("注册失败," + res.message);
  }
};
</script>
