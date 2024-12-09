import { React, useState, useEffect } from 'react'
import { Button, Label, TextInput, } from 'flowbite-react'
import axios from 'axios'
import { useSnackbar } from 'notistack';
import TopNav from '../components/Navbar';
import AdminDrawer from '../components/AdminDrawer'
import FooterContainer from '../components/Footer';

const AddAdmin = () => {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    // const endpoint = import.meta.env.VITE_ENDPOINT
    const endpoint = 'https://teachadvance.onrender.com'
    const { enqueueSnackbar } = useSnackbar()

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = {
            firstName, lastName, email, phone, password
        }

        try {
            const response = await axios.post(`${endpoint}/api/adminsignup`, { firstName, lastName, email, phone, password })
            console.log(response.data)

            if (response.status === 200) {
                console.log("Admin added successfully")
                enqueueSnackbar('Admin added successfully', { variant: 'success' })
            }

            setFirstName('')
            setLastName('')
            setEmail('')
            setPassword('')
            setPhone('')
            setLoading(true)
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    if (loading) return <div>Loading...</div>
    return (
        <div>
            <TopNav />
            <AdminDrawer />
            <h2 className='text-2xl font-semibold px-7 py-5'>Add Administrator</h2>
            <form className="flex max-w-md flex-col gap-4 mx-10">
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="firstName" value="FirstName" />
                    </div>
                    <TextInput id="firstName" type="text" placeholder="John" value={firstName} onChange={handleFirstnameChange} required shadow />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="lastName" value="LastName" />
                    </div>
                    <TextInput id="lastName" type="text" placeholder="Doe" value={lastName} onChange={handleLastnameChange} required shadow />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="email" value='Email' />
                    </div>
                    <TextInput id="email" type="eamil" placeholder="johndoe@example.com" value={email} onChange={handleEmailChange} required shadow />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="phone" value='Phone Number' />
                    </div>
                    <TextInput id="phone" type="tel" placeholder="0712345678" value={phone} onChange={handlePhoneChange} required shadow />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="password2" value="Your password" />
                    </div>
                    <TextInput id="password2" type="password" value={password} onChange={handlePasswordChange} required shadow />
                </div>
                <Button onClick={handleSubmit} type="submit">Add Administrator</Button>
            </form>
            <FooterContainer />
        </div>
    )
}

export default AddAdmin