import { getData, putData } from '@/services/api';

const BOARD_ENDPOINT = '/board';

export async function findAllBoards() {
  return getData(BOARD_ENDPOINT);
}

export async function getBoardDetail(boardId) {
  return getData(BOARD_ENDPOINT + `/${boardId}`);
}

export async function modifyBoardDetail(board) {
  const path = BOARD_ENDPOINT + `/${board.boardId}`
  return putData(path, board);
}

export async function findAllBoardComment(boardId) {
  return getData(BOARD_ENDPOINT +`/comment/${boardId}`);
}

export async function createBoardComment(comment) {
  return getData(BOARD_ENDPOINT +`/comment/${comment.boardId}`);
}