export default class ImageUploader {
  async upload(file) {
    const data = new FormData();

    data.append("file", file);
    data.append("upload_preset", "jp5y645p");

    const result = await fetch(
      "https://api.cloudinary.com/v1_1/dx0qrmrs6/image/upload",
      {
        method: "POST",
        body: data,
      }
    );

    return await result.json();
  }
}
