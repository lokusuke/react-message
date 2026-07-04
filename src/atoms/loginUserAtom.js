import { atom } from "jotai";
import {
  dummyUsers,
  currentUser,
  dummyMessages,
  dummyChats,
} from "../mock/data";

let defaultMessageRoomId = "1"; // デフォルトのメッセージ部屋ID

//  ---------- ユーザー関連Atom ----------
// ログインユーザーデータを管理するAtom
export const loginUserAtom = atom(currentUser);

// ログインユーザーが持つフレンドリストを管理するAtom
export const friendListAtom = atom(dummyUsers);

//  ---------- メッセージ関連Atom ----------
// ログインユーザーが持つチャットグループデータを管理するAtom
export const messageGroupsAtom = atom(dummyChats);

// メッセージ部屋IDを管理するAtom
export const activeRoomIdAtom = atom(defaultMessageRoomId);

// ログインユーザーが持つチャットデータを管理するAtom
export const messagesAtom = atom(dummyMessages);

// メッセージ部屋IDを書き換える関数Atom（Write-Only）
export const setMessageRoomAtom = atom(null, (get, set, id) =>
  set(activeRoomIdAtom, id),
);

// メッセージ部屋にメッセージを新規追加する関数Atom（Write-Only）
export const appendMessageAtom = atom(null, (get, set, roomId, text) => {
  const allMessages = get(messagesAtom); // メッセージデータを取得
  const currentUser = get(loginUserAtom); // 自分のユーザー情報を取得

  const targetMessages = allMessages[roomId]; // 指定メッセージグループIDのチャット一覧を取得
  const newMessageId = String(
    Number(targetMessages[targetMessages.length - 1].id) + 1,
  ); // メッセージ部屋の最後のメッセージIDを確認して+1する

  const newMessage = {
    id: newMessageId,
    content: text,
    sender: currentUser,
    timestamp: new Date(),
    isRead: false,
  };

  set(messagesAtom, {
    ...allMessages, // 元々あるメッセージデータをばらして新しい配列を作成
    [roomId]: [...targetMessages, newMessage], // 該当のキーのメッセージをばらして、新しいメッセージを追加した配列を作成
  });
});

// メッセージ部屋の自分のメッセージを削除する関数Atom（Write-Only）
export const deleteMessageAtom = atom(null, (get, set, roomId, messageId) => {
  const allMessages = get(messagesAtom); // メッセージデータを取得
  const currentUser = get(loginUserAtom); // 自分のユーザー情報を取得

  const targetMessages = allMessages[roomId]; // 指定メッセージグループIDのチャット一覧を取得

  const filteredMessages = targetMessages.filter(
    (message) =>
      !(message.id === messageId && message.sender.name === currentUser.name),
  );

  set(messagesAtom, {
    ...allMessages, // 元々あるメッセージデータをばらして新しい配列を作成
    [roomId]: filteredMessages, // 該当のキーのメッセージをばらして、新しいメッセージを削除した配列を作成
  });
});

// メッセージ部屋の自分のメッセージを更新する関数Atom（Write-Only）
export const updateMessageAtom = atom(
  null,
  (get, set, roomId, messageId, text) => {
    const allMessages = get(messagesAtom); // メッセージデータを取得
    const currentUser = get(loginUserAtom); // 自分のユーザー情報を取得

    const targetMessages = allMessages[roomId]; // 指定メッセージグループIDのチャット一覧を取得

    const updatedMessages = targetMessages.map((message) =>
      message.id === messageId && message.sender.name === currentUser.name
        ? { ...message, content: text }
        : message,
    );

    set(messagesAtom, {
      ...allMessages, // 元々あるメッセージデータをばらして新しい配列を作成
      [roomId]: updatedMessages, // 該当のキーのメッセージをばらして、更新済のメッセージを格納した配列を作成
    });
  },
);

// 選択しているメッセージ部屋IDをつかって、メッセージを取得する関数Atom（Read-Only）
export const getMessagesAtom = atom((get) => {
  const allMessages = get(messagesAtom); // メッセージデータを取得
  const activeRoomId = get(activeRoomIdAtom); // クリックしているメッセージグループIDを取得
  return allMessages[activeRoomId]; // チャットデータから指定メッセージグループIDのチャット一覧を取得
}, null);

// 選択しているメッセージ部屋IDをつかって、参加者を取得する関数Atom（Read-Only）
export const getParticipants = atom((get) => {
  const activeRoomId = get(activeRoomIdAtom); // クリックしているメッセージグループIDを取得
  const messageGroups = get(messageGroupsAtom); // メッセージグループの情報を取得

  const participants = messageGroups.find(
    (messageGroup) => messageGroup.id === String(activeRoomId),
  )?.participants;

  return participants;
});

// メッセージ部屋内の自分のどのメッセージを編集中扱いにしておくかを保存するAtom
export const editingMessageAtom = atom();

// どのメッセージが編集中かをセットする関数Atom（Write-Only）
export const setEditingMessageAtom = atom(null, (get, set, message) => {
  set(editingMessageAtom, message);
});

export const deletingMessageAtom = atom();

// どのメッセージを削除対象とするかをセットする関数Atom（Write-Only）
export const setDeletingMessageAtom = atom(null, (get, set, message) => {
  set(deletingMessageAtom, message);
});
