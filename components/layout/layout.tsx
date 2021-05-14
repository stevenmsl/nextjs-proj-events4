import { Fragment, useContext } from "react";
import MainHeader from "./main-header";
import Notification from "../ui/notification";
import NotificationContext from "../../store/notification-context";

const Layout = ({ children }) => {
  /* #TA-07 
     accessing context
     - probably does it here than in the Notification component
       as you have better control whether to show or hide it 
  */
  const ctx = useContext(NotificationContext);

  return (
    <Fragment>
      <MainHeader />
      <main>{children}</main>
      {ctx.state && <Notification state={ctx.state} hide={ctx.hide} />}
    </Fragment>
  );
};

export default Layout;
