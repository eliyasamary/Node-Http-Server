const fs = require("fs");
const logger = require('./logger');

const getAllData = () => {
    try {
        const donationsData = fs.readFileSync('donations.json');
        return JSON.parse(donationsData);
    } catch (error) {
        logger.error('Error reading or parsing donations.json', error);
        return [];
    }
}

const data = getAllData();

const updateDonations = (updatedDonations) => {
    try {
        const data = JSON.stringify(updatedDonations, null, 4);
        fs.writeFileSync("donations.json", data, "utf-8");
        logger.info('Updated donations.json');
    } catch (error) {
        logger.error("Error writing to donations.json", error);
    }
};

const getDonations = () => {
    return data;
};

const postDonation = (updatedDonations) => {
    updateDonations(updatedDonations);
    logger.info('Added a new donation to donations.json');
};

const putDonation = (updatedDonation) => {
    updateDonations(updatedDonation);
    logger.info('Updated a donation in donations.json');
};

const deleteDonation = (updatedDonations) => {
    updateDonations(updatedDonations);
    logger.info('Deleted a donation from donations.json');
};

module.exports = {
    getDonations,
    postDonation,
    putDonation,
    deleteDonation,
};
