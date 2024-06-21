import { useState } from 'react';
import styles from './ReactionButton.module.css';
import { postReaction } from '../../api/questions/questionsApi';
import LikeIcon from '../../assets/images/thumbs_up.svg?react';
import DislikeIcon from '../../assets/images/thumbs_down.svg?react';

const ReactionButton = ({
  type,
  initialCount = 0,
  questionId,
  countUpdate,
}) => {
  const [count, setCount] = useState(initialCount);
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = async () => {
    try {
      if (isClicked) {
        setCount(count - 1);
        setIsClicked(false);
        await postReaction(questionId, type);
      } else {
        setCount(count + 1);
        setIsClicked(true);
        await postReaction(questionId, type);
      }
      countUpdate(type, isClicked ? count - 1 : count + 1);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <button
      className={`${styles['button-reaction']} ${
        isClicked ? styles['button-active'] : ''
      }`}
      onClick={handleClick}
    >
      {type === 'like' ? (
        <LikeIcon
          className={`${styles.icon} ${isClicked ? styles['icon-active'] : ''}`}
        />
      ) : (
        <DislikeIcon
          className={`${styles.icon} ${isClicked ? styles['icon-active'] : ''}`}
        />
      )}

      <span className={styles.count}>{count}</span>
    </button>
  );
};

export default ReactionButton;
