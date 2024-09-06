"use client";
import React, { useState } from "react";

interface CommentsProps {
  postId: string;
}

const Comments: React.FC<CommentsProps> = ({ postId }) => {
  const [newComment, setNewComment] = useState<string>("");

  const handleCommentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setNewComment(event.target.value);
  };

  const handleCommentSubmit = () => {
    // Handle comment submission logic here
    console.log("Comment added:", newComment);
    setNewComment("");
  };

  // Sample comments data
  const comments = [
    {
      id: 1,
      username: "Commenter1",
      content: "This is a great post!",
      avatarUrl: "/api/placeholder/40/40",
    },
    {
      id: 2,
      username: "Commenter2",
      content: "Thanks for sharing this.",
      avatarUrl: "/api/placeholder/40/40",
    },
  ];

  return (
    <div className="border-t pt-4 mt-4">
      <h3 className="font-semibold text-neutral-900 dark:text-neutral-50 mb-2">
        Comments
      </h3>
      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="flex items-start">
            <img
              src={comment.avatarUrl}
              alt={comment.username}
              className="w-8 h-8 rounded-full mr-3"
            />
            <div>
              <p className="font-semibold text-neutral-900 dark:text-neutral-50">
                {comment.username}
              </p>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                {comment.content}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <textarea
          value={newComment}
          onChange={handleCommentChange}
          className="w-full p-3 border rounded-lg dark:bg-neutral-700 dark:text-neutral-200"
          placeholder="Add your reply..."
          rows={3}
        ></textarea>
        <button
          onClick={handleCommentSubmit}
          className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Reply
        </button>
      </div>
    </div>
  );
};

export default Comments;
