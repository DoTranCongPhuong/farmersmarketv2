import Header from '../components/Header';
import HeroNomal from '../components/HeroNomal';
import ListProduct from '../components/ListProduct';
import Footer from '../components/Footer'
import LeftBar from '../components/LeftBar';
import ProductDiscount from '../components/ProductDiscount';


const ProductsPage = () => {
    return (
        <>
            <Header />
            <HeroNomal />
            <div className='container'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-lg-3'>
                            <LeftBar />
                        </div>
                        <div className='col-lg-9'>
                            <ProductDiscount />
                            <ListProduct />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>

    )
};

export default ProductsPage;