import { useState, useRef, useEffect } from "react";
import axios from "axios";
import Clipboard from "clipboard";
import Heading from "./components/Heading";
import SubHeading from "./components/SubHeading";
import Spinner from "./components/Spinner";

const App = () => {
  const [text, setText] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);
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
    setLoading(true);
    alert("Processing image. Please Wait :)");
    const formData = new FormData();
    formData.append("file", event.target.file.files[0]);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/extractTextFromImage`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setText(response.data.text);
      setLoading(false);
    } catch (error) {
      console.error("Error:", error);
      setLoading(false); // Ensure loading is set to false in case of an error
    }
  };

  return (
    <div className="flex flex-col justify-center h-screen items-center font-poppins text-xs">
      <Heading content="ImagineText" />
      <SubHeading
        content="Introducing Imagine Text 🌟. Harness TesseractJS to effortlessly
          convert image text into editable, copyable text. Unleash the power of
          visualization! 💡📷🔍"
      />
      <div className="flex justify-between p-4 rounded bg-gray-300 mt-4 w-2/5 min-h-96">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center justify-between p-2 w-1/2"
        >
          <label htmlFor="file" className="font-semibold mb-4">
            Select Your Image
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
              <img
                src={selectedImage}
                alt="Selected"
                className="max-w-60 max-h-96 p-2"
              />
            </div>
          )}
          <button
            type="submit"
            className="bg-gray-200 hover:bg-gray-400 text-gray-800 w-1/2 font-semibold py-2 px-4 rounded"
            disabled={loading}
          >
            Submit
          </button>
        </form>
        <div className="flex flex-col justify-between items-center p-2 w-1/2 h-full">
          <label htmlFor="text" className="mb-4 font-semibold">
            Extracted Text:
          </label>
          {loading ? (
            <Spinner />
          ) : (
            <div className="flex-grow w-full">
              <textarea
                className="resize-none border border-gray-300 rounded-md p-1 w-full h-full"
                id="text"
                value={text}
                readOnly
                ref={textareaRef}
                onChange={(e) => setText(e.target.value)}
              ></textarea>
            </div>
          )}

          <button
            type="submit"
            className="copy-btn mt-4 bg-gray-200 hover:bg-gray-400 text-gray-800 w-1/2 font-semibold py-2 px-4 rounded"
            data-clipboard-target="#text"
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
