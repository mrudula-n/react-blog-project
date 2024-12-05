import { renderHook, act } from '@testing-library/react';
import { BlogProvider, useBlog } from '../../contexts/BlogContext';

describe('BlogContext', () => {
  const wrapper = ({ children }) => <BlogProvider>{children}</BlogProvider>;

  test('addPost adds a new post', () => {
    const { result } = renderHook(() => useBlog(), { wrapper });

    act(() => {
      result.current.dispatch({
        type: 'ADD_POST',
        payload: { id: 1, title: 'New Post' },
      });
    });

    expect(result.current.state.posts.length).toBe(1);
    expect(result.current.state.posts[0].title).toBe('New Post');
  });

  test('deletePost removes a post', () => {
    const { result } = renderHook(() => useBlog(), { wrapper });

    act(() => {
      result.current.dispatch({ type: 'ADD_POST', payload: { id: 1, title: 'Test Post' } });
      result.current.dispatch({ type: 'DELETE_POST', payload: 1 });
    });

    expect(result.current.state.posts.length).toBe(0);
  });

  test('localStorage persists posts', () => {
    const { result } = renderHook(() => useBlog(), { wrapper });

    act(() => {
      result.current.dispatch({ type: 'ADD_POST', payload: { id: 1, title: 'Persistent Post' } });
    });

    const savedPosts = JSON.parse(localStorage.getItem('blog_posts'));
    expect(savedPosts[0].title).toBe('Persistent Post');
  });

  test('error handling sets error state', () => {
    const { result } = renderHook(() => useBlog(), { wrapper });

    act(() => {
      result.current.dispatch({ type: 'SET_ERROR', payload: 'Error occurred' });
    });

    expect(result.current.state.error).toBe('Error occurred');
  });
});
