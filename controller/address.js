const dotenv = require('dotenv');
const axios = require('axios').default;

const arrayController = require('../utility/getArrayElement.js');

dotenv.config();

exports.getAddress = async (req, res, next) => {
  try {
    const { id } = req.body;
    const findAddress = arrayController.findItem;
    
    let address;
    let subDistrict;
    let province;
    let urbanVillage;
    let city;

    if (!id) {
      const error = new Error('Data not found');
      error.statusCode = 404;
      throw error;
    }

    //* Implementing permission of get single address from logged user
    if (req.userId != '62d298e31a8f114c4497a4f6') {
      const error = new Error('Forbidden to access');
      error.statusCode = 403;
      throw error;
    }

    const allAddress = await axios.get(process.env.ALL_ADDRESS_URL);
    const { address_kecamatan, address_provinsi, address_kelurahan, address_kota } = allAddress.data;

    subDistrict = findAddress(address_kecamatan, id);
    address = subDistrict;
    if (!address) {
      province = findAddress(address_provinsi, id);
      address = province;
    } if (!address) {
      urbanVillage = findAddress(address_kelurahan, id);
      address = urbanVillage;
    } if (!address) {
      city = findAddress(address_kota, id);
      address = city;
    }
    
    //* If address not found from entirely data
    if (!subDistrict && !province && !urbanVillage && !city) {
      const error = new Error('Data not found');
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      status: "success",
      data: address,
    })

  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.getSubDistricts = async (req, res, next) => {
  try {
    const { kota_id } = req.body;

    if (!kota_id) {
      const error = new Error('Data not found');
      error.statusCode = 404;
      throw error;
    }

    //* Implementing permission of get all sub district from logged user
    if (req.userId != '62d25d2ee1756b2409946f8f') {
      const error = new Error('Forbidden to access');
      error.statusCode = 403;
      throw error;
    }

    const allAddress = await axios.get(process.env.ALL_ADDRESS_URL);
    const { address_kecamatan } = allAddress.data;

    const getSubDistricts = arrayController.filterItems(address_kecamatan, kota_id);

    //* If empty or not fount
    if (getSubDistricts.length < 1) {
      const error = new Error('Data not found');
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      status: "success",
      data: getSubDistricts,
    })

  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};