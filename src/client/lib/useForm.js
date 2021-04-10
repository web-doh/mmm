import { useState, useEffect } from "react";

function useForm({ initialValues, onSubmit, validate }) {
  const [data, setData] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target ? e.target : e;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (e) => {
    setSubmitting(true);
    e.preventDefault();
    validate && setErrors(validate(data));
  };

  useEffect(() => {
    if (submitting) {
      if (Object.keys(errors).length === 0) {
        onSubmit(data);
      }
      setSubmitting(false);
    }
  }, [errors, submitting]);

  return {
    data,
    errors,
    submitting,
    handleChange,
    handleSubmit,
  };
}

export default useForm;
