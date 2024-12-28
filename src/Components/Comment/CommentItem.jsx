import { useState } from "react";
import PropTypes from "prop-types";
import CommentInput from "./CommentInput";

const CommentItem = ({ comment }) => {
  const [isReplying, setIsReplying] = useState(false);
  const [comments, setComments] = useState(comment.comments || []);
  const [showReplies, setShowReplies] = useState(false);

  const onComment = (newComment) => {
    setComments((prev) => [newComment, ...prev]);
    setIsReplying(false); // Hide the reply input after submitting
  };

  return (
    <div className="bg-white p-4 border border-gray-300 rounded-lg shadow-sm mb-4">
      {/* Main Comment (Parent comment) */}
      <div>
        <p className="text-gray-800 text-lg font-bold">{comment.body}</p>
        <p className="text-sm text-gray-500 mt-1">by {comment.author}</p>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-4 mt-3">
        {isReplying ? (
          <button onClick={() => setIsReplying(false)} className="text-red-500 hover:underline text-sm">
            Cancel
          </button>
        ) : (
          <button onClick={() => setIsReplying(true)} className="text-blue-500 hover:underline text-sm">
            Reply
          </button>
        )}
        {comments.length > 0 && (
          <button
            onClick={() => setShowReplies((prev) => !prev)}
            className="text-gray-500 hover:underline text-sm"
          >
            {showReplies ? "Hide Replies" : `Show Replies (${comments.length})`}
          </button>
        )}
      </div>

      {/* Reply Input */}
      {isReplying && (
        <div className="mt-3">
          <CommentInput onComment={onComment} parentId={comment.id} />
        </div>
      )}

      {/* Nested Comments (Children comments) */}
      {showReplies && comments.length > 0 && (
        <div className="mt-4 pl-4 border-l-2 border-gray-300">
          {comments.map((nestedComment) => (
            <CommentItem key={nestedComment.id} comment={nestedComment} />
          ))}
        </div>
      )}
    </div>
  );
};

CommentItem.propTypes = {
  comment: PropTypes.shape({
    id: PropTypes.number.isRequired,
    body: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    comments: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        body: PropTypes.string.isRequired,
        author: PropTypes.string.isRequired,
        comments: PropTypes.array,
      })
    ).isRequired,
  }).isRequired,
};

export default CommentItem;
