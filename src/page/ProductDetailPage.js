import Header from '../components/Header';
import Hero from '../components/Hero';
import Footer from '../components/Footer'
import ProductDetails from '../components/ProductDetail';
import ProductDiscount from '../components/ProductDiscount';



const ProductDetailPage = () => {
    return (
        <>
            <Header />
            <Hero />
            <ProductDetails />
            <div className='container'>
                <ProductDiscount />
            </div>
            <Footer />
        </>

    )
};

export default ProductDetailPage;