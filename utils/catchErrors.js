function catchErrors(error, displayError) {
  let errorMsg;
  if (error.response) {
    errorMsg = error.response.data;
    console.error("error response", { error, errorMsg });
    //for cloudinary
    if (error.response.data.error) {
      errorMsg = error.response.data.error.message;
      console.error("cloudinary", { error, errorMsg });
    }
  } else if (error.request) {
    errorMsg = error.request;
    console.error("error request", { error, errorMsg });
  } else {
    errorMsg = error.message;
    console.error("Misc error", { error, errorMsg });
  }
  displayError(errorMsg);
}

export default catchErrors;
