import React, { createContext, useState, useContext, useEffect } from 'react';

const PostContext = createContext();

export const usePosts = () => useContext(PostContext);

export const PostProvider = ({ children }) => {
    // Initial dummy data
    const initialPosts = [
        {
            id: 1,
            username: "mubeena_shaik",
            userImg: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane",
            postImg: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&auto=format&fit=crop&q=60",
            caption: "Coding late night ☕️ #developer #react",
            likes: 124,
            postComments: [
                { id: 101, username: "gayathri", text: "Love this setup!" },
                { id: 102, username: "sravani", text: "Me too! So cozy." }
            ],
            time: "2h ago",
        },
        {
            id: 2,
            username: "gayathri",
            userImg: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
            postImg: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&auto=format&fit=crop&q=60",
            caption: "Setup upgrades complete! 🚀",
            likes: 856,
            postComments: [],
            time: "5h ago",
        },
        {
            id: 3,
            username: "sravani",
            userImg: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
            postImg: "https://images.unsplash.com/photo-1461988320302-91b5b4c6c043?w=600&auto=format&fit=crop&q=60",
            caption: "Exploring the mountains this weekend 🏔️",
            likes: 240,
            postComments: [],
            time: "1d ago",
        },
    ];

    const [posts, setPosts] = useState(() => {
        const savedPosts = localStorage.getItem('synergy_posts');
        if (savedPosts) {
            const parsed = JSON.parse(savedPosts);
            return parsed.map(p => ({ ...p, postComments: p.postComments || [] }));
        }
        return initialPosts;
    });

    const [savedPostIds, setSavedPostIds] = useState(() => {
        const saved = localStorage.getItem('synergy_saved_posts');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('synergy_posts', JSON.stringify(posts));
    }, [posts]);

    useEffect(() => {
        localStorage.setItem('synergy_saved_posts', JSON.stringify(savedPostIds));
    }, [savedPostIds]);

    const addPost = (newPost) => {
        setPosts([{ ...newPost, postComments: [] }, ...posts]);
    };

    const likePost = (postId) => {
        setPosts(posts.map(post =>
            post.id === postId ? { ...post, likes: post.likes + 1 } : post
        ));
    };

    const toggleSave = (postId) => {
        setSavedPostIds(prev =>
            prev.includes(postId)
                ? prev.filter(id => id !== postId)
                : [...prev, postId]
        );
    };

    const addComment = (postId, text, username = "padma") => {
        const comment = {
            id: Date.now(),
            username,
            text
        };
        setPosts(posts.map(post =>
            post.id === postId
                ? { ...post, postComments: [...post.postComments, comment] }
                : post
        ));
    };

    return (
        <PostContext.Provider value={{ posts, addPost, likePost, addComment, savedPostIds, toggleSave }}>
            {children}
        </PostContext.Provider>
    );
};
