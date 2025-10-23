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
                await getLoggedUserData();
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
        <div className="w-full max-w-2xl mx-auto flex flex-col items-center p-6 min-h-screen">
            {/* Profile Header */}
            <div className="w-full bg-white rounded-2xl shadow-md p-6 mb-8 flex flex-col sm:flex-row items-center sm:items-start gap-6">
                {/* Profile Photo */}
                <div className="relative">
                    <input
                        type="file"
                        id="profileImage"
                        className="hidden"
                        onChange={changeProfilePhoto}
                    />
                    <label
                        htmlFor="profileImage"
                        className="cursor-pointer group relative"
                    >
                        <img
                            onError={(e) => (e.target.src = photoProfile)}
                            src={previewImage || userData?.photo || photoProfile}
                            alt={userData?.name}
                            className="w-28 h-28 rounded-full object-cover border-4 border-blue-100 shadow-md group-hover:opacity-80 transition"
                        />
                        <span className="absolute bottom-1 right-1 bg-blue-600 text-white text-xs px-2 py-1 rounded-full shadow hidden group-hover:block">
                            Change
                        </span>
                    </label>
                </div>

                {/* User Info */}
                <div className="flex flex-col flex-1 text-center sm:text-left">
                    <h2 className="text-2xl font-bold text-gray-800">
                        {userData?.name || "User"}
                    </h2>
                    <p className="text-gray-500">{userData?.email}</p>
                    <Button
                        as={Link}
                        to="/change-password"
                        color="primary"
                        size="sm"
                        className="mt-4 rounded-full px-6 self-center sm:self-start"
                    >
                        Change Password
                    </Button>
                </div>
            </div>

            {/* User Posts */}
            <div className="w-full">
                {posts.length > 0 ? (
                    posts.map((post) => <PostCard key={post._id} post={post} />)
                ) : (
                    <div className="flex flex-col items-center justify-center text-center py-20 bg-white rounded-2xl shadow-md">
                        <p className="text-2xl font-semibold text-gray-600">
                            No posts available!
                        </p>
                        <p className="text-gray-400 mt-2">
                            Start creating posts and share your thoughts
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
