import { useState, useEffect } from "react";
import CommentItem from "./CommentItem";
import CommentInput from "./CommentInput";

const Nested = () => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch("http://localhost:8080/rks/api/post/1");
        if (!response.ok) {
          throw new Error("Failed to fetch comments");
        }
        const data = await response.json();
        setComments(data);
      } catch (error) {
        console.error("Error fetching comments:", error);
        setComments([]);
      }
    };
    fetchComments();
  }, []);

  const onComment = (newComment) => {
    setComments((prev) => [newComment, ...prev]);
  };

  return (
    <div className="flex flex-col gap-6 h-full w-full p-6 bg-gray-100 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-800">Feel Free To Ask</h2>
      <CommentInput onComment={onComment} />
      <div>
        {comments?.length > 0 ? (
          <div className="flex flex-col gap-4">
            {comments.map((comment) => (
              <CommentItem key={comment.id} comment={comment} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No comments available</p>
        )}
      </div>
    </div>
  );
};

export default Nested;
