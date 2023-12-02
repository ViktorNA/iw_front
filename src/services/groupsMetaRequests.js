import http from "./httpCommon";

const getAll = () => {
  return http.get("/groups");
};

const getLastMessage = (groupId) => {
  return http.get(`/messages/last?groupId=${groupId}`);
};

const getMetaById = (groupId) => {
  return http.get(`/groups/byId?id=${groupId}`);
};

const getMembers = (groupId) => {
  return http.get(`/groups/users?id=${groupId}`);
};

const GroupsMetaService = {
  getAll,
  getLastMessage,
  getMetaById,
  getMembers,
};

export default GroupsMetaService;
