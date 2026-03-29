import React from 'react'
import appwriteService from "../appwrite/config"
import {Link} from "react-router-dom"

function PostCard({$id, title, featuredImage,}) {
    return (
        <Link to={`/post/${$id }`}>
            <article className='glass-panel-strong group h-full overflow-hidden rounded-[28px] p-4 transition duration-300 hover:-translate-y-1'>
                <div className='mb-4 aspect-[16/11] overflow-hidden rounded-[22px] bg-[rgba(30,107,111,0.08)] sm:aspect-[16/10]'>
                    <img
                    src={appwriteService.getFilePreview(featuredImage)}
                    alt={title}
                    className='h-full w-full object-cover transition duration-500 group-hover:scale-105'
                    onError={(event) => {
                        event.currentTarget.onerror = null;
                        event.currentTarget.src = appwriteService.getFileView(featuredImage);
                    }}/>
                </div>
                <div className='space-y-2 px-1 pb-1'>
                    <p className='page-eyebrow'>Featured Story</p>
                    <h2 className='page-title text-xl leading-tight text-slate-100 sm:text-2xl'>{title}</h2>
                    <p className='text-sm leading-7 text-slate-300'>Open the full post to read, edit, or manage the article details.</p>
                </div>
            </article>
        </Link>
    )
}

export default PostCard
