import React from 'react';
import Swal from 'sweetalert2';

const Contact = () => {
    const handleSubmit = (e) => {
        e.preventDefault();

        Swal.fire({
            title: 'Message Sent!',
            text: 'Thank you for contacting us. We will get back to you soon.',
            icon: 'success',
            confirmButtonText: 'OK',
            timer: 3000,
        });

        e.target.reset();
    };

    return (
        <div id="contact" className="bg-gray-100 dark:bg-zinc-900 rounded-lg py-10 px-5 lg:px-20 my-10">
            <div className="text-center mb-10">
                <h1 className="text-4xl font-bold text-zinc-700 dark:text-gray-300">Contact Us</h1>
                <p className="text-lg dark:text-gray-300 mt-4">
                    We're here to help! Fill out the form below to reach us.
                </p>
            </div>

            <div className="flex flex-col lg:flex-row justify-center items-center gap-10">
                {/* Contact Information */}
                <div className="flex flex-col items-center bg-gray-300 dark:bg-zinc-700 dark:text-white text-black rounded-lg p-8 w-full lg:w-1/3 shadow-md">
                    <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
                    <p className="text-base mb-6">
                        Feel free to drop us a line. We're happy to help and will respond as soon as possible.
                    </p>
                    <div className="flex flex-col gap-4 text-left">
                        <p className="flex items-center gap-2">
                            <span className="font-semibold">Phone:</span> +1 234 567 890
                        </p>
                        <p className="flex items-center gap-2">
                            <span className="font-semibold">Email:</span> support@crudcube.com
                        </p>
                        <p className="flex items-center gap-2">
                            <span className="font-semibold">Address:</span> Main Street, USA
                        </p>
                    </div>
                </div>

                {/* Contact Form */}
                <div className="w-full lg:w-2/3 bg-white dark:bg-zinc-800 rounded-lg shadow-md p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="flex flex-col lg:flex-row gap-4">
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text font-medium">Name</span>
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Enter your name"
                                    className="input input-bordered w-full bg-gray-200 dark:bg-zinc-950"
                                />
                            </div>
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text font-medium">Email</span>
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Enter your email"
                                    className="input input-bordered w-full bg-gray-200 dark:bg-zinc-950"
                                />
                            </div>
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-medium">Subject</span>
                            </label>
                            <input
                                type="text"
                                name="subject"
                                placeholder="Subject of your message"
                                className="input input-bordered w-full bg-gray-200 dark:bg-zinc-950"
                            />
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-medium">Message</span>
                            </label>
                            <textarea
                                name="message"
                                className="textarea textarea-bordered w-full bg-gray-200 dark:bg-zinc-950"
                                placeholder="Write your message here..."
                                rows="5"
                            ></textarea>
                        </div>
                        <div className="form-control mt-6">
                            <button type="submit" className="btn btn-primary w-full">
                                Send Message
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Contact;
