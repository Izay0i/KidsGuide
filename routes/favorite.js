const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/auth-middleware');
const favController = require('../controllers/favorite-controller');

router.use(authMiddleware.verifyToken);

router.get('/', favController.getAllFavorites);
router.get('/user/:id', favController.getAllFavByUID);
router.get('/post/:id', favController.getFavCountByPostID);
router.post('/', favController.createFavorite);
router.delete('/fav/:id', favController.deleteFavorite);

module.exports = router;