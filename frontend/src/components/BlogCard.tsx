import { Link } from "react-router-dom";

interface BlogCardProps {
    id: number;
    authorName: string;
    title: string;
    content: string;
    publishedDate: string;
}
const BlogCard = ({
    id,
    authorName,
    title,
    content,
    publishedDate,
}: BlogCardProps) => {
    return (
        <Link to={`/blog/${id}`}>
            <div className=" p-12 shadow-[rgba(0,0,0,0.1)_0px_1px_0.5px_0px]">
                <div className="flex flex-row items-center gap-3">
                    <Avatar name={authorName} />
                    <span className=" font-extralight">{authorName}</span>
                    <span className=" rounded-full h-1 w-1 bg-slate-500"></span>
                    <span className="font-thin text-slate-500">
                        {publishedDate}
                    </span>
                </div>
                <div className=" text-xl font-semibold">{title}</div>
                <div className=" text-md font-thin">
                    {content.length < 100
                        ? content
                        : content.slice(0, 100) + "..."}
                </div>
                <div className=" text-slate-400 text-xs">{`${Math.ceil(
                    content.length / 100
                )} min read`}</div>
            </div>
        </Link>
    );
};
export function Avatar({ name }: { name: string }) {
    const getInitials = (name: string) => {
        if (!name) return "NA";

        const nameParts = name.split(" ");
        if (nameParts.length > 1) {
            return `${nameParts[0][0]}${nameParts[1][0]}`.toUpperCase();
        } else {
            return name.slice(0, 2).toUpperCase();
        }
    };
    return (
        <span
            className={`relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-slate-200 rounded-full`}
        >
            <span className="font-medium text-black ">{getInitials(name)}</span>
        </span>
    );
}
export default BlogCard;
