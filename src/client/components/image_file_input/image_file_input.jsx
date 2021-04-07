import React, { memo, useRef, useState } from "react";
import { Image } from "react-feather";
import styles from "./image_file_input.module.css";

const ImageFileInput = memo(({ imageUploader, url, onFileChange }) => {
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef();

  const onButtonClick = (event) => {
    event.preventDefault();
    inputRef.current.click();
  };

  const onChange = async (event) => {
    setIsLoading(true);
    const uploaded = await imageUploader.upload(event.target.files[0]);
    setIsLoading(false);
    onFileChange({
      url: uploaded.url,
    });
  };

  return (
    <div className={styles.container}>
      <input
        ref={inputRef}
        className={styles.input}
        type="file"
        accept="image/*"
        name="file"
        onChange={onChange}
      />
      {!isLoading && (
        <button
          className={`${styles.button} ${url && styles.noBack}`}
          onClick={onButtonClick}
        >
          {url ? (
            <img src={url} alt="material image" className={styles.image} />
          ) : (
            <Image />
          )}
        </button>
      )}
      {isLoading && <div className={styles.loading}></div>}
    </div>
  );
});

export default ImageFileInput;
