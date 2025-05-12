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
     async get(data, transaction) {
        const response = await this.model.findByPk(data, { transaction: transaction });
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

}

module.exports = BookingRepository;