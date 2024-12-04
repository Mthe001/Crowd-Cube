import React from 'react';

const Contact = () => {
    return (
        <div className="bg-base-100 py-10 px-5 lg:px-20">
            <div className="text-center mb-10">
                <h1 className="text-4xl font-bold text-primary">Contact Us</h1>
                <p className="text-lg text-gray-500 mt-4">
                    We're here to help! Fill out the form below to reach us.
                </p>
            </div>

            <div className="flex flex-col lg:flex-row justify-center items-center gap-10">
                {/* Contact Information */}
                <div className="flex flex-col items-center bg-primary text-white rounded-lg p-8 w-full lg:w-1/3 shadow-md">
                    <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
                    <p className="text-base mb-6">
                        Feel free to drop us a line. We're happy to help and will respond as soon as possible.
                    </p>
                    <div className="flex flex-col gap-4 text-left">
                        <p className="flex items-center gap-2">
                            <span className="font-semibold">Phone:</span> +1 234 567 890
                        </p>
                        <p className="flex items-center gap-2">
                            <span className="font-semibold">Email:</span> support@example.com
                        </p>
                        <p className="flex items-center gap-2">
                            <span className="font-semibold">Address:</span> 123, Main Street, New York, USA
                        </p>
                    </div>
                </div>

                {/* Contact Form */}
                <div className="w-full lg:w-2/3 bg-white rounded-lg shadow-md p-8">
                    <form className="space-y-6">
                        <div className="flex flex-col lg:flex-row gap-4">
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text font-medium">Name</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter your name"
                                    className="input input-bordered w-full"
                                />
                            </div>
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text font-medium">Email</span>
                                </label>
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="input input-bordered w-full"
                                />
                            </div>
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-medium">Subject</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Subject of your message"
                                className="input input-bordered w-full"
                            />
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-medium">Message</span>
                            </label>
                            <textarea
                                className="textarea textarea-bordered w-full"
                                placeholder="Write your message here..."
                                rows="5"
                            ></textarea>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary w-full">Send Message</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Contact;
