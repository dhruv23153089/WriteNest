import React, {useEffect, useState} from 'react'
import {PostCard, Container} from '../components'
import service from '../appwrite/config'

function Home() {
    const [posts, setPosts] = useState([])
    useEffect(() => {
        service.getPosts([]).then((posts) => {
            if (posts){
                setPosts(posts.documents)
            }
        })
    }, [])

    if(posts.length === 0){
        return (
            <div className='py-8 w-full'>
                <Container>
                    <h1 className='text-3xl font-bold mb-8'>All Posts</h1>
                    <p>No posts found.</p>
                </Container>
            </div>
        )
    }
    return (
        <div className='py-8 w-full'>
            <Container>
                <div className='flex flex-wrap -m-2'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default Home
