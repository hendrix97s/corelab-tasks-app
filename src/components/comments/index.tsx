import { memo, useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { CommentInterface } from "@/interfaces/comment-interface";
import { UserInterface } from "@/interfaces/user-interface";
import {
  initializeCommentListener,
  removeCommentListener,
} from "@/listeners/comment-listener";
import { useAuth } from "@/contexts/use-auth";
import { useComment } from "@/contexts/use-comment";

interface CommentsProps extends React.HTMLAttributes<HTMLDivElement> {
  id: string;
  task_id: string;
}

const Comments = ({ id, task_id, ...rest }: CommentsProps) => {
  const { user } = useAuth();
  const { commentIndex, commentStore } = useComment();

  const [comments, setComments] = useState<CommentInterface[]>();
  const [comment, setComment] = useState<string>();

  const commentsEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (commentsEndRef.current) {
      commentsEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSendCommentary = () => {
    if (!comment) return;
    commentStore(Number(id), Number(task_id), {
      content: comment,
    }).then((value) => {
      setComment("");
    });
  };

  useEffect(() => {
    commentIndex(Number(id), Number(task_id)).then((value) => {
      setComments(value);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [commentIndex, setComments]);

  useEffect(() => {
    initializeCommentListener(setComments);
    return () => {
      removeCommentListener();
    };
  }, []);

  useEffect(() => {
    if (!comments) return;
  }, [comments]);

  useEffect(() => {
    scrollToBottom();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [comments]);

  return (
    <div
      {...rest}
      className={twMerge(
        "w-1/3  h-full flex flex-col border-l border-shark-800",
        rest.className
      )}
    >
      <div className="h-16 border-b border-shark-800 flex items-center px-8 ">
        <h1 className="text-lg font-semibold">Comentários</h1>
      </div>
      <div className="flex-1 bg-shark-950 overflow-auto flex flex-col gap-2 p-4">
        {comments &&
          comments.map((commentary) => (
            <div
              key={commentary.id}
              className={`w-full flex ${
                user.id === commentary.user.id ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`${
                  user.id === commentary.user.id
                    ? "bg-electric-violet-500"
                    : "bg-blue-500"
                } px-4 py-1 rounded-md`}
              >
                {commentary.content}
              </div>
            </div>
          ))}
        <div ref={commentsEndRef} />
      </div>
      <div className="p-4 border-t border-shark-800 flex gap-4">
        <Input
          value={comment}
          className="bg-shark-950 border-shark-800 "
          onChange={(e) => setComment(e.target.value)}
        />
        <Button className="w-fit" onClick={() => handleSendCommentary()}>
          Enviar
        </Button>
      </div>
    </div>
  );
};

export default memo(Comments);
