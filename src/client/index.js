import React, { memo } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import App from "./app.jsx";
import ImageFileInput from "./components/image_file_input/image_file_input.jsx";
import styles from "./index.module.css";
import AuthService from "./service/auth_service.js";
import ItemRepository from "./service/item_repository.js";
import ImageUploader from "./service/image_uploader.js";

const authService = new AuthService();
const itemRepository = new ItemRepository();
const imageUploader = new ImageUploader();
const FileInput = memo((props) => (
  <ImageFileInput {...props} imageUploader={imageUploader} />
));

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <RecoilRoot>
        <App
          authService={authService}
          itemRepository={itemRepository}
          FileInput={FileInput}
        />
      </RecoilRoot>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
