import classes from "./notification.module.css";
import { NotificationState } from "../../store/notification-context";

/* #TA-08 */
type NotificationProps = Pick<NotificationState, "state" | "hide">;

const Notification: React.FC<NotificationProps> = ({
  state: { title, message, status },
  hide,
}) => {
  let statusClasses = "";

  if (status === "success") {
    statusClasses = classes.success;
  }

  if (status === "error") {
    statusClasses = classes.error;
  }

  if (status === "pending") {
    statusClasses = classes.pending;
  }

  const activeClasses = `${classes.notification} ${statusClasses}`;

  return (
    <div className={activeClasses} onClick={hide}>
      <h2>{title}</h2>
      <p>{message}</p>
    </div>
  );
};

export default Notification;
