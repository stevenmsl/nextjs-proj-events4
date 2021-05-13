import { FormEventHandler, useRef } from "react";
import { NewsletterRegistrationReq } from "../../types";
import classes from "./newsletter-registration.module.css";

function NewsletterRegistration() {
  const emailRef = useRef<HTMLInputElement>(null);

  const register: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    const req: NewsletterRegistrationReq = { email: emailRef.current.value };

    /* #TA4-01 */
    const res = await fetch("/api/newsletter", {
      method: "POST",
      body: JSON.stringify(req),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    console.log(data);
  };

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={register}>
        <div className={classes.control}>
          <input
            type="email"
            id="email"
            placeholder="Your email"
            aria-label="Your email"
            ref={emailRef}
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;
