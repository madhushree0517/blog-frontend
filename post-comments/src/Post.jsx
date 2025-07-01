import React, { useState } from 'react'
function Post(){

    const [posts, setPosts] = useState([])
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [commentInputs, setCommentInputs] = useState({});

    function handleTitleChange(e){
        setTitle(e.target.value)
    }

    function handleContentChange(e){
        setContent(e.target.value)
    }

    function addPost(){
        if (!title.trim()||!content.trim()) return
        setPosts([...posts,{title,content,comments:[]}])
        setTitle("")
        setContent("")

    }

    function DeletePost(index){
        const updatedPosts = posts.filter((_,i)=> i!==index);
        setPosts(updatedPosts)
    }

    function handleCommentChange(e, index){
        setCommentInputs({ ...commentInputs,[index]:e.target.value})
    }

    function addComment(index) {
        const comment = commentInputs[index];
        if (!comment?.trim()) return;
        const updatedPosts = posts.map((post, i) =>
            i === index
        ? { ...post, comments: [...post.comments, comment] }
        : post
    );
    setPosts(updatedPosts);
    setCommentInputs({ ...commentInputs, [index]: "" });
    }
    function deleteComment(postIndex, commentIndex) {
        const updatedPosts = posts.map((post, i) => {
            if (i === postIndex) {
                const updatedComments = post.comments.filter((_, j) => j !== commentIndex);
                return { ...post, comments: updatedComments };
            }
            return post;
        });
        setPosts(updatedPosts);
    }
    return(
    <div className="post">
        <h1>POST IT</h1>
        <div>
            <input className="title-input"
            type="text" 
            placeholder="Enter your post Title..."
            value={title}
            onChange={handleTitleChange}
        />
        </div>
        <div>
            <textarea className="content-input"
            type="text" 
            placeholder="Enter your post content..."
            value={content}
            onChange={handleContentChange}
            />
            </div>
            <button className='add-post-button'
            onClick={addPost}>ADD POST
            </button>
        
        <ol>
            {posts.map((post,index) =>(
            <li key={index}>
                <strong>{post.title}</strong><br/>
                <span className="text">{post.content}</span><br/>
                <button className="delete-button"onClick={()=>DeletePost(index)}>
                    Delete
                </button>
                {}
                <div className="comment-section">
                    <input
                    type="text"
                    placeholder="Write a comment..."
                    value={commentInputs[index] || ""}
                    onChange={(e) => handleCommentChange(e, index)}
                    className="comment-input"
                    />
                    <button 
                    onClick={() => addComment(index)} 
                    className="add-comment-button"
                    >
                        Add Comment
                        </button>
                        <ul className="comments-list">
                            {post.comments && post.comments.map((comment, i) => (
                                <li key={i} className="comment-item">{comment}
                                <button 
                                onClick={() => deleteComment(index, i)} 
                                className="delete-comment-button"
                                >
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
export default Post