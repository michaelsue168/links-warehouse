import { ref } from "vue";

// 連結列表
const LinksList = ref([]);

// 列表排序true = 新到舊，false = 舊到新
const isNewestFirst = ref(true);

// 取得localStorage列表
const GetLinksList = () => {
  LinksList.value = JSON.parse(localStorage.getItem("LinksList")) || [];
  SortLinksList();
};

// 更新localStorage列表
const SetLinksList = () => {
  localStorage.setItem("LinksList", JSON.stringify(LinksList.value));
};

// 移除localStorage列表
const DeleteLinksList = () => {
  LinksList.value = [];
  SetLinksList();
};

// 刪除特定連結
const DeleteLink = (ID) => {
  const index = LinksList.value.findIndex((item) => item.ID === ID);
  if (index !== -1) {
    LinksList.value.splice(index, 1);
    SetLinksList();
  }
};

// 排序列表
const SortLinksList = () => {
  LinksList.value.sort((a, b) => {
    const dateA = new Date(a.createAt).getTime();
    const dateB = new Date(b.createAt).getTime();
    return isNewestFirst.value ? dateB - dateA : dateA - dateB;
  });
};

// 切換排序
const ToggleSortOrder = () => {
  isNewestFirst.value = !isNewestFirst.value;
  SortLinksList();
};

export {
  LinksList,
  isNewestFirst,
  GetLinksList,
  SetLinksList,
  DeleteLinksList,
  DeleteLink,
  SortLinksList,
  ToggleSortOrder,
};
