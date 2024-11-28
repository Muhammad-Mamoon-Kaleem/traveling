import express from 'express'
import multer from 'multer';
import { AllPlaces } from '../controllers/Admin__Place.controller.js';
import { BookPlace, cancelAppointment, ChangePassword, CreateUser, getUserData, LoginUser, SendConfirmationCode, sendMail, UpdateUserData, UserAppointments, verifyConfirmationcode } from '../controllers/User.Controller.js';
import Userauthentication from '../middlewares/UserAuthentication.js';
import { uploadSingle } from '../middlewares/Multer.js';

const UserRouter=express.Router()
UserRouter.get('/allplaces', AllPlaces);
UserRouter.post('/registeruser',verifyConfirmationcode,CreateUser);
UserRouter.post('/changePassword',verifyConfirmationcode, ChangePassword)
UserRouter.post('/loginuser',LoginUser);
UserRouter.post('/sendconfirmationcode',SendConfirmationCode)

UserRouter.get('/getuserdata',Userauthentication('user not authorized'),getUserData)
UserRouter.post('/updateUserData',uploadSingle,UpdateUserData)

UserRouter.post('/booking',Userauthentication('Please Login Before Booking Place'),BookPlace)
UserRouter.get('/mybooking',Userauthentication('Please Login Before.'),UserAppointments)
UserRouter.post('/cancelbooking',Userauthentication('Please Login Before'),cancelAppointment)
UserRouter.post('/send-email',Userauthentication('Please Login Before To Send Feedback'),sendMail)
export default UserRouter;