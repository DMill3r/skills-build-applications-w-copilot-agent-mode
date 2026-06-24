import { Router } from 'express';
import * as workoutController from '../controllers/workoutController';

const router = Router();

router.get('/', workoutController.getWorkouts);
router.get('/:id', workoutController.getWorkoutById);
router.post('/', workoutController.createWorkout);
router.put('/:id', workoutController.updateWorkout);
router.delete('/:id', workoutController.deleteWorkout);

export default router;
