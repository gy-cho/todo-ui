<template>
  <div class="container">
    <div class="card-s">
      <h1>ToDo List</h1>
      <div ref="todoContainer" class="list-container">
        <div v-if="todos.length" >
          <div class="list-item" v-for="todo in todos" :key="todo.id">
            <div class="todo-content">
              <input type="checkbox" @click="modifyTodoStatus(todo)" v-model="todo.completed" class="custom-checkbox" />
              <div v-if="!todo.isEdit" :class="{ completed: todo.completed }" class="todo-title">{{ todo.title }}</div>
              <div v-else style="width: 100%">
                <input type="text" v-model="todo.title" class="edit-input" @keypress.enter="modifyTodo(todo)" />
              </div>
            </div>
            <div class="delete-btn">
              <img v-if="!todo.isEdit" src="@/assets/icons/edit.svg" alt="EDIT" @click="editMode(todo)"/>
              <img v-else src="@/assets/icons/success.svg" alt="SUCCESS" @click.prevent="modifyTodo(todo)"/>
              <img src="@/assets/icons/delete.svg" alt="DELETE" @click="removeTodo(todo)"/>
            </div>
          </div>
        </div>
        <div v-else>
          <div class="empty-list">
            할 일을 등록 해주세요 :)
          </div>
        </div>
      </div>

      <div class="input-container">
          <input type="text" v-model="newTodo" placeholder="할 일을 입력하세요." @keypress.enter="addTodo">
          <button @click.prevent="addTodo">추가</button>
      </div>
    </div>
  </div>
</template>

<script>
import { fetchTodos, insertTodo, deleteTodo, updateTodo, updateTodoStatus } from '@/services/todoApi';

export default {
  name: 'TodosList',
  data() {
    return {
      todos: [],
      newTodo: '',
    };
  },
  methods: {
    async loadTodos() {
      const temp = await fetchTodos();

      this.todos = temp.map(todo => ({
        ...todo,
        isEdit: false,
      }));
    },

    async removeTodo(todo) {
      await deleteTodo(todo);
      this.todos = this.todos.filter(t => t.id !== todo.id);
    },
    async modifyTodoStatus(todo) {
      todo.completed = !todo.completed;
      await updateTodoStatus(todo);
    },

    async addTodo() {
      const temp = { title: this.newTodo, completed: false };
      const result = await insertTodo(temp);
      console.log(result);
      this.todos = [...this.todos, result.contents];
      this.newTodo = '';

      this.scrollTop();
    },
    handleKeyupEnter(event) {
      event.preventDefault();
      this.addTodo();
    },


    async modifyTodo(todo) {
      await updateTodo(todo);
      todo.isEdit = !todo.isEdit;
    },

    editMode(todo) {
      todo.isEdit = !todo.isEdit;
    },

    scrollTop() {
      this.$nextTick(() => {
        setTimeout(() => {
          const container = this.$refs.todoContainer;
          if (container) {
            container.scrollTop = container.scrollHeight;
          }
        }, 5); // 한 프레임 뒤에 실행
      });
    }


  },
  async mounted () {
    await this.loadTodos();
    this.scrollTop();
  }
};
</script>

<style scoped>

.empty-list {
  display: flex;
  justify-content: center;
  padding: 60px;
  background: #f9f9f9;
  border-radius: 5px;
}

.list-container {
  list-style: none;
  padding: 0;
  margin-bottom: 20px;
  max-height: 500px;
  overflow-y: auto; 
  scrollbar-width: none; 
  -ms-overflow-style: none;
  position: relative;
}

.list-container::-webkit-scrollbar {
  display: none;
}

.list-item {
  background: #f9f9f9;
  margin: 5px 0;
  padding: 10px;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.todo-content {
  width: 80%;
  display: flex;
  align-items: center;
}

/* 커스텀 체크박스 스타일 */

.custom-checkbox {
  min-width: 20px;
  height: 20px;
  margin-right: 15px;
  appearance: none;
  border: 2px solid #ccc;
  border-radius: 50%;
  background-color: white;
  cursor: pointer;
  position: relative;
  transition: all 0.3s ease;
}

.custom-checkbox:checked {
  background-color: #4CAF50;
  border-color: #4CAF50;
}

.custom-checkbox:checked::before {
  content: '';
  position: absolute;
  top: 3px;
  left: 3px;
  width: 10px;
  height: 10px;
  background-color: white;
  border-radius: 50%;
}

.todo-title {
  font-size: 16px;
}

/* 할 일 추가 */
.input-container {
    position: relative;
    width: 100%;
}

.input-container input[type="text"] {
    width: 100%;
    padding: 10px;
    padding-right: 40px;
    box-sizing: border-box;
    border: 2px solid #ccc; 
    border-radius: 5px; 
    font-size: 16px; 
    background-color: #f9f9f9; 
    transition: all 0.3s ease; 
}

.edit-input {
    width: 100%;
    padding: 5px 10px;
    padding-left: 10px;
    padding-right: 10px;
    box-sizing: border-box;
    background-color: transparent;
    border: none; 
    border-bottom: 2px solid #ccc; 
    font-size: 16px;
    color: #333;
    transition: border-color 0.3s ease;
}

.edit-input:focus {
    border-bottom-color: #4CAF50; 
    outline: none;
}

.input-container button {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    color: white;
    border: none;
    cursor: pointer;
}

/* 할 일 편집 */

.delete-btn {
  color: white;
  border: none;
  cursor: pointer;
}

.delete-btn img:not(:last-child) {
  margin-right: 15px; /* 마지막 이미지를 제외한 이미지에만 오른쪽 마진 추가 */
}
</style>
