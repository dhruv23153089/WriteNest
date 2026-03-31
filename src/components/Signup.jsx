import React, {useState} from 'react'
import authService from '../appwrite/auth'
import {Link, useNavigate } from 'react-router-dom'
import { login } from '../store/authSlice'
import {useDispatch} from "react-redux"
import {Button, Input, Logo} from "./index"
import {useForm} from "react-hook-form"

function Signup() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {register, handleSubmit} = useForm();
    const [error, setError] = useState("");

    const create = async (data) => {
        setError("");
        try {
            const userData = await authService.createAccount(data);
            if (userData) {
                const userData = await authService.getCurrentUser();
                if (userData) {dispatch(login({ userData }));}
                navigate("/");
            }
        } catch (error) {
            setError(error.message);
        }
    }


    return (
       <div className="mx-auto grid w-full max-w-5xl gap-8 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="glass-panel mx-auto w-full max-w-xl rounded-[36px] p-6 sm:p-10">
                <div className="mb-6 flex justify-center">
                    <span className="inline-block w-full max-w-[150px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="page-title text-center text-3xl leading-tight text-slate-400 sm:text-4xl">Create your account</h2>
                <p className="mt-3 text-center text-base text-slate-600">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-semibold text-[var(--accent-deep)] transition hover:underline"
                    >
                        Sign In
                    </Link>
                </p>
                {error && <p className="mt-8 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-center text-red-600">{error}</p>}

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
                                    "Email address must be a valid address", }
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
            </div>
            <div className='glass-panel hidden rounded-[36px] p-8 lg:flex lg:flex-col lg:justify-between'>
                <div>
                    <p className='page-eyebrow mb-6'>New here</p>
                    <h1 className='page-title max-w-md text-4xl leading-tight text-slate-400 xl:text-5xl'>Set up your writing hub and publish with less friction.</h1>
                    <p className='page-copy mt-6 max-w-xl text-base sm:text-lg'>
                        Start organizing drafts, uploading featured images, and shaping posts inside a cleaner publishing workflow.
                    </p>
                </div>
                <div className='mt-12 grid gap-4 sm:grid-cols-2'>
                    <div className='rounded-[24px] bg-white/60 p-5'>
                        <p className='text-sm font-semibold uppercase tracking-[0.2em] text-slate-900'>Draft</p>
                        <p className='mt-2 text-lg font-semibold text-slate-700'>Build posts with title, image, and body content.</p>
                    </div>
                    <div className='rounded-[24px] bg-white/60 p-5'>
                        <p className='text-sm font-semibold uppercase tracking-[0.2em] text-slate-900'>Publish</p>
                        <p className='mt-2 text-lg font-semibold text-slate-700'>Manage status, edit details later, and keep your library tidy.</p>
                    </div>
                </div>
            </div> 
        </div>
    )
}

export default Signup
