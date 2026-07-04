import { useAtomValue } from "jotai";
import { getParticipants } from "../../atoms/messagesAtom";

export const MessageRoomHeader = () => {
  // メッセージ部屋の参加者情報を取得する
  const participantsInfo = useAtomValue(getParticipants);

  // 参加者人数によって、ヘッダー表示を「個人チャット」または「グループチャット」とする条件を定義
  const isGroup = participantsInfo.length > 1;

  // 参加者情報から名前を連結する（タイトル用）
  const messageRoomTitle = participantsInfo
    .map((participantInfo) => participantInfo.name)
    .join(", ");

  return (
    <header className="border-b-2 border-purple-100 flex flex-col h-30 items-start justify-center p-2 shadow-md">
      <h2 className="font-extrabold">{messageRoomTitle}</h2>
      <span className="text-gray-500">
        {isGroup ? "グループチャット" : "個人チャット"}
      </span>
    </header>
  );
};
