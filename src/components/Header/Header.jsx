import React, { useEffect, useState } from 'react'
import {Container, Logo, LogoutBtn} from '../index'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'


function Header() {
    const authStatus = useSelector((state)=> state.auth.status)
    const userData = useSelector((state) => state.auth.userData)
    const location = useLocation()
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const profileInitial = (() => {
        const nameParts = (userData?.name || userData?.email || "WriteNest")
            .trim()
            .split(/\s+/)
            .filter(Boolean);

        if (nameParts.length === 1) {
            return nameParts[0].slice(0, 2).toUpperCase();
        }

        return nameParts
            .slice(0, 2)
            .map((part) => part.charAt(0).toUpperCase())
            .join("");
    })();

    const navItems = [
        {
            name: "Home",
            slug: "/",
            active: true
        }, 
        {
            name: "Login",
            slug: "/login",
            active: !authStatus,
        },
        {
            name: "Signup",
            slug: "/signup",
            active: !authStatus,
        },
        {
            name: "All Posts",
            slug: "/all-posts",
            active: authStatus,
        },
        {
            name: "Add Post",
            slug: "/add-post",
            active: authStatus,
        },
    ]

    useEffect(() => {
        setIsMenuOpen(false)
    }, [location.pathname])


    return (
        <header className='sticky top-0 z-30 px-3 pt-3 sm:px-5'>
            <Container>
                <nav className='glass-panel-strong grid gap-4 rounded-[28px] px-3 py-3 sm:px-5 sm:py-4 md:grid-cols-[auto_1fr] md:items-center md:px-7'>
                    <div className='flex items-center justify-between gap-3 sm:flex-row sm:items-center sm:justify-between'>
                        <div className='flex min-w-0 items-center gap-2 sm:gap-4'>
                            <Link to='/'>
                                <Logo width='78px'/>
                            </Link>
                            <div className='page-eyebrow hidden min-w-0 max-w-[8.5rem] px-3 py-2 text-[0.6rem] leading-none md:inline-flex md:max-w-none md:text-[0.68rem]'>
                                <span className='truncate'>Create without limits</span>
                            </div>
                        </div>
                        <button
                            type='button'
                            onClick={() => setIsMenuOpen((prev) => !prev)}
                            className='inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[color:var(--line)] text-sm font-semibold text-slate-100 transition hover:bg-white/10 md:hidden'
                            aria-expanded={isMenuOpen}
                            aria-label='Toggle navigation menu'
                        >
                            <span className='relative flex h-4 w-4 items-center justify-center'>
                                <span
                                    className={`absolute h-0.5 w-4 rounded-full bg-current transition ${isMenuOpen ? 'rotate-45' : '-translate-y-1.5'}`}
                                />
                                <span
                                    className={`absolute h-0.5 w-4 rounded-full bg-current transition ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}
                                />
                                <span
                                    className={`absolute h-0.5 w-4 rounded-full bg-current transition ${isMenuOpen ? '-rotate-45' : 'translate-y-1.5'}`}
                                />
                            </span>
                        </button>
                    </div>
                    <ul className={`${isMenuOpen ? 'flex' : 'hidden'} flex-col gap-2 pt-1 md:flex md:flex-row md:flex-wrap md:items-center md:justify-end md:pt-0`}>
                      {navItems.map((item) =>
                        item.active ? (
                            <li key={item.name}>
                                <NavLink
                                    to={item.slug}
                                    className={({ isActive }) =>
                                        `inline-flex w-full rounded-full px-3 py-2 text-sm font-semibold transition sm:px-4 md:w-auto ${
                                            isActive
                                                ? 'bg-[linear-gradient(135deg,#741a27,#23080d)] text-white shadow-md ring-1 ring-white/10'
                                                : 'text-slate-300 hover:bg-white/10'
                                        }`
                                    }
                                >
                                    {item.name}
                                </NavLink>
                            </li>
                        ) : null 
                      )}
                      
                      {authStatus && (
                        <li className='md:ml-1'>
                            <div className='inline-flex items-center rounded-full border border-[color:var(--line)] bg-white/5 p-2 text-left text-xs text-slate-200'>
                                <span className='inline-flex h-10 w-10 items-center justify-center rounded-full bg-[linear-gradient(135deg,var(--accent),var(--accent-deep))] text-sm font-bold text-white shadow-md'>
                                    {profileInitial}
                                </span>
                            </div>
                        </li>
                      )}

                      {authStatus && (
                        <li>
                            <LogoutBtn />
                        </li>
                      )}
                    </ul>
                </nav>
            </Container>
        </header>
    )
}

export default Header
