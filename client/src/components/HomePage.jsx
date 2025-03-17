import React, {useState, useEffect} from 'react';
import Post from './Post';

function HomePage(){
    const[posts, setPosts] = useStaet([]);

    useEffect(() =>{
        fetchPosts().then(data => setPosts(data));
    }, []);

    return (
        <div>
            {posts.map(post => (
                <Post key={post.id} postData={post} />
            ))}
        </div>
    )
}