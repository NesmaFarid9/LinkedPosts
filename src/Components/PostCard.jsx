import { Input } from '@heroui/input'
import CardBody from './Card/CardBody'
import CardFooter from './Card/CardFooter'
import CardHeader from './Card/CardHeader'
import PostComments from './PostComments'
import { Button } from '@heroui/react'
import { useContext, useState } from 'react'
import { createCommentApi, getPostCommentsApi } from '../Services/commentServices'
import { AuthContext } from '../Context/AuthContext'
import DropDownAction from './Card/DropDownAction'
import PostFormUpdate from './PostFormUpdate'
import { deletePostApi } from '../Services/PostServices'
// import CommentUpdate from './CommentUpdate'
// import { QueryClient, useMutation } from '@tanstack/react-query'
// import { queryClient } from './../main';

export default function PostCard({post, commentLimit, callback}) {
    const [commentContent, setCommentContent] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [comments, setComments] = useState(post.comments);
    // const [post, setPost] = useState(post.id);
    
    const [isUpdate, setIsUpdate] = useState(false);

    const {userData} = useContext(AuthContext);
    async function createComment(e){
        e.preventDefault(); 
        // console.log(commentContent);
        setIsLoading(true);
        // add comment
        const response = await createCommentApi(commentContent, post.id);
        if(response?.message){
            setComments(response.comments);
            setCommentContent('');
            // await callback();
        }
        // console.log(response);
        setIsLoading(false);  
    }

    // let {mutate: createComment, isPending} = useMutation({
    //     mutationKey: ['create-comment'],
    //     mutationFn: ()=> createCommentApi(commentContent, post.id),
    //     onSuccess: async (data)=>{
    //         setCommentContent('');
    //         await queryClient.invalidateQueries(['posts']);
    //     },
    //     onError:(err) =>{
    //         console.log(err);
            
    //     }
    // });
    async function deletePost(postId){
        setIsLoading(true);
        const response = await deletePostApi(postId);
        if(response?.message){
            await callback();
        }
        setIsLoading(false);
    }
    // to appear in ui changes that occur in api
    async function getPostComments() {
        const response = await getPostCommentsApi(post.id);
        setComments(response.comments);
    }
    // async function SetDeletePost() {
    //     const response = await getPostCommentsApi(post.id);
    //     setPost(response.id);
    // }

    return <>    
        {/* {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-white/80 z-10">
                <Spinner size="lg" />
                </div>
            )} */
        }
        
        { isUpdate ? <PostFormUpdate callback={callback} post={post} isUpdate={isUpdate} setIsUpdate={setIsUpdate}/> :
            <div className="bg-white w-full rounded-md shadow-md h-auto py-3 px-3 my-5 overflow-hidden">
            <div className="w-full h-16 items-center flex justify-between">
                
                <CardHeader userId={post.user._id} photo={post.user.photo} name={post.user.name} date={post.createdAt.split('.',1).join('').replace('T', ' ')} />
                {
                    userData?._id === post.user._id && 
                    <DropDownAction setIsUpdate={setIsUpdate} post={post} deletePost={deletePost} />      
                }
            </div>
                
            <CardBody body={post.body} image={post.image}/>
            <CardFooter postId={post.id} commentNumber={comments.length}/>
            {/* make comment */}         
                <form onSubmit={createComment} className='flex gap-2 mb-2 items-center'>
                    {/* controlledComponent vs UnControlledComponent  */}
                    {/* value={commentContent} vs onChange={(e)=> setCommentContent(e.target.value)}  */}
                    <Input value={commentContent} onChange={(e)=> setCommentContent(e.target.value)} variant='bordered' placeholder="Comment..."/>
                    <Button isLoading={isLoading} type='submit' disabled={commentContent.length < 2} color='primary' >Add Comment</Button>
                </form>
            
            {comments.length > 0 && comments.slice(0, commentLimit).map((comment)=> 
                <PostComments key={comment._id} callback={getPostComments} postUserId={post.user._id} comment={comment}/>)
            }
            </div>
        }
    </>
}
