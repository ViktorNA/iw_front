import React, { useEffect, useState } from "react";
import { Button } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import { getHtmlStringFromMessages } from "../../helpers/htmlHelpers";
import GroupsMetaService from "../../services/groupsMetaRequests";

const SaveChatAsHtmlBlock = ({ messages, replies, groupId }) => {
  const [isMetaLoading, setIsMetaLoading] = useState(true);
  const [groupMeta, setGroupMeta] = useState({});

  useEffect(() => {
    GroupsMetaService.getMetaById(groupId).then((res) => {
      console.log(res.data);
      setGroupMeta(res.data);
      setIsMetaLoading(false);
    });
  }, [groupId]);

  const downloadOnClick = (e) => {
    const title = `${groupMeta.name}(${groupId})-${messages[0].from_id}`;
    const htmlText = getHtmlStringFromMessages(messages, replies, title);
    const element = document.createElement("a");
    const file = new Blob([htmlText], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `${title}.html`;
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  };
  return (
    <div>
      <Button
        type="primary"
        onClick={(e) => downloadOnClick(e)}
        disabled={isMetaLoading}
        icon={<DownloadOutlined />}
      >
        Download
      </Button>
    </div>
  );
};

export default SaveChatAsHtmlBlock;
