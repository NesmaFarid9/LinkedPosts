import { Input } from '@heroui/input';
import { Button } from '@heroui/react';
import React, { useState } from 'react'
import { updateCommentApi } from '../Services/commentServices';
// import { updateCommentApi } from '../Services/commentServices';

export default function CommentUpdate({commentId, content, setIsUpdateComment, callback}) {
    const [commentContent, setCommentContent] = useState(content);
    // const [isUpdateComment, setIsUpdateComment] = useState(false);
    const [isLoading, setIsLoading] = useState(false);


    async function updateComment(e) {
        e.preventDefault();
        setIsLoading(true);
        const response = await updateCommentApi(commentId, commentContent);
        if(response?.message){
            await callback();
            setIsUpdateComment(false);
        }
        setIsLoading(false);    
    }
    return <>
    <form 
        className="flex gap-2 mb-2 items-center"
        onSubmit={updateComment} >
        <Input value={commentContent} onChange={(e)=> setCommentContent(e.target.value)} variant='bordered' placeholder="Comment..."/>
        <Button onPress={()=>setIsUpdateComment(false)}>Cancel</Button>
        <Button isLoading={isLoading} type='submit' disabled={commentContent.length < 2}color='primary'>Update</Button>
    </form>
    </>
}
