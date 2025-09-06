import React, { useContext, useEffect, useState } from "react";
import { getUserPostsApi } from "../Services/PostServices";
import PostCard from "../Components/PostCard";
import { AuthContext } from "../Context/AuthContext";
import { Button } from "@heroui/react";
import { Link } from "react-router-dom";
import { changeProfilePhotoApi } from "../Services/authServices";
import photoProfile from "../assets/profilePhoto.jpg";

export default function Profile() {
    const { userData, setUserData, getLoggedUserData } = useContext(AuthContext);
    const [posts, setPosts] = useState([]);
    const [previewImage, setPreviewImage] = useState(null);

    async function getUserPosts(userId) {
        try {
        const response = await getUserPostsApi(userId);
        if (response?.message) {
            setPosts(response.posts);
        }
        } catch (err) {
        console.log(err);
        }
    }

    useEffect(() => {
        if (userData?._id) {
        getUserPosts(userData._id);
        }
    }, [userData?._id]);

    async function changeProfilePhoto(e) {
        const formdata = new FormData();
        formdata.append("photo", e.target.files[0]);
        setPreviewImage(URL.createObjectURL(e.target.files[0]));

        try {
            const response = await changeProfilePhotoApi(formdata);
            if (response?.message) {
                const updatedUser = await getLoggedUserData();
                // update posts so all comments also reflect the new photo
                if (userData?._id) {
                    getUserPosts(userData._id);
                }
                setPreviewImage(null);
        }
        } catch (err) {
        console.log(err);
        }

        e.target.value = "";
    }

    return (
        <div className="w-full max-w-lg flex flex-col justify-center items-center mx-auto">
        <div className="flex justify-between items-center bg-amber-200 w-full px-4 py-2">
            <input type="file" id="profileImage" className="hidden" onChange={changeProfilePhoto} />
            <label htmlFor="profileImage" className="cursor-pointer">
            <img
                onError={(e) => (e.target.src = photoProfile)}
                src={previewImage || userData?.photo || photoProfile}
                className="object-cover rounded-full w-16 h-16 mr-3"
                alt={userData?.name}
            />
            </label>
            <Button color="primary">
            <Link to={"/change-password"}>Change Password</Link>
            </Button>
        </div>

        {posts.length > 0 ? (
            posts.map((post) => <PostCard key={post._id} post={post} />)
        ) : (
            <p className="flex justify-center items-center text-3xl font-bold min-h-screen">No posts available!</p>
        )}
        </div>
    );
}
