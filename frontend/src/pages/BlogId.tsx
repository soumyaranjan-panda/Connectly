import { useBlog } from "../hooks";
import { useParams } from "react-router-dom";
import FullBlog from "./FullBlog";
import AppBar from "../components/AppBar";
import {Skeleton} from "../components/Skeleton";

const BlogId = () => {
    const { id } = useParams();
    if (!id) {
        return <div>Error</div>;
    }
    const { loading, blog } = useBlog({ id: parseInt(id) });
    console.log(loading);
    if (loading) {
        return <div>
            <AppBar/>
            <Skeleton/>
        </div>;
    }
    return (
        <div>
            <FullBlog
                blog={
                    blog || {
                        content: "",
                        title: "",
                        id: 1,
                        author: {
                            name: "",
                        },
                        published: "",
                    }
                }
            />
        </div>
    );
};

export default BlogId;
