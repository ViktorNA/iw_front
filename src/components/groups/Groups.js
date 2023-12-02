import React, { useEffect, useState } from "react";
import GroupsMetaRequests from "../../services/groupsMetaRequests";
import GroupCard from "./GroupCard";
import { Input, Spin } from "antd";

const Groups = () => {
  const [groups, setGroups] = useState([]);
  const [groupsNumber, setGroupsNumber] = useState(0);
  const [idOrName, setIdOrName] = useState("");
  const [filteredGroups, setFilteredGroups] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    GroupsMetaRequests.getAll().then((res) => {
      setGroups(res.data);
      setFilteredGroups(res.data);
      setGroupsNumber(res.data.length || 0);
      setIsLoading(false);
    });
  }, []);

  const idOrGroupNameOnChange = (e) => {
    const { value } = e.target;
    setIdOrName(value);
    if (!value) {
      setFilteredGroups(groups);
    } else {
      const ng = groups.filter((g) => {
        if (`${g.id}`.indexOf(value) !== -1) return true;
        return g.name.toLowerCase().indexOf(value) !== -1;
      });
      setFilteredGroups(ng);
    }
  };

  return (
    <div>
      <p>Groups number: {groupsNumber}</p>
      <Input
        value={idOrName}
        onChange={(e) => idOrGroupNameOnChange(e)}
        placeholder="Id or group name"
      />
      <Spin spinning={isLoading}>
        {filteredGroups.map((x) => (
          <GroupCard
            key={"gc-" + x.id}
            groupId={x.id}
            groupName={x.name}
            messageCount={x.messageCount}
          />
        ))}
      </Spin>
    </div>
  );
};

export default Groups;
