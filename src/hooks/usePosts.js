import { useState, useEffect, useCallback } from "react"; // Import necessary hooks from React.

export function usePosts() { // A custom hook for managing an array of blog posts.  This hook handles loading and saving posts from localStorage, as well as providing functions for adding, updating, deleting, liking posts and adding comments.
  const [posts, setPosts] = useState([]);  // State for storing the array of posts. Initialized as an empty array.
  const [isLoading, setIsLoading] = useState(false); // State for tracking loading status. Initialized to false - not used in the current implementation. Could be used for loading indicator when fetching from an API.
  const [error, setError] = useState(null);  // State for storing any errors. Initialized to null -  not used in current implementation.  Important for robust error handling.


  // useEffect hook to load posts from localStorage when the component mounts.
  useEffect(() => {
    const storedPosts = localStorage.getItem("blog_posts");  // Retrieve posts data from localStorage using the key "blog_posts".
    if (storedPosts) {  // If there are stored posts
      setPosts(JSON.parse(storedPosts)); // Parse the JSON string and update the posts state.
    }
  }, []);  // Empty dependency array ensures this runs only once on mount.

    // useEffect hook to save posts to localStorage whenever the posts state changes.  This persists the data between sessions.
  useEffect(() => {
    localStorage.setItem("blog_posts", JSON.stringify(posts));  // Store the posts in localStorage, stringifying the array.
  }, [posts]); // Dependency array: This effect runs whenever the posts state changes.

  // useCallback for memoizing the addPost function
  const addPost = useCallback((newPost) => {    // Function to add a new post to the array. Takes a newPost object as an argument.
    setPosts((prevPosts) => [      // Update the posts state by prepending the new post to the existing posts array.  This ensures new posts appear at the top of the list.
      {
        ...newPost,       // Spread the properties of the newPost object.
        id: Date.now(),    // Add an id property to the new post using the current timestamp.
        createdAt: new Date().toISOString(),   // Add a createdAt timestamp.
        likes: 0,         // Initialize likes to 0.
        comments: [],       // Initialize comments as an empty array.
      },
      ...prevPosts,    // Spread the existing posts after the new post.
    ]);
  }, []);  // Empty dependency array for memoization.

    // useCallback for memoizing the updatePost function.
  const updatePost = useCallback((id, updates) => { // Function to update an existing post. Takes the post id and an updates object as arguments.
    setPosts((prevPosts) =>
      prevPosts.map((post) =>        // Map over the posts array.
        post.id === id ? { ...post, ...updates } : post   // If the post id matches, merge the updates into the post object. Otherwise, return the post unchanged.  Important: ...post comes first to preserve existing properties not in updates.
      )
    );
  }, []); // Empty dependency array for memoization.


  // useCallback for memoizing the deletePost function.
  const deletePost = useCallback((id) => {    // Function to delete a post. Takes the post id as an argument.
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id)); //filters out the post with matching id from the array, effectively deleting it
  }, []);  // Empty dependency array for memoization.

    // useCallback for memoizing the likePost function.
  const likePost = useCallback((id) => { // Function to like a post. Takes the post id as an argument.
    setPosts((prevPosts) =>
      prevPosts.map((post) =>      // Map through the array of posts
        post.id === id ? { ...post, likes: post.likes + 1 } : post  // If the post id matches, increment the likes count by 1. Otherwise, return the post unchanged.
      )
    );
  }, []);  // Empty dependency array for memoization.


  // useCallback for memoizing the addComment function.
  const addComment = useCallback((postId, comment) => {  //function to add a comment to a post. Takes postId and comment object as arguments.
    setPosts((prevPosts) =>
      prevPosts.map((post) =>    //map through posts array
        post.id === postId      //find the post with matching postId
          ? {
              ...post,          //spread existing post properties
              comments: [       
                ...post.comments,  //spread existing comments
                {                //append new comment object to comments array with id and createdAt properties
                  id: Date.now(),  
                  ...comment,       //spread comment properties
                  createdAt: new Date().toISOString(),
                },
              ],
            }
          : post      //if postId doesn't match,return post object unchanged.
      )
    );
  }, []); // Empty dependency array for memoization.


  return {   // Return an object containing the posts array, loading/error status, and the post management functions.
    posts,      //posts array
    isLoading,  //loading state
    error,      //error state
    addPost,    //function to add a post
    updatePost,   //function to update a post
    deletePost,   //function to delete a post
    likePost,    //function to like a post
    addComment,   //function to add a comment
  };
}
