import React, { useEffect, useState } from "react";
import { List } from "antd";
import { getNormalDateTime } from "../../helpers/helpers";

const ChatMessage = ({ message, replies }) => {
  const { from, from_id, text, date, reply_to_message_id, file } = message;
  const replyMessage = replies.find(
    (reply) => reply.id === reply_to_message_id
  );
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (replyMessage) {
      const { text, from_id, from, date, file } = replyMessage;

      let additionalText = `${from}(${from_id}) ${getNormalDateTime(date)}:
       ${text || ""}`;
      additionalText += file ? "\n[Attachment]" : "";
      setDescription(additionalText);
    }
    if (replyMessage === undefined) setDescription("");
  }, [replyMessage]);

  return (
    <List.Item>
      <List.Item.Meta
        title={`${from}(${from_id}) ${getNormalDateTime(date)}`}
        description={description}
      />
      {text || ""}
      {file ? "[Attachment]" : ""}
    </List.Item>
  );
};

export default ChatMessage;
