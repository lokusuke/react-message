import { atom } from "jotai";
import {
  dummyUsers,
  currentUser,
  dummyMessages,
  dummyChats,
} from "../mock/data";

let defaultMessageRoomId = 1; // デフォルトのメッセージ部屋ID

//  ---------- ユーザー関連Atom ----------
// ログインユーザーデータを管理するAtom
export const loginUserAtom = atom(currentUser);

// ログインユーザーが持つフレンドリストを管理するAtom
export const friendListAtom = atom(dummyUsers);

// ログインユーザーを取得する関数Atom（Read-Only）
export const getLoginUserAtom = atom((get) => get(loginUserAtom), null);

// ログインユーザーが持つフレンドリストを取得する関数Atom（Read-Only）
export const getFriendListAtom = atom((get) => get(friendListAtom), null);

//  ------------------------------------------

//  ---------- メッセージ関連Atom ----------
// ログインユーザーが持つチャットグループデータを管理するAtom
export const messageGroupsAtom = atom(dummyChats);

// メッセージ部屋IDを管理するAtom
export const messageRoomAtom = atom(defaultMessageRoomId);

// ログインユーザーが持つチャットデータを管理するAtom
export const messagesAtom = atom(dummyMessages);

// ログインユーザーが持つチャットグループデータを取得する関数Atom（Read-Only）
export const getMessageGroupsAtom = atom((get) => get(messageGroupsAtom), null);

// メッセージ部屋IDを書き換える関数Atom（Write-Only）
export const setMessageRoomAtom = atom(null, (get, set, id) =>
  set(messageRoomAtom, id),
);

// ログインユーザーが持つチャットデータから、選択しているメッセージ部屋のメッセージを取得する関数Atom（Read-Only）
export const getMessagesAtom = atom((get) => {
  const allMessages = get(messagesAtom); // messagesAtom、つまりdummyMessagesのデータ変化に依存
  const activeRoomId = get(messageRoomAtom); // messageRoomAtom、つまりクリックしているメッセージ部屋IDの変化に依存
  return allMessages[activeRoomId];
}, null);

//  ------------------------------------------
