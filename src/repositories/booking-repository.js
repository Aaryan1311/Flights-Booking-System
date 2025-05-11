const { StatusCodes } = require('http-status-codes');
const {Booking } = require('../models');  
const CrudRepository = require('./crud-repository');

class BookingRepository extends CrudRepository{
    constructor(){
        super(Booking);
    }

    async createBooking(bookingData, transaction) {
        const response = await Booking.create(bookingData, { transaction: transaction });
        return response;
    }
}

module.exports = BookingRepository;