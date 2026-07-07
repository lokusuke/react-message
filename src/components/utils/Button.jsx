// ボタンの種類に応じて色分け
const variantClass = {
  default: "bg-gray-300 hover:bg-gray-400", // キャンセルボタン
  primary: "bg-sky-300 hover:bg-sky-400", // 送信ボタン
  danger: "bg-red-300 hover:bg-red-400", // 削除ボタン
};

export const Button = ({
  type = "button",
  variant = "default",
  onClick,
  children,
  className = "",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`border-0 p-2 rounded-2xl shadow-md text-white w-fit ${variantClass[variant]} ${className}`}
    >
      {children}
    </button>
  );
};
