<template>
  <div id="app">
    <BasicLayout />
  </div>
</template>
<script setup lang="ts">
import { useRouter } from "vue-router";
import BasicLayout from "./layouts/BasicLayout.vue";
import { useStore } from "vuex";
import { onMounted } from "vue";

const router = useRouter();

const store = useStore();


const doInit = () => {
//  store.dispatch("user/getLoginUser", {
//   userAccount: "yupi",
// });
};

onMounted(() => {
  doInit();
});
</script>
<style></style>
