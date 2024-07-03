<template>
  <div id="app">
    <template v-if="route.path.startsWith('/user')">
      <router-view/>
    </template>
    <template v-else>
          <BasicLayout />
    </template>
  </div>
</template>
<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import BasicLayout from "./layouts/BasicLayout.vue";
import { useStore } from "vuex";
import { onMounted } from "vue";
const router = useRouter();

const route = useRoute();

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
