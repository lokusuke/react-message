import { useAtomValue } from "jotai";
import {
  deletingMessageAtom,
  editingMessageAtom,
  getMessagesAtom,
} from "../../atoms/messagesAtom";
import { MessageItem } from "./MessageItem";
import { MessageRoomHeader } from "./MessageRoomHeader";
import { MessageForm } from "./MessageForm";
import { MessageEditModal } from "./MessageEditModal";
import { MessageDeleteModal } from "./MessageDeleteModal";

export const MessageRoom = () => {
  // クリックされているメッセージ部屋IDからメッセージ一覧を取得する
  const activeMessages = useAtomValue(getMessagesAtom);

  // 編集中のメッセージ情報を取得
  const editingMessage = useAtomValue(editingMessageAtom);

  // 編集中のメッセージ情報を取得
  const deletingMessage = useAtomValue(deletingMessageAtom);

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
      {editingMessage && <MessageEditModal editingMessage={editingMessage} />}
      {deletingMessage && (
        <MessageDeleteModal deletingMessage={deletingMessage} />
      )}
    </main>
  );
};
