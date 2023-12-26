import Hero from '../components/Hero';
import ListProduct from '../components/ListProduct';
import ProductDiscount from '../components/ProductDiscount';


const ProductsPage = () => {
    return (
        <>
            <Hero />
            <div className='container'>
                <div className='container'>
                    <ListProduct />
                    <ProductDiscount />
                </div>
            </div>
        </>

    )
};

export default ProductsPage;