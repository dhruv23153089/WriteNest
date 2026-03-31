import React from 'react'
import {Container, Login as LoginComponent} from '../components'

function Login() {
    return (
        <div className='py-6 pb-24 sm:py-8 sm:pb-8'>
            <Container>
                <LoginComponent />
            </Container>
        </div>
    )
}

export default Login
