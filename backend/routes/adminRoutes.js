import express from 'express';
import { AddPlace, AdminLogin, allBookings, AllPlaces, bookingActions, DashBoardData, DeletePlace, getOrUpdatePlaceById, updatePlace } from '../controllers/Admin__Place.controller.js';
import {upload} from '../middlewares/Multer.js';
import multer from 'multer';
import adminauthentication from '../middlewares/AdminAuth.middleware.js';

const adminRouter = express.Router();
const middleware = multer();

adminRouter.post('/addPlace', upload, adminauthentication("Not Authorized. Please log in before adding a Place."), AddPlace);
adminRouter.post('/adminlogin', middleware.none(), AdminLogin);
adminRouter.post('/allplaces', adminauthentication("Not Authorized. Please log in before fetching places."), AllPlaces)
adminRouter.route('/place/:id')
    .get(adminauthentication("Not Authorized. Please log in before fetching place details."), getOrUpdatePlaceById) // Fetch place
    .put( adminauthentication("Not Authorized. Please log in before updating place details."),upload, getOrUpdatePlaceById) // Update place
    .delete(adminauthentication("Not Authorized. Please log in before deleting place details."),DeletePlace)

adminRouter.get('/allbookings',adminauthentication('Not Authorized. Please log in before fetching Booking Details'),allBookings)
adminRouter.post('/bookingstatus',bookingActions)
adminRouter.get('/dashboard',adminauthentication('Not Authorized, Please log in.'),DashBoardData)
export default adminRouter;
