import UserCard from "../components/UserCard/UserCard";
import '../styles/Users.css'
import { useState,useMemo,useEffect } from "react"; 
import UserForm from './../components/UserForm/UserForm';
import Modal from "../components/UserForm/Modal";
import useUsers from "../hooks/useUsers";

const Users = () => {
    const usersPerPage = 6;
    const [currentPage, setCurrentPage] = useState(1);
    const [editingUser, setEditingUser] = useState(null);
    const [isOpenForm, setisOpenForm] = useState(false);
    const [deletingUser, setDeletingUser] = useState(null);
   const [search, setSearch] = useState('');
   const{users,loadingAction,loadingUserId,isLoading,isFetching,errors,get,post,patch,remove}=useUsers();
     
    useEffect(()=>{
       getUsers();
    },[])
    async function getUsers(){  
        await get('https://jsonplaceholder.typicode.com/users');
    }

    const filteredUsers = useMemo(()=>{
       return users.filter((user) => (user.name.toLowerCase().includes(search.toLowerCase()) || user.email.toLowerCase().includes(search.toLowerCase())));
    },[users,search]);     

    const startIndex = (currentPage - 1) * usersPerPage;
    const endIndex = currentPage * usersPerPage
    const paginatedUsers = filteredUsers.slice(startIndex, endIndex);
    const totalPages = Math.ceil(filteredUsers.length/usersPerPage);
    const pages = Array.from(
    { length: totalPages },
    (_, index) => index + 1 );

    useEffect(() => {
    setCurrentPage(1);
    }, [search]);

    useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
        setCurrentPage(totalPages);
    }
}, [currentPage, totalPages]);
    
    

    return (
        
    <>
        <div className="users-header">

            <h1>Users</h1>

           <button className="create-btn" onClick={()=>setisOpenForm(true)} >   
            +  Create User
            </button>

       </div>

       {errors && (
         <div className="error-message">
            {errors}
         </div>
)}

       { isOpenForm && (
        <Modal onClose={handleCancel}>
            <UserForm    
            handleCancel={handleCancel} 
            editingUser={editingUser}
            isLoading={isLoading} 
            loadingAction={loadingAction}
            onSave={handleSave}
            />
        </Modal>)}

        {deletingUser && ( 
       <Modal onClose={() => setDeletingUser(null)}>
           <div className="delete-confirmation">
               <h2>Delete User</h2>
                <p>
                Are you sure you want to delete{" "}
                <strong>{deletingUser.name}</strong>?
                </p>
            <div className="delete-actions">
                <button
                    onClick={() => setDeletingUser(null)}
                >
                    Cancel
                </button>

                <button
                    onClick={() => handleDelete(deletingUser.id)}
                >
                    Delete
                </button>
            </div>
        </div>
    </Modal>
)}
        
        <div className="search-container">
           <input
              className="search-input"
              type="text"
              placeholder="Search users..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
           />
        </div>
    
       <div className="users-container">
        {isFetching ? (
            <div className="loading-container">
                <div className="loader"></div>
                <span>Loading users...</span> 
            </div>
        ) : ( 
            paginatedUsers.length === 0 ? (
                <div className="empty-state">
                    <h3>No users found</h3>
                    <p>Try another search.</p>
                </div>
            ) : (
                paginatedUsers.map((user) => ( 
            <UserCard
                key={user.id}
                id={user.id}
                name={user.name}
                email={user.email}
                phone={user.phone}
                handleUpdate={handleUpdate}
                handleDelete={handleDeleteRequest}
                isLoading={isLoading}
                loadingAction={loadingAction}
                loadingUserId={loadingUserId}
            />
            )
        ))
        )}
       </div>

       <div className="pagination">
            <button disabled={currentPage === 1} onClick={() => setCurrentPage(prev => prev - 1)} > Previous </button>
            {pages.map((page) => (
               <button
                  key={page}
                  className={currentPage === page ? "active" : ""}
                  onClick={() => setCurrentPage(page)}
                >
               {page}
               </button>
            ))}
            <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(prev => prev + 1)} > Next </button>
        </div>
    </>
);

async function handleSave(data) {
    if (editingUser) {
        await updateUser(data);
    } else {
        await createUser(data);
    }
}

async function updateUser(data){
        const r = await patch(`https://jsonplaceholder.typicode.com/users/${editingUser.id}`,data);
        if(r){
           setEditingUser(null);
           setisOpenForm(false)
        }
}


async function createUser(data){
        const r = await post('https://jsonplaceholder.typicode.com/users',data);
        if(r){
           setEditingUser(null);
           setisOpenForm(false);
        }
}


function handleCancel(){
    setisOpenForm(false);
    setEditingUser(null);
}


function handleUpdate(id){
    let user = users.find(user=> user.id === id);
    setEditingUser(user);
    setisOpenForm(true);
}

async function handleDelete(id){
    if(editingUser?.id===id){
        setEditingUser(null);
        setisOpenForm(false);
    }
        await remove(`https://jsonplaceholder.typicode.com/users/${id}`,id);
        setDeletingUser(null);
}

function handleDeleteRequest(id) {
    const user = users.find(user => user.id === id);
    setDeletingUser(user);
}

}
 
export default Users;