import React, { useState } from "react";

function HashtagInput({ hashtags, setHashtags }) {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleAddHashtag();
      setInput("");
    }
  };

  const handleAddHashtag = () => {
    const trimmedInput = input.trim();
    if (trimmedInput === "") {
      setError("Hashtag cannot be empty");
      return;
    }
    if (trimmedInput.includes(" ")) {
      setError("Hashtag cannot contain spaces");
      return;
    }
    if (hashtags.includes(trimmedInput)) {
      setError("Hashtag already exists");
      return;
    }
    if (hashtags.length >= 3) {
      setError("You can only add up to 3 hashtags");
      return;
    }
    setHashtags([...hashtags, trimmedInput]);
    setInput("");
    setError("");
  };

  const handleDeleteHashtag = (tag) => {
    setHashtags(hashtags.filter((hashtag) => hashtag !== tag));
  };

  return (
    <div>
      <div>
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Enter a hashtag"
          disabled={hashtags.length >= 3}
        />
        <button
          type="button"
          onClick={handleAddHashtag}
          disabled={hashtags.length >= 3}
        >
          Add Hashtag
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
      <div>
        {hashtags.map((tag, index) => (
          <div key={index} style={{ display: "inline-block", margin: "5px" }}>
            #{tag}
            <button type="button" onClick={() => handleDeleteHashtag(tag)}>
              x
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HashtagInput;
