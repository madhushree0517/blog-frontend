import React, { useState, useEffect } from 'react';
import { db } from './firebase.js';
import {
  collection,
  addDoc,
  onSnapshot,
  deleteDoc,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from 'firebase/firestore';

function Post() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [commentInputs, setCommentInputs] = useState({});

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'posts'), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setPosts(data);
    });

    return () => unsubscribe();
  }, []);

  function handleTitleChange(e) {
    setTitle(e.target.value);
  }

  function handleContentChange(e) {
    setContent(e.target.value);
  }
 
  async function addPost() {
    if (!title.trim() || !content.trim()) return;
    await addDoc(collection(db, 'posts'), {
      title,
      content,
      comments: [],
    });

    setTitle('');
    setContent('');
  }

  async function DeletePost(id) {
    await deleteDoc(doc(db, 'posts', id));
  }

  function handleCommentChange(e, index) {
    setCommentInputs({ ...commentInputs, [index]: e.target.value });
  }

  async function addComment(index) {
    const comment = commentInputs[index];
    if (!comment?.trim()) return;
    const post = posts[index];
    await updateDoc(doc(db, 'posts', post.id), {
      comments: arrayUnion(comment),
    });

    setCommentInputs({ ...commentInputs, [index]: '' });
  }

  async function deleteComment(postIndex, commentIndex) {
    const post = posts[postIndex];
    const commentToDelete = post.comments[commentIndex];
    await updateDoc(doc(db, 'posts', post.id), {
      comments: arrayRemove(commentToDelete),
    });
  }

  return (
    <div className="post">
      <h1>POST IT</h1>
      <div>
        <input
          className="title-input"
          type="text"
          placeholder="Enter your post Title..."
          value={title}
          onChange={handleTitleChange}
        />
      </div>
      <div>
        <textarea
          className="content-input"
          placeholder="Enter your post content..."
          value={content}
          onChange={handleContentChange}
        />
      </div>
      <button className="add-post-button" onClick={addPost}>
        ADD POST
      </button>
      <ol>
        {posts.map((post, index) => (
          <li key={post.id}>
            <strong>{post.title}</strong>
            <br />
            <span className="text">{post.content}</span>
            <br />
            <button className="delete-button" onClick={() => DeletePost(post.id)}>
              Delete
            </button>
            <div className="comment-section">
              <input
                type="text"
                placeholder="Write a comment..."
                value={commentInputs[index] || ''}
                onChange={(e) => handleCommentChange(e, index)}
                className="comment-input"
              />
              <button onClick={() => addComment(index)} className="add-comment-button">
                Add Comment
              </button>
              <ul className="comments-list">
                {post.comments &&
                  post.comments.map((comment, i) => (
                    <li key={i} className="comment-item">
                      {comment}
                      <button onClick={() => deleteComment(index, i)} className="delete-comment-button">
                        Delete
                      </button>
                    </li>
                  ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default Post;
