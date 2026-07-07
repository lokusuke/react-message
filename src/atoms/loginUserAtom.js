import { atom } from "jotai";
import { dummyUsers, currentUser } from "../mock/data";

//  ---------- ユーザー関連Atom ----------
// ログインユーザーデータを管理するAtom
export const loginUserAtom = atom(currentUser);

// ログインユーザーが持つフレンドリストを管理するAtom
export const friendListAtom = atom(dummyUsers);
