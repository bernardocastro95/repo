import React, {useState, useCallback, useEffect} from 'react'
import {FaGithub, FaPlus, FaSpinner, FaBars, FaTrash} from 'react-icons/fa'
import {Container, Form, SubmitButton, List, DeleteButton} from './styles'
import api from '../../services/api'

export default function Main(){

    const[newRepo, setNewRepo] = useState('')
    const[repos, setRepos] = useState([])
    const[loading, setLoading] = useState(false)
    const [alert, setAlert] = useState(null)

    useEffect(()=> {
        const repoStorage = localStorage.getItem('repos')
        if(repoStorage){
            setRepos(JSON.parse(repoStorage))
        }
    }, [])

    useEffect(()=> {
        localStorage.setItem('repos', JSON.stringify(repos))
    }, [repos])

    const handleSubmit = useCallback((e)=>{

        e.preventDefault()

        async function submit(){
            setLoading(true)
            setAlert(null)
            try{

                if(newRepo === ""){
                    throw new Error("Repo must not be blank")
                }
                const res = await api.get(`repos/${newRepo}`)
                const hasRepo = repos.find(repo => repo.name === newRepo)

                if(hasRepo) {
                    throw new Error("This repo already exists")
                }
                const data = {
                    name: res.data.full_name,
                }
                setRepos([...repos, data])
                setNewRepo('')
            }
            catch(err){
                setAlert(true)
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
        setAlert(null)
    }

    const handleDelete = useCallback((repo) => {
        const find = repos.filter(r => r.name !== repo)
        setRepos(find)
    }, [repos])

    return(
        <Container>
            <FaGithub size={25}/>
            <h1>My Repos</h1>

            <Form onSubmit={handleSubmit} error={alert}>
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

            <List>
                {repos.map(repo=> (
                    <li key={repo.name}>
                        <DeleteButton onClick={()=> handleDelete(repo.name)}>
                            <FaTrash size={14}/>
                        </DeleteButton>
                        <span>{repo.name}</span>                        
                            <a href="">
                                <FaBars size={20}/>
                            </a>
                    </li>
                ))}
            </List>
        </Container>
    )
}


