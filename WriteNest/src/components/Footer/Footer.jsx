import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../Logo'

function Footer() {
  return (
    <section className="px-3 pb-6 pt-10 sm:px-5">
            <div className="glass-panel rounded-[36px]">
                <div className="mx-auto max-w-7xl px-6 py-10 sm:px-8">
                <div className="grid gap-6 lg:grid-cols-[minmax(0,1.25fr)_repeat(3,minmax(0,1fr))]">
                    <div className="p-2 sm:p-4">
                        <div className="flex h-full flex-col justify-between">
                            <div className="mb-8">
                                <div className="mb-5 inline-flex items-center">
                                    <Logo width="156px" />
                                </div>
                                <p className="max-w-sm text-sm leading-7 text-slate-300">
                                    A calm publishing space for drafting ideas, shaping essays, and keeping your writing collection easy to manage.
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-slate-400">
                                    &copy; Copyright 2026. All Rights Reserved by WriteNest.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="p-2 sm:p-4">
                        <div className="h-full">
                            <h3 className="mb-6 text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
                                Company
                            </h3>
                            <ul>
                                <li className="mb-4">
                                    <Link
                                        className="text-base font-medium text-slate-100 transition hover:text-[#ff9ea7]"
                                        to="/"
                                    >
                                        Features
                                    </Link>
                                </li>
                                <li className="mb-4">
                                    <Link
                                        className="text-base font-medium text-slate-100 transition hover:text-[#ff9ea7]"
                                        to="/"
                                    >
                                        Pricing
                                    </Link>
                                </li>
                                <li className="mb-4">
                                    <Link
                                        className="text-base font-medium text-slate-100 transition hover:text-[#ff9ea7]"
                                        to="/"
                                    >
                                        Affiliate Program
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className="text-base font-medium text-slate-100 transition hover:text-[#ff9ea7]"
                                        to="/"
                                    >
                                        Press Kit
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="p-2 sm:p-4">
                        <div className="h-full">
                            <h3 className="mb-6 text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
                                Support
                            </h3>
                            <ul>
                                <li className="mb-4">
                                    <Link
                                        className="text-base font-medium text-slate-100 transition hover:text-[#ff9ea7]"
                                        to="/"
                                    >
                                        Account
                                    </Link>
                                </li>
                                <li className="mb-4">
                                    <Link
                                        className="text-base font-medium text-slate-100 transition hover:text-[#ff9ea7]"
                                        to="/"
                                    >
                                        Help
                                    </Link>
                                </li>
                                <li className="mb-4">
                                    <Link
                                        className="text-base font-medium text-slate-100 transition hover:text-[#ff9ea7]"
                                        to="/"
                                    >
                                        Contact Us
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className="text-base font-medium text-slate-100 transition hover:text-[#ff9ea7]"
                                        to="/"
                                    >
                                        Customer Support
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="p-2 sm:p-4">
                        <div className="h-full">
                            <h3 className="mb-6 text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
                                Legals
                            </h3>
                            <ul>
                                <li className="mb-4">
                                    <Link
                                        className="text-base font-medium text-slate-100 transition hover:text-[#ff9ea7]"
                                        to="/"
                                    >
                                        Terms &amp; Conditions
                                    </Link>
                                </li>
                                <li className="mb-4">
                                    <Link
                                        className="text-base font-medium text-slate-100 transition hover:text-[#ff9ea7]"
                                        to="/"
                                    >
                                        Privacy Policy
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className="text-base font-medium text-slate-100 transition hover:text-[#ff9ea7]"
                                        to="/"
                                    >
                                        Licensing
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </section>
  )
}

export default Footer
