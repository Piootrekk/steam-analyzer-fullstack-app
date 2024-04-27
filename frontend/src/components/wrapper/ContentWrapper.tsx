type ContentWrapperProps = {
  children: React.ReactNode;
  className?: string;
};

const ContentWrapper: React.FC<ContentWrapperProps> = ({
  children,
  className,
}) => {
  return <div className={` bg-gray-800 rounded-md   ${className}`}>{children}</div>;
};

export default ContentWrapper;
