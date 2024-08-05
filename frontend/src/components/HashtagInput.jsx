import React, { useState, useEffect } from "react";
import styled from "styled-components";
import cancelButton from "../assets/btn_cancel.png";

const HashTagInputWrapper = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
`;

const Input = styled.input`
  margin-left: 80px;
  margin-right: 8px;
  padding: 8px;
  font-size: 16px;
  border: 2px solid #2d2d2d29;
  border-radius: 4px;
  width: 100%;
  margin-bottom: 5px;
  box-sizing: border-box;
  &:focus {
    border-color: #54c1ff;
    outline: none;
  }
`;

const Error = styled.p`
  margin-left: 80px;
  color: red;
  font-size: 14px;
  text-align: left;
  width: 100%;
`;

const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 5px;
  align-items: flex-start;
  width: 90%;
`;

const Tag = styled.span`
  background-color: transparent;
  border: 1px solid #d9d9d9;
  color: #000000;
  padding: 10px 15px 10px 15px;
  border-radius: 50px;
  margin-right: 10px;
  margin-bottom: 5px;
  display: flex;
  align-items: left;
  font-family: Noto Sans KR;
  font-size: 16px;
  font-weight: 500;
  line-height: 16px;
  letter-spacing: -1px;
  align-items: center;
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  color: black;
  margin-left: 5px;
  cursor: pointer;
  font-size: 14px;
`;

const HashTagInput = ({ initialHashtags, onHashtagsChange }) => {
  const [hashtags, setHashtags] = useState(initialHashtags);
  const [input, setInput] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setHashtags(initialHashtags);
  }, [initialHashtags]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    // 한글, 영어, 숫자만을 허용하는 정규 표현식
    const regex = /^[a-zA-Zㄱ-ㅎ가-힣0-9]*$/;

    // 입력값이 유효하면 상태를 업데이트
    if (regex.test(value)) {
      setInput(value);
      setError("");
    } else {
      setError("한글, 영어, 숫자만 입력 가능합니다.");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      addHashtag(input.trim());
    }
  };

  const addHashtag = (tag) => {
    if (!tag) {
      setError("해시태그를 다시 작성해주세요");
      return;
    }
    if (hashtags.includes(tag)) {
      setError("해당 해시태그가 이미 존재합니다");
      return;
    }
    if (hashtags.length >= 3) {
      setError("해시태그는 최대 3개까지 추가할 수 있습니다.");
      return;
    }
    const newHashtags = [...hashtags, tag];
    setHashtags(newHashtags);
    setInput("");
    setError("");
    onHashtagsChange(newHashtags);
  };

  const removeHashtag = (tag) => {
    const newHashtags = hashtags.filter((hashtag) => hashtag !== tag);
    setHashtags(newHashtags);
    onHashtagsChange(newHashtags);
  };

  return (
    <HashTagInputWrapper>
      <Input
        type="text"
        value={input}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Add a hashtag"
      />
      {error && <Error>{error}</Error>}
      <TagList>
        {hashtags.map((tag, index) => (
          <Tag key={index}>
            #{tag}
            <RemoveButton onClick={() => removeHashtag(tag)}>
              <img src={cancelButton} alt="x" />
            </RemoveButton>
          </Tag>
        ))}
      </TagList>
    </HashTagInputWrapper>
  );
};

export default HashTagInput;
