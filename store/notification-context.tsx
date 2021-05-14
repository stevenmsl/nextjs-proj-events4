import React, { createContext, useState, useEffect } from "react";

/*
  - state maintained by the useState
*/
export interface NotificationData {
  title: string;
  message: string;
  status: "success" | "error" | "pending";
}

/*
  - funcs that allow other components to change the state
*/
export interface NotificationFunc {
  show: (notification: NotificationData) => void;
  hide: () => void;
}

export interface NotificationState extends NotificationFunc {
  state: NotificationData;
}

const initState: NotificationState = {
  state: null,
  show: null,
  hide: null,
};

/* #TA4-05 */
const NotificationContext = createContext(initState);

/* #TA4-06 */
export const NotificationContextProvider: React.FC = ({ children }) => {
  const [active, setActive] = useState<NotificationData>(null);

  useEffect(() => {
    if (active && (active.status === "success" || active.status === "error")) {
      const timer = setTimeout(() => {
        setActive(null);
      }, 3000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [active]);

  const show = (active: NotificationData) => {
    setActive(active);
  };

  const hide = () => {
    setActive(null);
  };

  const context: NotificationState = {
    state: active,
    show,
    hide,
  };

  return (
    <NotificationContext.Provider value={context}>
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
