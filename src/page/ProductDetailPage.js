import Hero from '../components/Hero';
import ProductDetails from '../components/ProductDetail';
import ProductDiscount from '../components/ProductDiscount';



const ProductDetailPage = () => {
    return (
        <>
            <Hero />
            <ProductDetails />
            <div className='container'>
                <ProductDiscount />
            </div>
        </>

    )
};

export default ProductDetailPage;