import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import GroupsMetaRequests from "../../services/groupsMetaRequests";
import { List } from "antd";

const GroupProfile = () => {
  const [members, setMembers] = useState([]);
  const [isMembersLoading, setIsMembersLoading] = useState(true);

  const { groupId } = useParams();

  useEffect(() => {
    GroupsMetaRequests.getMembers(groupId).then((res) => {
      setMembers(res.data);
      setIsMembersLoading(false);
    });
  }, [groupId]);

  return (
    <List
      size="small"
      bordered
      dataSource={members}
      renderItem={(item) => (
        <List.Item>
          <Link to={`/users/${item.chatUserId}/group/${groupId}`}>
            {item.chatUserId}
          </Link>
        </List.Item>
      )}
      loading={isMembersLoading}
    />
  );
};

export default GroupProfile;
