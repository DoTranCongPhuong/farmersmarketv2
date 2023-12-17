import Header from '../components/Header';
import Hero from '../components/Hero';
import ListProduct from '../components/ListProduct';
import Footer from '../components/Footer'
import LeftBar from '../components/LeftBar';
import ProductDiscount from '../components/ProductDiscount';


const ProductsPage = () => {
    return (
        <>
            <Header />
            <Hero />
            <div className='container'>
                <div className='container'>


                    <ListProduct />
                    <ProductDiscount />

                </div>
            </div>
            <Footer />
        </>

    )
};

export default ProductsPage;