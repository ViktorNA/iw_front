import React, { useState } from "react";
import { Button, Checkbox, Input, InputNumber } from "antd";

const ENGINES = [
  {
    id: 1,
    name: "Google",
    state: true,
    getLink: (q) => `https://www.google.by/search?q=${q}`,
  },
  {
    id: 2,
    name: "Yandex",
    state: true,
    getLink: (q) => `https://yandex.by/search/?text=${q}`,
  },
  {
    id: 3,
    name: "Twitter",
    state: true,
    getLink: (q) => `https://twitter.com/search?q=${q}&src=typed_query&f=user`,
  },
  {
    id: 4,
    name: "ok.ru",
    state: true,
    getLink: (q, date) => {
      const { day, month, year } = date;

      let link = `https://ok.ru/dk?st.cmd=searchResult&st.mode=Users&st.query=${q}&st.grmode=Groups`;
      link += day ? `&st.bthDay=${day}` : "";
      link += month ? `&st.bthMonth=${month - 1}` : "";
      link += year ? `&st.bthYear=${year}` : "";
      return link;
    },
  },
  {
    id: 5,
    name: "facebook",
    state: true,
    getLink: (q) => `https://www.facebook.com/search/top?q=${q}`,
  },
  {
    id: 6,
    name: "vk.com",
    state: true,
    getLink: (q, date) => {
      const { day, month, year } = date;
      let link = `https://vk.com/search?`;
      link += day ? `c%5Bbday%5D=${day}` : "";
      link += month ? `&c%5Bbmonth%5D=${month}` : "";
      link += year ? `&c%5Bbyear%5D=${year}` : "";
      link += `&c%5Bname%5D=1&c%5Bper_page%5D=40&c%5Bq%5D=${q}&c%5Bsection%5D=people`;
      return link;
    },
  },
  {
    id: 7,
    name: "Tik-tok",
    state: true,
    getLink: (q) => `https://www.tiktok.com/search/user?lang=ru-RU&q=${q}`,
  },
];

const Search = () => {
  const [variants, setVariants] = useState(ENGINES.sort((a, b) => a.id - b.id));
  const [query, setQuery] = useState("");
  const [day, setDay] = useState(null);
  const [month, setMonth] = useState(null);
  const [year, setYear] = useState(null);
  const onClickHandler = () => {
    if (query.length < 1) return;
    const activeEngines = variants.filter((x) => x.state);
    activeEngines.forEach((engine) => {
      window.open(engine.getLink(query, { day, month, year }));
    });
  };

  const checkBoxOnchange = (engine, e) => {
    const elements = variants.filter((e) => e.name !== engine);
    const targetElement = variants.find((e) => e.name === engine);
    setVariants(
      [...elements, { ...targetElement, state: e.target.checked }].sort(
        (a, b) => a.id - b.id
      )
    );
  };

  return (
    <>
      <Input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={"Name"}
      />
      <div>
        {variants.map((engine) => (
          <Checkbox
            key={engine.name}
            checked={engine.state}
            onChange={(e) => checkBoxOnchange(engine.name, e)}
          >
            {engine.name}
          </Checkbox>
        ))}
      </div>
      <div>
        <p>Birthday day(for vk.com and ok.ru)</p>
        <span>Day: </span>
        <InputNumber
          key={"day"}
          min={1}
          max={31}
          onChange={(e) => setDay(e)}
          value={day}
          size={"small"}
        />
        <span> Month: </span>
        <InputNumber
          key={"month"}
          min={1}
          max={12}
          onChange={(e) => setMonth(e)}
          value={month}
          size={"small"}
        />
        <span> Year: </span>
        <InputNumber
          key={"year"}
          min={1902}
          max={2020}
          onChange={(e) => setYear(e)}
          value={year}
          size={"small"}
        />
      </div>
      <br />
      <Button onClick={onClickHandler}>Search</Button>
    </>
  );
};

export default Search;
