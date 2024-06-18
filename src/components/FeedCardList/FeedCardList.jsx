import FeedCard from '../FeedCard/FeedCard';
import styles from './FeedCardList.module.css';
import useFeedCardDetails from '../../hooks/useFeedCardDetails';
import NoQuestion from '../NoQuestion/NoQuestion';
import Icon from '../Icon/Icon';

const FeedCardList = ({ subjectId, pageType }) => {
  const {
    questions,
    isLoading,
    error,
    userProfileImage,
    username,
    setQuestions,
  } = useFeedCardDetails(subjectId);

  const handleCountUpdate = (questionId, reaction) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((question) =>
        question.id === questionId ? { ...question, ...reaction } : question
      )
    );
  };

  if (isLoading) {
    return <div>로딩중입니다 헷...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return questions.count === 0 ? (
    <NoQuestion />
  ) : (
    <div className={styles.container}>
      <div className={styles.header}>
        <Icon className={styles.icon} iconName={'Messages'} />
        <span>{questions.count}개의 질문이 있습니다</span>
      </div>
      {questions.map((data) => (
        <FeedCard
          key={data.id}
          pageType={pageType}
          questionData={data}
          userProfileImage={userProfileImage}
          username={username}
          countUpdate={handleCountUpdate}
        />
      ))}
    </div>
  );
};

export default FeedCardList;
