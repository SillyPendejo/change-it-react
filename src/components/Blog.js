import React, { useState, useEffect } from "react";
import BlogControls from "./BlogControls";
import BlogForm from "./BlogForm";
import BlogPosts from "./BlogPosts";
import "../css/Blog.css";
import "../css/block.css";
import "../css/Checklist.css";

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

  const sendToStorage = (entries) => {
    localStorage.blog = JSON.stringify(entries);
  };

  const insertPostInEntry = (post, storageEntry) => {
    if (!storageEntry.isSortAbc && !storageEntry.isSortDate) {
      storageEntry.posts.push(post);
    } else {
      let indexForNewPost = storageEntry.posts.findIndex((entryPost) => {
        let newPostValue, entryPostValue;
        let result;

        if (storageEntry.isSortAbc) {
          newPostValue = post.title;
          entryPostValue = entryPost.title;
        } else if (storageEntry.isSortDate) {
          newPostValue = post.date;
          entryPostValue = entryPost.date;
        }

        result = newPostValue < entryPostValue;
        if (storageEntry.isReversed) result = newPostValue > entryPostValue;
        return result;
      });

      if (indexForNewPost === -1) {
        storageEntry.posts.push(post);
      } else {
        storageEntry.posts.splice(indexForNewPost, 0, post);
      }
    }
  };

  useEffect(() => {
    sendToStorage(getStorage());
    console.log("aaa");
  }, []);

  useEffect(() => {
    if (!newPost.date) return;
    setPosts((prevPosts) => [...prevPosts, newPost]);
    console.log(newPost);

    const storage = getStorage();
    for (const storageEntry of storage) {
      if (
        newPost.title.toUpperCase().includes(storageEntry.filter.toUpperCase())
      ) {
        insertPostInEntry(newPost, storageEntry);
      }
    }
    sendToStorage(storage);
  }, [newPost]);

  const findSortedPostsInStorage = () => {
    const storage = getStorage();

    for (const storageEntry of storage) {
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
    const storage = getStorage();

    for (const storageEntry of storage) {
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

    const comparePosts = (first, second) => {
      let firstValue, secondValue;
      let result;

      if (controls.isSortAbc) {
        firstValue = first.title;
        secondValue = second.title;
      } else if (controls.isSortDate) {
        firstValue = first.date;
        secondValue = second.date;
      }

      result = firstValue > secondValue ? 1 : -1;
      if (controls.isReversed) return result === 1 ? -1 : 1;
      return result;
    };

    return posts.sort(comparePosts);
  };

  const createEntry = (posts) => ({
    isSortAbc: controls.isSortAbc,
    isSortDate: controls.isSortDate,
    isReversed: controls.isReversed,
    filter: controls.filter,
    posts: posts,
  });

  useEffect(() => {
    let sortedPosts;

    const storageSortedPosts = findSortedPostsInStorage();
    if (storageSortedPosts) {
      setPosts(storageSortedPosts);
      return;
    }

    const storageFilteredPosts = findSortedPostsInStorage();
    if (storageFilteredPosts) {
      sortedPosts = sortPosts(storageFilteredPosts);
      setPosts(sortedPosts);
      const storage = getStorage();
      storage.push(createEntry(sortedPosts));
      sendToStorage(storage);
      return;
    }
    sortedPosts = sortPosts(
      posts.filter((post) =>
        post.title.toUpperCase().includes(controls.filter.toUpperCase())
      )
    );
    const storage = getStorage();
    storage.push(createEntry(sortedPosts));
    setPosts(sortedPosts);
    sendToStorage(storage);
  }, [controls]);

  const deletePost = (id) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post.date !== id));
    const storage = getStorage();
    for (const storageEntry of storage) {
        for (let i = 0; i < storageEntry.posts.length; i++) {
            if (storageEntry.posts[i].date == id) {
              storageEntry.posts.splice(i, 1);
              break;
           }
        }
    }
  };

  return (
    <div className="blog_container">
      <BlogForm setNewPost={setNewPost} />
      <BlogControls controls={controls} setControls={setControls} />
      <BlogPosts posts={posts} deletePost={deletePost}/>
    </div>
  );
}

export default Blog;
