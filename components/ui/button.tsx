import Link from "next/link";
import React from "react";

import classes from "./button.module.css";

interface ButtonProps {
  link?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

/*
  - to style a Link component you need to put an 
    anchor tag as a child of a Link component
  - the Link component will render the anchor
    tag you provide
  - don't set the href on the anchor tag; 
    set it on the Link component

*/

const Button: React.FC<ButtonProps> = ({ link, children, onClick }) => {
  if (link)
    return (
      <Link href={link}>
        <a className={classes.btn}> {children}</a>
      </Link>
    );

  return <button onClick={onClick}>{children}</button>;
};

export default Button;
