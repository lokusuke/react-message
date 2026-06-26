import { atom } from "jotai";
import {
  dummyUsers,
  currentUser,
  dummyMessages,
  dummyChats,
} from "../mock/data";

// ログインユーザーデータを管理するAtom
export const loginUserAtom = atom(currentUser);

// ログインユーザーが持つフレンドリストを管理するAtom
export const friendListAtom = atom(dummyUsers);

// ログインユーザーが持つチャットグループデータを管理するAtom
export const messageGroupsAtom = atom(dummyChats);

// ログインユーザーが持つチャットデータを管理するAtom
export const messagesAtom = atom(dummyMessages);

// ログインユーザーを取得する関数Atom
export const getLoginUserAtom = atom((get) => get(loginUserAtom), null);

// ログインユーザーが持つチャットグループデータを取得する関数Atom
export const getMessageGroupsAtom = atom((get) => get(messageGroupsAtom), null);

// ログインユーザーが持つフレンドリストを取得する関数Atom
export const getFriendListAtom = atom((get) => get(friendListAtom), null);

// ログインユーザーが持つチャットデータを取得するAtom
export const getMessagesAtom = atom((get) => get(messagesAtom), null);
