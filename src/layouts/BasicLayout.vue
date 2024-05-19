<template>
  <div id="Basiclayout">
    <a-layout style="height: 400px">
      <a-layout-header class="header">Header</a-layout-header>
      <a-layout-content class="content">
      <roter-view/>  
      </a-layout-content>
      <a-layout-footer class="footer">
        <a href="https://blog.csdn.net/m0_74870396?type=blog" target="_blank">
          诨号无敌鸭
        </a>
      </a-layout-footer>
    </a-layout>
  </div>
</template>

<style scoped>
#Basiclayout {
}
#Basiclayout .header {
  background: red;
  margin-bottom: 16px;
}

#Basiclayout .content {
    /* 水平方向的渐变背景 */
  background: linear-gradient(to right, #bbb, #fff); 
  margin-bottom: 16px;
}

#Basiclayout .footer {
  background: #efefef;
  padding: 16px;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
}
</style>
