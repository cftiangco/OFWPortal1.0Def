const express = require('express');

const router = express.Router();

const AdminController = require('../controllers/admin.controller');
const Country = require('../models/country.model');
const Agency = require('../models/agency.model');
const {ensureAuthenticated} = require('../helpers/auth');
const {check} = require('express-validator/check');

router.get('/',ensureAuthenticated,AdminController.admin);

router.get('/client/add',ensureAuthenticated,AdminController.client_add);
router.post('/client/add',check('name').custom(value => {
  return Agency.find({name:value})
    .then((client) => {
        if(client.length > 0) {
          return Promise.reject(`Client "${value}" is already registred`);
        }
    })
}),ensureAuthenticated,AdminController.client_create);
router.get('/client/:id/edit',ensureAuthenticated,AdminController.client_edit);
router.put('/client/:id/edit',ensureAuthenticated,AdminController.client_post);
router.delete('/client/:id/delete',ensureAuthenticated,AdminController.client_delete);

//=== country routes ===//
router.get('/country/add',ensureAuthenticated,AdminController.country_add);
router.post('/country/add',check('name').custom(value => {
  return Country.find({name:value})
    .then((country) => {
        if(country.length > 0) {
          return Promise.reject(`Country "${value}" is already exists`);
        }
    })
}),ensureAuthenticated,AdminController.country_create);
router.get('/country/:id/edit',ensureAuthenticated,AdminController.country_edit);
router.put('/country/:id/edit',ensureAuthenticated,AdminController.country_put);
router.delete('/country/:id/delete',ensureAuthenticated,AdminController.country_delete)

module.exports = router;