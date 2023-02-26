import React from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

function TimeAgo({ datetime }) {
  const timeAgo = dayjs(datetime).fromNow();
  return <span>{timeAgo}</span>;
}

export default TimeAgo;
