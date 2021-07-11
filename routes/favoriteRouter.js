const express = require('express');
const Favorite = require('../models/favorite');
const favoriteRouter = express.Router();
const authenticate = require('../authenticate');
const cors = require('./cors');

favoriteRouter.route('/')
.options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
.get(cors.cors, authenticate.verifyUser, (req, res, next) => {
    Favorite.find({user: req.user._id})
    .populate('user')
    .populate('campsites')
    .then(favorite => {
        if (favorite) {
            console.log('Favorite created', favorite)
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(favorite);
        } else {
            err = new Error;
            err.status = 404;
            return next(err);
        }
    })
    .catch(err => next(err));
})
.post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Favorite.findOne({user: req.user._id })
    .then(favorite => {
        if(!favorite.campsites.includes(favorite)) {
            favorite.campsites.push(favorite);
        } else {
            console.log("You have already favorited this one!");
        }
        console.log('Favorite Created', favorite);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(favorite);
    })
    .catch(err => next(err));
})          
.put(cors.corsWithOptions, authenticate.verifyUser, (req, res) => {
    res.statusCode = 403;
    res.end(`PUT operation not supported on favorites: ${req.params.campsiteId}`);
})
.delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Favorite.findById(req.params.favoriteId)
    findOneAndDelete()
    .then(favorite => {
        if (favorite) {
            for (let i = (favorite.length-1); i >= 0; i--) {
                favorite.id(favorite[i]._id).remove();
            }
            favorite.save()
            .then(favorite => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(favorite);
            })
            .catch(err => next(err));
        } else {
            err = new Error("You do not have any favorites to delete");
            err.status = 404;
            return next(err);
        }
    })
    .catch(err => next(err));
});

favoriteRouter.route('/:campsiteId')
.options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
.get(cors.cors, authenticate.verifyUser, (req, res) => {
    res.statusCode = 403;
    res.end(`GET operation not supported on favorites/${req.params.campsiteId}`);
})
.post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Favorite.findOne({user: req.user._id })
    .then(favorite => {
        if(!favorite.campsites.includes(favorite)) {
            favorite.campsites.push(favorite);
        } else {
            console.log("You have already favorited this one!");
        }
        console.log('Favorite Created', favorite);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(favorite);
    })
    .catch(err => next(err));
})
.put((cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end(`GET operation not supported on favorites/${req.params.campsiteId}`);
})
)
.delete((cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Favorite.findOne({user: req.user._id })
    .then(favorite => {
        if (favorite) {
            for (let i = (favorite.length-1); i >= 0; i--) {
                favorite.id(favorite[i]._id).remove();
            }
            favorite.save()
            .then(favorite => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(favorite);
            })
            .catch(err => next(err));
        } else {
            err = new Error("You do not have any favorites to delete");
            err.status = 404;
            return next(err);
        }
    })
    .catch(err => next(err));
}));

module.exports = favoriteRouter;