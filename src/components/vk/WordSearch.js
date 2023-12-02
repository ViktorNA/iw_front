import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import vkServices from "../../services/vkRequests";
import { List, Progress } from "antd";
import { getNormalDateTime } from "../../helpers/helpers";

import styles from "./comments.module.css";

const WordSearch = () => {
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [comments, setComments] = useState([]);
  const [percent, setPercent] = useState("0");

  useEffect(() => {
    const word = searchParams.get("word");
    const date = searchParams.get("date") || 0;
    if (word === null) return;
    setIsLoading(true);
    const commentsFull = [];
    const fetchVkCommentsAsync = async () => {
      const groupIds = await vkServices.getGroupIds();
      const groupNumber = groupIds.data.length;
      console.log(groupIds);

      for (let i = 0; i < groupNumber; i++) {
        const groupId = groupIds.data[i].id;
        console.log(groupId);
        const commentsNew = await vkServices.getCommentsByWord(
          word,
          groupId,
          date
        );
        if (comments.length > 0 || commentsNew.data.length > 0)
          setIsLoading(false);

        commentsFull.push(...commentsNew.data);
        setComments(commentsFull);
        const p = ((i + 1) / groupNumber) * 100;
        setPercent(p.toFixed(2));
      }
    };

    fetchVkCommentsAsync().catch(console.error);
  }, []);

  return (
    <div>
      <div className={styles.progressBar}>
        <Progress percent={Number.parseFloat(percent)} />
      </div>
      <List
        loading={isLoading}
        dataSource={comments}
        itemLayout="horizontal"
        renderItem={(item) => {
          const { title, from_id, date, text } = item;
          return (
            <List.Item key={title}>
              <List.Item.Meta
                title={<a href={`/vkComments?userId=${from_id}`}>{from_id}</a>}
                description={getNormalDateTime(date)}
              />
              {text}
            </List.Item>
          );
        }}
      />
    </div>
  );
};

export default WordSearch;
