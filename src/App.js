import React, { useEffect, useState } from 'react';

import sendAsync from './message-control/renderer';

import './App.css';

function App() {
    const [message, setMessage] = useState('SELECT * FROM Users');
    const [response, setResponse] = useState();
    const [user,setUsers] = useState([]);
    // sql = input message
    
 
    
    function send(sql) {
        sendAsync(sql).then((result) => setResponse(result));
    
    }

    const getUser = "Select * from Users";
    
    const fetchData = (query) => {
        sendAsync(query).then((res)=> {setUsers(res)});
    }

 
    useEffect(()=> {
        fetchData(getUser);
        
    },[])
    console.log(user);

    const RenderResult= ()=> {
        return user.map((item,index)=>{
            const {User_id, User_name,User_email} = item;
            return(<div>
                <h3>{User_id}</h3>
                <h4>{User_name}</h4>
                <h5>{User_email}</h5>
            </div>)
        })
       }


    return (
        <div className="App">
            <header className="App-header">
                <h1>
                    Standalone API Management App 
                </h1>
            </header>
            <article>
                <p>
                    Say <i>ping</i> to the main process.
                </p>
                <input
                    type="text"
                    value={message}
                    onChange={(e) => {setMessage(e)
                    }
                }
                />
                <button type="button" onClick={() => send(message)}>
                    Send
                </button>
                <br />
                <p>Main process responses:</p>
                <br />
                <pre>
                    {(response && JSON.stringify(response, null, 2)) ||
                        'No query results yet!'}
                </pre>
            </article>
            <div className='user_container'>
          {RenderResult()}
            </div>
        </div>
    );
}

export default App;
