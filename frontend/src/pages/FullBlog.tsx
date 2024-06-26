import { Link } from "react-router-dom";
import AppBar from "../components/AppBar";
import { Avatar } from "../components/BlogCard";
import { Blog } from "../hooks";
import { formatDateTime } from "./Blog";

const FullBlog = ({ blog }: { blog: Blog }) => {
    console.log(blog.content);
    return (
        <div>
            <AppBar />
            <div className="grid grid-cols-12 gap-4 px-4 md:px-10 pt-10 md:pt-20">
                <div className="col-span-1 md:col-span-2"></div>
                <div className="col-span-12 md:col-span-6">
                    <div className="text-3xl font-extrabold">{blog.title}</div>
                    <div className="text-slate-500 pt-2">
                        Post on {formatDateTime(blog.published)}
                    </div>
                    <div className="pt-4 whitespace-pre-wrap">
                        {blog.content}
                    </div>
                </div>
                <div className="col-span-12 md:col-span-3">
                    <div className="flex flex-col gap-3">
                        <div>
                            <div className="text-slate-600 text-lg">Author</div>
                            <div className="flex items-center">
                                <div className="pr-4 flex-shrink-0">
                                    <Avatar
                                        name={blog.author.name || "Anonymous"}
                                    />
                                </div>
                                <div>
                                    <div className="text-xl font-bold">
                                        {blog.author.name || "Anonymous"}
                                    </div>
                                    <div className="pt-2 text-slate-500">
                                        With every word,{" "}
                                        {blog.author.name || "they"} weaves a
                                        spellbinding tale that captures your
                                        imagination and refuses to let go.
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Link
                            to={"/blogs"}
                            className="text-xl font-semibold text-blue-700 hover:underline underline-offset-4"
                        >
                            Back to blogs
                        </Link>
                    </div>
                </div>
                <div className="col-span-1 md:col-span-1"></div>
            </div>
        </div>
    );
};

export default FullBlog;
