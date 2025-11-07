// routes/patientRoutes.js
import express from 'express';
import { 
  addPatientController, 
  getPatientsController, 
  getPatientByIdController 
} from '../controller/addPatientController.js';

const router = express.Router();

router.post('/patients', addPatientController);
router.get('/patients', getPatientsController);
router.get('/patients/:id', getPatientByIdController);

export default router;