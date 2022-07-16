const dotenv = require('dotenv');
const axios = require('axios').default;

dotenv.config();

const findAddress = (array, inputData) => {
  const item = array.find(item => item.id == inputData);
  return item;
};

exports.getAddress = async (req, res, next) => {
  try {
    const { id } = req.body;
    let address;
    let subDistrict;
    let province;
    let urbanVillage;
    let city;

    if (!id) {
      const error = new Error('Please, address id must be required');
      error.statusCode = 400;
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