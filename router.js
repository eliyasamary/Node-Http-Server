const controller = require("./controller")
const logger = require('./logger');

const router = (req, res, url) => {
    const { method } = req;

    logger.info(`Handling ${method} request for ${url.pathname}`);

    if (req.method === "GET" && url.pathname === `/`) {
        logger.debug('Routing to getAllDonations');
        controller.getAllDonations(req, res);
    }else if (method === "GET" && url.pathname === `/donations`){
        logger.debug('Routing to getAllDonations');
        controller.getAllDonations(req, res);
    } else if (method === "GET" && url.pathname.startsWith(`/donations/`)){
        logger.debug('Routing to getDonationById');
        controller.getDonationById(req, res, url);
    } else if (method === "POST" && url.pathname.startsWith(`/donations`)){
        logger.debug('Routing to createDonation');
        controller.createDonation(req, res, url);
    } else if (method === "PUT" && url.pathname.startsWith(`/donations/`)){
        logger.debug('Routing to updateDonation');
        controller.updateDonation(req, res, url);
    } else if (method === "DELETE" && url.pathname.startsWith(`/donations/`)){
        logger.debug('Routing to deleteDonationById');
        controller.deleteDonationById(req, res, url);
    } else {
        logger.warn(`Invalid route: ${method} ${url.pathname}`);
        res.statusCode = 404;
        res.setHeader("Content-Type", "text/plain");
        res.end("Invalid route");
    }
};

module.exports = { router };