import { getData } from '@/services/api';

const BOARD_ENDPOINT = '/login';

export async function login(loginId) {
  return getData(BOARD_ENDPOINT + `?loginId=${loginId}`)
}
