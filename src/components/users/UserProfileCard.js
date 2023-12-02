import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import copy from "copy-to-clipboard";
import { Button, notification, Spin } from "antd";
import UsersService from "../../services/usersRequests";
import GroupCard from "../groups/GroupCard";
import SaveAllChatsBlock from "./SaveAllChatsBlock";
import ServiceMessages from "./ServiceMessages";

const UserProfileCard = () => {
  const { userId } = useParams();

  const [groups, setGroups] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [groupsAsText, setGroupsAsText] = useState([]);
  const [api, contextHolder] = notification.useNotification();

  useEffect(() => {
    UsersService.getGroups(userId).then((res) => {
      setGroups(res.data);
      setGroupsAsText(
        res.data.map((g) =>
          g.username ? `@${g.username} | ${g.name}` : g.name
        )
      );
      setIsLoading(false);
    });
  }, [userId]);

  const copyOnClickHandler = () => {
    console.log("copy");
    const text = groupsAsText.join("\n");
    copy(text);
    api.success({ message: "copied", placement: "topRight" });
  };

  return (
    <>
      {contextHolder}
      {userId}
      <Spin spinning={isLoading}>
        <SaveAllChatsBlock userId={userId} groupsMetas={groups} />
        <br />
        <Button onClick={copyOnClickHandler}>Copy groups</Button>
        <div>
          {groups.map((g) => (
            <GroupCard
              key={g.id}
              groupId={g.id}
              groupName={g.name}
              messageCount={g.messageCount}
              customMoreLabel={"Messages"}
              customMoreLink={`/users/${userId}/group/${g.id}`}
            />
          ))}
          <ServiceMessages userId={userId} />
        </div>
      </Spin>
    </>
  );
};

export default UserProfileCard;
