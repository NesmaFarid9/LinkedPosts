import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Spinner } from '@heroui/react'
import { deleteCommentApi } from '../../Services/commentServices';
import { useState } from 'react';
import PostFormUpdate from '../PostFormUpdate';
import PostCard from '../PostCard';

export default function DropDownAction({commentId, callback, setIsUpdate,post, deletePost}) {
    const [loading, setLoading] = useState(false);

    async function deleteComment(commentId){
        setLoading(true);
        const response = await deleteCommentApi(commentId);
        if(response?.message){
            await callback();
        }
        setLoading(false);
    }
    return <>
            { 
                loading ? <Spinner/>:
                <Dropdown>
                    <DropdownTrigger>
                        <svg className="w-16 outline-0 cursor-pointer" xmlns="http://www.w3.org/2000/svg" width={27} height={27} viewBox="0 0 24 24" fill="none" stroke="#b0b0b0" strokeWidth={2} strokeLinecap="square" strokeLinejoin="round"><circle cx={12} cy={12} r={1} /><circle cx={19} cy={12} r={1} /><circle cx={5} cy={12} r={1} /></svg>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Static Actions">
                        <DropdownItem onClick={()=>setIsUpdate(true)} key="edit">Edit</DropdownItem>
                        <DropdownItem onClick={()=>{commentId? deleteComment(commentId): deletePost(post._id)}} key="delete" className="text-danger" color="danger">
                            Delete 
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
        }
    </>
}





