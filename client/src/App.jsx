import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import Clipboard from "clipboard";
const App = () => {
  const [text, setText] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const textareaRef = useRef(null);

  const handleCopyToClipboard = () => {
    if (textareaRef.current) {
      textareaRef.current.select();
      document.execCommand("copy");
      alert("Text copied to clipboard!");
    }
  };

  useEffect(() => {
    new Clipboard(".copy-btn");
  }, []);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("file", event.target.file.files[0]);

    try {
      const response = await axios.post(
        "http://localhost:5000/extractTextFromImage",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response);
      setText(response.data.text);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex flex-col justify-center h-screen items-center font-poppins text-xs">
      <div className="flex flex-col justify-center items-center top-0 fixed">
        <h1 className="text-2xl font-bold mt-4 mb-4">ImagineText</h1>
        <p className="text-lg mb-4 leading-normal max-w-prose">
          Introducing Imagine Text 🌟. Harness TesseractJS to effortlessly
          convert image text into editable, copyable text. Unleash the power of
          visualization! 💡📷🔍
        </p>
      </div>
      <div className="flex p-4 rounded bg-gray-300">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center justify-between p-2"
        >
          <label htmlFor="file" className="font-semibold mb-4">
            Select Your Image{" "}
          </label>
          <input
            type="file"
            name="file"
            id="file"
            className="rounded"
            onChange={handleImageChange}
            accept="image/*"
          />
          {selectedImage && (
            <div>
              <img src={selectedImage} alt="Selected" className="max-w-60 p-2" />
            </div>
          )}
          <button
            type="submit"
            className="bg-gray-200 hover:bg-gray-400 text-gray-800 w-1/2 font-semibold py-2 px-4  rounded"
          >
            Submit
          </button>
        </form>
        <div className="flex flex-col justify-between items-center p-2">
          <label htmlFor="text" className="mb-4 font-semibold">
            Extracted Text:
          </label>
          <textarea
            className="resize-none border border-gray-300 rounded-md px-3 py-2"
            id="text"
            cols="30"
            rows="10"
            value={text}
            readOnly
            ref={textareaRef}
            onChange={(e) => setText(e.target.value)}
          ></textarea>
          <button
            type="submit"
            className="copy-btn mt-4 bg-gray-200 hover:bg-gray-400 text-gray-800 w-1/2 font-semibold py-2 px-4 rounded"
            data-clipboard-target="#textArea"
            onClick={handleCopyToClipboard}
          >
            Copy to Clipboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
