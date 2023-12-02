import React, { useEffect, useState } from "react";
import { Button, InputNumber, notification, Space } from "antd";
import TextArea from "antd/es/input/TextArea";
import vkServices from "../../services/vkRequests";

const VkGroupIds = () => {
  const [vkGroupIds, setVkGroupIds] = useState([]);
  const [newGroupId, setNewGroupId] = useState(123456);
  const [newManyGroups, setNewManyGroups] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [api, contextHolder] = notification.useNotification();

  useEffect(() => {
    vkServices.getGroupIds().then((res) => {
      setVkGroupIds(res.data);
      res.data.forEach((x) => {
        console.log(`${x.id}  ${x.name}`);
      });
      setIsLoading(false);
    });
  }, []);

  const addGroupHandler = () => {
    setIsLoading(true);

    for (let i = 0; i < vkGroupIds.length; i++) {
      const vkGroupId = vkGroupIds[i];

      if (vkGroupId.id === 0 - newGroupId) {
        setIsLoading(false);
        api.error({
          message: "Group is already in the list",
          placement: "top",
        });
        return;
      }
    }

    vkServices.addGroupToControl(0 - newGroupId).then(() => {
      setIsLoading(false);
      setVkGroupIds([...vkGroupIds, { id: 0 - newGroupId }]);
      api.success({
        message: "Successes",
        placement: "top",
      });
    });
  };

  const isGroupAlreadyInTheList = (groupId) => {
    for (let i = 0; i < vkGroupIds.length; i++) {
      const vkGroupId = vkGroupIds[i];
      if (vkGroupId.id === 0 - groupId) {
        return true;
      }
    }
    return false;
  };

  const addManyGroupsHandler = () => {
    setIsLoading(true);
    const comaIndex = newManyGroups.indexOf(",");
    const lineBreakIndex = newManyGroups.indexOf("\n");
    if (lineBreakIndex === -1 && comaIndex === -1) {
      api.error({
        message: "Can't find separator",
        placement: "top",
      });
      setIsLoading(false);
      return;
    }

    let elements;
    if (comaIndex !== -1) {
      elements = newManyGroups.split(",");
    } else {
      elements = newManyGroups.split("\n");
    }

    const groupIdsToAdd = [];
    elements.forEach((element) => {
      const elementTrimmed = Number(element.trim());
      if (elementTrimmed < 1) return;
      if (isGroupAlreadyInTheList(elementTrimmed)) return;
      if (elementTrimmed > 0) groupIdsToAdd.push(0 - elementTrimmed);
      else groupIdsToAdd.push(elementTrimmed);
    });

    if (groupIdsToAdd.length === 0) {
      api.info({
        message: `All groups are already in the list`,
        placement: "top",
      });
      setIsLoading(false);
      return;
    }
    console.log(groupIdsToAdd);

    vkServices
      .addGroupToControlMany(groupIdsToAdd.map((id) => ({ id })))
      .then((res) => {
        setIsLoading(false);
        setVkGroupIds([...vkGroupIds, ...res.data]);
        api.success({
          message: `Added ${groupIdsToAdd.length} groups`,
          placement: "top",
        });
      });
  };

  return (
    <div>
      {contextHolder}
      <Space>
        <TextArea
          rows={4}
          value={newManyGroups}
          onChange={(e) => setNewManyGroups(e.target.value)}
        />
      </Space>
      <br />
      <br />
      <Button type="primary" loading={isLoading} onClick={addManyGroupsHandler}>
        Add
      </Button>
      <br />
      <br />
      <Space>
        <InputNumber
          addonBefore="-"
          defaultValue={123456}
          min={0}
          value={newGroupId}
          onChange={setNewGroupId}
        />
        <Button type="primary" onClick={addGroupHandler} loading={isLoading}>
          Добавить
        </Button>
      </Space>
      <br />
      {`Groups (${vkGroupIds.length}):`}
      <br />
      {vkGroupIds.map((groupId) => (
        <p key={groupId._id}>{groupId.id}</p>
      ))}
    </div>
  );
};

export default VkGroupIds;
