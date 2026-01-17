interface SkeletonWrapperProps extends React.ComponentProps<"div"> {}

export const SkeletonWrapper: React.FC<SkeletonWrapperProps> = ({
    children,
}) => {
    return (
        <div className="flex w-full max-w-96 flex-col gap-4">{children}</div>
    );
};
