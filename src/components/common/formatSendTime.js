import { format } from "date-fns";

// メッセージ送信時間の形式
export const formatSendTime = (timestamp) => {
  return format(timestamp, "HH:mm");
};
