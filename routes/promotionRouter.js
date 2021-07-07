const express = require('express');
const Promotion = require('../models/promotion');
const promotionRouter = express.Router();
const authenticate = require('../authenticate');
const cors = require('./cors');

promotionRouter.route('/')
.options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
.get(cors.cors, (req, res, next) => {
    Promotion.findById(req.params.promotionId)
    .then(promotion => {
        if (promotion) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(promotion);
        } else {
            err = new Error(`Promotion ${req.params.promotionId} not found`);
            err.status = 404;
            return next(err);
        }
    })
    .catch(err => next(err));
})
.post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Promotion.findById(req.params.promotionId)
    .then(promotion => {
        if (promotion) {
            promotion.push(req.body);
            promotion.save()
            .then(promotion => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(promotion);
            })
            .catch(err => next(err));
        } else {
            err = new Error(`Promotion ${req.params.promotionId} not found`);
            err.status = 404;
            return next(err);
        }
    })
    .catch(err => next(err));
})
.put(cors.corsWithOptions, authenticate.verifyUser,(req, res) => {
    res.statusCode = 403;
    res.end(`PUT operation not supported on /promotion/${req.params.promotionId}`);
})
.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Promotion.findById(req.params.promotionId)
    .then(promotion => {
        if (promotion) {
            for (let i = (promotion.length-1); i >= 0; i--) {
                promotion.id(promotion[i]._id).remove();
            }
            promotion.save()
            .then(promotion => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(promotion);
            })
            .catch(err => next(err));
        } else {
            err = new Error(`Promotion ${req.params.promotionId} not found`);
            err.status = 404;
            return next(err);
        }
    })
    .catch(err => next(err));
});

promotionRouter.route('/promotions/:promotionId')
.options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
.get(cors.cors, (req, res, next) => {
    Promotion.findById(req.params.promotionId)
    .then(promotion => {
        if (promotion && promotion.id(req.params.promotionId)) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(promotion.id(req.params.promotionId));
        } else if (!promotion) {
            err = new Error(`Promotion ${req.params.promotionId} not found`);
            err.status = 404;
            return next(err);
        } else {
            err = new Error(`Promotion ${req.params.promotionId} not found`);
            err.status = 404;
            return next(err);
        }
    })
    .catch(err => next(err));
})
.post(cors.corsWithOptions, authenticate.verifyUser,(req, res) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /promotion/${req.params.promotionId}`);
})
.put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Promotion.findById(req.params.promotionId)
    .then(promotion => {
        if (promotion && promotion.id(req.params.promotionId)) {
            promotion.save()
            .then(partner => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(promotion);
            })
            .catch(err => next(err));
        } else if (!promotion) {
            err = new Error(`Promotion ${req.params.promotionId} not found`);
            err.status = 404;
            return next(err);
        } else {
            err = new Error(`Promotion with ID#:${req.params.promotionId} not found`);
            err.status = 404;
            return next(err);
        }
    })
    .catch(err => next(err));
})
.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Promotion.findById(req.params.promotionId)
    .then(promotion => {
        if (promotion && promotion.id(req.params.promotionId)) {
            promotion.id(req.params.promotionId).remove();
            promotion.save()
            .then(promotion => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(promotion);
            })
            .catch(err => next(err));
        } else if (!promotion) {
            err = new Error(`Promotion ${req.params.promotionId} not found`);
            err.status = 404;
            return next(err);
        } else {
            err = new Error(`Promotion with ID#: ${req.params.promotionId} not found`);
            err.status = 404;
            return next(err);
        }
    })
    .catch(err => next(err));
});


module.exports = promotionRouter;