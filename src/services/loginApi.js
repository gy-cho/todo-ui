import { getData } from '@/services/api';

const BOARD_ENDPOINT = '/login';

export async function login(userId) {
  return getData(BOARD_ENDPOINT + `?userId=${userId}`)
}
