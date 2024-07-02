const { toObjectId } = require('../../../helper/common');
const FilmIndustry = require('../schema/filmIndustrySchema');

const findFilmIndustry = (data) => {
  return new Promise((resolve, reject) => {
    FilmIndustry.findOne(data).then(existingFilmIndustry => {
      resolve(existingFilmIndustry);
    }).catch(error => {
      console.error("Error finding existing FilmIndustry:", error);
      reject(error);
    });
  });
}

const findAllFilmIndustry = (data) => {
  return new Promise((resolve, reject) => {
    FilmIndustry.find(data).then(existingFilmIndustry => {
      resolve(existingFilmIndustry);
    }).catch(error => {
      console.error("Error finding existing FilmIndustry:", error);
      reject(error);
    });
  });
}

const findFilmIndustryWithData = async (data) => {
  try {
    const [records] = await Promise.all([
      FilmIndustry.aggregate([
        { $match: data },
        {
          $lookup: {
            from: 'details',
            localField: 'details_id',
            foreignField: '_id',
            as: 'details'
          }
        },
        { $unwind: { path: '$details', preserveNullAndEmptyArrays: true } },
        {
          $addFields: {
            details: { $ifNull: ['$details', null] }
          }
        },
      ]).exec(),
      FilmIndustry.countDocuments(data).exec() // Total count query
    ]);

    return records[0];
  } catch (error) {
    console.error("Error finding existing helps:", error);
    throw error;
  }
};

const findAllFilmIndustryWithData = async (data, page = 1, pageSize = 5, filter = null) => {
  try {
    const skipAmount = (page - 1) * pageSize;

    if (filter && filter.title !== '') {
      data.title = { $regex: filter.title, $options: 'i' }
    }
    if (filter && filter.status !== '') {
      data.status = filter.status === 'true' ? true : false
    }

    const [records, totalCount] = await Promise.all([
      FilmIndustry.aggregate([
        { $match: data },
        {
          $lookup: {
            from: 'details',
            localField: 'details_id',
            foreignField: '_id',
            as: 'details'
          }
        },
        { $unwind: { path: '$details', preserveNullAndEmptyArrays: true } },
        {
          $addFields: {
            details: { $ifNull: ['$details', null] }
          }
        },
        { $sort: { _id: -1 } },
        { $skip: skipAmount },
        { $limit: pageSize }
      ]).exec(),
      FilmIndustry.countDocuments(data).exec() // Total count query
    ]);

    return { records, totalCount };
  } catch (error) {
    console.error("Error finding existing helps:", error);
    throw error;
  }
};

const addFilmIndustry = (data) => {
  return new Promise((resolve, reject) => {
    FilmIndustry.create(data).then(createdFilmIndustry => {
      resolve(createdFilmIndustry);
    }).catch(error => {
      console.error("Error inserting FilmIndustry:", error);
      reject(error);
    });
  });
}

const updateFilmIndustry = (where, updateData) => {
  return new Promise((resolve, reject) => {
    FilmIndustry.findOneAndUpdate(where, updateData, { new: true })
      .then(updatedFilmIndustry => {
        if (!updatedFilmIndustry) {
          return reject("FilmIndustry not found");
        }
        resolve(updatedFilmIndustry);
      })
      .catch(error => {
        console.error("Error updating FilmIndustry:", error);
        reject(error);
      });
  });
}

module.exports = {
  findFilmIndustry,
  findAllFilmIndustry,
  findFilmIndustryWithData,
  findAllFilmIndustryWithData,
  addFilmIndustry,
  updateFilmIndustry
}