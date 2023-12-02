import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UsersService from "../../services/usersRequests";
import ChatMessage from "./ChatMessage";
import { List } from "antd";
import SaveChatAsHtmlBlock from "./SaveChatAsHtmlBlock";
import GroupsMetaService from "../../services/groupsMetaRequests";

const MessagesInGroup = () => {
  const { userId, groupId } = useParams();
  const [messages, setMessages] = useState([]);
  const [replies, setReplies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [groupMeta, setGroupMeta] = useState({});

  useEffect(() => {
    UsersService.getMessagesInGroup(userId, groupId).then((res) => {
      setMessages(res.data.messages);
      setReplies(res.data.replies);
      setIsLoading(false);
    });
    GroupsMetaService.getMetaById(groupId).then((res) => {
      setGroupMeta(res.data);
    });
  }, [userId, groupId]);

  return (
    <div>
      {`${userId}-${groupMeta.name}(${groupId})`}

      <div>
        <SaveChatAsHtmlBlock
          messages={messages}
          replies={replies}
          groupId={groupId}
        />
        <List
          loading={isLoading}
          itemLayout="vertical"
          size="large"
          dataSource={messages}
          renderItem={(m) => (
            <ChatMessage key={m.id} message={m} replies={replies} />
          )}
        />
      </div>
    </div>
  );
};

export default MessagesInGroup;
