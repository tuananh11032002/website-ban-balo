import React, { useState } from "react";
import axios from "axios";

function App() {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = (e) => {
    const files = e.target.files;
    setSelectedFiles([...selectedFiles, ...files]);
  };

  const handleUpload = () => {
    const formData = new FormData();
    for (const file of selectedFiles) {
      formData.append("request.Files", file);
    }

    axios
      .put("https://localhost:44301/api/Product", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Xác định đây là dữ liệu gửi lên từ form
        },
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <input type="file" multiple onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}

export default App;
