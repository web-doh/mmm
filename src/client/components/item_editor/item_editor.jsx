import React, { useEffect, useState } from "react";
import { ChevronDown } from "react-feather";
import CancelButton from "../../components/button/cancel_button";
import styles from "../item_maker/item_maker.module.css";
import useForm from "../../lib/useForm";
import { validateItem } from "../../lib/validate";

const ItemEditor = ({ isPopup, editItem, item, FileInput }) => {
  const [files, setFiles] = useState(item.file);
  const { errors, handleChange, handleSubmit } = useForm({
    initialValues: item,
    onSubmit: editItem,
    validate: validateItem,
  });

  const {
    _id,
    name,
    type,
    size,
    price,
    manufacture,
    seller,
    contact,
    email,
    project,
    remarks,
    file,
  } = item;

  const onFileChange = (file, i) => {
    setFiles((files) => {
      const updated = JSON.parse(JSON.stringify(files));
      updated[i]["url"] = file.url;
      return updated;
    });
  };

  useEffect(() => {
    handleChange({ name: "file", value: files });
  }, [files]);

  return (
    <>
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
              type="text"
              name="name"
              maxLength="20"
              placeholder="Input name (less than 20)"
              defaultValue={name}
              onChange={handleChange}
            />
            {errors.name && (
              <span className={styles.errorMsg}>{errors.name}</span>
            )}
          </div>

          <CancelButton isPopup={isPopup} />
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
              <li className={`${styles.listItem} ${styles.select}`}>
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
                  defaultValue={type}
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
                  className={styles.input}
                  type="text"
                  name="size"
                  placeholder="Input size"
                  defaultValue={size}
                  onChange={handleChange}
                />
              </li>
              <li className={styles.listItem}>
                <label htmlFor="price" className={styles.title}>
                  Price
                </label>
                <input
                  className={styles.input}
                  type="text"
                  name="price"
                  placeholder="Input price"
                  defaultValue={price}
                  onChange={handleChange}
                />
              </li>
              <li className={styles.listItem}>
                <label htmlFor="manufacture" className={styles.title}>
                  Manufacture
                </label>
                <input
                  className={styles.input}
                  type="text"
                  name="manufacture"
                  placeholder="Input manufacture"
                  defaultValue={manufacture}
                  onChange={handleChange}
                />
              </li>
              <li className={styles.listItem}>
                <label htmlFor="seller" className={styles.title}>
                  Seller
                </label>
                <input
                  className={styles.input}
                  type="text"
                  name="seller"
                  placeholder="Input seller"
                  defaultValue={seller}
                  onChange={handleChange}
                />
              </li>
              <li className={styles.listItem}>
                <label htmlFor="contact" className={styles.title}>
                  Contact
                </label>
                <input
                  className={styles.input}
                  type="text"
                  name="contact"
                  placeholder="Input phone number"
                  defaultValue={contact}
                  onChange={handleChange}
                />
              </li>
              <li className={styles.listItem}>
                <label htmlFor="email" className={styles.title}>
                  Email
                </label>
                <input
                  className={styles.input}
                  type="text"
                  name="email"
                  placeholder="Input email address"
                  defaultValue={email}
                  onChange={handleChange}
                />
              </li>
              <li className={styles.listItem}>
                <label htmlFor="project" className={styles.title}>
                  Project
                </label>
                <input
                  className={styles.input}
                  type="text"
                  name="project"
                  placeholder="Input project name"
                  defaultValue={project}
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
                  defaultValue={remarks}
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
              onClick={() => {
                console.log(errors);
              }}
            >
              Modify
            </button>
          </section>
        </section>
      </form>
    </>
  );
};

export default ItemEditor;
