import { useRef } from "react";
import { activeRoomIdAtom, appendMessageAtom } from "../../atoms/messagesAtom";
import { useAtomValue, useSetAtom } from "jotai";

export const MessageForm = () => {
  // 入力フォーム用
  const inputRef = useRef(null);

  // メッセージ部屋IDを取得する
  const activeRoomId = useAtomValue(activeRoomIdAtom);

  // メッセージ追加関数Atomを利用する
  const appendMessage = useSetAtom(appendMessageAtom);

  // チャット送信ボタン押下時にメッセージを追加する関数
  const handleSubmit = (e) => {
    e.preventDefault(); // formの仕様によるリロードを回避
    const trimmedText = inputRef.current.value.trim();

    if (!trimmedText) {
      alert("空欄では送信できません。");
      return;
    }
    appendMessage(activeRoomId, trimmedText);
    inputRef.current.value = ""; // 入力フォームをリセット
  };

  // 入力フォームでEnterまたはShift + Enterを押したときの処理関数
  const handleKeyDown = (e) => {
    // EnterがおされてShiftが押されていなければメッセージを送信
    if (e.key === "Enter" && !e.shiftKey) {
      handleSubmit(e);
      return;
    }
    return;
  };

  return (
    <form className="flex gap-2 h-10 mx-2 items-center" onSubmit={handleSubmit}>
      <textarea
        type="text"
        className="border border-gray-200 rounded-lg p-1 resize-none shadow-md w-full"
        ref={inputRef}
        onKeyDown={handleKeyDown}
      />
      <div className="rounded-full border-0 hover:bg-sky-500">
        <button type="submit" className="p-2">
          &#x2708;&#xfe0f;
        </button>
      </div>
    </form>
  );
};
