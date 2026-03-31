import React, {useState}from 'react'
import {Link, useNavigate} from "react-router-dom"
import {login as authLogin} from "../store/authSlice"
import {Button, Input, Logo} from "./index"
import {useDispatch} from "react-redux"
import authService  from '../appwrite/auth.js'
import {useForm} from "react-hook-form"

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {register, handleSubmit} = useForm();
    const [error, setError] = useState("");

    const login = async (data) => {
        setError("");
        try {
            const session = await authService.login(data);
            if(session){
                const userData = await authService.getCurrentUser();
                if (userData) dispatch(authLogin({ userData }));
                navigate("/");
            }
        } catch (error) {
            setError(error.message);
        }
    }
    return (
        <div className='py-6 sm:py-8'>
        <div className='mx-auto grid w-full max-w-5xl gap-8 lg:grid-cols-[1.05fr_0.95fr]'>
            <div className='glass-panel hidden rounded-[36px] p-8 lg:flex lg:flex-col lg:justify-between'>
                <div>
                    <p className='page-eyebrow mb-6'>Welcome Back</p>
                    <h1 className='page-title max-w-md text-4xl leading-tight text-slate-400 xl:text-5xl'>A softer workspace for drafting and publishing your writing.</h1>
                    <p className='page-copy mt-6 max-w-xl text-base sm:text-lg'>
                        Sign in to continue managing posts, refining drafts, and keeping your writing organized in one place.
                    </p>
                </div>
                <div className='mt-12 rounded-[28px] bg-[linear-gradient(135deg,rgba(209,100,63,0.18),rgba(30,107,111,0.18))] p-6'>
                    <p className='text-sm font-semibold uppercase tracking-[0.22em] text-slate-400'>Inside WriteNest</p>
                    <p className='mt-3 text-base leading-7 text-slate-500'>Create posts, revisit old ideas, and keep your publishing flow steady without leaving the same dashboard.</p>
                </div>
            </div>
            <div className='glass-panel mx-auto w-full max-w-xl rounded-[36px] p-6 sm:p-10'>
                <div className="mb-6 flex justify-center">
                    <span className="inline-block w-full max-w-[150px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="page-title text-center text-3xl leading-tight text-slate-400 sm:text-4xl">Sign in to your account</h2>
                <p className="mt-3 text-center text-base text-slate-600">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-semibold text-[var(--accent-deep)] transition hover:underline"
                    >
                        Sign Up
                    </Link>
                </p>
                {error && <p className="mt-8 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-center text-red-600">{error}</p>}
                <form onSubmit={handleSubmit(login)} className="mt-8">
                    <div className="space-y-5">
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
                            {...register("password", {required: true})}
                        />
                        <Button type="submit" className="w-full bg-[linear-gradient(135deg,var(--accent),var(--accent-deep))] text-white">
                            Login
                        </Button>
                    </div>
                </form>
            </div>
        </div>
        </div>
    )
}

export default Login
