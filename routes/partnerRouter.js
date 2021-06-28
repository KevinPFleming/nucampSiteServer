const express = require('express');
const Partner = require('../models/partner');
const partnerRouter = express.Router();

partnerRouter.route('/')
.get((req, res, next) => {
    Partner.findById(req.params.partnerId)
    .then(partner => {
        if (partner) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(partner);
        } else {
            err = new Error(`Partner ${req.params.partnerId} not found`);
            err.status = 404;
            return next(err);
        }
    })
    .catch(err => next(err));
})
.post((req, res, next) => {
    Partner.findById(req.params.partnerId)
    .then(partner => {
        if (partner) {
            partner.push(req.body);
            partner.save()
            .then(partner => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(partner);
            })
            .catch(err => next(err));
        } else {
            err = new Error(`Campsite ${req.params.partnerId} not found`);
            err.status = 404;
            return next(err);
        }
    })
    .catch(err => next(err));
})
.put((req, res) => {
    res.statusCode = 403;
    res.end(`PUT operation not supported on /partner/${req.params.partnerId}`);
})
.delete((req, res, next) => {
    Partner.findById(req.params.partnerId)
    .then(partner => {
        if (partner) {
            for (let i = (partner.length-1); i >= 0; i--) {
                partner.id(partner.[i]._id).remove();
            }
            partner.save()
            .then(partner => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(partner);
            })
            .catch(err => next(err));
        } else {
            err = new Error(`Campsite ${req.params.partnerId} not found`);
            err.status = 404;
            return next(err);
        }
    })
    .catch(err => next(err));
});

partnerRouter.route('/partners/:partnerId')
.get((req, res, next) => {
    Partner.findById(req.params.campsiteId)
    .then(partner => {
        if (partner && partner.id(req.params.partnerId)) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(partner.id(req.params.partnerId));
        } else if (!partner) {
            err = new Error(`Partner ${req.params.partnerId} not found`);
            err.status = 404;
            return next(err);
        } else {
            err = new Error(`Partner ${req.params.partnerId} not found`);
            err.status = 404;
            return next(err);
        }
    })
    .catch(err => next(err));
})
.post((req, res) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /partners/${req.params.partnerId}`);
})
.put((req, res, next) => {
    Partner.findById(req.params.partnerId)
    .then(partner => {
        if (partner && partner.id(req.params.partnerId)) {
            partner.save()
            .then(partner => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(partner);
            })
            .catch(err => next(err));
        } else if (!partner) {
            err = new Error(`Partner ${req.params.partnerId} not found`);
            err.status = 404;
            return next(err);
        } else {
            err = new Error(`Partner with ID#:${req.params.partnerId} not found`);
            err.status = 404;
            return next(err);
        }
    })
    .catch(err => next(err));
})
.delete((req, res, next) => {
    Partner.findById(req.params.campsiteId)
    .then(partner=> {
        if (partner && partner.id(req.params.partnerId)) {
            partner.id(req.params.partnerId).remove();
            partner.save()
            .then(partner => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(partner);
            })
            .catch(err => next(err));
        } else if (!partner) {
            err = new Error(`Partner ${req.params.partnerId} not found`);
            err.status = 404;
            return next(err);
        } else {
            err = new Error(`Partner with ID#: ${req.params.partnerId} not found`);
            err.status = 404;
            return next(err);
        }
    })
    .catch(err => next(err));
});


module.exports = partnerRouter;