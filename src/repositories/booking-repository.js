const { StatusCodes } = require('http-status-codes');
const {Booking } = require('../models');  
const CrudRepository = require('./crud-repository');
const AppError = require('../utils/errors/app-error');
const { Op } = require('sequelize');
const { Enums } = require('../utils/common');
const { CANCELLED, BOOKED } = Enums.BOOKING_STATUS;

class BookingRepository extends CrudRepository{
    constructor(){
        super(Booking);
    }

    async createBooking(bookingData, transaction) {
        const response = await Booking.create(bookingData, { transaction: transaction });
        return response;
    }

     async get(data, transaction) {
        const response = await Booking.findByPk(data, { transaction: transaction });
        if(!response){
            throw new AppError('No data found', StatusCodes.NOT_FOUND);
        }
        return response; 
    }

        async update(id, data, transaction){ // id is the primary key and data is the object to be updated (columns and values)
        const response = await this.model.update(data, {
            where: {
                id: id
            }
        } , {transaction: transaction });
        return response;
    }

    async cancelOldBookings(timestamp){
        const response =  await Booking.update(
        { status: 'Cancelled', updatedAt: new Date() },
            {
                where: {
                status: {
                    [Op.notIn]: [BOOKED, CANCELLED]
                },
                createdAt: {
                    [Op.lt]: new Date('2025-05-12T16:02:30')
                }
                }
        });
        return response;
    }
}


module.exports = BookingRepository;