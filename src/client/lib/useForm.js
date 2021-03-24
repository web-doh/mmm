import { useState, useEffect } from "react";

function useForm({ initialValues, onSubmit, validate }) {
  const [userInfo, setUserInfo] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSubmit = async (e) => {
    setSubmitting(true);
    e.preventDefault();
    await new Promise((r) => setTimeout(r, 1000));
    setErrors(validate(userInfo));
  };

  useEffect(async () => {
    if (submitting) {
      if (Object.keys(errors).length === 0) {
        onSubmit(userInfo);
      }
      setSubmitting(false);
    }
  }, [errors]);

  return {
    userInfo,
    errors,
    submitting,
    handleChange,
    handleSubmit,
  };
}

export default useForm;
