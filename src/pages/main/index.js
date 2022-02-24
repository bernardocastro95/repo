import React from 'react'
import {FaGithub, FaPlus} from 'react-icons/fa'
import {Container, Form, SubmitButton} from './styles'

export default function Main(){
    return(
        <Container>
            <FaGithub size={25}/>
            <h1>My Repos</h1>

            <Form onSubmit={()=>{}}>
                <input type="text" placeholder='Add repos'/>

                <SubmitButton>
                    <FaPlus color="#FFF" size={14}/>
                </SubmitButton>
            </Form>
        </Container>
    )
}