import { cn } from "@/lib/utils";

const Title = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <h2
      className={cn(
        "text-3xl md:text-4xl font-extrabold text-darkColor capitalize tracking-tight font-sans leading-[1.1]",
        className
      )}
    >
      {children}
    </h2>
  );
};
const SubTitle = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <h3 className={cn("font-semibold text-gray-900 font-sans", className)}>
      {children}
    </h3>
  );
};

const SubText = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <p className={cn("text-gray-600 text-sm", className)}>{children}</p>;
};
export { Title, SubTitle, SubText };
