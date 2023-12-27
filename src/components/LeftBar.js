import React, { useState } from 'react';
import { Dropdown, Input, Button, Segment } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import { useTranslation } from 'react-i18next';



const FilterComponent = ({ handlePriceFilter, handleRatingFilter }) => {
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [ratingValue, setRatingValue] = useState('');
    const [error, setError] = useState('');
    const { t } = useTranslation();


    const ratingOptions = [
        { key: 'all', text: 'All Ratings', value: '' },
        { key: '1', text: '1 Star', value: '1' },
        { key: '2', text: '2 Stars', value: '2' },
        { key: '3', text: '3 Stars', value: '3' },
        { key: '4', text: '4 Stars', value: '4' },
        { key: '5', text: '5 Stars', value: '5' },
    ];

    const handleRatingChange = (e, { value }) => {
        setRatingValue(value);
    };

    const handleMinPriceChange = (e) => {
        const { value } = e.target;
        setMinPrice(value); // Update the state with the new value
    };

    const handleMaxPriceChange = (e) => {
        const { value } = e.target;
        setMaxPrice(value); // Update the state with the new value
    };

    const handleFilter = () => {
        if (parseFloat(minPrice) > parseFloat(maxPrice)) {
            setError('Minimum price must be less than or equal to maximum price.');
            return;
        }

        const priceFilter = {
            min: minPrice,
            max: maxPrice,
        };
        handlePriceFilter(priceFilter);
        handleRatingFilter(ratingValue);

    };

    return (
        <Segment>
            <h1>{t('Filter')}</h1>
            <Input
                className='m-3'
                placeholder={t('Minimum Price')}
                title={t('Minimum Price')}
                value={minPrice}
                onChange={handleMinPriceChange}
                type='number'
                step='0.1'
                min='0'
            />
            <Input
                className='m-3'
                placeholder={t('Maximum Price')}
                title={t('Maximum Price')}
                value={maxPrice}
                onChange={handleMaxPriceChange}
                type='number'
                step='0.1'
                min='0'
            />

            {error && <p style={{ color: 'red' }}>{error}</p>}
            <Button onClick={handleFilter} className='m-3'>
                {t('Filter')}
            </Button>
        </Segment>
    );
};

export default FilterComponent;
