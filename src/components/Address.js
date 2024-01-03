import React, { useEffect, useState } from 'react';
import axios from 'axios';

const host = 'https://provinces.open-api.vn/api/';

const Address = () => {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedWard, setSelectedWard] = useState('');

  useEffect(() => {
    callAPI('https://provinces.open-api.vn/api/?depth=1');
  }, []);

  const callAPI = (api) => {
    axios.get(api)
      .then((response) => {
        setProvinces(response.data);
      })
      .catch((error) => {
        console.error('Error fetching provinces:', error);
      });
  };

  const callApiDistrict = (api) => {
    axios.get(api)
      .then((response) => {
        setDistricts(response.data.districts);
      })
      .catch((error) => {
        console.error('Error fetching districts:', error);
      });
  };

  const callApiWard = (api) => {
    axios.get(api)
      .then((response) => {
        setWards(response.data.wards);
      })
      .catch((error) => {
        console.error('Error fetching wards:', error);
      });
  };

  const renderOptions = (array) => {
    return array.map((element) => (
      <option key={element.code} value={element.code}>{element.name}</option>
    ));
  };

  const handleProvinceChange = (event) => {
    setSelectedProvince(event.target.value);
    callApiDistrict(host + `p/${event.target.value}?depth=2`);
    printResult();
  };

  const handleDistrictChange = (event) => {
    setSelectedDistrict(event.target.value);
    callApiWard(host + `d/${event.target.value}?depth=2`);
    printResult();
  };

  const handleWardChange = (event) => {
    setSelectedWard(event.target.value);
    printResult();
  };

  const printResult = () => {
    let result = '';
    if (selectedDistrict && selectedProvince && selectedWard) {
      result = `${selectedProvince} | ${selectedDistrict} | ${selectedWard}`;
    }
    return result;
  };

  return (
    <div>
      <select id="province" onChange={handleProvinceChange}>
        <option disabled value="">Chọn</option>
        {renderOptions(provinces)}
      </select>
      <select id="district" onChange={handleDistrictChange}>
        <option disabled value="">Chọn</option>
        {renderOptions(districts)}
      </select>
      <select id="ward" onChange={handleWardChange}>
        <option disabled value="">Chọn</option>
        {renderOptions(wards)}
      </select>
      <div id="result">{printResult()}</div>
    </div>
  );
};

export default Address;
