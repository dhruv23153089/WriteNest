import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"
import { login as authLogin } from "../store/authSlice"
import { Button, Input } from "./index"
import { useDispatch } from "react-redux"
import authService from '../appwrite/auth.js'
import { useForm } from "react-hook-form"
import AuthShell from './AuthShell'

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm();
    const [error, setError] = useState("");

    const login = async (data) => {
        setError("");
        try {
            const session = await authService.login(data);
            if (session) {
                const userData = await authService.getCurrentUser();
                if (userData) dispatch(authLogin({ userData }));
                navigate("/");
            }
        } catch (error) {
            setError(error.message);
        }
    }

    return (
        <AuthShell
            title="Log in to your account"
            prompt="Don&apos;t have any account?"
            promptLinkText="Sign Up"
            promptLinkTo="/signup"
            error={error}
            badge="Welcome Back"
            sideTitle="A softer workspace for drafting and publishing your writing."
            sideCopy="Sign in to continue managing posts, refining drafts, and keeping your writing organized in one place."
            sideCards={[
                {
                    title: "Return",
                    copy: "Pick up your drafts, published posts, and saved ideas right where you left them.",
                },
                {
                    title: "Manage",
                    copy: "Open your writing hub, refine articles, and keep your publishing flow moving.",
                },
            ]}
            reverseDesktop
            form={
                <form onSubmit={handleSubmit(login)} className="mt-8 space-y-5">
                    <Input
                        label="Email: "
                        placeholder="Enter your email"
                        type="email"
                        {...register("email", {
                            required: true,
                            validate: {
                                matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                "Email address must be a valid address",
                            }
                        })}
                    />
                    <Input
                        label="Password: "
                        placeholder="Enter your password"
                        type="password"
                        {...register("password", { required: true })}
                    />
                    <Button type="submit" className="w-full bg-[linear-gradient(135deg,var(--accent),var(--accent-deep))] text-white">
                        Login
                    </Button>
                </form>
            }
        />
    )
}

export default Login
