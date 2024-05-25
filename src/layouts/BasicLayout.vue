<template>
  <div id="Basiclayout">
    <a-layout style="min-height: 100vh">
      <a-layout-header class="header">
        <GlobalHeader />
      </a-layout-header>
      <a-layout-content class="content">
        <router-view />
      </a-layout-content>
      <a-layout-footer class="footer">
        <a href="https://blog.csdn.net/m0_74870396?type=blog" target="_blank">
          诨号无敌鸭
        </a>
      </a-layout-footer>
    </a-layout>
  </div>
</template>
<script setup>
import GlobalHeader from "@/components/GlobalHeader.vue";
import router from "@/router";
</script>
<style scoped>
#Basiclayout {
}
#Basiclayout .header {
  margin-bottom: 16px;
  box-shadow: #eee 1px 1px 5px;
}

#Basiclayout .content {
  /* 水平方向的渐变背景 */
  background: linear-gradient(to right, #fefefe, #fff);
  margin-bottom: 16px;
}

#Basiclayout .footer {
  background: #efefef;
  padding: 16px;
  position: static;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
}
</style>
