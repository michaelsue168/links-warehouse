<template>
  <a-form layout="inline" :model="formState" class="flex gap-1">
    <a-form-item>
      <a-input v-model:value.trim="formState.Title" placeholder="Title"> </a-input>
    </a-form-item>
    <a-form-item
      :validate-status="!isValidUrl(formState.Link) && formState.Link ? 'error' : ''"
      :help="!isValidUrl(formState.Link) && formState.Link ? 'Please enter a valid URL' : ''"
    >
      <a-input v-model:value.trim="formState.Link" placeholder="Link">
        <template #prefix><LinkOutlined style="color: rgba(0, 0, 0, 0.25)" /></template>
      </a-input>
    </a-form-item>
    <a-form-item>
      <a-button type="primary" html-type="submit" :disabled="!formDone" @click="handleFinish">
        ADD
      </a-button>
    </a-form-item>
  </a-form>
</template>
<script setup>
import { computed, reactive } from "vue";
import { LinkOutlined } from "@ant-design/icons-vue";
import { SetLinksList, LinksList, SortLinksList } from "@/services/linksHandlers";
import { message } from "ant-design-vue";

// 表單內容
const formState = reactive({
  ID: "",
  Title: "",
  Link: "",
  createAt: "",
});
// 必填欄位
const requiredFields = ["Title", "Link"];

// 檢查表單是否完成
const formDone = computed(() => {
  return requiredFields.every((field) => formState[field] !== "") && isValidUrl(formState.Link);
});

// 檢查link有效性
function isValidUrl(value) {
  try {
    new URL(value);
    return true;
  } catch (error) {
    return false;
  }
}

// 送出表單
const handleFinish = () => {
  formState.ID = Math.random().toString(36).substring(2, 10);
  formState.createAt = new Date();
  LinksList.value.unshift({ ...formState });
  SortLinksList();
  SetLinksList();
  formState.ID = "";
  formState.Title = "";
  formState.Link = "";
  formState.createAt = "";

  message.success("Added successfully !");
};
</script>
