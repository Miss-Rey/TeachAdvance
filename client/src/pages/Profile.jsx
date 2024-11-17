import { React, useState, useEffect } from 'react';
import TopNav from '../components/Navbar';
import { Label, TextInput } from "flowbite-react";
import { useSnackbar } from 'notistack';
import Loading from '../components/Loading';

const Profile = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [user, setUser] = useState(null);
    const [edit, setEdit] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false)
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        phone: ''
    });
    const endpoint = import.meta.env.VITE_ENDPOINT;
    const userId = localStorage.getItem('UID');
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        if (userId) {
            fetchUserData(userId);
            setLoggedIn(true)
        } else {
            setError('Please login');
        }
    }, [userId]);

    const fetchUserData = async (userId) => {
        try {
            const response = await fetch(`${endpoint}/api/profile?userId=${userId}`);
            const data = await response.json();

            if (!response.ok) {
                setError('Error fetching userdata');
                return;
            }

            setUser(data);
            setFormData({
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                phone: data.phone,
            });
            console.log(data); // Debugging
        } catch (error) {
            console.error(error);
            setError("Error fetching data");
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = () => {
        setEdit(true);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch(`${endpoint}/api/profile?userId=${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const result = await response.json();

            if (response.ok) {
                setUser(result.updatedUser); // Make sure this is the correct updated user
                enqueueSnackbar('User details updated successfully', { variant: 'success' });
                setEdit(false); // Return to view mode
            } else {
                enqueueSnackbar(result.message || 'Failed to update user details', { variant: 'error' });
                return
            }

        } catch (error) {
            console.error(error);
            enqueueSnackbar('Error updating user details', { variant: 'error' });
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <Loading />
    if (error) return <div>Error fetching data</div>;

    return (
        <>
            <TopNav />
            <div>
                {!edit ? (
                    <section>
                        <div className='flex justify-between w-1/2 text-xl font-bold mt-20 ml-20'>
                            <span>User Details</span>
                            <span className='text-sm font-semibold rounded-sm bg-blue-500 px-7 py-2 text-white hover:bg-blue-700 ease-in duration-75 cursor-pointer'>
                                <button onClick={handleEdit}>Edit Details</button>
                            </span>
                        </div>
                        <div className='ml-20 px-5 py-10 w-1/2 h-auto'>
                            {user && (
                                <div className="flex max-w-md flex-col gap-4">
                                    <Label htmlFor="disabledInput1">Firstname</Label>
                                    <TextInput type="text" id="disabledInput1" placeholder="Disabled input" value={user.firstname} readOnly />
                                    <Label htmlFor="disabledInput1">Lastname</Label>
                                    <TextInput type="text" id="disabledInput1" placeholder="Disabled input" value={user.lastname} readOnly />
                                    <Label htmlFor="disabledInput2">Email Address</Label>
                                    <TextInput type="text" id="disabledInput2" placeholder="Disabled readonly input" value={user.email} readOnly />
                                    <Label htmlFor="disabledInput2">Phone Number</Label>
                                    <TextInput type="text" id="disabledInput2" placeholder="Disabled readonly input" value={`+245 ${user.phone}`} readOnly />
                                </div>
                            )}
                        </div>
                    </section>
                ) : (
                    <section>
                        <div className='flex justify-between w-1/2 text-xl font-bold mt-20 ml-20'>
                            <span>Edit Details</span>
                        </div>
                        <div className='ml-20 px-5 py-10 w-1/2 h-auto'>
                            {user && (
                                <div className="flex max-w-md flex-col gap-4">
                                    <form onSubmit={handleSubmit}>
                                        <Label htmlFor="firstname">Firstname</Label>
                                        <TextInput
                                            name='firstName'
                                            type="text"
                                            id="firstname"
                                            placeholder="Firstname"
                                            value={formData.firstName}
                                            onChange={handleChange}
                                        />
                                        <Label htmlFor="lastname">Lastname</Label>
                                        <TextInput
                                            name='lastName'
                                            type="text"
                                            id="lastname"
                                            placeholder="Lastname"
                                            value={formData.lastName}
                                            onChange={handleChange}
                                        />
                                        <Label htmlFor="email">Email Address</Label>
                                        <TextInput
                                            name='email'
                                            type="text"
                                            id="email"
                                            placeholder="Email Address"
                                            value={formData.email}
                                            onChange={handleChange}
                                        />
                                        <Label htmlFor="phone">Phone Number</Label>
                                        <TextInput
                                            name='phone'
                                            type="text"
                                            id="phone"
                                            placeholder="Phone Number"
                                            value={formData.phone}
                                            onChange={handleChange}
                                        />
                                        <div className='w-full flex justify-center items-center p-10'>
                                            <input type='submit' value={loading ? 'Updating...' : 'Save'} className='text-sm font-semibold rounded-sm bg-blue-500 px-7 py-2 text-white hover:bg-blue-700 ease-in duration-75 cursor-pointer' />
                                        </div>
                                    </form>
                                </div>
                            )}
                        </div>
                    </section>
                )}
            </div>
        </>
    );
};

export default Profile;
