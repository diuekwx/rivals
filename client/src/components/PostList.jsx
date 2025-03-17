import { useState, useEffect, useRef } from "react";


export default function PostList(){
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        async function getPosts(){
            const response = await fetch(`http://localhost:5050/post/`);
            if (!response.ok) {
                const message = `An error occurred: ${response.statusText}`;
                console.error(message);
                return;
            }
            const posts = await response.json();
            setPosts(posts);
                } 
            getPosts();
            return;
    }, [posts.length]);
    // reverse this bih 
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-wrap -mx-4">
                {posts.map((post) => (
                    <div key={post._id} className="w-1/3 px-4 mb-8">
                        <a href="https://www.wikipedia.org/">  
                            <img 
                                src={post.postImage} 
                                alt={post.description} 
                                className="w-full h-auto"
                            />
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
}