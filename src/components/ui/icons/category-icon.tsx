import { memo } from "react";
import { twMerge } from "tailwind-merge";

interface CategoryIconProps extends React.SVGAttributes<HTMLOrSVGElement> {}

const CategoryIcon = ({ ...rest }: CategoryIconProps) => {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
      className={twMerge("", rest.className)}
    >
      <path
        d="M40 20C40 31.0457 31.0457 40 20 40C8.95431 40 0 31.0457 0 20C0 8.95431 8.95431 0 20 0C31.0457 0 40 8.95431 40 20ZM2.5767 20C2.5767 29.6226 10.3774 37.4233 20 37.4233C29.6226 37.4233 37.4233 29.6226 37.4233 20C37.4233 10.3774 29.6226 2.5767 20 2.5767C10.3774 2.5767 2.5767 10.3774 2.5767 20Z"
        fill={rest.fill}
      />
      <circle cx="20" cy="20" r="14" fill={rest.fill} />
    </svg>
  );
};

export default memo(CategoryIcon);
