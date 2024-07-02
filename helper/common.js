const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const nodemailer = require('nodemailer');

const { LocalStorage } = require('node-localstorage');
const NodeLocalStorage = new LocalStorage('./localStorage');

const toObjectId = (idString) => {
    try {
        return new mongoose.Types.ObjectId(idString);
    } catch (error) {
        throw new Error('Invalid ObjectId format');
    }
};

const formatErrorMessage = (error) => {
    return error
        .replace(/\"/g, '')  // Remove double quotes
        .replace(/\\+/g, '') // Remove backslashes
        .replace(/;/g, ','); // Replace semicolons with commas
}

// Function to generate a random filename based on the current date and time
function generateRandomFileName() {
    const currentDate = new Date();
    const timestamp = currentDate.getTime();
    return `${timestamp}.jpg`;
}

// Function to check if a string is a valid base64 string
function isValidBase64(str) {
    try {
        return Buffer.from(str, 'base64').toString('base64') === str;
    } catch (error) {
        return false;
    }
}

// Function to save a base64 image to a folder with a random filename
function saveBase64Image(base64String) {
    const folderPath = 'uploads';
    const originalFolderPath = path.join(folderPath, 'profile-photo', 'original');
    const thumbFolderPath = path.join(folderPath, 'profile-photo', 'thumb');

    // Create directories if they don't exist
    if (!fs.existsSync(originalFolderPath)) {
        fs.mkdirSync(originalFolderPath, { recursive: true });
    }
    if (!fs.existsSync(thumbFolderPath)) {
        fs.mkdirSync(thumbFolderPath, { recursive: true });
    }

    // Regular expression to match the data URI prefix
    const dataUriPrefixRegex = /^data:image\/[^;]+;base64,/;

    // Check if the string contains a data URI prefix
    if (dataUriPrefixRegex.test(base64String)) {
        // Remove the data URI prefix
        base64String = base64String.replace(dataUriPrefixRegex, '');
    }

    if (!isValidBase64(base64String)) {
        return { status: false, message: 'Invalid base64 string' };
    }

    // Create a buffer from the base64 string
    const buffer = Buffer.from(base64String, 'base64');

    // Generate a random filename
    const randomFileName = generateRandomFileName();

    // Create the full path for the original image file
    const originalFilePath = path.join(originalFolderPath, randomFileName);

    // Create the full path for the thumbnail image file
    const thumbFilePath = path.join(thumbFolderPath, randomFileName);

    // Write the buffer to the original image file
    fs.writeFileSync(originalFilePath, buffer, (err) => {
        if (err) {
            return { status: false, message: 'Error saving the image' };
        }
    });

    sharp(originalFilePath)
        .resize(800)
        .jpeg({ quality: 85 })
        .toFile(thumbFilePath, (err) => {
            if (err) {
                return { status: false, message: 'Error resizing the image' };
            }
        });

    return { status: true, fileName: randomFileName };
}

function base64ToFile(base64String) {
    // Extracting mime type and data from base64 string
    const matches = base64String.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    if (!matches || matches.length !== 3) {
        throw new Error('Invalid base64 string');
    }

    const mimeType = matches[1];
    const data = matches[2];

    // Determining file extension from mime type
    const extension = mimeType.split('/')[1];

    // Generating a random file name
    const fileName = `file_${Date.now()}.${extension}`;

    // Writing the file
    const filePath = path.join(process.cwd(), 'public', 'uploads/images', fileName);
    fs.writeFileSync(filePath, Buffer.from(data, 'base64'));
    return filePath;
    // console.log(`File ${fileName} created successfully at ${filePath}.`);
}

async function sendEmail(email, subject, text, html) {
    try {

        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: 'optexsolutionsjamnagar@gmail.com',
                pass: 'edjc kucu kevk ugzj'
            }
        });

        const mailOptions = {
            from: email, // sender address
            to: 'optexsolutionsjamnagar@gmail.com', // list of receivers
            subject, // Subject line
            text, // plain text body
            html, // html body
        };

        const info = await transporter.sendMail(mailOptions);
        return { success: true, data: info.response }
    } catch (error) {
        return { success: false, data: error }
    }
}

module.exports = {
    NodeLocalStorage,
    toObjectId,
    formatErrorMessage,
    saveBase64Image,
    base64ToFile,
    sendEmail
}
