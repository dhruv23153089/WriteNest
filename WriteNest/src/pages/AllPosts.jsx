import React, {useEffect, useState} from 'react'
import service from '../appwrite/config'
import { PostCard, Container } from '../components'


function AllPosts() {
    const [posts, setPosts] = useState([])
    useEffect(() => {}, [])
    service.getPosts([]).then((posts) => {
        if (posts){
            setPosts(posts.documents)
        }
    })
    return (
        <div className='py-8 w-full'>
            <Container>
                <h1 className='text-3xl font-bold mb-8'>All Posts</h1>
                <div className='flex flex-wrap -m-2'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-1'>
                            <PostCard post={post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default AllPosts
