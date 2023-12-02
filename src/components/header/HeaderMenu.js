import { Layout, Menu } from "antd";
import React from "react";
import HeaderElement from "./HeaderElement";

const { Header, Content } = Layout;

const menuItems = [
  { to: "/users", label: "TG comments", iconPath: "./tg.png" },
  { to: "/vkComments", label: "VK comments", iconPath: "./vk.png" },
  { to: "/groups", label: "TG groups", iconPath: "./groups.png" },
  {
    to: "/vkGroupIds",
    label: "VK groups",
    iconPath: "./groups.png",
  },
  { to: "/search", label: "Search", iconPath: "./search.png" },
  { to: "/updates", label: "Update", iconPath: "./update.png" },
].map((item, index) => ({
  key: `${item.label} ${index}`,
  label: (
    <HeaderElement label={item.label} to={item.to} iconPath={item.iconPath} />
  ),
}));

const HeaderMenu = () => {
  return (
    <Header className="header">
      <Menu theme="dark" mode="horizontal" items={menuItems} />
    </Header>
  );
};

export default HeaderMenu;
