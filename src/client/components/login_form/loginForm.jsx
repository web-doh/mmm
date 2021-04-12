import React from "react";
import { Lock, Mail } from "react-feather";
import useForm from "../../lib/useForm";
import { validateLogin } from "../../lib/validate";
import SubmitButton from "../button/submit_button";
import styles from "./loginForm.module.css";

const LoginForm = ({ onLogin }) => {
  const {
    data: userInfo,
    errors,
    submitting,
    handleChange,
    handleSubmit,
  } = useForm({
    initialValues: { userId: "", password: "" },
    onSubmit: onLogin,
    validate: validateLogin,
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
        <div className={errors.password ? styles.errorBox : styles.box}>
          <Lock />
          <input
            autoComplete="off"
            className={styles.input}
            type="password"
            name="password"
            value={userInfo.password}
            placeholder="Password"
            onChange={handleChange}
          />
        </div>
        {errors.password && (
          <span className={styles.errorMsg}>{errors.password}</span>
        )}
      </li>
      <SubmitButton text="Sign In" isSubmitting={submitting} />
    </form>
  );
};

export default LoginForm;
