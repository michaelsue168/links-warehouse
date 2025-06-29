<template>
  <div class="w-full lg:w-1/2">
    <div class="flex justify-between px-6 items-baseline">
      <div class="flex items-end gap-3">
        <h3 class="text-2xl">Link List</h3>
        <p>
          <a-popconfirm title="Sure to delete?" @confirm="DeleteLinksList">
            <a class="!text-red-400 cursor-pointer text-sm">Delete All</a>
          </a-popconfirm>
        </p>
      </div>
      <div class="flex items-center gap-3 text-sm">
        <p class="cursor-pointer text-gray-400" @click="ToggleSortOrder">
          ({{ isNewestFirst ? "New → Old" : "Old → New" }})
        </p>
      </div>
    </div>
    <a-list item-layout="horizontal" :data-source="LinksList">
      <template #renderItem="{ item }">
        <a-list-item class="transition duration-300 ease-in-out hover:scale-110 hover:shadow-lg">
          <a-list-item-meta :description="`${formatDate(item.createAt)}`">
            <template #title>
              <p>{{ item.Title }}</p>
            </template>
          </a-list-item-meta>
          <template #actions>
            <a @click="openLink(item.Link, '_blank')"><ExportOutlined /></a>
            <!-- <a @click="showModal(item.Link)"><QrcodeOutlined /></a> -->
            <a>
              <a-popover>
                <template #content>
                  <a-qrcode :value="item.Link" :bordered="false" />
                </template>
                <QrcodeOutlined />
              </a-popover>
            </a>
            <a>
              <a-popconfirm title="Sure to delete?" @confirm="DeleteLink(item.ID)">
                <a class="!text-red-500"><DeleteOutlined /></a>
              </a-popconfirm>
            </a>
          </template>
        </a-list-item>
      </template>
    </a-list>
  </div>

  <!-- <a-modal v-model:open="open" title="QR code" class="w-fit">
    <template #footer>
      <a-button key="close" @click="hideModal">close</a-button>
    </template>
    <a-qrcode :value="QRcode" />
  </a-modal> -->
</template>
<script setup>
import { onBeforeMount, ref } from "vue";
import dayjs from "dayjs";
import {
  LinksList,
  GetLinksList,
  DeleteLinksList,
  isNewestFirst,
  DeleteLink,
  ToggleSortOrder,
} from "@/services/linksHandlers";
import { ExportOutlined, DeleteOutlined, QrcodeOutlined } from "@ant-design/icons-vue";

// 格式化日期
const formatDate = (isoString) => {
  return dayjs(isoString).format("YYYY/MM/DD HH:mm:ss");
};
// 打開連結
const openLink = (url) => {
  window.open(url, "_blank", "noopener,noreferrer");
};
// ===用於QRcode對話框==================
// const open = ref(false);
// const QRcode = ref(false);
// const showModal = (url) => {
//   open.value = true;
//   QRcode.value = url;
// };
// const hideModal = () => {
//   open.value = false;
//   QRcode.value = "";
// };
// ===================================
onBeforeMount(() => {
  GetLinksList();
});
</script>
