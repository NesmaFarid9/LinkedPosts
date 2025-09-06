import { useEffect, useState } from 'react'
import PostCard from '../Components/PostCard';
import { useParams } from 'react-router-dom';
import { getSinglePostApi } from '../Services/PostServices';
import LoadingScreen from '../Components/LoadingScreen';

export default function PostDetailsPage() {
    let {id} = useParams();
    const [post, setPost] = useState(null);

    async function getSinglePost() {
        const response =  await getSinglePostApi(id);
        if(response?.message){
            setPost(response.post);
        }
    }
    useEffect(() => {
        getSinglePost();
    }, []);

    return <>
    <div className="w-4/12 mx-auto">
        {post ? <PostCard post={post} commentLimit={post.comments.length}/> : <LoadingScreen/>}
    </div>
    </>
}
