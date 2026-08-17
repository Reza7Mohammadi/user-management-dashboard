import axios from "axios";
import { useState } from "react";

function useUsers(){
    const [isLoading,setIsLoading]=useState(false);
    const [loadingAction, setLoadingAction] = useState(null);
    const [loadingUserId, setLoadingUserId] = useState(null);
    const[users,setUsers]=useState([]);
    const [errors,setErrors]=useState(null);
    const [isFetching, setIsFetching] = useState(false);
    
    async function get(url){
        try{
                setErrors(null);
                setIsFetching(true);
                const r = await axios.get(url);
                setUsers(r.data);
                return r.data;
            }catch(error){
                setErrors(error.message);
                return null;
            }finally{
                setIsFetching(false);
            }
    }

     async function post(url,form){
        try{
               setErrors(null);
                setIsLoading(true);
                setLoadingAction("create");
                const r = await axios.post(url,form);
                setUsers(prev=> [...prev,r.data]);
                return r.data;
            }catch(error){
                setErrors(error.message);
                return null;
            }finally{
                setIsLoading(false);
                setLoadingAction(null);
            }
    }

    async function patch(url, form) {
    try {
        setErrors(null);
        setIsLoading(true);
        setLoadingAction("update");
        const r = await axios.patch(url, form);

        setUsers(prev =>
            prev.map(user =>
                user.id === r.data.id ? { ...user, ...r.data } : user )
        );
        return r.data;

    } catch (error) {
        setErrors(error.message);
        return null;

    } finally {
        setIsLoading(false);
        setLoadingAction(null);
    }
}

    async function remove(url,id){
        try{
               setErrors(null);
                setIsLoading(true);
                setLoadingAction('delete');
                setLoadingUserId(id)
                 await axios.delete(url);
                setUsers(prev=>prev.filter(user=> user.id !== id))
                return true;
            }catch(error){
                setErrors(error.message);
                return null;
            }finally{
                setIsLoading(false);
                setLoadingAction(null);
                setLoadingUserId(null)
            }
    }

    return{
        isLoading,
        loadingAction,
        loadingUserId,
        isFetching,
        errors,
        users,
        get,
        post,
        patch,
        remove
    }
}

export default useUsers;