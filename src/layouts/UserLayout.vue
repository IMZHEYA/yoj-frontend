<template>
  <div id="UserLayout">
    <a-layout style="min-height: 100vh">
      <a-layout-header class="header">
        <a-space>
          <img class="logo" src="../assets/icon22.jpg" />
          <div>Y OJ</div>
        </a-space>
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
<script setup></script>
<style scoped>
#UserLayout {
  /* todo 加个背景 */
  text-align: center;
}
#UserLayout .logo {
  width: 64px;
  height: 64px;
}
#UserLayout .header {
  margin-top: 16px;
}

#UserLayout .content {
  margin-bottom: 16px;
}

#UserLayout .footer {
  padding: 16px;
  position: static;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
}
</style>
