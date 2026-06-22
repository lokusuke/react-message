import { atom } from "jotai";
import {
  dummyUsers,
  currentUser,
  dummyMessages,
  dummyChats,
} from "../mock/data";

const loginUserAtom = atom(currentUser);

const chatGroupsAtom = atom(dummyChats);
