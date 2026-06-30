import { useAtomValue } from "jotai";
import { editingMessageAtom, getMessagesAtom } from "../../atoms/loginUserAtom";
import { MessageItem } from "./MessageItem";
import { MessageRoomHeader } from "./MessageRoomHeader";
import { MessageForm } from "./MessageForm";

export const MessageRoom = () => {
  // クリックされているメッセージ部屋IDからメッセージ一覧を取得する
  const activeMessages = useAtomValue(getMessagesAtom);

  // 編集中のメッセージ情報を取得
  const editingMessage = useAtomValue(editingMessageAtom);

  return (
    <main className="flex flex-1">
      <div className="flex flex-col h-screen w-full">
        <MessageRoomHeader />
        <ul className="list-none mx-10 flex-1 p-5 overflow-y-scroll">
          {activeMessages.map((message) => (
            <MessageItem key={message.id} message={message} />
          ))}
        </ul>
        <MessageForm />
      </div>
      {
        editingMessage && (
          <div>{`${editingMessage.id}を編集します`}</div>
        ) /* Todo: メッセージ更新関数をつくる */
      }
    </main>
  );
};
