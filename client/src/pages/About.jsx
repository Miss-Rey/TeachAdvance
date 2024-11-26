import React from "react";
import TopNav from "../components/Navbar";
import FooterContainer from "../components/Footer";
import { Link } from "react-router-dom";

const About = () => {
    return (
        <>
            <TopNav />
            <div className="bg-gray-100 min-h-screen">
                <header className="bg-slate-300 text-white py-6">
                    <div className="container mx-auto px-4">
                        <h1 className="text-3xl font-bold text">About Us</h1>
                    </div>
                </header>

                {/* Main Content */}
                <main className="container mx-auto px-4 py-10">
                    {/* Introduction Section */}
                    <section className="mb-8 text-center">
                        <h2 className="text-2xl font-bold text-blue-600">Welcome to TeachAdvance</h2>
                        <p className="mt-4 text-gray-700 text-lg">
                            At TeachAdvance, we strive to provide a world-class education that inspires and empowers learners to achieve
                            their dreams.
                        </p>
                    </section>

                    {/* Educational Offerings */}
                    <section className="bg-white p-8 rounded-lg shadow-lg">
                        <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">Our Educational Offerings</h3>
                        <div className="grid gap-6 md:grid-cols-2">
                            {/* Offering 1 */}
                            <div className="p-6 bg-blue-50 rounded-lg shadow-sm">
                                <h4 className="text-lg font-bold text-blue-600">Foundational Learning</h4>
                                <p className="mt-2 text-gray-600">
                                    Build a strong academic foundation with courses in essential subjects like mathematics, science, and
                                    languages.
                                </p>
                            </div>

                            {/* Offering 2 */}
                            <div className="p-6 bg-blue-50 rounded-lg shadow-sm">
                                <h4 className="text-lg font-bold text-blue-600">Professional Development Courses</h4>
                                <p className="mt-2 text-gray-600">
                                    Advance your career with industry-relevant courses in business, technology, and communication.
                                </p>
                            </div>

                            {/* Offering 3 */}
                            <div className="p-6 bg-blue-50 rounded-lg shadow-sm">
                                <h4 className="text-lg font-bold text-blue-600">Skills-Based Training</h4>
                                <p className="mt-2 text-gray-600">
                                    Gain practical skills through hands-on training in areas like digital literacy, coding, and
                                    entrepreneurship.
                                </p>
                            </div>

                            {/* Offering 4 */}
                            <div className="p-6 bg-blue-50 rounded-lg shadow-sm">
                                <h4 className="text-lg font-bold text-blue-600">Customized Learning Paths</h4>
                                <p className="mt-2 text-gray-600">
                                    Tailored courses designed to suit the unique needs of individual learners, from students to professionals.
                                </p>
                            </div>
                        </div>
                    </section>
                </main>

                {/* Call-to-Action Section */}
                <footer className="bg-blue-200 text-white py-8 text-center">
                    <h4 className="text-xl font-bold">Join Us Today</h4>
                    <p className="mt-2 text-lg">
                        Discover your potential and redefine your future with TeachAdvance. Together, let’s advance education to
                        empower learners everywhere.
                    </p>
                    <button className="mt-4 px-6 py-2 bg-white text-blue-600 font-bold rounded-lg shadow-md hover:bg-gray-200">
                        <Link to={'/courses'}>Explore Our Courses</Link>
                    </button>
                </footer>
            </div>
            <FooterContainer />
        </>

    );
};

export default About;
