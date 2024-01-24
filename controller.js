const repository = require("./repository")  
const logger = require('./logger');


const getAllDonations = (req, res) => {
    logger.info('Handling getAllDonations request');

    const response = repository.getDonations();

    if (!response) {
        logger.warn('No donations found');
        res.statusCode = 404;
        res.setHeader("Content-Type", "text/plain");
        return res.end("Donations not found");
    }   
    logger.info('Returning donations')
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/application/json");
    res.end(JSON.stringify(response));
};

const getDonationById = (req, res, url) => {
    const donationIdToFind = url.query.id;

    if (!donationIdToFind){
        logger.warn('Invalid donation ID provided.');
        res.statusCode = 400;
        res.setHeader("Content-Type", "text/plain");
        res.end("Bad Request - Donation ID not valid. ");
    } else {
        logger.info(`Handling request for donation ID: ${donationIdToFind}`);

        const data = repository.getDonations();

        const donationById = data.find(donation => donation.id == donationIdToFind);
    
        if (donationById){
            logger.info(`Found donation with ID: ${donationIdToFind}`);
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify(donationById));
        } else {
            logger.warn(`Donation with ID ${donationIdToFind} not found.`);
            res.statusCode = 404;
            res.setHeader("Content-Type", "text/plain");
            res.end("Donation with that id not found.");
        }
    }
};

const createDonation = (req, res, url) => {
    const donationIdToCreate = url.query.id;
    const donationNameToCreate = url.query.name;
    const donationAmountToCreate = url.query.amount;
    const donationLocationToCreate = url.query.location;

    if ( donationIdToCreate && donationNameToCreate && donationAmountToCreate && donationLocationToCreate){
        logger.info(`Handling request to create donation with ID: ${donationIdToCreate}`);

        const donations = repository.getDonations();

        const donationById = donations.find(donation => donation.id == donationIdToCreate);

        if (donationById){
            logger.warn(`Donation with ID ${donationIdToCreate} already exists.`);
            res.statusCode = 409;
            res.setHeader("Content-Type", "text/plain");
            res.end("Donation with this ID already exists.");
        } else {
            let newDonation = { id:        donationIdToCreate, 
                                donorName: donationNameToCreate,
                                amount:    donationAmountToCreate,
                                location:  donationLocationToCreate  };

            const data = repository.getDonations();

            data.push(newDonation);

            logger.info(`Created new donation with ID: ${donationIdToCreate}`);
            logger.debug(`New donation details: ${JSON.stringify(newDonation)}`);

            repository.postDonation(data);

            res.statusCode = 201;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify(data));
        }
    } else {
        logger.warn('Bad Request - One or more parameters not passed.');
        res.statusCode = 400;
        res.setHeader("Content-Type", "text/plain");
        res.end("Bad Request - One or more parameters not passed.");
    }
};

const updateDonation = (req, res, url) => {
    const donationIdToUpdate = url.query.id;
    const donationNameToUpdate = url.query.name;
    const donationAmountToUpdate = url.query.amount;
    const donationLocationToUpdate = url.query.location;

    if (!donationIdToUpdate){
        logger.warn('Invalid donation ID provided.');
        res.statusCode = 404;
        res.setHeader("Content-Type", "text/plain");
        res.end("Invalid route - Donation ID not valid.");
    } else {
        logger.info(`Handling request to update donation with ID: ${donationIdToUpdate}`);

        const data = repository.getDonations();

        const donationToUpdate = data.find(donation => donation.id == donationIdToUpdate);

        if(donationNameToUpdate){
            logger.info(`Updating donor name for donation with ID ${donationIdToUpdate}`);
            donationToUpdate.donorName = donationNameToUpdate;
        }

        if(donationAmountToUpdate){
            logger.info(`Updating amount for donation with ID ${donationIdToUpdate}`);
            donationToUpdate.amount = donationAmountToUpdate;
        }

        if(donationLocationToUpdate){
            logger.info(`Updating location for donation with ID ${donationIdToUpdate}`);
            donationToUpdate.location = donationLocationToUpdate;
        }

        repository.putDonation(data);

        logger.info(`Updated donation with ID: ${donationIdToUpdate}`);
        logger.debug(`Updated donation details: ${JSON.stringify(donationToUpdate)}`);

        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(data));
    }
};

const deleteDonationById = (req, res, url) => {
    const donationIdToDelete = url.query.id;

    if (!donationIdToDelete){
        logger.warn('Invalid donation ID provided.');
        res.statusCode = 404;
        res.setHeader("Content-Type", "text/plain");
        res.end("Invalid route - Donation ID not valid.");
    } else {
        logger.info(`Handling request to delete donation with ID: ${donationIdToDelete}`);

        const data = repository.getDonations();

        const donationById = data.find(donation => donation.id == donationIdToDelete);

        if (donationById){
            logger.info(`Deleting donation with ID: ${donationIdToDelete}`);

            const toDelete = data.indexOf(donationById);
            data.splice(toDelete, 1);
            repository.deleteDonation(data);

            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify(data));

            logger.debug(`Deleted donation details: ${JSON.stringify(donationById)}`);

        } else {
            logger.warn('Donation not found.');
            res.statusCode = 400;
            res.setHeader("Content-Type", "text/plain");
            res.end("Bad Request - There is no donation associated with this number.");
        }
    }
};

module.exports = {
    getAllDonations,
    getDonationById,
    createDonation,
    updateDonation,
    deleteDonationById,
};

