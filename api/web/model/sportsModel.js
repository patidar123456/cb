const { toObjectId } = require('../../../helper/common');
const Sports = require('../schema/sportsSchema');

const findSports = (data) => {
  return new Promise((resolve, reject) => {
    Sports.findOne(data).then(existingSports => {
      resolve(existingSports);
    }).catch(error => {
      console.error("Error finding existing Sports:", error);
      reject(error);
    });
  });
}

const findAllSports = (data) => {
  return new Promise((resolve, reject) => {
    Sports.find(data).then(existingSports => {
      resolve(existingSports);
    }).catch(error => {
      console.error("Error finding existing Sports:", error);
      reject(error);
    });
  });
}

const findSportsWithData = async (data) => {
  try {
    const [records] = await Promise.all([
      Sports.aggregate([
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
      Sports.countDocuments(data).exec() // Total count query
    ]);

    return records[0];
  } catch (error) {
    console.error("Error finding existing helps:", error);
    throw error;
  }
};

const findAllSportsWithData = async (data, page = 1, pageSize = 5, filter = null) => {
  try {
    const skipAmount = (page - 1) * pageSize;

    if (filter && filter.title !== '') {
      data.title = { $regex: filter.title, $options: 'i' }
    }
    if (filter && filter.status !== '') {
      data.status = filter.status === 'true' ? true : false
    }

    const [records, totalCount] = await Promise.all([
      Sports.aggregate([
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
      Sports.countDocuments(data).exec() // Total count query
    ]);

    return { records, totalCount };
  } catch (error) {
    console.error("Error finding existing helps:", error);
    throw error;
  }
};

const addSports = (data) => {
  return new Promise((resolve, reject) => {
    Sports.create(data).then(createdSports => {
      resolve(createdSports);
    }).catch(error => {
      console.error("Error inserting Sports:", error);
      reject(error);
    });
  });
}

const updateSports = (where, updateData) => {
  return new Promise((resolve, reject) => {
    Sports.findOneAndUpdate(where, updateData, { new: true })
      .then(updatedSports => {
        if (!updatedSports) {
          return reject("Sports not found");
        }
        resolve(updatedSports);
      })
      .catch(error => {
        console.error("Error updating Sports:", error);
        reject(error);
      });
  });
}

module.exports = {
  findSports,
  findAllSports,
  findSportsWithData,
  findAllSportsWithData,
  addSports,
  updateSports
}