import BlogCard from "../components/BlogCard";
import AppBar from "../components/AppBar";
import { useBlogs } from "../hooks";
import { BlogSkeleton } from "../components/Skeleton";

const Blog = () => {
    const { loading, blogs } = useBlogs();

    if (loading) {
        return (
            <div>
                <AppBar />
                <BlogSkeleton />
            </div>
        );
    }

    console.log(blogs);
    return (
        <div>
            <AppBar />
            <div className="flex flex-col lg:flex-row justify-evenly">
                <div className="flex justify-center w-full lg:w-2/3 border-r-0 lg:border-r-2 mb-4 lg:mb-0">
                    <div className="flex flex-col items-center max-w-xl w-full">
                        {blogs.map((blog) => (
                            <BlogCard
                                key={blog.id}
                                id={blog.id}
                                authorName={blog.author.name}
                                title={blog.title}
                                content={blog.content}
                                publishedDate={formatDateTime(blog.published)}
                            />
                        ))}
                    </div>
                </div>
                <div className="w-full lg:w-1/3 bg-blue-50 p-4">
                </div>
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
