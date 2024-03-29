import React, { memo } from "react";
import { Lock, Mail, User } from "react-feather";
import useForm from "../../lib/useForm";
import { validateSignup } from "../../lib/validate";
import SubmitButton from "../button/submit_button";
import styles from "./signupForm.module.css";

const SignupForm = memo(({ onRegister }) => {
  const {
    data: userInfo,
    errors,
    submitting,
    handleChange,
    handleSubmit,
  } = useForm({
    initialValues: {
      userId: "",
      username: "",
      password1: "",
      password2: "",
    },
    onSubmit: onRegister,
    validate: validateSignup,
  });

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <li className={styles.item}>
        <div className={errors.userId ? styles.errorBox : styles.box}>
          <Mail />
          <input
            autoComplete="off"
            className={styles.input}
            type="email"
            name="userId"
            value={userInfo.userId}
            placeholder="Email address"
            onChange={handleChange}
          />
        </div>
        {errors.userId && (
          <span className={styles.errorMsg}>{errors.userId}</span>
        )}
      </li>
      <li className={styles.item}>
        <div className={errors.password1 ? styles.errorBox : styles.box}>
          <Lock />
          <input
            autoComplete="off"
            className={styles.input}
            type="password"
            name="password1"
            value={userInfo.password1}
            placeholder="Password"
            onChange={handleChange}
          />
        </div>
        {errors.password1 && (
          <span className={styles.errorMsg}>{errors.password1}</span>
        )}
      </li>
      <li className={styles.item}>
        <div className={errors.password2 ? styles.errorBox : styles.box}>
          <Lock />
          <input
            autoComplete="off"
            className={styles.input}
            type="password"
            name="password2"
            value={userInfo.password2}
            placeholder="Confirm password"
            onChange={handleChange}
          />
        </div>
        {errors.password2 && (
          <span className={styles.errorMsg}>{errors.password2}</span>
        )}
      </li>
      <li className={styles.item}>
        <div className={errors.username ? styles.errorBox : styles.box}>
          <User />
          <input
            autoComplete="off"
            className={styles.input}
            type="text"
            name="username"
            value={userInfo.username}
            placeholder="Full name"
            onChange={handleChange}
          />
        </div>
        {errors.username && (
          <span className={styles.errorMsg}>{errors.userId}</span>
        )}
      </li>
      <SubmitButton text="Register" isSubmitting={submitting} />
    </form>
  );
});

export default SignupForm;
