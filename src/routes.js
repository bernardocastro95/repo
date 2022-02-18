import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Main from './pages/main'
import Repo from './repos'

export default function RouteManager(){
    return(
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element ={<Main/>}/>
                <Route exact path="/repo" element ={<Repo/>}/>
            </Routes>
        </BrowserRouter>
    )
}