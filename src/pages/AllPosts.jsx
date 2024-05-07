import React, { useState, useEffect } from 'react';
import { QuizCard } from '../components/index';
import appwriteService from "../appwrite/config";
import Container from '../components/Container/Container';
import "../assets/AppPost.css";

function AllPosts() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true); // Initialize loading state as true

    useEffect(() => {
        appwriteService.getPosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents);
                setLoading(false); // Update loading state when posts are fetched
            }
        }).catch((error) => {
            console.error('Error fetching posts:', error);
            setLoading(false); // Update loading state even in case of error
        });
    }, []);

    return (
        <div className='w-full'>
            {loading ? ( // Render loading state if loading is true
                <div>Loading...</div>
            ) : (
                <div className="grid-bg ba-grid anim">
                    <div className="inner"></div>
                    <Container>
                        <div className='relative z-30 py-8'>
                            {posts.map((post) => (
                                <div key={post.$id} className='p-2 w-1/1'>
                                    <QuizCard {...post} />
                                </div>
                            ))}
                        </div>
                    </Container>
                </div>
            )}
        </div>
    );
}

export default AllPosts;
