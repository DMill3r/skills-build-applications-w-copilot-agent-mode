import { Request, Response } from 'express';
import { Team } from '../models/Team';

export const getTeams = async (req: Request, res: Response) => {
  try {
    const teams = await Team.find()
      .populate('leader', 'username email')
      .populate('members', 'username email');
    res.json(teams);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch teams' });
  }
};

export const getTeamById = async (req: Request, res: Response) => {
  try {
    const team = await Team.findById(req.params.id)
      .populate('leader', 'username email')
      .populate('members', 'username email');
    if (!team) {
      return res.status(404).json({ error: 'Team not found' });
    }
    res.json(team);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch team' });
  }
};

export const createTeam = async (req: Request, res: Response) => {
  try {
    const team = new Team(req.body);
    await team.save();
    await team.populate('leader', 'username email');
    await team.populate('members', 'username email');
    res.status(201).json(team);
  } catch (error: any) {
    if (error.code === 11000) {
      return res.status(400).json({ error: 'Team name already exists' });
    }
    res.status(500).json({ error: 'Failed to create team' });
  }
};

export const updateTeam = async (req: Request, res: Response) => {
  try {
    const team = await Team.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
      .populate('leader', 'username email')
      .populate('members', 'username email');
    if (!team) {
      return res.status(404).json({ error: 'Team not found' });
    }
    res.json(team);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update team' });
  }
};

export const deleteTeam = async (req: Request, res: Response) => {
  try {
    const team = await Team.findByIdAndDelete(req.params.id);
    if (!team) {
      return res.status(404).json({ error: 'Team not found' });
    }
    res.json({ message: 'Team deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete team' });
  }
};

export const addTeamMember = async (req: Request, res: Response) => {
  try {
    const { memberId } = req.body;
    const team = await Team.findByIdAndUpdate(
      req.params.id,
      { $push: { members: memberId } },
      { new: true }
    )
      .populate('leader', 'username email')
      .populate('members', 'username email');
    if (!team) {
      return res.status(404).json({ error: 'Team not found' });
    }
    res.json(team);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add team member' });
  }
};

export const removeTeamMember = async (req: Request, res: Response) => {
  try {
    const { memberId } = req.body;
    const team = await Team.findByIdAndUpdate(
      req.params.id,
      { $pull: { members: memberId } },
      { new: true }
    )
      .populate('leader', 'username email')
      .populate('members', 'username email');
    if (!team) {
      return res.status(404).json({ error: 'Team not found' });
    }
    res.json(team);
  } catch (error) {
    res.status(500).json({ error: 'Failed to remove team member' });
  }
};
