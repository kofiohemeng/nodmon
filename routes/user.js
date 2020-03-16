
var user_controller = require('../controllers/user');

var routes = [
    {
        method: 'GET',
        path: '/api/customer',
        handler: user_controller.index.bind(user_controller)
    },
    {
        method: 'GET',
        path: /api\/customer\/([0-9a-z]+)/,
        handler: user_controller.detail.bind(user_controller)
    },
    {
        method: 'POST',
        path: '/api/customer',
        handler: user_controller.create.bind(user_controller)
    },
    {
        method: 'PUT',
        path: /api\/customer\/([0-9a-z]+)/,
        handler: user_controller.update.bind(user_controller)
    },
    {
        method: 'DELETE',
        path: /api\/customer\/([0-9a-z]+)/,
        handler: user_controller.delete.bind(user_controller)
    }
];

module.exports = routes;
