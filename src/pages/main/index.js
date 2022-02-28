import React, {useState, useCallback} from 'react'
import {FaGithub, FaPlus, FaSpinner} from 'react-icons/fa'
import {Container, Form, SubmitButton} from './styles'
import api from '../../services/api'

export default function Main(){

    const[newRepo, setNewRepo] = useState('')
    const[repos, setNewRepos] = useState([])
    const[loading, setLoading] = useState(false)

    const handleSubmit = useCallback((e)=>{

        e.preventDefault()

        async function submit(){
            setLoading(true)
            try{
                const res = await api.get(`repos/${newRepo}`)
                const data = {
                    name: res.data.full_name,
                }
                setNewRepos([...repos, data])
                setNewRepo('')
            }
            catch(err){
                console.log(err)
            }
            finally{
                setLoading(false)
            }
        } 
        submit()   
    }, [newRepo, repos])

    function handleInputChange(e){
        setNewRepo(e.target.value)
    }
    return(
        <Container>
            <FaGithub size={25}/>
            <h1>My Repos</h1>

            <Form onSubmit={handleSubmit}>
                <input type="text" 
                placeholder='Add repos'
                value={newRepo}
                onChange={handleInputChange}/>

                <SubmitButton loading={loading ? 1 : 0}>
                    {
                        loading ? (
                            <FaSpinner color= "#FFF" size={14}/>
                        ):(
                            <FaPlus color="#FFF" size={14}/>
                        )
                    }           
                </SubmitButton>
            </Form>
        </Container>
    )
}


