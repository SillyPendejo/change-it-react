import React from "react";

function BlogPosts({ posts, deletePost }) {
  const postElements = posts.map((post) => (
    <div className="blog__post block block_lime" key={post.date}>
      <div className="blog__left_container">
        <div className="blog__post_title">{post.title}</div>
        <div className="blog__post_text">{post.text}</div>
      </div>
      <div className="blog__right_container">
        <div className="blog__post_date">
          {new Date(post.date).toLocaleString()}
        </div>
        <div
          className="blog__post_delete"
          onClick={() => deletePost(post.date)}
        ></div>
      </div>
    </div>
  ));
  return (
    <div className="posts__container">
      {posts.length > 0 && (
        <div className="blog__posts block block_white">{postElements}</div>
      )}
      ;
    </div>
  );
}

export default BlogPosts;
