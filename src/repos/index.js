import React, {useEffect, useState} from 'react'
import { Container, Owner, Loading, BackButton, IssuesList} from './styles'
import api from '../services/api'
import {FaArrowLeft} from 'react-icons/fa'


export default function Repos({match}){

    const [repo, setRepo] = useState({})
    const [issues, setIssue] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(()=> {
        async function load(){
            const nameRepo = decodeURIComponent(match.params.repo)

            const [repoData, issuesData] = await Promise.all([
                api.get(`/repos/${nameRepo}`),
                api.get(`/repos/${nameRepo}/issues`, {
                    params:{
                        state: 'open',
                        per_page: 5
                    }
                })
            ])
            setRepo(repoData.data)
            setIssue(issuesData.data)
            console.log(issuesData.data)
            setLoading(false)
        }
        load()
    }, [match.params.repo])

    if(loading){
        return(
            <Loading>
                <h1>Loading...</h1>
            </Loading>
        )
    }

    

    return(
        <Container>
            <BackButton to="/">
                <FaArrowLeft color='#fff' size={30}/>
            </BackButton>
            <Owner>
                <img src={repo.owner.avatar_url} 
                alt={repo.owner.login}/>
                <h1>{repo.name}</h1>
                <p>{repo.description}</p>
            </Owner>

            <IssuesList>
                {issues.map(issue => (
                    <li key={String(issue.id)}>
                        <img src={issue.user.avatar_url} alt={issue.user.login}/>

                        <div>
                            <strong>
                                <a href={issue.html_url}>{issue.title}</a>

                                {issues.labels.map(label => {
                                    <span key={label.id}>{label.name}</span>
                                })}
                            </strong>
                            <p>{issue.user.login}</p>
                        </div>
                    </li>
                ))}
            </IssuesList>
            
        </Container>
    )
}