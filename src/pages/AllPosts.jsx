import React, {useEffect, useState} from 'react'
import service from '../appwrite/config'
import { PostCard, Container } from '../components'


function AllPosts() {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        service.getPosts([]).then((posts) => {
            if (posts){
                setPosts(posts.documents)
            }
        })
    }, [])

    return (
        <div className='w-full py-4 sm:py-8'>
            <Container>
                <section className='glass-panel rounded-[40px] px-6 py-10 sm:px-10'>
                <div className='mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between'>
                    <div>
                        <p className='page-eyebrow'>Archive view</p>
                        <h1 className='page-title mt-4 text-5xl text-slate-300'>All Posts</h1>
                    </div>
                    <p className='page-copy max-w-xl'>Review every article in your collection, whether active or inactive, from one clean dashboard.</p>
                </div>
                <div className='grid gap-5 md:grid-cols-2 xl:grid-cols-3'>
                    {posts.map((post) => (
                        <div key={post.$id} className='h-full'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
                </section>
            </Container>
        </div>
    )
}

export default AllPosts
