import http from "./httpCommon";

const getByIdOrUsername = (idOrUsername) => {
  return http.get(`/chatUser/byIdOrName?id=${idOrUsername}`);
};

const getGroups = (userId) => {
  return http.get(`/chatUser/groups?id=${userId}`);
};

const getMessagesInGroup = (userId, groupId) => {
  return http.get(
    `/messages/ofUserInGroup?userId=${userId}&groupId=${groupId}`
  );
};

const getServiceMessagesByUserId = (userId) => {
  return http.get(`/serviceMessages/byUserId?id=${userId}`);
};

const UsersService = {
  getByIdOrUsername,
  getGroups,
  getMessagesInGroup,
  getServiceMessagesByUserId,
};

export default UsersService;
