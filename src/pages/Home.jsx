import React, {useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import {PostCard, Container} from '../components'
import service from '../appwrite/config'

function Home() {
    const [posts, setPosts] = useState([])
    const authStatus = useSelector((state) => state.auth.status)

    useEffect(() => {
        service
            .getPosts()
            .then((response) => {
                if (response && response.documents) {
                    setPosts(response.documents)
                } else {
                    setPosts([])
                }
            })
            .catch((error) => {
                console.log("Error fetching posts:", error)
                setPosts([])
            })
    }, [authStatus])

    if(posts.length === 0){
        return (
            <div className='w-full py-4 sm:py-8'>
                <Container>
                    <div className='glass-panel rounded-[36px] px-6 py-10 sm:px-10'>
                        <p className='page-eyebrow'>Your feed</p>
                        <h1 className='page-title mt-5 text-5xl text-slate-100'>No posts yet</h1>
                        <p className='page-copy mt-4 max-w-2xl text-lg'>
                            {authStatus
                                ? 'Once you create your first article, it will show up here as part of your featured collection.'
                                : 'Published posts appear here for everyone. Log in to manage your full writing library and drafts.'}
                        </p>
                    </div>
                </Container>
            </div>
        )
    }
    return (
        <div className='w-full py-4 sm:py-8'>
            <Container>
                <section className='glass-panel rounded-[40px] px-6 py-10 sm:px-10'>
                    <div className='mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between'>
                        <div>
                            <p className='page-eyebrow'>Freshly published</p>
                            <h1 className='page-title mt-4 max-w-3xl text-4xl text-slate-300 sm:text-4xl'>Your writing library, presented with more breathing room.</h1>
                        </div>
                        <p className='page-copy max-w-xl text-base sm:text-lg'>Browse the latest active stories, open a post to edit details, and keep the collection feeling like a curated editorial space.</p>
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

export default Home
