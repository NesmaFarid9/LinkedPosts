import axios from "axios";

export async function sendRegisterData(userData) {
    try{
        let {data} = await axios.post(`https://linked-posts.routemisr.com/users/signup`, userData);
        console.log(data);
        return data;
    }
    catch(err){
        console.log(err.response.data);
        return err.response.data;
        
    }  
};
export async function sendLoginData(userData) {
    try{
        // destruct all data
        const {data} = await axios.post(`https://linked-posts.routemisr.com/users/signin`, userData);
        return data;
    }
    catch(err){
        console.log(err.response.data);
        return err.response.data;
    }
    
}
export async function getLoggedUserDataApi(){
    try{
        const {data} = await axios.get(`https://linked-posts.routemisr.com/users/profile-data`, {
            headers:{
                token: localStorage.getItem('token')
            }
        });
        console.log(data);
        return data;
        
    }
    catch(err){
        console.log(err);
        
    }
}

export async function changeProfilePhotoApi(formdata){
    try{
        const {data} = await axios.put(`https://linked-posts.routemisr.com/users/upload-photo`, formdata, {
            headers:{
                token: localStorage.getItem('token')
            }
        });
        return data;
    }
    catch(err){
        console.log(err);
        
    }
}

export async function changePasswordApi({ oldPassword, newPassword }) {
    try {
        const { data } = await axios.patch(
        `https://linked-posts.routemisr.com/users/change-password`,
        {
            password: oldPassword,
            newPassword,
        },
        {
            headers:{
                token: localStorage.getItem("token")
            } 
        }
        );
        return data;
    } catch (err) {
        console.log(err.response?.data || err);
    }
}


