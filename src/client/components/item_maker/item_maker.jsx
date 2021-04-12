import React, { memo, useRef, useEffect, useState } from "react";
import { ChevronDown } from "react-feather";
import CancelButton from "../../components/button/cancel_button";
import styles from "./item_maker.module.css";
import useForm from "../../lib/useForm";
import { validateItem } from "../../lib/validate";

const ItemMaker = memo(({ FileInput, addItem, isPopup, isSubmitting }) => {
  const formRef = useRef();

  const [files, setFiles] = useState([
    { url: null },
    { url: null },
    { url: null },
  ]);
  const loginUser = localStorage.getItem("_id");

  const { data: item, errors, handleChange, handleSubmit } = useForm({
    initialValues: {
      name: "",
      type: "",
      size: "",
      price: "",
      manufacture: "",
      seller: "",
      contact: "",
      email: "",
      project: "",
      remarks: "",
      file: [{ url: "" }, { url: "" }, { url: "" }],
      isLiked: false,
      user: loginUser,
    },
    onSubmit: addItem,
    validate: validateItem,
  });

  const onFileChange = (file, i) => {
    setFiles((files) => {
      const updated = [...files];
      updated[i]["url"] = file.url;
      return updated;
    });
  };

  useEffect(() => {
    handleChange({ name: "file", value: files });
  }, [files]);

  useEffect(() => {
    errors.type && formRef.current.scrollIntoView({ behavior: "smooth" });
  }, [errors.type, isSubmitting]);

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <header className={styles.header}>
        <div className={styles.name}>
          <label
            htmlFor="name"
            className={`${styles.required} ${styles.title}`}
          >
            Name
          </label>

          <input
            autoComplete="off"
            type="text"
            name="name"
            maxLength="20"
            placeholder="Input name (less than 20)"
            onChange={handleChange}
          />
          {errors.name && (
            <span className={styles.errorMsg}>{errors.name}</span>
          )}
        </div>
        <CancelButton isPopup={true} />
      </header>
      <section className={styles.contents}>
        <section className={`${styles.container} ${styles.images}`}>
          <div className={`${styles.image} ${styles.mainImage}`}>
            <FileInput
              url={files[0].url}
              onFileChange={(file) => onFileChange(file, 0)}
            />
          </div>
          <div className={`${styles.image} ${styles.subImage}`}>
            <FileInput
              url={files[1].url}
              onFileChange={(file) => onFileChange(file, 1)}
            />
          </div>
          <div className={`${styles.image} ${styles.subImage}`}>
            <FileInput
              url={files[2].url}
              onFileChange={(file) => onFileChange(file, 2)}
            />
          </div>
        </section>
        <section className={`${styles.container} ${styles.right}`}>
          <ul className={styles.list}>
            <li className={`${styles.listItem} ${styles.select}`} ref={formRef}>
              <label
                htmlFor="type"
                className={`${styles.required} ${styles.title}`}
              >
                Type
              </label>
              <select
                className={styles.input}
                name="type"
                onChange={handleChange}
              >
                <option value="">Choose an item type</option>
                <option value="Wood Flooring (WF)">Wood Flooring (WF)</option>
                <option value="Wood (WD)">Wood (WD)</option>
                <option value="Paint (PT)">Paint (PT)</option>
                <option value="Stone (ST)">Stone (ST)</option>
                <option value="Tile (TL)">Tile (TL)</option>
                <option value="Glass (GL)">Glass (GL)</option>
                <option value="Metal (MT)">Metal (MT)</option>
                <option value="Wall Covering (WC)">Wall Covering (WC)</option>
                <option value="Fabric (FB)">Fabric (FB)</option>
                <option value="Leather (LE)">Leather (LE)</option>
                <option value="Vinyl Sheet (VS)">Vinyl Sheet (VS)</option>
                <option value="etc (ETC)">etc (ETC)</option>
              </select>
              <div className={styles.arrow}>
                <ChevronDown />
              </div>
            </li>
            {errors.type && (
              <span className={styles.errorMsg}>{errors.type}</span>
            )}
            <li className={styles.listItem}>
              <label htmlFor="size" className={styles.title}>
                Size
              </label>
              <input
                autoComplete="off"
                className={styles.input}
                type="text"
                name="size"
                placeholder="Input size"
                onChange={handleChange}
              />
            </li>
            <li className={styles.listItem}>
              <label htmlFor="price" className={styles.title}>
                Price
              </label>
              <input
                autoComplete="off"
                className={styles.input}
                type="text"
                name="price"
                placeholder="Input price"
                onChange={handleChange}
              />
            </li>
            <li className={styles.listItem}>
              <label htmlFor="manufacture" className={styles.title}>
                Manufacture
              </label>
              <input
                autoComplete="off"
                className={styles.input}
                type="text"
                name="manufacture"
                placeholder="Input manufacture"
                onChange={handleChange}
              />
            </li>
            <li className={styles.listItem}>
              <label htmlFor="seller" className={styles.title}>
                Seller
              </label>
              <input
                autoComplete="off"
                className={styles.input}
                type="text"
                name="seller"
                placeholder="Input seller"
                onChange={handleChange}
              />
            </li>
            <li className={styles.listItem}>
              <label htmlFor="contact" className={styles.title}>
                Contact
              </label>
              <input
                autoComplete="off"
                className={styles.input}
                type="text"
                name="contact"
                placeholder="Input phone number"
                onChange={handleChange}
              />
            </li>
            <li className={styles.listItem}>
              <label htmlFor="email" className={styles.title}>
                Email
              </label>
              <input
                autoComplete="off"
                className={styles.input}
                type="text"
                name="email"
                placeholder="Input email address"
                onChange={handleChange}
              />
            </li>
            <li className={styles.listItem}>
              <label htmlFor="project" className={styles.title}>
                Project
              </label>
              <input
                autoComplete="off"
                className={styles.input}
                type="text"
                name="project"
                placeholder="Input project name"
                onChange={handleChange}
              />
            </li>
            <li className={styles.listItem}>
              <label htmlFor="remarks" className={styles.title}>
                Remarks
              </label>
              <textarea
                className={styles.remarks}
                name="remarks"
                placeholder="Input remarks (50 characters or less)"
                maxLength="50"
                onChange={handleChange}
              ></textarea>
            </li>
            <p>
              (<span className={styles.requiredMark}>*</span>) is required
            </p>
          </ul>

          <button
            type="submit"
            className={styles.button}
            disabled={isSubmitting}
          >
            {isSubmitting ? <div className={styles.loading}></div> : "Add"}
          </button>
        </section>
      </section>
    </form>
  );
});

export default ItemMaker;
