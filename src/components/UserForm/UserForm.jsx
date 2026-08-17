import './UserForm.css'
import { useForm } from "react-hook-form";
import { useEffect } from "react";

import { userSchema } from '../../validation/userSchema';
import { yupResolver } from '@hookform/resolvers/yup';

const UserForm = ({handleCancel,editingUser,isLoading,loadingAction,onSave}) => {
    

    const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
} = useForm({
    resolver: yupResolver(userSchema) 
});

useEffect(() => {
    if (editingUser) {
        reset({
            name: editingUser.name,
            email: editingUser.email,
            phone: editingUser.phone
        });
    } else {
        reset({
            name: '',
            email: '',
            phone: ''
        });
    }
}, [editingUser, reset]);

    const isSaving = loadingAction === "create" || loadingAction === "update";

    return (
        <form className="user-form" onSubmit={handleSubmit(onSave)}>

           <input type="text" {...register("name")} className={errors.name ? "input-error" : ""}  placeholder="name..."/>
              {errors.name && (
                 <span className="field-error">
                    {errors.name.message}
                 </span>
              )}


           <input type="email" {...register("email")} className={errors.email ? "input-error" : ""} placeholder="email..."/>
              {errors.email && (
                 <span className="field-error">
                     {errors.email.message}
                </span>
              )}


           <input type="tel" {...register("phone")} className={errors.phone ? "input-error" : ""} placeholder="phone..."/>
             {errors.phone && (
                 <span className="field-error">
                     {errors.phone.message}
                 </span>
            )}


           <div className="user-form-buttons">

               <button className='save-btn' type="submit"  disabled={isSaving} >
                   {isSaving ? (
                   <span className="button-spinner"></span>) : (
                    editingUser ? "Save Changes" : "Create")}
               </button>

               <button className="cancel-btn" type="button" onClick={handleCancel} disabled={isLoading}>
               Cancel
               </button>

           </div>

        </form>
    );
}

 
export default UserForm;