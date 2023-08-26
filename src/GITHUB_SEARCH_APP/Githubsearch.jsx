import React, { useState, useEffect } from 'react';
import "./style.css";
import axios from "axios";

function Githubsearch(){
    const [gitUser, setGitUser] = useState("");
    const [user, setUser] = useState("");
    const [repos, setRepos] = useState([]);

    const ShowGitdata = async () => {
        await axios.get(`https://api.github.com/users/${gitUser}`)
            .then((res) => {
                // console.log(res.data);
                setUser(res.data);
                setGitUser(""); 
            })
            .catch((err) => console.log("error"));
    }

    useEffect(() => {
        ShowGitdata();
        if (user !== "") { 
            axios.get(`https://api.github.com/users/${user.login}/repos?per_page=10&sort=created:desc`)
                .then((res) => {
                    console.log(res.data);
                    setRepos(res.data);
                })
                .catch((err) => console.log("error"));
        }
    }, [user]);
    
    return (
        <div className='container'>
            <h1 id='heading'>Github Search Application</h1>
            <div className='container2'>
                <div className='searchdiv'>
                    <input type="text" id='searchbox' value={gitUser} onChange={e => setGitUser(e.target.value)} />
                    <button className='btn1' onClick={ShowGitdata}>Search</button>
                </div>

                {user !== "" && ( 
                    <div>
                        <div className='main'>
                            <div className='main1'>
                                <img src={user.avatar_url} alt="" className='avatar' />
                                <a href={`https://github.com/${user.login}`} target="_blank" rel="noreferrer">@{user.login}</a>
                            </div>
                            <div className='main2'>
                                <h2>{user.name}</h2>
                                <p>{user.bio}</p>
                                <br />
                                <p>Location: {user.location}</p>
                            </div>
                        </div>
                        <div className='datas'>
                            <h4>{user.followers} <br /> followers</h4>
                            <h4 >{user.public_repos} <br /> repos</h4>
                            <h4>{user.following} <br /> following</h4>
                        </div>
                        <div>
                            <h3>Recent Repositories:</h3>
                            <ol type="1">
                                {repos.map(repo => (
                                    <li>
                                        <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                                            {repo.name}
                                        </a>
                                    </li>
                                ))}
                            </ol>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Githubsearch;