import { useState } from "react";
import useInput from "../utils/useInput";
import styles from "../styles/SignUp.module.css"; // css를 모듈화해서 여기에만 적용되게 하기! 사용법은 className={styles.클래스이름}

const SignUp = () => {
  // 검증함수 string -> bool
  const maxLen = (value) => value.length <= 20; // 최대길이 제한
  const minLen = (value) => value.length >= 8; // 최소길이 제한
  const noLim = (value) => value.length !== 0; // 길이가 0만 아니면 true 주기
  // 입력받을 값들
  const email = useInput("", maxLen);
  const password = useInput("", maxLen);
  const passwordCovered = useInput("", minLen);
  const passwordTwin = useInput("", maxLen);
  const passwordTwinCovered = useInput("", maxLen);
  const name = useInput("", maxLen);
  const phone = useInput("", maxLen);
  const username = useInput("", maxLen);
  const [subscribed, setSubscribed] = useState(false);
  // 입력 창을 인덱스로 나눠서 보여주기
  const [currentIndex, setCurrentIndex] = useState(0); // index에 따라 화면 다르게 보여주기
  return (
    //전체 페이지
    <div className={styles.pageWrapper}>
      {/* 회원가입 창 */}
      <div className={styles.signupContainer}>
        {/* 로고 + 메인타이틀 */}
        <div className={styles.header}>
          <div className={styles.logo}>로고</div>
          <div className={styles.mainTitle}>
            {currentIndex === 0 && <div>0번째 페이지에 보여줘야 할 내용</div>}
            {currentIndex === 1 && <div>1번째 페이지에 보여줘야 할 내용</div>}
          </div>
        </div>

        <div className={styles.body}>
          <div className={styles.inputBoxContainer}>
            <div className={styles.inputBox}>
              <div className={styles.inputTitle}>이메일</div>
              <input placeholder="중복 불가" {...email} />
            </div>
            <div className={styles.inputBox}>
              <div className={styles.inputTitle}>이름</div>
              <input placeholder="이름을 입력하세요" {...name} />
            </div>
            {/* 다른 입력 필드들도 비슷한 방식으로 추가 */}
          </div>
          <div className={styles.footer}>
            {currentIndex === 0 && (
              <>
                <button>이전</button>{" "}
                {/* 이전 누르면 그냥 홈화면으로 돌려보내거나 이전 페이지로 */}
                <button onClick={() => setCurrentIndex(1)}>다음</button>{" "}
                {/* index 1로 바꿔줘서 화면 구성 바뀌게 */}
              </>
            )}
            {currentIndex === 1 && (
              <>
                <button>완료</button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
