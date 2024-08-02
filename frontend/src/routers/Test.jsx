import React, { useState } from "react";
import HashtagInput from "../components/HashtagInput";

function PostWithHashtags() {
  const [hashtags, setHashtags] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // 게시글과 해시태그를 함께 제출하는 로직을 여기에 추가합니다.
    console.log("Post submitted with hashtags:", hashtags);
  };

  return (
    <div>
      <h1>Create Post</h1>
      <form onSubmit={handleSubmit}>
        <HashtagInput hashtags={hashtags} setHashtags={setHashtags} />
        <button type="submit">Submit Post</button>
      </form>
    </div>
  );
}

export default PostWithHashtags;
