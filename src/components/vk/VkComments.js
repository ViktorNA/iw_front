import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Button, Checkbox, Input, Space, List } from "antd";
import DatePicker from "react-datepicker";
import { CalendarOutlined } from "@ant-design/icons";
import vkServices from "../../services/vkRequests";
import vkRequests from "../../services/vkRequests";

import "react-datepicker/dist/react-datepicker.css";

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

const VkComments = () => {
  const [isLoadingPosts, setIsLoadingPosts] = useState(false);
  const [commentListItems, setCommentListItems] = useState([]);

  const [searchParams, setSearchParams] = useSearchParams();
  const [userId, setUserId] = useState(searchParams.get("userId"));
  const [searchUserId, setSearchUserId] = useState(userId || null);
  const [groupList, setGroupList] = useState([]);
  const [isSearchAll, setIsSearchAll] = useState(true);

  const [word, setWord] = useState("");
  const [startDate, setStartDate] = useState(new Date("01-01-2021"));
  const navigate = useNavigate();

  useEffect(() => {
    setUserId(searchParams.get("userId"));
  }, [searchParams]);

  useEffect(() => {
    if (userId) {
      setIsLoadingPosts(true);
      vkRequests.getPosts(userId).then((res) => {
        setIsLoadingPosts(false);
        const { comments, posts } = res.data;
        const displayData = [];
        const groupSet = new Set();
        if (comments) {
          comments.forEach((comment) => {
            const { date, _id, groupId, postId, text } = comment;
            const post = posts.find(
              (post) => post.id === postId && post.groupId === groupId
            );
            const link = `https://vk.com/club${-groupId}`;

            groupSet.add(groupId);
            displayData.push({
              href: link,
              title: link,
              description: post.text,
              postDate: post.date,
              content: text,
              commentDate: date,
              _id,
            });
          });
        }

        if (posts) {
          posts.forEach((post) => {
            const { from_id, text, date, groupId, _id } = post;
            if (from_id === parseInt(userId)) {
              const link = `https://vk.com/club${-groupId}`;
              groupSet.add(groupId);
              console.log(post);
              displayData.push({
                href: link,
                title: link,
                description: `[Post on behalf of the user]`,
                postDate: date,
                content: text,
                commentDate: date,
                _id,
              });
            }
          });
        }

        vkServices.getGroupsMany(Array.from(groupSet)).then((res) => {
          setGroupList(
            res.data.groups.map((group) => ({
              name: group.name,
              id: group.id,
            }))
          );
        });
        setCommentListItems(
          displayData.sort(
            (a, b) => new Date(a.commentDate) - new Date(b.commentDate)
          )
        );
      });
    }
  }, [userId]);

  const userIdInputOnChange = (e) => {
    const numbersOnly = e.target.value
      .split("")
      .filter((x) => Number.isInteger(Number.parseInt(x)))
      .join("");
    setSearchUserId(numbersOnly);
  };

  const commentsSearchHandler = () => {
    if (isLoadingPosts) return;
    setSearchParams({ userId: `${searchUserId}` });
  };

  const onKeyDownPhoneInput = (e) => {
    if (e.key === "Enter") {
      commentsSearchHandler();
    }
  };

  const keyWordOnChange = (e) => {
    setWord(e.target.value);
  };

  const commentByWordSearchHandler = () => {
    const dateInMs = isSearchAll ? 0 : startDate.getTime();
    navigate(`../vkCommentsByWord?word=${word}&offset=0&date=${dateInMs}`);
  };

  const onKeyDownWordInput = (e) => {
    if (e.key === "Enter") {
      commentByWordSearchHandler();
    }
  };

  return (
    <div>
      <div>
        <Space>
          <Space.Compact>
            <Input
              value={searchUserId}
              placeholder={"userId"}
              onChange={(e) => userIdInputOnChange(e)}
              onKeyDown={(e) => onKeyDownPhoneInput(e)}
            />
            <Button onClick={commentsSearchHandler} loading={isLoadingPosts}>
              Поиск
            </Button>
          </Space.Compact>
        </Space>
      </div>
      <br />
      <div>
        <Space>
          <Space.Compact>
            <Input
              value={word}
              placeholder={"Key word"}
              onChange={(e) => keyWordOnChange(e)}
              onKeyDown={(e) => onKeyDownWordInput(e)}
            />
            <Button
              onClick={commentByWordSearchHandler}
              loading={isLoadingPosts}
            >
              Search
            </Button>
          </Space.Compact>
        </Space>
      </div>
      <Checkbox
        checked={isSearchAll}
        onChange={(e) => setIsSearchAll(e.target.checked)}
      >
        For all time
      </Checkbox>
      <div>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          dateFormat={"dd-MM-yyyy"}
        />
      </div>

      <div>
        {groupList.map((g) => (
          <span key={g.id}>
            <a href={`https://vk.com/club${0 - g.id}`}>{`https://vk.com/club${
              0 - g.id
            } ${g.name}`}</a>
            <br />
          </span>
        ))}
      </div>

      <List
        itemLayout="vertical"
        size="large"
        loading={isLoadingPosts}
        dataSource={commentListItems}
        renderItem={(item) => (
          <List.Item
            key={item._id}
            actions={[
              <IconText
                icon={CalendarOutlined}
                text={item.commentDate}
                key="list-vertical-star-o"
              />,
            ]}
          >
            <List.Item.Meta
              title={<a href={item.href}>{item.title}</a>}
              description={item.description}
            />
            {item.content}
          </List.Item>
        )}
      />
    </div>
  );
};

export default VkComments;
