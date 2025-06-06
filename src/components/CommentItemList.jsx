import '../index.css';
import CommentItem from './CommentItem';

function CommentItemlist(props) {
  const { postId, comments, onAfterAddOrLikeComment, voteParticipants } = props;

  return (
    <>
      {comments?.map((comment, index) => (
        <CommentItem
          key={comment.id}
          id={comment.id}
          index={index}
          postId={postId}
          userId={comment.authorUid}
          content={comment.content}
          timestamp={formatTimestamp(comment.createdAt)}
          likes={comment.likes}
          onAfterAddOrLikeComment={onAfterAddOrLikeComment}
          voteOptionId={comment.voteOptionId}
          voteParticipants={voteParticipants}
        />
      ))}
    </>
  );
}

// timestamp 형식 바꿔주는 함수 (Firebase Timestamp → 보기 좋게)
function formatTimestamp(ts) {
  if (!ts?.toDate) return '방금 전';
  const date = ts.toDate();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  return `${month}/${day} ${hour}:${minute}`;
}

export default CommentItemlist;
