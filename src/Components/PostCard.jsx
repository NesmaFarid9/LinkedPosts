import { useState, useContext } from "react";
import { deletePostApi } from "../Services/PostServices";
import { createCommentApi, getPostCommentsApi } from "../Services/commentServices";
import { AuthContext } from "../Context/AuthContext";
import { Button, Input } from "@heroui/react";
import PostComments from "./PostComments";
// import DropDownAction from './Card/DropDownAction';
import PostFormUpdate from "./PostFormUpdate";
import CardHeader from "./Card/CardHeader";
import CardBody from "./Card/CardBody";
import CardFooter from "./Card/CardFooter";
import DropDownAction from "./Card/DropDownAction";

export default function PostCard({ post, commentLimit, callback }) {
    const [commentContent, setCommentContent] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [comments, setComments] = useState(post.comments || []);
    const [isUpdate, setIsUpdate] = useState(false);

    const { userData } = useContext(AuthContext);

    async function createComment(e) {
        e.preventDefault();
        setIsLoading(true);
        const response = await createCommentApi(commentContent, post._id);
        if (response?.message) {
            setComments(response.comments);
            setCommentContent("");
        }
        setIsLoading(false);
    }

    async function deletePost() {
        setIsLoading(true);
        const response = await deletePostApi(post._id);
        if (response?.message) {
            await callback();
        }
        setIsLoading(false);
    }

    async function getPostComments() {
        const response = await getPostCommentsApi(post._id);
        setComments(response.comments);
    }

    return (
        <>
            {isUpdate ? (
                <PostFormUpdate
                    callback={callback}
                    post={post}
                    isUpdate={isUpdate}
                    setIsUpdate={setIsUpdate}
                />
            ) : (

                <div className="bg-white/90 backdrop-blur-sm w-full rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 h-auto py-5 px-6 my-6 overflow-hidden">

                    {/* Post Header */}
                    <div className="w-full h-16 flex items-center justify-between">
                        <CardHeader
                            userId={post.user._id}
                            photo={post.user.photo}
                            name={post.user.name}
                            date={post.createdAt.split("T")[0]}
                        />

                        {/* Show actions only for post owner */}
                        {userData?._id === post.user._id && (
                            <DropDownAction setIsUpdate={setIsUpdate} post={post} deletePost={deletePost} />
                        )}
                    </div>

                    {/* Post Body */}
                    <CardBody body={post.body} image={post.image} />

                    {/* Footer */}
                    <CardFooter postId={post._id} commentNumber={comments.length} />

                    {/* Add Comment */}
                    <form
                        onSubmit={createComment}
                        className="flex gap-2 mt-4 items-center bg-gray-50 rounded-xl px-3 py-2 border border-gray-200"
                    >
                        <Input
                            value={commentContent}
                            onChange={(e) => setCommentContent(e.target.value)}
                            variant="bordered"
                            placeholder="Write a comment..."
                            className="flex-1 rounded-xl"
                        />
                        <Button
                            isLoading={isLoading}
                            type="submit"
                            disabled={commentContent.length < 2}
                            color="primary"
                            className="rounded-xl shadow-md hover:shadow-lg transition-all"
                        >
                            Comment
                        </Button>
                    </form>

                    {/* Show Comments */}
                    <div className="mt-4 space-y-3">
                        {comments.length > 0 &&
                            comments.slice(0, commentLimit).map((comment) => (
                                <PostComments
                                    key={comment._id}
                                    callback={getPostComments}
                                    postUserId={post.user._id}
                                    comment={comment}
                                />
                            ))}
                    </div>
                </div>
            )}
        </>
    );
}

