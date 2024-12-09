import { React, useState, useEffect } from 'react'
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
// import Link from "next/link";
import { useNavigate } from 'react-router-dom'
import axios from 'axios';


const Register = () => {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [passwordMatch, setPasswordMatch] = useState(true)
    const [isChecked, setIsChecked] = useState(false)
    const handleFirstnameChange = (e) => {
        setFirstName(e.target.value)
    }

    const handleLastnameChange = (e) => {
        setLastName(e.target.value)
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }

    const handlePhoneChange = (e) => {
        setPhone(e.target.value)
    }
    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value)
    }

    const handleIsChecked = (e) =>{
        setIsChecked(e.target.checked)
    }
    // const endpoint = import.meta.env.VITE_ENDPOINT
    const endpoint = 'https://teachadvance.onrender.com'
    const navigateTo = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()

        const formData = {
            firstName,
            lastName,
            email,
            phone,
            password
        }

        try {
            if (password !== confirmPassword) {
                setPasswordMatch(false)
                console.log('Password does not match')
                return;
            }

            if(!isChecked){
                console.log('Please acceept the terms and conditions')
                return;
            }

            const response = await axios.post(`${endpoint}/api/register`, { firstName, lastName, email, phone, password })
            console.log('Response', response)
            if (response.status === 200) {
                navigateTo('/login')
                console.log("User created successfully")

            }

        } catch (error) {
            console.error(error);
        }
    }
    return (
        <div className='flex flex-col pb-20 w-full h-[700px] items-center gap-10 text-black'>
            <div className='flex px-10 py-5 md:px-20 lg:px-20 xl:px-20 2xl:px-20 font-bold text-xl bg-slate-400 w-full items-center'>
                <h2>TeachAdvance</h2>
            </div>
            <div>
                <h2 className='font-bold text-xl '>
                    TeachAdvance Registration
                </h2>
            </div>
            <form className="flex w-72 md:w-96 lg:w-96 xl:w-96 2xl:w-96 flex-col gap-4 text-black">
                <div className='flex flex-col md:flex-row lg:flex-row xl:flex-row 2xl:flex-row gap-4'>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="firstname" value="Firstname" />
                        </div>
                        <TextInput id="firstname" type="text" placeholder="John" value={firstName} onChange={handleFirstnameChange} required shadow />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="lastname" value="lastname" />
                        </div>
                        <TextInput id="lastname" type="text" placeholder="Doe" value={lastName} onChange={handleLastnameChange} required shadow />
                    </div>
                </div>

                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="email2" value="Your email" />
                    </div>
                    <TextInput id="email2" type="email" placeholder="name@example.com" value={email} onChange={handleEmailChange} required shadow />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="phone" value="Phone Number" />
                    </div>
                    <TextInput id="phone" type="tel" placeholder="0712345678" value={phone} onChange={handlePhoneChange} required shadow />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="password2" value="Your password" />
                    </div>
                    <TextInput id="password2" type="password" value={password} onChange={handlePasswordChange} required shadow />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="confirmpassword" value="Confirm password" />
                    </div>
                    <TextInput id="confirmpassword" type="password" value={confirmPassword} onChange={handleConfirmPasswordChange} required shadow />
                </div>
                <div className="flex items-center gap-2">

                    <Checkbox id="agree" onChange={handleIsChecked} checked={isChecked}/>
                    <Label htmlFor="agree" className="flex">
                        I agree with the&nbsp;
                        <a href="#" className="text-cyan-600 hover:underline dark:text-cyan-500">
                            terms and conditions
                        </a>
                    </Label>
                </div>
                <Button type="submit" onClick={handleSubmit}>Register new account</Button>
            </form>
            <div className='hidden md:flex lg:flex xl:flex 2xl:flex w-full h-10 items-center text-sm bg-slate-400 px-10'>
                Copyright © TeachAdvance. All rights reserved
            </div>
        </div>
    )
}

export default Register