import { postData, getData, deleteData, putData } from '@/services/api';

const TODO_ENDPOINT = '/todos';

export async function fetchTodos() {
  return getData(TODO_ENDPOINT);
}

export async function insertTodo(newTodo) {
  return postData(TODO_ENDPOINT, newTodo);
}

export async function deleteTodo(newTodo) {
  const path = TODO_ENDPOINT + `/${newTodo.id}`
  return deleteData(path, newTodo);
}

export async function updateTodo(newTodo) {
  const path = TODO_ENDPOINT + `/${newTodo.id}`
  return putData(path, newTodo);
}

export async function updateTodoStatus(newTodo) {
  const path = TODO_ENDPOINT + `/${newTodo.id}/status`
  return putData(path, newTodo);
}