import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../Logo'

function Footer() {
  return (
    <section className="px-3 pb-4 pt-6 sm:px-5 sm:pt-8">
            <div className="glass-panel rounded-[36px]">
                <div className="mx-auto max-w-7xl px-5 py-7 sm:px-7 sm:py-8">
                <div className="grid gap-4 lg:grid-cols-[minmax(0,1.25fr)_repeat(3,minmax(0,1fr))]">
                    <div className="p-1 sm:p-3">
                        <div className="flex h-full flex-col">
                            <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                                <div className="inline-flex w-20 items-center sm:w-32">
                                    <Logo width="100%" />
                                </div>
                                <p className="max-w-xs text-base leading-8 text-slate-200">
                                    A calm publishing space for drafting ideas, shaping essays, and keeping your writing collection easy to manage.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="p-1 sm:p-3">
                        <div className="h-full">
                            <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
                                Company
                            </h3>
                            <ul className="space-y-2">
                                <li>
                                    <Link
                                        className="text-base font-medium leading-8 text-slate-200 transition hover:text-[#ff9ea7]"
                                        to="/"
                                    >
                                        Features
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className="text-base font-medium leading-8 text-slate-200 transition hover:text-[#ff9ea7]"
                                        to="/"
                                    >
                                        Pricing
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className="text-base font-medium leading-8 text-slate-200 transition hover:text-[#ff9ea7]"
                                        to="/"
                                    >
                                        Affiliate Program
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className="text-base font-medium leading-8 text-slate-200 transition hover:text-[#ff9ea7]"
                                        to="/"
                                    >
                                        Press Kit
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="p-1 sm:p-3">
                        <div className="h-full">
                            <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
                                Support
                            </h3>
                            <ul className="space-y-2">
                                <li>
                                    <Link
                                        className="text-base font-medium leading-8 text-slate-200 transition hover:text-[#ff9ea7]"
                                        to="/"
                                    >
                                        Account
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className="text-base font-medium leading-8 text-slate-200 transition hover:text-[#ff9ea7]"
                                        to="/"
                                    >
                                        Help
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className="text-base font-medium leading-8 text-slate-200 transition hover:text-[#ff9ea7]"
                                        to="/"
                                    >
                                        Contact Us
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className="text-base font-medium leading-8 text-slate-200 transition hover:text-[#ff9ea7]"
                                        to="/"
                                    >
                                        Customer Support
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="p-1 sm:p-3">
                        <div className="h-full">
                            <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
                                Legals
                            </h3>
                            <ul className="space-y-2">
                                <li>
                                    <Link
                                        className="text-base font-medium leading-8 text-slate-200 transition hover:text-[#ff9ea7]"
                                        to="/"
                                    >
                                        Terms &amp; Conditions
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className="text-base font-medium leading-8 text-slate-200 transition hover:text-[#ff9ea7]"
                                        to="/"
                                    >
                                        Privacy Policy
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className="text-base font-medium leading-8 text-slate-200 transition hover:text-[#ff9ea7]"
                                        to="/"
                                    >
                                        Licensing
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="mt-6 border-t border-[color:var(--line)] pt-4">
                    <p className="text-sm text-slate-400">
                        &copy; Copyright 2026. All Rights Reserved by WriteNest.
                    </p>
                </div>
            </div>
            </div>
        </section>
  )
}

export default Footer
