import React from "react";
import TopNav from "../components/Navbar";
import FooterContainer from "../components/Footer";

const ContactUs = () => {
    return (
        <>
            <TopNav />
            <div className="bg-gray-100 min-h-screen flex flex-col">
                <header className="bg-blue-600 text-white py-6 shadow-md">
                    <div className="container mx-auto px-4 text-center">
                        <h1 className="text-3xl font-bold">Contact Us</h1>
                        <p className="mt-2">We'd love to hear from you! Reach out to us anytime.</p>
                    </div>
                </header>

                <main className="flex-grow">
                    <div className="container mx-auto px-4 py-8">
                        <div className="grid md:grid-cols-2 gap-8">
                            <div>
                                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Get in Touch</h2>
                                <p className="text-gray-600 mb-6">
                                    Have questions or need more information about TeachAdvance? Feel free to contact us, and our team will
                                    get back to you as soon as possible.
                                </p>
                                <ul className="text-gray-600 space-y-4">
                                    <li>
                                        <strong>Email:</strong> <a href="mailto:support@teachadvance.com" className="text-blue-600">teachadvance@outlook.com</a>
                                    </li>
                                    <li>
                                        <strong>Phone:</strong> +254 790330329
                                    </li>
                                    <li>
                                        <strong>Address:</strong> Nakuru City, Kenya
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Send Us a Message</h2>
                                <form className="space-y-4">
                                    <div>
                                        <label htmlFor="name" className="block text-gray-700 font-medium">Name</label>
                                        <input
                                            type="text"
                                            id="name"
                                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="Your Name"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-gray-700 font-medium">Email</label>
                                        <input
                                            type="email"
                                            id="email"
                                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="Your Email"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="message" className="block text-gray-700 font-medium">Message</label>
                                        <textarea
                                            id="message"
                                            rows="5"
                                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="Your Message"
                                        ></textarea>
                                    </div>
                                    <button
                                        type="submit"
                                        className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
                                    >
                                        Submit
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </main>


            </div>
            <FooterContainer />
        </>

    );
};

export default ContactUs;
