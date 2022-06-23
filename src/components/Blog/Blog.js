import React, { useState, useEffect } from "react";
import BlogControls from "./BlogControls";
import BlogForm from "./BlogForm";
import BlogPosts from "./BlogPosts";
import "../../css/Blog.css";
import "../../css/block.css";
import "../../css/Checklist.css";

function Blog() {
  const [controls, setControls] = useState({
    isSortAbc: false,
    isSortDate: false,
    isReversed: false,
    filter: "",
  });
  const [newPost, setNewPost] = useState({
    title: "",
    text: "",
    date: null,
  });
  const [posts, setPosts] = useState([]);

  const getStorage = () => {
    let blogStorage = localStorage.blog
      ? JSON.parse(localStorage.blog)
      : [
          {
            isSortAbc: false,
            isSortDate: false,
            isReversed: false,
            filter: "",
            posts: [],
          },
        ];
    return blogStorage;
  };

  const sendToStorage = (entriesForStorage) => {
    localStorage.blog = JSON.stringify(entriesForStorage);
  };

  const insertPostInEntry = (newPost, storageEntry) => {
    if (!storageEntry.isSortAbc && !storageEntry.isSortDate) {
      storageEntry.posts.push(newPost);
    } else {
      let indexForNewPost = storageEntry.posts.findIndex((storageEntryPost) => {
        let newPostValue, storageEntryPostValue;
        let comparationResult;

        if (storageEntry.isSortAbc) {
          newPostValue = newPost.title;
          storageEntryPostValue = storageEntryPost.title;
        } else if (storageEntry.isSortDate) {
          newPostValue = newPost.date;
          storageEntryPostValue = storageEntryPost.date;
        }

        comparationResult = newPostValue < storageEntryPostValue;
        if (storageEntry.isReversed)
          comparationResult = newPostValue > storageEntryPostValue;
        return comparationResult;
      });

      if (indexForNewPost !== -1) {
        storageEntry.posts.splice(indexForNewPost, 0, newPost);
      } else {
        storageEntry.posts.push(newPost);
      }
    }
  };

  useEffect(() => {
    sendToStorage(getStorage());
  }, []);

  useEffect(() => {
    if (!newPost.date) return;

    const storage = getStorage();
    for (let storageEntry of storage) {
      if (
        newPost.title.toUpperCase().includes(storageEntry.filter.toUpperCase())
      ) {
        insertPostInEntry(newPost, storageEntry);
      }
    }
    sendToStorage(storage);

    return () => {
      setNewPost({
        title: "",
        text: "",
        date: null,
      });
    };
  }, [newPost]);

  const findSortedPostsInStorage = () => {
    for (let storageEntry of getStorage()) {
      const isEntryFilteredAndSorted =
        storageEntry.filter.toUpperCase() === controls.filter.toUpperCase() &&
        storageEntry.isSortAbc === controls.isSortAbc &&
        storageEntry.isSortDate === controls.isSortDate &&
        storageEntry.isReversed === controls.isReversed;

      if (isEntryFilteredAndSorted) {
        return storageEntry.posts;
      }
    }
    return null;
  };

  const findFilteredPostsInStorage = () => {
    for (let storageEntry of getStorage()) {
      const isEntryOnlyFiltered =
        storageEntry.filter.toUpperCase() === controls.filter.toUpperCase();

      if (isEntryOnlyFiltered) {
        return storageEntry.posts;
      }
    }

    return null;
  };

  const sortPosts = (posts) => {
    if (!controls.isSortAbc && !controls.isSortDate) return posts;
    if (posts.length < 2) return posts;

    const comparePosts = (firstPost, secondPost) => {
      let firstPostValue, secondPostValue;
      let comparationResult;

      if (controls.isSortAbc) {
        firstPostValue = firstPost.title;
        secondPostValue = secondPost.title;
      } else if (controls.isSortDate) {
        firstPostValue = firstPost.date;
        secondPostValue = secondPost.date;
      }

      comparationResult = firstPostValue > secondPostValue ? 1 : -1;
      if (controls.isReversed) return comparationResult === 1 ? -1 : 1;
      return comparationResult;
    };

    return posts.sort(comparePosts);
  };

  const createEntry = (postsForEntry) => ({
    isSortAbc: controls.isSortAbc,
    isSortDate: controls.isSortDate,
    isReversed: controls.isReversed,
    filter: controls.filter,
    posts: postsForEntry,
  });

  useEffect(() => {
    const storageSortedPosts = findSortedPostsInStorage();
    if (storageSortedPosts) {
      setPosts(storageSortedPosts);
      return;
    }

    const storageFilteredPosts = findFilteredPostsInStorage();
    if (storageFilteredPosts) {
      sortedPosts = sortPosts(storageFilteredPosts);
      setPosts(sortedPosts);

      const storage = getStorage();
      storage.push(createEntry(sortedPosts));
      sendToStorage(storage);
      return;
    }

    const sortedPosts = sortPosts(
      posts.filter((post) =>
        post.title.toUpperCase().includes(controls.filter.toUpperCase())
      )
    );
    setPosts(sortedPosts);
    if (sortedPosts.length === 0) return;

    const storage = getStorage();
    storage.push(createEntry(sortedPosts));
    sendToStorage(storage);
  }, [controls, newPost]);

  const deletePost = (id) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post.date !== id));
    const storage = getStorage();
    for (let storageEntry of storage) {
      for (let i = 0; i < storageEntry.posts.length; i++) {
        if (storageEntry.posts[i].date === id) {
          storageEntry.posts.splice(i, 1);
          break;
        }
      }
    }
    sendToStorage(storage);
  };

  return (
    <div className="blog_container">
      <BlogForm setNewPost={setNewPost} />
      <BlogControls controls={controls} setControls={setControls} />
      <BlogPosts posts={posts} deletePost={deletePost} />
    </div>
  );
}

export default Blog;
