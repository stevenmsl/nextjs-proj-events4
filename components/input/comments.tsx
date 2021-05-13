import { useState, useEffect } from "react";
import CommentList from "./comment-list";
import NewComment from "./new-comment";
import classes from "./comments.module.css";
import { CommentReq, CommentRes } from "../../types";

interface CommentsProps {
  eventId: string;
}

const Comments: React.FC<CommentsProps> = ({ eventId }) => {
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<CommentRes[]>([]);

  useEffect(() => {
    if (showComments) {
      const url = `/api/comments/${eventId}`;
      const getComments = async () => {
        const res = await fetch(url);
        const data: CommentRes[] = await res.json();
        setComments(data);
      };
      getComments();
    }
  }, [showComments]);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }
  /* #TA4-01 */
  const addCommentHandler = async (comment: CommentReq) => {
    const url = `/api/comments/${eventId}`;

    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify(comment),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    console.log(data);
  };

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? "Hide" : "Show"} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && <CommentList comments={comments} />}
    </section>
  );
};

export default Comments;
