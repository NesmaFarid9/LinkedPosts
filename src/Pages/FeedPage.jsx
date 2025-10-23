import PostCard from '../Components/PostCard'
import { getPostApi } from '../Services/PostServices';
import LoadingScreen from '../Components/LoadingScreen';
import CreatePost from '../Components/CreatePost';
// import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';



export default function FeedPage() {

    const [posts, setPosts] = useState([]);
    async function getAllPosts() {
        try {
            const response = await getPostApi();
            if (response?.message) {
                setPosts(response.posts);
            }
        }
        catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getAllPosts();
    }, []);

    // const {data: posts, isLoading} = useQuery({
    //     queryKey: ['post'],
    //     queryFn: getPostApi,
    //     select: (data)=> data?.data.posts,
    //     retry: 0,
    //     retryDelay: 1000,
    //     refetchOnMount: false,
    //     refetchOnWindowFocus: false,
    //     refetchOnReconnect: false,
    //     gcTime: 5000
    // });

    // console.log(posts);

    return <>
        <div className="lg:w-4/12 w-full mx-auto"> 
            <CreatePost callback={getAllPosts} />
            {
                posts.length == 0 ? <LoadingScreen /> : posts.map((post) => <PostCard key={post._id} post={post} commentLimit={1} callback={getAllPosts} />)
            }
 
        </div>


        {/* <div className="min-h-screen w-full flex flex-col px-3 lg:px-10">
            <div className="w-4/12 mx-auto">
                {/* <CreatePost callback={posts}/> */}
        {/* { isLoading ? <LoadingScreen/> : posts.map((post)=> <PostCard key={post.id} post={post} commentLimit={1}/> )

                } 
            </div>
        </div>*/}

    </>
};
