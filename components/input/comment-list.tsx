import { CommentRes } from "../../types";
import classes from "./comment-list.module.css";

interface CommentListProps {
  comments: CommentRes[];
}

const CommentList: React.FC<CommentListProps> = ({ comments }) => {
  return (
    <ul className={classes.comments}>
      {comments.map((c) => (
        <li key={c.id}>
          <p>{c.text} </p>
          <div>
            By <address>{c.name}</address>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default CommentList;
