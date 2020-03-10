var Customer = require('../models/user');

//Simple version, without validation or sanitation
exports.user_get = function (req, res) {
    Customer.find({}, function(err, users) {
        var userMap = {};
    
        users.forEach(function(user) {
          userMap[user._id] = user;
        });
    
        res.send(userMap);  
    });
};

exports.user_create = function (req, res) {
    var user = new Customer(
        {
            name: req.body.name,
            sex: req.body.sex,
            phone_number: req.body.phone_number,
            avatar: req.body.avatar
        }
    );

    user.save(function (err) {
        if (err) {
            return next(err);
        }
        res.send('User Created successfully')
    })
};

exports.user_details = function (req, res) {
    Customer.findById(req.params.id, function (err, user) {
        if (err) return next(err);
        res.send(user);
    })
};

exports.user_update = function (req, res) {
    Customer.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, user) {
        if (err) return next(err);
        res.send('User udpated.');
    });
};

exports.user_delete = function (req, res) {
    Customer.findByIdAndRemove(req.params.id, function (err) {
        if (err) return next(err);
        res.send('Deleted successfully!');
    })
};