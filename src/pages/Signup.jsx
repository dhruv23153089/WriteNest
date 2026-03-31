import React from 'react'
import {Container, Signup as SignupComponent} from '../components'

function Signup() {
    return (
        <div className='py-6 pb-24 sm:py-8 sm:pb-8'>
            <Container>
                <SignupComponent />
            </Container>
        </div>
    )
}

export default Signup
