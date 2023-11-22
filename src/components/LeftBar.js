import React from 'react';

const LeftBar = () => {
    const priceRangeData = {
        min: 10,
        max: 540
    };

    const colorsData = ['White', 'Gray', 'Red', 'Black', 'Blue', 'Green'];

    const popularSizesData = ['Large', 'Medium', 'Small', 'Tiny'];

    return (
        <div >
               {/* <div className="col-lg-3 col-md-5"></div> */}
            <div className="sidebar">
                <div className="sidebar__item">
                    <h4>Price</h4>

                    <div className="price-range-wrap">
                        <div
                            className="price-range ui-slider ui-corner-all ui-slider-horizontal ui-widget ui-widget-content"
                            data-min={priceRangeData.min}
                            data-max={priceRangeData.max}
                        >
                            <div className="ui-slider-range ui-corner-all ui-widget-header"></div>
                            <span
                                tabIndex="0"
                                className="ui-slider-handle ui-corner-all ui-state-default"
                            ></span>
                            <span
                                tabIndex="0"
                                className="ui-slider-handle ui-corner-all ui-state-default"
                            ></span>
                        </div>
                        <div className="range-slider">
                            <div className="price-input">
                                <input type="text" id="minamount" />
                                <input type="text" id="maxamount" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="sidebar__item sidebar__item__color--option">
                    <h4>Colors</h4>
                    {colorsData.map((color, index) => (
                        <div key={index} className={`sidebar__item__color sidebar__item__color--${color.toLowerCase()}`}>
                            <label htmlFor={color.toLowerCase()}>
                                {color}
                                <input type="radio" id={color.toLowerCase()} />
                            </label>
                        </div>
                    ))}
                </div>
                <div className="sidebar__item">
                    <h4>Popular Size</h4>
                    {popularSizesData.map((size, index) => (
                        <div key={index} className="sidebar__item__size">
                            <label htmlFor={size.toLowerCase()}>
                                {size}
                                <input type="radio" id={size.toLowerCase()} />
                            </label>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default LeftBar;
