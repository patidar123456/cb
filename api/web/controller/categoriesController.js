const Joi = require('joi');
const mongoose = require('mongoose');
const { formatErrorMessage, toObjectId, saveBase64Image } = require('../../../helper/common');
const { findAllBusinessWithData, findBusinessWithData, findBusiness, addBusiness, updateBusiness } = require('../model/businessModel');
const { findAllFilmIndustryWithData, findFilmIndustryWithData, findFilmIndustry, addFilmIndustry, updateFilmIndustry } = require('../model/filmIndustryModel');
const { findAllSportsWithData, findSportsWithData, findSports, addSports, updateSports } = require('../model/sportsModel');
const { addDetails } = require('../model/detailsModel');

const getAllCategories = async (req, res) => {
  // const qryData = req.query;

  // const { error } = Joi.object({
  //   page: Joi.string().required(),
  //   size: Joi.string().required(),
  //   name: Joi.allow()
  // }).validate(qryData, { abortEarly: false });

  // if (error) {
  //   return res.status(400).json({ status: false, response_code: 400, message: formatErrorMessage(error.details[0].message), data: [] });
  // }

  try {
    if (req.body.type === 'Business') {
      const data = await findAllBusinessWithData({ is_deleted: false }, req.body.page, req.body.size);
      return res.status(200).json({ status: true, response_code: 200, message: `Get Successful`, data: data });
    }
    if (req.body.type === 'Film_Industry') {
      const data = await findAllFilmIndustryWithData({ is_deleted: false }, req.body.page, req.body.size);
      return res.status(200).json({ status: true, response_code: 200, message: `Get Successful`, data: data });
    }
    if (req.body.type === 'Sports') {
      const data = await findAllSportsWithData({ is_deleted: false }, req.body.page, req.body.size);
      return res.status(200).json({ status: true, response_code: 200, message: `Get Successful`, data: data });
    }
  } catch (err) {
    console.error(err);
    return res.status(400).json({ status: false, response_code: 400, message: err, data: [] });
  }
};

// const getCategory = async (req, res) => {
//   try {
//     if (req.body.type === 'Business') {
//       // const data = await findBusinessWithData({ _id: toObjectId(req.body.userID), is_deleted: false });
//       const data = await findBusinessWithData({ user_name: req.body.userID, is_deleted: false });
//       return res.status(200).json({ status: true, response_code: 200, message: `Get Successful`, data: data });
//     }
//     if (req.body.type === 'Film_Industry') {
//       const data = await findFilmIndustryWithData({ user_name: req.body.userID, is_deleted: false });
//       return res.status(200).json({ status: true, response_code: 200, message: `Get Successful`, data: data });
//     }
//     if (req.body.type === 'Sports') {
//       const data = await findSportsWithData({ user_name: req.body.userID, is_deleted: false });
//       return res.status(200).json({ status: true, response_code: 200, message: `Get Successful`, data: data });
//     }
//     // return res.status(404).json({ status: false, response_code: 404, message: `User not found` });
//   } catch (err) {
//     console.error(err);
//     return res.status(400).json({ status: false, response_code: 400, message: err, data: [] });
//   }
// };

const getCategory = async (req, res) => {
  try {
    const businessData = await findBusinessWithData({ user_name: req.body.userID, is_deleted: false });
    if (businessData) {
      return res.status(200).json({ status: true, response_code: 200, message: `Get Successful`, data: businessData });
    }

    const filmData = await findFilmIndustryWithData({ user_name: req.body.userID, is_deleted: false });
    if (filmData) {
      return res.status(200).json({ status: true, response_code: 200, message: `Get Successful`, data: filmData });
    }

    const sportsData = await findSportsWithData({ user_name: req.body.userID, is_deleted: false });
    if (sportsData) {
      return res.status(200).json({ status: true, response_code: 200, message: `Get Successful`, data: sportsData });
    }

    return res.status(404).json({ status: false, response_code: 404, message: `User not found` });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ status: false, response_code: 400, message: err, data: [] });
  }
};

const addCategory = async (req, res) => {
  try {
    const setIMG = (img) => {
      if (img === 'remove') {
        return null
      } else if (img !== null && img !== 'remove') {
        return saveBase64Image(img).fileName
      }
    }
    const info = {
      ...req.body.data,
      image: setIMG(req.body.data.image)
    };
    const detailsData = {
      ...req.body.formData,
      slides: req.body.formData.slides.map(x => {
        return {
          ...x,
          bg_img: setIMG(x.bg_img)
        }
      }),
      father: setIMG(req.body.formData.father),
      mother: setIMG(req.body.formData.mother),
      siblings: setIMG(req.body.formData.siblings),
      spouse: setIMG(req.body.formData.spouse),
      children: setIMG(req.body.formData.children),
      cars: setIMG(req.body.formData.cars),
      watches: setIMG(req.body.formData.watches),
    };

    const business = await findBusiness({ user_name: info.user_name });
    const film_ind = await findFilmIndustry({ user_name: info.user_name });
    const sport = await findSports({ user_name: info.user_name });

    if (business || film_ind || sport) {
      return res.status(400).json({ status: false, response_code: 400, message: `User name already exists`, data: [] });
    }

    if (req.body.type === 'Business') {
      const data = await addBusiness(info);
      const details = await addDetails(detailsData);
      await updateBusiness(data, { details_id: details._id });
      return res.status(200).json({ status: true, response_code: 200, message: `Created Successfully`, data: [] });
    }
    if (req.body.type === 'Film_Industry') {
      const data = await addFilmIndustry(info);
      const details = await addDetails(detailsData);
      await updateFilmIndustry(data, { details_id: details._id });
      return res.status(200).json({ status: true, response_code: 200, message: `Created Successfully`, data: [] });
    }
    if (req.body.type === 'Sports') {
      const data = await addSports(info);
      const details = await addDetails(detailsData);
      await updateSports(data, { details_id: details._id });
      return res.status(200).json({ status: true, response_code: 200, message: `Created Successfully`, data: [] });
    }
  } catch (err) {
    console.error(err);
    return res.status(400).json({ status: false, response_code: 400, message: err, data: [] });
  }
};

module.exports = {
  getAllCategories,
  getCategory,
  addCategory
};
