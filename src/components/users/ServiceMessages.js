import React, { useEffect, useState } from "react";
import UsersService from "../../services/usersRequests";
import { Divider, List } from "antd";
import { getNormalDateTime } from "../../helpers/helpers";

const ServiceMessages = ({ userId = "1286624586" }) => {
  const [serviceMessages, setServiceMessages] = useState([]);
  const [groupMetas, setGroupMetas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    UsersService.getServiceMessagesByUserId(userId).then((res) => {
      const { messages, groupMetas } = res.data;
      setServiceMessages(messages);
      setGroupMetas(groupMetas);
      setIsLoading(false);
    });
  }, [userId]);
  return (
    <>
      <Divider orientation="left">Service messages</Divider>
      <List
        size="small"
        bordered
        loading={isLoading}
        dataSource={serviceMessages}
        renderItem={(item) => {
          const { date, actor, action, groupId } = item;
          return (
            <List.Item>{`${getNormalDateTime(
              date
            )}: user=${actor}; action=${action}; group="${
              groupMetas.find((group) => group.id === groupId).name || "error"
            }"`}</List.Item>
          );
        }}
      />
    </>
  );
};

export default ServiceMessages;
