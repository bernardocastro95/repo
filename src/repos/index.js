import React from 'react'

export default function Repos({match}){
    return(
        <h1 style={{color:'#FFF'}}>
            Repos
            {decodeURIComponent(match.params.repo)}
        </h1>
    )
}