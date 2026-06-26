import { MessageGroups } from "./MessageGroups";
import { MessageTitle } from "./MessageTitle";

export const Message = () => {
  return (
    <aside className="w-80 flex flex-col border-r-2 border-purple-100 ">
      <MessageTitle />
      <MessageGroups />
    </aside>
  );
};
