import React, { useEffect, useContext, useState } from 'react';
import LoginForm from './components/LoginForm';
import Calculator from './components/Calculator';
import {Context} from "./index";
import {observer} from "mobx-react-lite";
import {IUser} from "./models/IUser";
import UserService from './services/UserService';

import './loginForm.css';


function App() {
  const {store} = useContext(Context);
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() =>{
    if(localStorage.getItem('token')){
      store.checkAuth()
    }
  }, [])

  async function getUsers() {
    try {
      const response = await UserService.fetchUsers();
      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  if(store.isLoading){ 
    return <div>Loading...</div>
  }

  if(!store.isAuth){
    return (
      <div className="App">
        <div className="container">
          <LoginForm/>
        </div>
      </div>
    );
  }
  
  return (
    <div className="App">
      <h1>{store.isAuth ? `You are authorized as: ${store.user.email}` : 'Not Authorized'}</h1>
      <Calculator/>
      <button onClick={()=> store.logout()}>logout</button>
        <button onClick={getUsers} >Get users list</button>
        <div className="userData">
        {users.map(user=>
       <div className='usersEmail' key={user.email}>{user.email}</div> 
      )}
        </div>

    </div>
  );
}

export default observer(App);
