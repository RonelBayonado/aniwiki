import React, { useState } from "react";
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = () => {
  const [registerModalOpen, setRegisterModalOpen] = useState(false)
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const onSubmit = (data) => {
    axios.post('http://localhost:5000/login', {
      email: data.email,
      password: data.password
    })
    .then(response => {
      localStorage.setItem('token', response.data.token)
    })
    .catch(error => {
      console.log('There was an error logging in: ' + error)
    })
  }

  const onRegisterSubmit = (data) => {
    axios.post('http://localhost:5000/register', {
      username: data.username,
      email: data.email,
      password: data.password
    })
    .then(response => {
      console.log(response.data.token)
    })
    .catch(error => {
      console.log('There was an error logging in: ' + error)
    })
  }

  const registerModal = () => {
    setRegisterModalOpen(true)
  }
 
  return(
    <div className="App">
      <div className="login">
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>
              Email:
          </label>
          <input className="input" type="text" {...register("email", {required: true})} />
          <label>
            Password:
          </label>
          <input className="input" type="password" {...register("password", {required: true})} />
          {errors.exampleRequired && <span>This field is required</span>}

          <input className="submit" type="submit"  />
          <button className="register" onClick={registerModal}>No Account? Register the f up</button>
        </form>
      </div>
      {registerModalOpen && (
        <>
          <div class="modal-overlay"></div>
            <div class="registerModal">
              <form onSubmit={handleSubmit(onRegisterSubmit)}>
                <label>
                    Input Username:
                </label>
                <input className="input" type="text" {...register("username", {required: true})} />
                <label>
                    Input Email:
                </label>
                <input className="input" type="text" {...register("email", {required: true})} />
                <label>
                    Input Password:
                </label>
                <input className="input" type="password" {...register("password", {required: true})} />
                {errors.exampleRequired && <span>This field is required</span>}
                <input className="submit" type="submit" />
              </form>
            </div>            
        </>       
      )}   
    </div>
  )
}

export default LoginPage;