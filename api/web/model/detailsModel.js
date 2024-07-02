const { toObjectId } = require('../../../helper/common');
const Details = require('../schema/detailSchema');

const findDetails = (data) => {
  return new Promise((resolve, reject) => {
    Details.findOne(data).then(existingDetails => {
      resolve(existingDetails);
    }).catch(error => {
      console.error("Error finding existing Details:", error);
      reject(error);
    });
  });
}

const findAllDetails = (data) => {
  return new Promise((resolve, reject) => {
    Details.find(data).then(existingDetails => {
      resolve(existingDetails);
    }).catch(error => {
      console.error("Error finding existing Details:", error);
      reject(error);
    });
  });
}

const addDetails = (data) => {
  return new Promise((resolve, reject) => {
    Details.create(data).then(createdDetails => {
      resolve(createdDetails);
    }).catch(error => {
      console.error("Error inserting Details:", error);
      reject(error);
    });
  });
}

const updateDetails = (where, updateData) => {
  return new Promise((resolve, reject) => {
    Details.findOneAndUpdate(where, updateData, { new: true })
      .then(updatedDetails => {
        if (!updatedDetails) {
          return reject("Details not found");
        }
        resolve(updatedDetails);
      })
      .catch(error => {
        console.error("Error updating Details:", error);
        reject(error);
      });
  });
}

module.exports = {
  findDetails,
  findAllDetails,
  addDetails,
  updateDetails
}