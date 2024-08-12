import { CommentInterface } from "@/interfaces/comment-interface";
import { socket } from "@/socket";
import { Dispatch, SetStateAction } from "react";

let globalSetComments:
  | Dispatch<SetStateAction<CommentInterface[] | undefined>>
  | undefined;

export const initializeCommentListener = (
  setComments: Dispatch<SetStateAction<CommentInterface[] | undefined>>
) => {
  globalSetComments = setComments;
};

export const removeCommentListener = () => {
  globalSetComments = undefined;
};

socket.on("comment-created", (data: CommentInterface) => {
  console.log("comment-created >> ", data);
  if (globalSetComments) {
    globalSetComments((prev) => [...(prev ?? []), data]);
  }
});
