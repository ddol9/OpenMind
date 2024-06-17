import '../global.css';
import { loginPageBackgroundImage, Logo, personIcon } from '../assets/images';
import Icon from '../components/Icon/Icon';
import styles from './LoginPage.module.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postSubject } from '../api/subjects/subjectsApi';

function LoginPage() {
  const [nameInput, setNameInput] = useState('');
  const [result, setResult] = useState({});
  // const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (nameInput.trim() !== '') {
      try {
        const SubjectResult = await postSubject(nameInput);
        setResult(SubjectResult);
        console.log(SubjectResult);
        // navigate(`/question/${SubjectResult.id}`);
      } catch (error) {
        console.error('회원생성에 실패했습니다:', error);
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.header_box}>
          {/* <Link to='/questionListPage' className={styles.header_right}>
            <a>질문하러 가기</a>
          </Link> */}
          <button className={styles.header_right}>질문하러 가기</button>
        </div>
      </div>
      <div className={styles.main}>
        <img className={styles.main_logo} src={Logo} alt='Logo' />

        <div className={styles.form}>
          <input
            className={styles.nickName_input}
            value={nameInput}
            placeholder='이름을 입력하세요'
            onChange={(e) => setNameInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit(e)}
          />
          <span className={styles.input_personIcon}>
            <img src={personIcon} alt='personIcon' />
          </span>
          <button className={styles.login_btn} onClick={(e) => handleSubmit(e)}>
            질문 받기
          </button>
        </div>
      </div>
      <div className={styles.empty_box}></div>
      <footer className={styles.footer}>
        {/* <img
              className={styles.footer_backgroundImg}
              src={loginPageBackgroundImage}
              alt='backgroundImage'
            /> */}
      </footer>
    </div>
  );
}

export default LoginPage;
