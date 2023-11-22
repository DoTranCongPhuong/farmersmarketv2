import Header from '../components/Header';
import Hero from '../components/Hero';
import Categories from '../components/Categories';
import FeaturedItems from '../components/FeaturedProduct'
import Banner from '../components/Bannner'
import Footer from '../components/Footer'


const HomePage = () => {
    return (
        <>
            <Header />
            <Hero />
            <Categories />
            <FeaturedItems/>
            <Banner/>
            <Footer/>
        </>

    )
};

export default HomePage;