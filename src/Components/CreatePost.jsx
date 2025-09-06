import { Input } from '@heroui/input'
// import imagePost from '../assets/profilePhoto.jpg'
import { Button, Spinner } from '@heroui/react'
import { useState } from 'react';
import { createPostApi } from '../Services/PostServices';
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    useDisclosure,
} from "@heroui/react";
export default function CreatePost({callback}) {
    const [postBody, setPostBody] = useState('');
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    async function createPost(e){
        e.preventDefault();
        setLoading(true);
        const formData = new FormData();
        postBody && formData.append('body', postBody);
        image && formData.append('image', image);
        const response = await createPostApi(formData);
        if(response?.message){
            await callback();
            setPostBody('');
            setImageUrl('');
        }
        setLoading(false);
    }

    function handleImage(e){
        setImage(e.target.files[0]);   
        // to choose same image
        setImageUrl(URL.createObjectURL(e.target.files[0]));
        e.target.value = '';
    }
    return <>
        <div className="bg-white relative w-full rounded-md shadow-md h-auto py-3 px-3 my-5 overflow-hidden">
            <form onSubmit={createPost}>
                <textarea value={postBody} onChange={(e)=>setPostBody(e.target.value)} className='border bordered-md p-4 w-full resize-none' rows={4} placeholder="Create post, What's on your mind?" />
                {
                    imageUrl &&  <div className="relative">
                        <img  onPress={onOpen} src={imageUrl} className='w-full' alt="image post" />
                        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                            <ModalContent>
                                <img  onPress={onOpen} src={imageUrl} className='w-full' alt="image post" />
                            </ModalContent>
                            </Modal>
                        <svg onClick={()=>setImageUrl('')} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 absolute top-2 right-2 cursor-pointer">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                </div>
                }
                <div className="flex justify-between items-center pt-5 px-3">
                    <label className='cursor-pointer hover:text-blue-500'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                        </svg>
                        
                        <Input onChange={handleImage} type='file' className='hidden'/>
                    </label>
                    
                <Button type='submit' className='ms-2' color='primary'>Post</Button>
                </div>
                
            </form>
            {
                loading && <div className='flex justify-center items-center absolute inset-0'>
                    <Spinner/>
                </div>
            }
        </div>
    </>
}
