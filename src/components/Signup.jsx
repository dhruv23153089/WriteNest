import React, { useState } from 'react'
import authService from '../appwrite/auth'
import { useNavigate } from 'react-router-dom'
import { login } from '../store/authSlice'
import { useDispatch } from "react-redux"
import { Button, Input } from "./index"
import { useForm } from "react-hook-form"
import AuthShell from './AuthShell'

function Signup() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();
    const [error, setError] = useState("");

    const create = async (data) => {
        setError("");
        try {
            const userData = await authService.createAccount(data);
            if (userData) {
                const userData = await authService.getCurrentUser();
                if (userData) { dispatch(login({ userData })); }
                navigate("/");
            }
        } catch (error) {
            setError(error.message);
        }
    }

    return (
        <AuthShell
            title="Create your account"
            prompt="Already have an account?"
            promptLinkText="Sign In"
            promptLinkTo="/login"
            error={error}
            badge="New here"
            sideTitle="Set up your writing hub and publish with less friction."
            sideCopy="Start organizing drafts, uploading featured images, and shaping posts inside a cleaner publishing workflow."
            sideCards={[
                {
                    title: "Draft",
                    copy: "Build posts with title, image, and body content.",
                },
                {
                    title: "Publish",
                    copy: "Manage status, edit details later, and keep your library tidy.",
                },
            ]}
            form={
                <form onSubmit={handleSubmit(create)} className="mt-8 space-y-5">
                    <Input
                        label="Name: "
                        placeholder="Enter your name"
                        {...register("name", { required: true })}
                    />
                    <Input
                        label="Email: "
                        placeholder="Enter your email"
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
                        type="password"
                        placeholder="Enter your password"
                        {...register("password", { required: true })}
                    />
                    <Button type="submit" className="w-full bg-[linear-gradient(135deg,var(--teal),#25545f)] text-white">
                        Create Account
                    </Button>
                </form>
            }
        />
    )
}

export default Signup
