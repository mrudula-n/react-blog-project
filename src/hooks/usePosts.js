import { useState, useEffect, useCallback } from "react";

export function usePosts() {
  const [posts, setPosts] = useState(() => {
    const storedPosts = localStorage.getItem("blog_posts");
    return storedPosts ? JSON.parse(storedPosts) : [];
  });  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load posts from localStorage when the hook initializes
  useEffect(() => {
    const storedPosts = localStorage.getItem("blog_posts");
    if (storedPosts) {
      setPosts(JSON.parse(storedPosts));
    }
    
  }, []);

  // Save posts to localStorage whenever posts state changes
  useEffect(() => {
    localStorage.setItem("blog_posts", JSON.stringify(posts));
  }, [posts]);

  // Add a new post
  const addPost = useCallback((newPost) => {
    setPosts((prevPosts) => [
      {
        ...newPost,
        id: Date.now(),
        createdAt: new Date().toISOString(),
        likes: 0,
        comments: [],
      },
      ...prevPosts,
    ]);
  }, []);

  // Update an existing post
  const updatePost = useCallback((id, updates) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === id ? { ...post, ...updates } : post
      )
    );
  }, []);

  // Delete a post
  const deletePost = useCallback((id) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
  }, []);

  // Like a post
  const likePost = useCallback((id) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === id ? { ...post, likes: post.likes + 1 } : post
      )
    );
  }, []);

  // Add a comment to a post
  const addComment = useCallback((postId, comment) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              comments: [
                ...post.comments,
                {
                  id: Date.now(),
                  ...comment,
                  createdAt: new Date().toISOString(),
                },
              ],
            }
          : post
      )
    );
  }, []);

  return {
    posts,
    isLoading,
    error,
    addPost,
    updatePost,
    deletePost,
    likePost,
    addComment,
  };
}
