import { useForm } from "react-hook-form";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../../validation/loginSchema";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const {
    register,
    handleSubmit,
    formState: { errors }
} = useForm({
    resolver: yupResolver(loginSchema)
});

    return (
        <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
            <h1>Welcome Back</h1>

            <p>Login to your account</p>

            <input type="email" {...register("email")} placeholder="Email..."  className={errors.email ? "input-error" : ""} />
            {errors.email && (
                <span className="field-error">
                   {errors.email.message}
                </span>
            )}


            <input type="password" {...register("password")} placeholder="Password..." className={errors.password ? "input-error" : ""}  />
            {errors.password && (
                <span className="field-error">
                    {errors.password.message}
                </span>
            )}


            <button type="submit" disabled={isLoading} >
               {isLoading ? (
                 <span className="button-spinner"></span>) : (
                         "Login"
                )}
            </button>
        </form>
    );

    async function onSubmit(data) {
    try {
        setIsLoading(true);

        await new Promise((resolve) => {
            setTimeout(resolve, 1000);
        });

        console.log("Login successful:");
        localStorage.setItem("isLoggedIn", "true");
         navigate("/");

    } finally {
        setIsLoading(false);
    }
}


};

export default LoginForm;