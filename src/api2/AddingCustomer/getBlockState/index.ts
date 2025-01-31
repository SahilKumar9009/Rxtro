import {get} from '../../../api2';
import {API, BASE_URL} from '../../../constants/api';

export interface Block {
  id: string;
  name: string;
}

export const getBlocksByState = async (stateId: string): Promise<Block[]> => {
  try {
    const response = await get<Block[]>({
      path: `${BASE_URL}${API.GETBLOCKSBYSTATE}/${stateId}/blocks`,
      params: {},
      noLoader: true,
    });

    console.log('Blocks response:', response);
    return response;
  } catch (error) {
    console.error('Error fetching blocks:', error);
    throw error;
  }
};

// Utility functions

export const getBlockById = (
  blocks: Block[],
  id: string,
): Block | undefined => {
  return blocks.find(block => block.id === id);
};

export const getBlockNameById = (
  blocks: Block[],
  id: string,
): string | undefined => {
  const block = getBlockById(blocks, id);
  return block ? block.name : undefined;
};

export const sortBlocksAlphabetically = (blocks: Block[]): Block[] => {
  return [...blocks].sort((a, b) => a.name.localeCompare(b.name));
};
