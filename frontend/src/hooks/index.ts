import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";

interface BlogType {
    id: number;
    author: {
        name: string;
    };
    title: string;
    content: string;
    published: string;
}

interface BlogsDataType {
    loading: boolean;
    blogs: BlogType[];
}

export interface Blog{
    content : string;
    title: string;
    id:number;
    author: {
        name: string;
    };
    published: string;
}

export const useBlog = ({ id }: { id: number }) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [blog, setBlog] = useState<Blog>();

    useEffect(() => {
        console.log(localStorage.getItem('token'));

        axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(response => {
                setBlog(response.data.post);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching blogs:", error);
                setLoading(false);
            });
    }, [id]);

    return { loading, blog };
}
export const useBlogs = (): BlogsDataType => {
    const [loading, setLoading] = useState<boolean>(true);
    const [blogs, setBlogs] = useState<BlogType[]>([]);

    useEffect(() => {
        console.log(localStorage.getItem('token'));

        axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(response => {
                setBlogs(response.data.posts);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching blogs:", error);
                setLoading(false);
            });
    }, []);

    return { loading, blogs };
};
