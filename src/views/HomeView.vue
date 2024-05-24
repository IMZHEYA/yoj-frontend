<template>
  <div class="home">
    <MdEditor :value="Mdvalue" :handle-change="onMdChange" />
    <CodeEditor :value="Codevalue" :handle-change="onCodeChange"/>
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import HelloWorld from "@/components/HelloWorld.vue";
import MdEditor from "@/components/MdEditor.vue";
import CodeEditor from "@/components/CodeEditor.vue";

const Mdvalue = ref();

const onMdChange = (v: string) => {
  Mdvalue.value = v;
};
const Codevalue = ref();

const onCodeChange = (v: string) => {
  Codevalue.value = v;
};
</script>
<style>
.bytemd-toolbar-icon.bytemd-tippy.bytemd-tippy-right:last-child {
  display: none;
}
</style>
