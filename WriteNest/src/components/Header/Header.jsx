import React from 'react'
import {Container, Logo, LogoutBtn} from '../index'
import { Link, NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'


function Header() {
    const authStatus = useSelector((state)=> state.auth.status)
    const userData = useSelector((state) => state.auth.userData)

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


    return (
        <header className='sticky top-0 z-30 px-3 pt-3 sm:px-5'>
            <Container>
                <nav className='glass-panel-strong grid gap-4 rounded-[28px] px-4 py-4 sm:px-5 md:grid-cols-[auto_1fr] md:items-center md:px-7'>
                    <div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
                        <Link to='/'>
                            <Logo width='124px'/>
                        </Link>
                        <div className='page-eyebrow inline-flex w-fit self-start text-[0.68rem] sm:self-auto'>Create without limits</div>
                    </div>
                    <ul className='flex flex-wrap items-center gap-2 md:justify-end'>
                      {navItems.map((item) =>
                        item.active ? (
                            <li key={item.name}>
                                <NavLink
                                    to={item.slug}
                                    className={({ isActive }) =>
                                        `inline-flex rounded-full px-3 py-2 text-sm font-semibold transition sm:px-4 ${
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
                        <li className='ml-auto md:ml-1'>
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
