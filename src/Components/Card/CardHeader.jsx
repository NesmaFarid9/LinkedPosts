// import { useContext } from "react";
import photoProfile from "../../assets/profilePhoto.jpg";
// import { AuthContext } from "../../Context/AuthContext";

import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";

export default function CardHeader({ photo, name, date, userId }) {
    const { userData } = useContext(AuthContext);
    const myPost = userData?._id === userId;

    const profileImage = myPost ? userData?.photo : photo;

    return (
        <div className="flex">
        <label>
            <img
                onError={(e) => (e.target.src = photoProfile)}
                src={profileImage || photoProfile}
                className="object-cover rounded-full w-10 h-10 mr-3"
                alt={name}
            />
        </label>
        <div>
            <h3 className="text-md font-semibold">{name}</h3>
            <p className="text-xs text-gray-500">{date}</p>
        </div>
        </div>
    );
}