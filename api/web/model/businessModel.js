const { toObjectId } = require('../../../helper/common');
const Business = require('../schema/businessSchema');

const findBusiness = (data) => {
  return new Promise((resolve, reject) => {
    Business.findOne(data).then(existingBusiness => {
      resolve(existingBusiness);
    }).catch(error => {
      console.error("Error finding existing Business:", error);
      reject(error);
    });
  });
}

const findAllBusiness = (data) => {
  return new Promise((resolve, reject) => {
    Business.find(data).then(existingBusiness => {
      resolve(existingBusiness);
    }).catch(error => {
      console.error("Error finding existing Business:", error);
      reject(error);
    });
  });
}

const findBusinessWithData = async (data) => {
  try {
    const [records] = await Promise.all([
      Business.aggregate([
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
      Business.countDocuments(data).exec() // Total count query
    ]);

    return records[0];
  } catch (error) {
    console.error("Error finding existing helps:", error);
    throw error;
  }
};

const findAllBusinessWithData = async (data, page = 1, pageSize = 5, filter = null) => {
  try {
    const skipAmount = (page - 1) * pageSize;

    if (filter && filter.title !== '') {
      data.title = { $regex: filter.title, $options: 'i' }
    }
    if (filter && filter.status !== '') {
      data.status = filter.status === 'true' ? true : false
    }

    const [records, totalCount] = await Promise.all([
      Business.aggregate([
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
      Business.countDocuments(data).exec() // Total count query
    ]);

    return { records, totalCount };
  } catch (error) {
    console.error("Error finding existing helps:", error);
    throw error;
  }
};

const addBusiness = (data) => {
  return new Promise((resolve, reject) => {
    Business.create(data).then(createdBusiness => {
      resolve(createdBusiness);
    }).catch(error => {
      console.error("Error inserting Business:", error);
      reject(error);
    });
  });
}

const updateBusiness = (where, updateData) => {
  return new Promise((resolve, reject) => {
    Business.findOneAndUpdate(where, updateData, { new: true })
      .then(updatedBusiness => {
        if (!updatedBusiness) {
          return reject("Business not found");
        }
        resolve(updatedBusiness);
      })
      .catch(error => {
        console.error("Error updating Business:", error);
        reject(error);
      });
  });
}

module.exports = {
  findBusiness,
  findAllBusiness,
  findBusinessWithData,
  findAllBusinessWithData,
  addBusiness,
  updateBusiness
}