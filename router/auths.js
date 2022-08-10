import express from 'express';

//CONTROLLERS
import { getUsers, getSpecificUser, createUser, deleteUser, updateUser, loginUser } from '../controllers/usersControllers.js';

//JWT verifier
import verifier from '../jwt-verifier/verifierJWT.js';

//Authentication routes

const router = express.Router();


//GET ROUTE

router.get('/', getUsers)

//Specific
router.get('/:id', getSpecificUser)


//POST ROUTE

//register route
router.post('/register', createUser)
//login route
router.post('/login', loginUser)

//DELETE ROUTE

router.delete('/delete/:id', deleteUser)

//UPDATE ROUTE

router.patch('/update/:id', verifier ,updateUser)


export default router;
