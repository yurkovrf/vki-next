import type GroupInterface from '@/types/GroupInterface';
import { Group } from './entity/Group.entity';
import AppDataSource from './AppDataSource';

const groupRepository = AppDataSource.getRepository(Group);

export const getGroupsDb = async (): Promise<GroupInterface[]> => {
  return await groupRepository.find();
};;

export const addGroupsDb = async (groupFields: Omit<GroupInterface, 'id'>): Promise<GroupInterface> => {
  const group = new Group();
  const newGroup = await groupRepository.save({
    ...group,
    ...groupFields,
  });

  return newGroup;
};