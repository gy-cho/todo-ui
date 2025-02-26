<template>
  <div class="container">
    <div class="card-max">
      <div class="list-header">
        <div class="title">제목</div>
        <div class="name">작성자</div>
        <div class="createAt">작성일</div>
        <div class="updateAt">수정일</div>
        <div class="view">조회수</div>
      </div>
      <div class="list-item" v-for="board in boards" :key="board.id">
        <div class="title"><router-link :to="`/board/${board.boardId}`">{{ board.boardTitle }}</router-link></div>
        <div class="name">{{board.userName}}</div>
        <div class="createAt">{{board.boardCreatedAt}}</div>
        <div class="updateAt">{{board.boardUpdatedAt}}</div>
        <div class="view">{{board.boardView}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { findAllBoards } from '@/services/boardApi';

export default {
  name: 'TodosList',
  data() {
    return {
      boards: [],
    };
  },
  methods: {
    async loadTodos() {
      const temp = await findAllBoards();

      this.boards = temp.map(board => ({
        ...board,
      }));
    },
  },
  async mounted () {
    await this.loadTodos();
  }
};
</script>

<style scoped>


.list-header {
  background: #f1f1f1;
  margin: 5px 0;
  padding: 10px;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
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

.title {
  width: 300px;
  text-align: left;
}
.name {
  width: 50px;
}
.createAt {
  width: 150px;
}
.updateAt {
  width: 150px;
}
.view {
  width: 50px;
}

</style>
