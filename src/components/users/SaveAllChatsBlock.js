import React, { useState } from "react";
import { Button, Tooltip } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import UsersService from "../../services/usersRequests";
import { getHtmlStringFromMessages } from "../../helpers/htmlHelpers";
import JSZip from "jszip";

const SaveAllChatsBlock = ({ groupsMetas = [], userId = "" }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [promptMessage, setPromptMessage] = useState("");

  const onDownloadAllClickHandler = async () => {
    setIsLoading(true);
    const messagesAndReplies = [];
    for (let i = 0; i < groupsMetas.length; i++) {
      setPromptMessage(`Downloading messages ${i + 1}/${groupsMetas.length}`);
      const answer = await UsersService.getMessagesInGroup(
        userId,
        groupsMetas[i].id
      );
      messagesAndReplies.push(answer.data);
    }

    setPromptMessage(`Preparing html's`);
    const htmlFiles = [];
    for (let i = 0; i < messagesAndReplies.length; i++) {
      const htmlText = getHtmlStringFromMessages(
        messagesAndReplies[i].messages,
        messagesAndReplies[i].replies,
        groupsMetas[i].name
      );
      const file = new Blob([htmlText], { type: "text/plain" });
      htmlFiles.push({
        file: file,
        name: `${groupsMetas[i].name}(${groupsMetas[i].id})-${userId}.html`,
      });
    }
    setPromptMessage("Preparing zip");
    const zip = new JSZip();
    for (let i = 0; i < htmlFiles.length; i++) {
      zip.file(htmlFiles[i].name, htmlFiles[i].file);
    }

    zip.generateAsync({ type: "blob" }).then(function (content) {
      const element = document.createElement("a");
      element.href = URL.createObjectURL(content);
      element.download = `user${userId}_chats.zip`;
      document.body.appendChild(element); // Required for this to work in FireFox
      element.click();
      setPromptMessage("Downloading");
      setTimeout(() => setIsLoading(false), 1000);
    });
  };
  return (
    <div>
      <Tooltip title={promptMessage} trigger={["click"]} open={isLoading}>
        <Button
          onClick={onDownloadAllClickHandler}
          type="primary"
          icon={<DownloadOutlined />}
          loading={isLoading}
        >
          Download all
        </Button>
      </Tooltip>
    </div>
  );
};

export default SaveAllChatsBlock;
