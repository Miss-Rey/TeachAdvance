import { React, useState, useEffect } from 'react'
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom';
import { useSnackbar } from 'notistack';


const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")
  const navigateTo = useNavigate()
  const endpoint = import.meta.env.VITE_ENDPOINT
  // const endpoint = process.env.VITE_ENDPOINT
  // const endpoint = 'https://teachadvance.onrender.com'
  const { enqueueSnackbar } = useSnackbar()

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email === '' && password === '') {
      enqueueSnackbar('Please enter email and password', { variant: 'error' })
    } else if (email === '') {
      enqueueSnackbar('Email required', { variant: 'error' })
    } else if (password === '') {
      enqueueSnackbar('Password required', { variant: 'error' })
    } else {

      try {
        const response = await axios.post(`${endpoint}/api/login`, { email, password })

        if (response.status === 200) {
          const { accessToken, userId } = response.data;
          localStorage.setItem('at', accessToken)
          localStorage.setItem('UID', userId)
          enqueueSnackbar('Login Successful', { variant: 'success' })
          console.log(response.data)


          setEmail('')
          setPassword('')
          navigateTo('/')
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          enqueueSnackbar('Wrong username or password', { variant: 'error' })
        } else {
          console.error('Error logging in', error)
          enqueueSnackbar('Error Logging In', { variant: 'error' })
        }

      }
    }
  }

    return (
      <div className='flex flex-col w-full h-screen items-center gap-20 text-black'>
        <div className='flex px-10 md:px-20 lg:px-20 xl:px-20 2xl:px-20 font-bold text-xl bg-slate-400 w-full  h-16 items-center'>
          <h2>TeachAdvance</h2>
        </div>
        <div>
          <h2 className='font-bold text-xl '>
            TeachAdvance Student Login
          </h2>
        </div>
        <form className="flex w-72 md:w-96 lg:w-96 xl:w-96 2xl:w-96 flex-col gap-4">
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email1" value="Your email" />
            </div>
            <TextInput id="email1" type="email" value={email} placeholder="name@example.com" className='bg-white' onChange={handleEmailChange} required />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password1" value="Your password" />
            </div>
            <TextInput id="password1" type="password" value={password} onChange={handlePasswordChange} required />
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="remember" />
            <Label htmlFor="remember">Remember me</Label>
          </div>
          <Button type="submit" onClick={handleSubmit}>Submit</Button>
          <div className='flex justify-center gap-5 text-sm text-blue-500 cursor-pointer hover:text-blue-800 ease in duration-75'>
            <h2 className='border-r-2 px-7'><Link to={'/register'}>Register</Link></h2>
            <h2>Forgot Password</h2>
          </div>

        </form>

        <div className='hidden md:flex lg:flex xl:flex 2xl:flex w-full h-10 items-center text-sm bg-slate-400 px-10'>
          Copyright © TeachAdvance. All rights reserved
        </div>
      </div>
    )
  }

  export default Login