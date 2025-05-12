const { BookingService } = require('../services');
const { StatusCodes } = require('http-status-codes');
const { SuccessResponse, ErrorResponse } = require('../utils/common');


async function createBooking(req, res) {
    try{
        const response = await BookingService.createBooking({
            flightId: req.body.flightId,
            userId: req.body.userId,
            noOfSeats: req.body.noOfSeats,
        })
        SuccessResponse.data = response;
        SuccessResponse.message = 'Booked Successfully';

        return res
        .status(StatusCodes.OK)
        .json({ SuccessResponse });
    }
    catch(error){
        ErrorResponse.message = ' Booking Failed';
        ErrorResponse.error = error;

        return res
        .status(404)
        .json({ ErrorResponse });
    }
}


async function makePayment(req, res) {
    try{
        const response = await BookingService.makePayment({
            totalCost: req.body.totalCost,
            userId: req.body.userId,
            bookingId: req.body.bookingId,
        })
        SuccessResponse.data = response;
        SuccessResponse.message = 'Booked Successfully';

        return res
        .status(StatusCodes.OK)
        .json({ SuccessResponse });
    }
    catch(error){
        ErrorResponse.message = ' Booking Failed';
        ErrorResponse.error = error;

        return res
        .status(404)
        .json({ ErrorResponse });
    }
}

module.exports = {
    createBooking,
    makePayment
};