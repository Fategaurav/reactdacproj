import { useState, useRef } from "react";
import PropTypes from "prop-types";

const CommentInput = ({ onComment, parentId = null }) => {
  const [commentBody, setCommentBody] = useState("");
  const inputRef = useRef(null);

  const handleInputChange = () => {
    if (inputRef.current) {
      setCommentBody(inputRef.current.innerText);
    }
  };

  const handleCommentSubmit = async () => {
    if (commentBody.trim()) {
      const newComment = {
        body: commentBody,
        author: "Your Name", // You can dynamically add the author
        timestamp: new Date().toISOString(),
        post: { id: 1 }, // Assume the post ID is 1, you can dynamically set this
        parent: parentId ? { id: parentId } : null, // Set parent ID if replying
      };

      try {
        // Sending POST request with fetch
        const response = await fetch("http://localhost:8080/rks/api/comment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newComment),
        });

        if (!response.ok) {
          throw new Error("Failed to submit comment");
        }

        const data = await response.json();
        onComment(data); // Pass the saved comment to the parent component

        // Clear the input field after submission
        setCommentBody(""); 
        if (inputRef.current) {
          inputRef.current.innerText = ""; // Clear contentEditable input
        }
      } catch (error) {
        console.error("Error submitting comment:", error);
      }
    }
  };

  return (
    <div>
      <div
        ref={inputRef}
        contentEditable
        onInput={handleInputChange}
        className="px-md py-sm outline-none relative resize-y overflow-y-auto min-h-[44px] leading-5 box-border"
        aria-placeholder="Add a comment"
        style={{
          userSelect: "text",
          whiteSpace: "pre-wrap",
          wordBreak: "break-word",
          minHeight: "44px",
          paddingLeft: "10px",
          paddingRight: "10px",
          border: "1px solid #ccc",
          borderRadius: "5px",
        }}
      >
        <p className="first:mt-0 last:mb-0">
          <br />
        </p>
      </div>
      <button onClick={handleCommentSubmit} className="mt-2 bg-blue-500 text-white py-2 px-4 rounded">
        + Create
      </button>
    </div>
  );
};

CommentInput.propTypes = {
  onComment: PropTypes.func.isRequired,
  parentId: PropTypes.number, // Optional, only used when replying to a nested comment
};

export default CommentInput;
