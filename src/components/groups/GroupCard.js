import React, { useEffect, useState } from "react";
import { Card, Spin } from "antd";
import GroupsMetaRequests from "../../services/groupsMetaRequests";
import { getNormalDateTime } from "../../helpers/helpers";
import { Link } from "react-router-dom";

import styles from "./groups.module.css";

const GroupCard = ({
  groupName,
  messageCount,
  groupId,
  customMoreLabel = "More",
  customMoreLink = null,
}) => {
  const [lastMessage, setLastMessage] = useState({ date: "Loading" });
  const [dateIsLoading, setDateIsLoading] = useState(true);

  useEffect(() => {
    GroupsMetaRequests.getLastMessage(groupId).then((res) => {
      setLastMessage(res.data);
      setDateIsLoading(false);
    });
  }, [groupId]);
  return (
    <Card
      title={groupName}
      extra={
        <Link to={customMoreLink || `/groupMeta/${groupId}`}>
          {customMoreLabel}
        </Link>
      }
      className={styles.groupCard}
    >
      <p>Messages in group: {messageCount}</p>
      <p>
        Last message date:{" "}
        <Spin spinning={dateIsLoading}>
          {getNormalDateTime(lastMessage.date)}
        </Spin>
      </p>
    </Card>
  );
};

export default GroupCard;
