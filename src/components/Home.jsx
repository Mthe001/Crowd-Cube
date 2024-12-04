import React from 'react';
import Header from './Header';
import About from './About';
import Navbar from './Navbar';
import Footer from './Footer';
import Service from './Service';
import Contact from './Contact';

const Home = () => {
    return (
        <div>

            <Header />

            <section>
                <About />
            </section>

            <section>
                <Service />
            </section>

            <section>
                <Contact />
            </section>


        </div>
    );
};

export default Home;