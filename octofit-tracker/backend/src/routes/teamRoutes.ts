import { Router } from 'express';
import * as teamController from '../controllers/teamController';

const router = Router();

router.get('/', teamController.getTeams);
router.get('/:id', teamController.getTeamById);
router.post('/', teamController.createTeam);
router.put('/:id', teamController.updateTeam);
router.delete('/:id', teamController.deleteTeam);
router.post('/:id/members', teamController.addTeamMember);
router.delete('/:id/members', teamController.removeTeamMember);

export default router;
