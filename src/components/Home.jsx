import React from 'react';
import Header from './Header';
import About from './About';
import Navbar from './Navbar';
import Footer from './Footer';

const Home = () => {
    return (
        <div>
            <Navbar />
            <Header />

            <section>
                <About />
            </section>

            <Footer />

        </div>
    );
};

export default Home;