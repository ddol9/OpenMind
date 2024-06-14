import styles from './FeedCard.module.css';
import ReactionButton from './ReactionButton';
import '../../global.css';
import formatTimeDiff from '../../utils/formatTimeDiff.js';

const FeedCard = ({
  answerStatus,
  questionContent,
  questionDate,
  userProfileImage,
  username,
  answer,
  answerDate = answer?.createdAt,
  answerContent = answer?.content,
}) => {
  return (
    <div className={styles.feedcard}>
      <div className={styles['feedcard-status-box']}>
        {answerStatus === 'true' ? '답변 완료' : '미답변'}
      </div>
      <div className={styles['feedcard-question-header']}>
        <span className={styles['feedcard-question-label']}>질문 · &nbsp;</span>
        <span className={styles['feedcard-question-date']}>
          {formatTimeDiff(questionDate)}
        </span>
      </div>
      <div className={styles['feedcard-question-text']}>{questionContent}</div>
      {answerStatus === 'true' && (
        <div className={styles['feedcard-answer-box']}>
          <img
            src={userProfileImage}
            alt={`${username}'s profile`}
            className={styles['feedcard-user-image']}
          />
          <div className={styles['feedcard-answer-content']}>
            <div className={styles['feedcard-answer-content-header']}>
              <div className={styles['feedcard-user-name']}>{username}</div>
              <span className={styles['feedcard-answer-date']}>
                {formatTimeDiff(answerDate)}
              </span>
            </div>
            <div className={styles['feedcard-user-answer']}>
              {answerStatus === 'true' ? answerContent : '답변이 없습니다'}
            </div>
          </div>
        </div>
      )}
      <div className={styles.separator}></div>
      <div className={styles['feedcard-buttons']}>
        <ReactionButton type='like' />
        <ReactionButton type='dislike' />
      </div>
    </div>
  );
};

export default FeedCard;