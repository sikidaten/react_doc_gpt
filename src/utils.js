import React, { useState } from "react";
import axios from "axios";

const ChatGPTFunctionCallWithImage = () => {
  const [message, setMessage] = useState("");
  const [image, setImage] = useState(null);
  const [response, setResponse] = useState("");

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", image);
    formData.append("message", message);

    try {
      // 画像を含むデータを送信する
      const res = await axios.post("/upload-image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const imageUrl = res.data.url; // 画像が保存されたURLを取得

      // Azure OpenAI APIへのリクエストを送信
      const chatResponse = await axios.post(
        "https://{your-resource-name}.openai.azure.com/openai/deployments/{your-deployment-name}/chat/completions?api-version=2023-05-15",
        {
          messages: [
            {
              role: "user",
              content: message,
            },
          ],
          functions: [
            {
              name: "analyzeImage",
              description: "Analyze the image provided by the user.",
              parameters: {
                type: "object",
                properties: {
                  imageUrl: {
                    type: "string",
                    description: "The URL of the image to analyze.",
                  },
                  description: {
                    type: "string",
                    description: "A description provided by the user.",
                  },
                },
                required: ["imageUrl"],
              },
            },
          ],
          function_call: {
            name: "analyzeImage",
            arguments: {
              imageUrl: imageUrl,
              description: message,
            },
          },
        },
        {
          headers: {
            "api-key": process.env.REACT_APP_AZURE_OPENAI_API_KEY,
            "Content-Type": "application/json",
          },
        }
      );

      setResponse(chatResponse.data.choices[0].message.content);
    } catch (error) {
      console.error("Error:", error);
      setResponse("Error: Unable to get response from Azure OpenAI.");
    }
  };

  return (
    <div>
      <h1>Azure ChatGPT Function Calling with Image</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter your message"
        />
        <input type="file" onChange={handleImageChange} />
        <button type="submit">Send</button>
      </form>
      <div>
        <h2>Response:</h2>
        <pre>{response}</pre>
      </div>
    </div>
  );
};

export default ChatGPTFunctionCallWithImage;