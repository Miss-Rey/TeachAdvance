import React, {useState, useEffect} from 'react'
import { Button, Label, Modal, TextInput } from "flowbite-react";
import axios from 'axios';
import { useSnackbar } from 'notistack';

const InvitationModal = ({openModal, setOpenModal, classes, setClasses}) => {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const endpoint = import.meta.env.VITE_ENDPOINT
    const { enqueueSnackbar } = useSnackbar()

    const handleInvite = async (e) => {
        try{
            e.preventDefault()

            const classCode = classes.map((code) => code.classCode).join(',')
            const className = classes.length > 0 ? classes[0].className : ''
            console.log(classCode, className)
            const response = await axios.post(`${endpoint}/api/studentinvite`, {firstName, lastName, email, classCode: classCode, className: className})
            console.log(response.data)

            if(response.status === 200){
                console.log('Student Invite successfull')
                enqueueSnackbar('Student Invited Successfull', {variant: 'success'})
            }

            setFirstName('')
            setLastName('')
            setEmail('')
        } catch (error){
            console.error(error)
        }
    }
    return (
        <div>
            <Modal show={openModal} size="md" popup onClose={() => setOpenModal(false)}>
                <Modal.Header />
                <Modal.Body>
                    <div className="space-y-6">
                        <h3 className="text-xl font-medium text-gray-900 dark:text-white">Invite Learners</h3>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="firstname" value="firstname" />
                            </div>
                            <TextInput id="text" placeholder="John" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="lastname" value="lastname" />
                            </div>
                            <TextInput id="lastname" placeholder="Doe" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="email" value="email" />
                            </div>
                            <TextInput id="email" placeholder="johndoe@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </div>
                        <div className="w-full">
                            <Button onClick={handleInvite}>Invite</Button>
                        </div>
                        
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default InvitationModal