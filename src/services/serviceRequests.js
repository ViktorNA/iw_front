import http from "./httpCommon";

const getChatsToUpdate = () => {
  return http.get(`/service/foldersToUpdate`);
};

const getActiveAndPendingTasks = () => {
  return http.get(`/task/activeAndPending`);
};

const processAll = () => {
  return http.get(`/service/processAll`);
};

const ServiceServices = {
  getChatsToUpdate,
  getActiveAndPendingTasks,
  processAll,
};

export default ServiceServices;
