import React, { useState } from "react";
import { Input, List } from "antd";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setSearchUsers, setRequest } from "../../redux/searchUsersSlice";
import UsersService from "../../services/usersRequests";

const Users = () => {
  const searchUsers = useSelector((state) => state.searchUsers.users);
  const searchRequest = useSelector((state) => state.searchUsers.request);

  const dispatch = useDispatch();

  const [idOrUsername, setIdOrUsername] = useState(searchRequest);
  const [users, setUsers] = useState(searchUsers);
  const [isLoading, setIsLoading] = useState(false);

  const idOrUsernameOnChange = (e) => {
    setIsLoading(true);
    const value = e.target.value;
    setIdOrUsername(value);

    if (!value) return;
    UsersService.getByIdOrUsername(value).then((res) => {
      setUsers(res.data);
      setIsLoading(false);
      dispatch(setRequest(value));
      dispatch(setSearchUsers(res.data));
    });
  };

  return (
    <div>
      <Input
        value={idOrUsername}
        onChange={(e) => idOrUsernameOnChange(e)}
        placeholder="Id or username"
      />
      <List
        loading={isLoading}
        itemLayout="horizontal"
        dataSource={users}
        renderItem={(item) => {
          const { chatUserId, chatUserName } = item;
          return (
            <List.Item>
              <List.Item.Meta
                title={
                  <Link to={`/users/${chatUserId}`}>
                    {chatUserName || "null"}
                  </Link>
                }
                description={`ID: ${chatUserId}`}
              />
            </List.Item>
          );
        }}
      />
    </div>
  );
};

export default Users;
