import React, { useState, useEffect } from 'react';
import { Modal, Button, TextInput, Label } from 'flowbite-react';
import axios from 'axios';
import { useSnackbar } from 'notistack';

const InvitationModal = ({ openModal, setOpenModal, classCode, className }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const endpoint = import.meta.env.VITE_ENDPOINT;
    // const endpoint = 'https://teachadvance.onrender.com'
    const { enqueueSnackbar } = useSnackbar()
    console.log(className)
    const handleInvite = async () => {
        if (!firstName || !lastName || !email) {
            setErrorMessage('All fields are required.');
            return;
        }

        try {
            const response = await axios.post(`${endpoint}/api/studentinvite`, {
                classCode,
                className,
                firstName,
                lastName,
                email,
            });
            console.log(response)
            enqueueSnackbar('Invitation sent successfully', { variant: 'success' })
            setSuccessMessage('Invitation sent successfully!');
            setFirstName('');
            setLastName('');
            setEmail('');
        } catch (error) {
            setErrorMessage('Failed to send the invitation. Please try again.');
            enqueueSnackbar('Failed to send the invitation. Please try again.', { variant: 'error' })

            console.error(error);
        }
    };

    useEffect(() => {
        // Reset messages and fields when the modal is reopened
        if (openModal) {
            setSuccessMessage('');
            setErrorMessage('');
            setFirstName('');
            setLastName('');
            setEmail('');
        }
    }, [openModal]);

    return (
        <Modal show={openModal} onClose={() => setOpenModal(false)}>
            <Modal.Header>Invite Student</Modal.Header>
            <Modal.Body>
                {successMessage && (
                    <div className="bg-green-100 text-green-800 p-2 mb-4 rounded">
                        {successMessage}
                    </div>
                )}
                {errorMessage && (
                    <div className="bg-red-100 text-red-800 p-2 mb-4 rounded">
                        {errorMessage}
                    </div>
                )}
                <div className="mb-4">
                    <Label htmlFor="firstName" value="First Name" />
                    <TextInput
                        id="firstName"
                        type="text"
                        placeholder="Enter first name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="mb-2"
                    />
                </div>
                <div className="mb-4">
                    <Label htmlFor="lastName" value="Last Name" />
                    <TextInput
                        id="lastName"
                        type="text"
                        placeholder="Enter last name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="mb-2"
                    />
                </div>
                <div className="mb-4">
                    <Label htmlFor="email" value="Email Address" />
                    <TextInput
                        id="email"
                        type="email"
                        placeholder="Enter email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mb-2"
                    />
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleInvite}>Send Invitation</Button>
                <Button color="gray" onClick={() => setOpenModal(false)}>
                    Cancel
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default InvitationModal;
