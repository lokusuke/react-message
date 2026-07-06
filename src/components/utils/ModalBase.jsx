export const ModalBase = ({ children }) => {
  return (
    <div className="flex fixed inset-0 items-center justify-center bg-black/50 z-999">
      <div className="bg-purple-100 flex flex-col rounded-2xl p-2  w-100 m-10">
        {children}
      </div>
    </div>
  );
};
