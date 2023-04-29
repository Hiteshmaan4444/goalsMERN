const express = require('express')
const router = express.Router()
const {protect} = require('../middleware/userMiddleware');
const {getGoals,postGoals,updateGoals,deleteGoals} = require('../controller/goalController');

router.route('/').get(protect,getGoals).post(protect,postGoals)

router.route('/:id').put(protect,updateGoals).delete(protect,deleteGoals)

module.exports = router