import { Route, Routes } from "react-router-dom";
import Groups from "../components/groups/Groups";
import Users from "../components/users/Users";
import UserProfileCard from "../components/users/UserProfileCard";
import MessagesInGroup from "../components/users/MessagesInGroup";
import Update from "../components/update/Update";
import GroupProfile from "../components/groups/GroupProfile";
import Search from "../components/search/Search";
import VkGroupIds from "../components/vk/VkGroupIds";
import VkComments from "../components/vk/VkComments";
import WordSearch from "../components/vk/WordSearch";

const MainRouter = () => {
  return (
    <Routes>
      <Route path={"/groups"} element={<Groups />} />
      <Route path={"/groupMeta/:groupId"} element={<GroupProfile />} />
      <Route path={"/users"} element={<Users />} />
      <Route path={"/users/:userId"} element={<UserProfileCard />} />
      <Route
        path={"/users/:userId/group/:groupId"}
        element={<MessagesInGroup />}
      />
      <Route path={"/updates"} element={<Update />} />
      <Route path={"/search"} element={<Search />} />
      <Route path={"/vkGroupIds"} element={<VkGroupIds />} />
      <Route path={"/vkComments"} element={<VkComments />} />
      <Route path={"/vkCommentsByWord"} element={<WordSearch />} />
    </Routes>
  );
};

export default MainRouter;
