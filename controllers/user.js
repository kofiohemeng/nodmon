
var mongoose = require('mongoose');
var Customer = require('../models/user');
var validate = require('../routes/validate');

class CustomerController {
    // GET
    async index (req, res) {
        try {
            var selectParams = {
                _id: 1,
                name: 1,
                sex: 1,
                phone_number: 1,
                avatar: 1
            };

            var customers = await Customer.getAll({}, selectParams);

            return validate.success(res, customers);
        }
        catch (error) {
            return validate.error(res, error);
        }
    }

    // POST 
    async create (req, res, param, postData) {

        postData = JSON.parse(postData);
        
        let { name, sex, phone_number, avatar } = postData;

        try {
            var customer = await Customer.create({ name, sex, phone_number, avatar });

            return validate.success(res, customer);
        }
        catch (error) {
            return validate.error(res);
        }
    }

    // GET /customer/:id
    async detail (req, res, param) {
        try {
            var pipeline = [
                {
                    "$match" : {
                        "_id" : mongoose.Types.ObjectId(param)
                    }
                }
            ];

            var customer = await Customer.aggregation(pipeline);

            return validate.success(res, customer);
        }
        catch (error) {
            return validate.error(res, error);
        }
    }

    // PUT /customer/:id
    async update (req, res, param, postData) {
        var customer;

        try {
            customer = await Customer.get({ _id: param });
        }
        catch (e) {
            console.log(e);
        }

        if (!customer) {
            return validate.error(res, 'Entity not found', 404);
        }

        postData = JSON.parse(postData);

        var updateData = {};

        if (postData.name) {
            updateData.name = postData.name;
        }

        if (postData.sex) {
            updateData.sex = postData.sex;
        }

        if (postData.phone_number) {
            updateData.phone_number = postData.phone_number;;
        }

        if (postData.avatar) {
            updateData.avatar = postData.avatar;;
        }

        try {
            customer = await Customer.findOneAndUpdate({ _id: param }, { $set: updateData }, {useFindAndModify : false});
            return validate.success(res, customer);
        }
        catch (error) {
            return validate.error(res);
        }
    }

    // DELETE /customer/:id
    async delete (req, res, param) {
        let customer;
        try {
            customer = await Customer.get({ _id: param });
        }
        catch (e) {
            console.log(e);
        }

        if (!customer) {
            return validate.error(res, 'Entity not found', 404);
        }

        try {
            let conditions = { _id: param };
            await Customer.remove(conditions);

            return validate.success(res);
        }
        catch (error) {
            return validate.error(res, error);
        }
    }

}

module.exports = new CustomerController();