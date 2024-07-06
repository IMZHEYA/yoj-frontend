<template>
  <div id="QuestionSubmitView">
    <a-form :model="searchParams" layout="inline">
      <a-form-item field="questionId" label="题号" style="min-width: 240px">
        <a-input v-model="searchParams.questionId" placeholder="请输入" />
      </a-form-item>
      <a-form-item field="language" label="编程语言" style="min-width: 240px">
        <a-select
          v-model="searchParams.language"
          :style="{ width: '320px' }"
          placeholder="选择编程语言"
        >
          <a-option>java</a-option>
          <a-option>cpp</a-option>
          <a-option>go</a-option>
          <a-option>html</a-option>
        </a-select>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" @click="doSubmit">搜索</a-button>
      </a-form-item>
    </a-form>
    <a-divider size="0" />
    <a-table
      :ref="tableRef"
      :columns="columns"
      :data="dataList"
      :pagination="{
        showTotal: true,
        pageSize: searchParams.pageSize,
        current: searchParams.current,
        total,
      }"
      @page-change="onPageChange"
    >
      <template #judgeInfo="{ record }">
        <a-tag :color="handleColor(record.judgeInfo?.message)">
          {{ record?.judgeInfo?.message || "编译出错" }}
        </a-tag>
      </template>
      <template #status="{ record }">
        {{ record?.status === 2 ? "判题成功" : "判题失败" }}
      </template>
      <template #createTime="{ record }">
        {{ moment(record.createTime).format("YYYY-MM-DD") }}
      </template>
      <template #optional="{ record }">
        <a-space>
          <a-button
            type="primary"
            v-if="loginUser.id === record.userId"
            @click="toQuestionPage(record)"
            >查看详情
          </a-button>
        </a-space>
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watchEffect } from "vue";
import {
  Question,
  QuestionSubmitControllerService,
  QuestionSubmitQueryRequest,
} from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import moment from "moment";
import store from "@/store";
import { useRouter } from "vue-router";
const router = useRouter();
const loginUser = store.state.user.loginUser;
const dataList = ref([]);
const total = ref(0);
const tableRef = ref();
const searchParams = ref<QuestionSubmitQueryRequest>({
  questionId: undefined,
  language: undefined,
  pageSize: 10,
  current: 1,
});
const loadData = async () => {
  const res =
    await QuestionSubmitControllerService.listQuestionSubmitByPageUsingPost({
      ...searchParams.value,
      sortField: "createTime",
      sortOrder: "descend",
    });
  if (res.code === 0) {
    dataList.value = res.data.records;
    total.value = res.data.total;
  } else {
    message.error("加载失败，" + res.message);
  }
};

watchEffect(() => {
  loadData();
});
//页面加载时请求数据
onMounted(() => {
  loadData();
});
const columns = [
  {
    title: "提交号",
    dataIndex: "id",
  },
  {
    title: "编程语言",
    dataIndex: "language",
  },
  {
    title: "判题信息",
    slotName: "judgeInfo",
  },
  {
    title: "判题状态",
    dataIndex: "status",
    slotName: "status",
  },
  {
    title: "题目 id",
    dataIndex: "questionId",
  },
  {
    title: "提交者 id",
    dataIndex: "userId",
  },
  {
    title: "提交时间",
    slotName: "createTime",
  },
  {
    title: "操作",
    slotName: "optional",
  },
];
//根据题目提交状态更改标签颜色
const handleColor = (record: any): string => {
  if (record === "通过") {
    return "green";
  } else {
    return "red";
  }
};

const onPageChange = (page: number) => {
  searchParams.value = {
    ...searchParams.value,
    current: page,
  };
};

//执行查询
const doSubmit = () => {
  //重置搜索页面
  searchParams.value = {
    ...searchParams.value,
    current: 1,
  };
};
//跳转到题目提交详情界面
const toQuestionPage = (question:Question) => {
  router.push({
    path: `/submissions/detail/${question.id}`,
  });
};
</script>

<style scoped>
#QuestionSubmitView {
  max-width: 1200px;
  margin: 0 auto;
}
</style>
