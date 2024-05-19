<template>
  <div id="app">
    <BasicLayout />
  </div>
</template>
<script setup lang="ts">
import { useRouter } from "vue-router";
import BasicLayout from "./layouts/BasicLayout.vue";
import { useStore } from "vuex";

const router = useRouter();

const store = useStore();
router.beforeEach((to, from, next) => {
  if (to.meta?.access === "canAdmin") {
    if (store.state.user.loginUser?.role !== "admin") {
      next("/noAuth");
      return;
    }
  }
    next();
});
</script>
<style></style>
