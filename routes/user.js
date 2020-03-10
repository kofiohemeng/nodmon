var express = require('express');
var router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
var user_controller = require('../controllers/user');


router.get('/get', user_controller.user_get);

router.post('/create', user_controller.user_create);

router.get('/:id', user_controller.user_details);

router.put('/:id/update', user_controller.user_update);

router.delete('/:id/delete', user_controller.user_delete);


module.exports = router;