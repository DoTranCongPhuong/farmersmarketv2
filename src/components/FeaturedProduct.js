import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const FeaturedItems = () => {
    // Sample data object (you can replace this with your actual data)
    const featuredItems = [
        {
            category: 'oranges fresh-meat',
            image: 'img/featured/feature-1.jpg',
            name: 'Crab Pool Security',
            price: '$30.00'
        },
        {
            category: 'vegetables fastfood',
            image: 'img/featured/feature-2.jpg',
            name: 'Another Product Name',
            price: '$25.00'
        },
        {
            category: 'vegetables fresh-meat',
            image: 'img/featured/feature-3.jpg',
            name: 'Featured Veggie Item',
            price: '$20.00'
        },
        {
            category: 'fastfood oranges',
            image: 'img/featured/feature-4.jpg',
            name: 'Orange Delight',
            price: '$22.00'
        },
        {
            category: 'fresh-meat vegetables',
            image: 'img/featured/feature-5.jpg',
            name: 'Meaty Delicacy',
            price: '$28.00'
        },
        {
            category: 'oranges fastfood',
            image: 'img/featured/feature-6.jpg',
            name: 'Fastfood Frenzy',
            price: '$18.00'
        },
        {
            category: 'fresh-meat vegetables',
            image: 'img/featured/feature-7.jpg',
            name: 'Veggie Delight',
            price: '$24.00'
        },
        {
            category: 'fastfood vegetables',
            image: 'img/featured/feature-8.jpg',
            name: 'Tasty Treat',
            price: '$26.00'
        }
    ];
    const [filter, setFilter] = useState('*'); // Initial filter state, '*' means showing all items

    const handleFilter = (filterType) => {
        setFilter(filterType); // Update the filter state based on the selected filter type
    };
    const filteredItems = filter === '*' ? featuredItems : featuredItems.filter(item => item.category.includes(filter));

    return (
        <section className="featured spad">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="section-title">
                            <h2>Featured Product</h2>
                        </div>
                        <div className="featured__controls">
                            <ul>
                                <li className={filter === '*' ? 'active' : ''} onClick={() => handleFilter('*')} data-filter="*">All</li>
                                <li className={filter === 'oranges' ? 'active' : ''} onClick={() => handleFilter('oranges')} data-filter=".oranges">Oranges</li>
                                <li className={filter === 'fresh-meat' ? 'active' : ''} onClick={() => handleFilter('fresh-meat')} data-filter=".fresh-meat">Fresh Meat</li>
                                <li className={filter === 'vegetables' ? 'active' : ''} onClick={() => handleFilter('vegetables')} data-filter=".vegetables">Vegetables</li>
                                <li className={filter === 'fastfood' ? 'active' : ''} onClick={() => handleFilter('fastfood')} data-filter=".fastfood">Fastfood</li>
                            </ul>
                        </div>
                    </div>
                    <div className="row featured__filter">
                        {filteredItems.map((item, index) => (
                            <div key={index} className={`col-lg-3 col-md-4 col-sm-6 mix ${item.category}`}>
                                <div className="featured__item">
                                    <div className="featured__item__pic set-bg" style={{ backgroundImage: `url(${item.image})` }}>
                                        <ul className="featured__item__pic__hover">
                                            <li><a href="#"><i className="fa fa-heart"></i></a></li>
                                            {/* <li><a href="#"><i className="fa fa-retweet"></i></a></li> */}
                                            <li><a href="#"><i className="fa fa-shopping-cart"></i></a></li>
                                        </ul>
                                    </div>
                                    <div className="featured__item__text">
                                        <h6><Link to="/product-detail">{item.name}</Link></h6>
                                        <h5>{item.price}</h5>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default FeaturedItems;
