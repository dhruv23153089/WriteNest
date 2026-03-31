import React from 'react'
import { Link } from 'react-router-dom'
import Logo from './Logo'

function AuthShell({
    title,
    prompt,
    promptLinkText,
    promptLinkTo,
    error,
    form,
    badge,
    sideTitle,
    sideCopy,
    sideCards,
    reverseDesktop = false,
}) {
    const gridClassName = reverseDesktop
        ? 'mx-auto grid w-full max-w-5xl gap-8 lg:grid-cols-[1.05fr_0.95fr]'
        : 'mx-auto grid w-full max-w-5xl gap-8 lg:grid-cols-[0.95fr_1.05fr]';

    const formCard = (
        <div className="glass-panel mx-auto w-full max-w-xl rounded-[36px] p-6 sm:p-10">
            <div className="mb-6 flex justify-center">
                <span className="inline-block w-full max-w-[150px]">
                    <Logo width="100%" />
                </span>
            </div>
            <h2 className="page-title text-center text-3xl leading-tight text-slate-400 sm:text-4xl">{title}</h2>
            <p className="mt-3 text-center text-base text-slate-600">
                {prompt}&nbsp;
                <Link
                    to={promptLinkTo}
                    className="font-semibold text-[var(--accent-deep)] transition hover:underline"
                >
                    {promptLinkText}
                </Link>
            </p>
            {error && (
                <p className="mt-8 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-center text-red-600">
                    {error}
                </p>
            )}
            {form}
        </div>
    );

    const sidePanel = (
        <div className="glass-panel hidden rounded-[36px] p-8 lg:flex lg:flex-col lg:justify-between">
            <div>
                <p className="page-eyebrow mb-6">{badge}</p>
                <h1 className="page-title max-w-md text-4xl leading-tight text-slate-400 xl:text-5xl">{sideTitle}</h1>
                <p className="page-copy mt-6 max-w-xl text-base sm:text-lg">{sideCopy}</p>
            </div>
            <div className="mt-12 grid gap-4 sm:grid-cols-2">
                {sideCards.map((card) => (
                    <div key={card.title} className="rounded-[24px] bg-white/60 p-5">
                        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-900">{card.title}</p>
                        <p className="mt-2 text-lg font-semibold text-slate-700">{card.copy}</p>
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <div className={gridClassName}>
            {reverseDesktop ? (
                <>
                    {sidePanel}
                    {formCard}
                </>
            ) : (
                <>
                    {formCard}
                    {sidePanel}
                </>
            )}
        </div>
    )
}

export default AuthShell
