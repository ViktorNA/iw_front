const getElementReply = (replyMessage) => {
  if (replyMessage === null) return "";
  if (replyMessage === undefined)
    return `<div style="background-color: aquamarine;\n +
        margin-left: 30px;">In reply to <p>Deleted colour</p></div>`;

  const { from, from_id, date, text } = replyMessage;
  const fromId = from_id ? from_id : "";

  return `<div style="background-color: aquamarine;
    margin-left: 30px;">In reply to <b>${from}</b>(${fromId}), ${date} <p>${text}</p></div>`;
};

const getElement = (text, from_id, date, from, photo, replyMessage) => {
  return `<div style="
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 10px;
    "><h3>${from}(${from_id})</h3><span>${date}</span></div>${getElementReply(
    replyMessage
  )}<p>${text}</p>`;
};

export const getHtmlStringFromMessages = (messages, replies, title = "") => {
  let htmlPage = `<!DOCTYPE html>
<html lang="EN">
 <head>
  <meta charset="utf-8">
  <title>${title}</title>
 </head><body>`;

  for (let i = 0; i < messages.length; i++) {
    const message = messages[i];

    const text = `${message.text}${message.file ? "\n[Attachment]" : ""}`;
    const { reply_to_message_id, from_id, from, date, photo } = message;
    const replyMessage = replies.find(
      (reply) => reply.id === reply_to_message_id
    );
    htmlPage += getElement(
      text,
      from_id,
      date,
      from,
      photo,
      reply_to_message_id !== null ? replyMessage : null
    );
  }

  htmlPage += `</body></html>`;

  return htmlPage;
};
