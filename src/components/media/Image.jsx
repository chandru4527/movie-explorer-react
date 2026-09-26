import { twMerge } from "tailwind-merge";

const Image = ({
    src,
    alt = "",
    className = "",
    wrapperClassName = "",
    ...props
}) => {
    return (
        <div className={twMerge("overflow-hidden", wrapperClassName)}>
            <img
                src={src}
                alt={alt}
                className={twMerge("block w-full h-auto object-cover", className)}
                {...props}
                loading="lazy"
            />
        </div>
    );
};

export default Image;