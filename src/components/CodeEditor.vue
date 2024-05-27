<template>
  <div
    id="code-editor"
    ref="codeEditorRef"
    style="min-height: 600px"
    height="70vh"
  />
</template>
<script setup lang="ts">
import * as monaco from "monaco-editor";
import { onMounted, ref, toRaw, watch } from "vue";

const codeEditorRef = ref(); //创建了一个 Monaco Editor 实例。
const codeEditor = ref(); //用于存储 Monaco Editor 实例。
const value = ref("hello world");

/**
 * 定义组件属性类型
 */
interface Props {
  value: string;
  language?: string;
  handleChange: (v: string) => void;
}
/**
 * 给组件指定初始值
 */
const props = withDefaults(defineProps<Props>(), {
  value: () => "",
  language: () => "java",
  handleChange: (v: string) => {
    console.log(v);
  },
});
// watch(
//   () => props.language,
//   () => {
//     codeEditor.value = monaco.editor.create(codeEditorRef.value, {
//       value: value.value,
//       language: props.language,
//       automaticLayout: true,
//       colorDecorators: true,
//       minimap: {
//         enabled: true,
//       },
//       readOnly: false,
//       theme: "vs-dark",
//       // lineNumbers: "off",
//       // roundedSelection: false,
//       // scrollBeyondLastLine: false,
//     });
//   }
// );

onMounted(() => {
  if (!codeEditorRef.value) {
    return;
  }
  codeEditor.value = monaco.editor.create(codeEditorRef.value, {
    value: value.value,
    language: props.language,
    automaticLayout: true,
    colorDecorators: true,
    minimap: {
      enabled: true,
    },
    readOnly: false,
    theme: "vs-dark",
    // lineNumbers: "off",
    // roundedSelection: false,
    // scrollBeyondLastLine: false,
  });
  // 编辑 监听内容变化
  codeEditor.value.onDidChangeModelContent(() => {
    props.handleChange(toRaw(codeEditor.value).getValue());
  });
});
</script>

<style scoped></style>
