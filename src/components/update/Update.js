import React, { useEffect, useState } from "react";
import ServiceServices from "../../services/serviceRequests";
import { Button, List } from "antd";

import styles from "./updateView.module.css";

const Update = () => {
  const [chatsToUpdate, setChatsToUpdate] = useState([]);
  const [isTasksLoading, setIsTasksLoading] = useState(true);
  // const [tasks, setTasks] = useState([]);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    ServiceServices.getChatsToUpdate().then((res) => {
      setChatsToUpdate(res.data);
      setIsLoading(false);
    });
    ServiceServices.getActiveAndPendingTasks().then((res) => {
      const nt = res.data;
      if (nt.length === 0) {
        setIsTasksLoading(false);
      } else {
        setMessage("База уже обновляется");
      }
    });
  }, []);

  const onUpdateHandler = (e) => {
    ServiceServices.processAll().then((res) => {
      setIsTasksLoading(true);
      setMessage("База уже обновляется");
    });
  };

  return (
    <div>
      {message}
      <div className={styles.header}>
        <span>
          Список чатов, ожидающих обновления ({chatsToUpdate.length}):
        </span>{" "}
        <Button
          type={"primary"}
          onClick={onUpdateHandler}
          disabled={isTasksLoading}
        >
          Обновить
        </Button>
      </div>
      <List
        bordered
        dataSource={chatsToUpdate}
        renderItem={(item) => <List.Item>{item}</List.Item>}
        loading={isLoading}
      />
    </div>
  );
};

export default Update;
