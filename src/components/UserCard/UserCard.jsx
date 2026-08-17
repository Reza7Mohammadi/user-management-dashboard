import "./UserCard.css";

const UserCard = ({ id,name, email, phone,handleUpdate,handleDelete,isLoading,loadingAction,loadingUserId }) => {
    const isDeleting = loadingAction === "delete" && loadingUserId === id;
    return (
        <div className="user-card">

            <h2 className="user-name">{name}</h2>

            <p className="user-info">{email}</p>

            <p className="user-info">{phone}</p>

            <div className="user-buttons">

                <button className="btn btn-update" onClick={()=>{handleUpdate(id)}} disabled={isLoading}>
                    Update
                </button>

                <button className="btn btn-delete"  onClick={() => handleDelete(id)}  disabled={isDeleting}
>                    {isDeleting ? (
                     <span className="button-spinner"></span> ) : (
                      "Delete" )}
                </button>

            </div>

        </div>
    );
};

export default UserCard;