import { useContext, useState } from "react";
import CardHeader from "./Card/CardHeader";
import { AuthContext } from "../Context/AuthContext";
import DropDownAction from "./Card/DropDownAction";
import CommentUpdate from "./CommentUpdate";
import photoProfile from "../assets/profilePhoto.jpg";

export default function PostComments({ comment, postUserId, callback }) {
    const [isUpdateComment, setIsUpdateComment] = useState(false);
    const { userData } = useContext(AuthContext);

    return (
        <div className="bg-gray-200 p-4 -mx-3 -mb-3">
        <div className="w-full h-16 items-center flex justify-between">
            <CardHeader
            photo={comment.commentCreator?.photo || photoProfile}
            name={comment.commentCreator?.name}
            date={comment.createdAt.split(".", 1).join("").replace("T", " ")}
            userId={comment.commentCreator?._id}
            />

            {userData?._id === comment?.commentCreator?._id && userData?._id === postUserId && (
            <DropDownAction callback={callback} commentId={comment._id} setIsUpdate={setIsUpdateComment} />
            )}
        </div>

        {isUpdateComment ? (
            <div className="bg-white p-4 -mx-3 -mb-3">
            <CommentUpdate
                commentId={comment._id}
                content={comment.content}
                setIsUpdateComment={setIsUpdateComment}
                callback={callback}
            />
            </div>
        ) : (
            <p className="p-2 ps-4">{comment.content}</p>
        )}
        </div>
    );
}
