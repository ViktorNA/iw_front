import http from "./httpCommon";

const getGroupIds = () => {
  return http.get(`/vk/vkGroupId`);
};

const addGroupToControl = (vkGroupId) => {
  return http.post(`/vk/vkGroupId`, { vkGroupId });
};

const addGroupToControlMany = (vkGroupIds) => {
  return http.post(`/vk/vkGroupIds`, { vkGroupIds });
};

const getPosts = (userId) => {
  return http.get(`/vk/vkPosts?userId=${userId}`);
};

const getGroupsMany = (groupIds) => {
  console.log(groupIds);
  return http.post(`/vk/vkGroupsMany`, { groupIds });
};

const getCommentsByWord = (word, groupId, date) => {
  return http.get(
    `/vk/vkCommentsByWord?word=${word}&groupId=${groupId}&date=${date}`
  );
};

const vkServices = {
  getGroupIds,
  addGroupToControl,
  addGroupToControlMany,
  getPosts,
  getGroupsMany,
  getCommentsByWord,
};

export default vkServices;
