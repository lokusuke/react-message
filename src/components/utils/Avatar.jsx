export const Avatar = ({ src, alt, size }) => {
  const avatarSize = {
    sm: "h-10 w-10",
    md: "h-15 w-15",
  }[size];

  return (
    <div>
      <img src={src} alt={alt} className={`rounded-full ${avatarSize}`} />
    </div>
  );
};
