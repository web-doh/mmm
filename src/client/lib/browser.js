export default WebpIsSupported = (cb) => {
  if (!window.createImageBitmap) {
    cb(false);
    return;
  }

  const webpdata =
    "data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoCAAEAAQAcJaQAA3AA/v3AgAA=";

  fetch(webpdata)
    .then(function (response) {
      return response.blob();
    })
    .then(function (blob) {
      createImageBitmap(blob).then(
        function () {
          cb(true);
        },
        function () {
          cb(false);
        }
      );
    });
};
