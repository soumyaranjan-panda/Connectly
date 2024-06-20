import BlogCard from "../components/BlogCard";
import AppBar from "../components/AppBar";
import { useBlogs } from "../hooks";
import { BlogSkeleton } from "../components/Skeleton";

const Blog = () => {
    const { loading, blogs } = useBlogs();
    if (loading) {
        return <div>
            <AppBar/>
            <BlogSkeleton/>
        </div>;
    }
    console.log(blogs);
    return (
        <div>
            <AppBar />
            <div className="flex justify-evenly">
                <div className=" flex justify-center  min-w-[70vw] border-r-2">
                    <div className=" flex justify-center min-h-fit flex-col max-w-xl min-w-[70vh]">
                        {blogs.map((blog) => {
                            return (
                                <BlogCard
                                    id={blog.id}
                                    authorName={blog.author.name}
                                    title={blog.title}
                                    content={blog.content}
                                    publishedDate={formatDateTime(
                                        blog.published
                                    )}
                                />
                            );
                        })}
                    </div>
                </div>
                <div className=" w-[50vw] bg-blue-50"></div>
            </div>
        </div>
    );
};

export const formatDateTime = (dateTimeString: string): string => {
    const dateTime = new Date(dateTimeString);
    const options: Intl.DateTimeFormatOptions = {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
    };

    return dateTime.toLocaleDateString("en-US", options);
};
export default Blog;
