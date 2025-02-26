<template>
  <div class="container">
    <div class="card-m">
      <div class="m-auto">
        <button v-show="mode === 'EDIT'" @click="saveBoard">
          저장
        </button>
        <button class="btn-cancel" v-show="mode === 'EDIT'" @click="modeChange">
          취소
        </button>
        <button v-show="mode === 'VIEW'" @click="modeChange">
          편집
        </button>
      </div>
      <div class="flex">
        <span class="label">제목</span>
        <div v-if="mode==='VIEW'" class="field">{{boardDetail.boardTitle}}</div>
        <div v-else class="field edit">
          <input type="text" v-model="boardDetail.boardTitle">
        </div>
      </div>
 
      <div class="flex">
        <span class="label">내용</span>
        <div v-if="mode==='VIEW'" class="field content">{{boardDetail.boardContent}}</div>
        <div v-else class="field edit">
          <textarea type="text" v-model="boardDetail.boardContent" />
        </div>
      </div>

      <div class="flex">
        <span class="label">작성자</span>
        <div class="field">{{boardDetail.userName}}</div>        
      </div>

      <div class="flex">
        <span class="label">생성일</span>
        <div class="field">{{boardDetail.boardCreatedAt}}</div>
      </div>

      <div class="flex">
        <span class="label">수정일</span>
        <div class="field">{{boardDetail.boardUpdatedAt}}</div>
      </div>

      <div class="flex">
        <span class="label">조회수</span>
        <div class="field">{{boardDetail.boardView}}</div>
      </div>

      <div class="comment-container" v-for="comment in boardComments" :key="comment.id">
        <div class="name-area">
          <div class="name">{{comment.userName}}</div>
          <div class="date">{{comment.commentCreatedAt}}</div>
        </div>
        <div class="comment-area">{{comment.commentContent}}</div>
      </div>

      <div class="comment-edit">
        <textarea type="text" />
        <button @click="saveBoard">
          저장
        </button>
      </div>

    </div>
  </div>
</template>

<script>
import { getBoardDetail, findAllBoardComment } from '@/services/boardApi';

export default {
  name: 'BoardDetail',
  data() {
    return {
      boardDetail: {},
      boardComments: [],
      mode: 'VIEW',

    };
  },
  methods: {
    async loadBoard() {
      const boardId = this.$route.params.boardId;
      this.boardDetail = await getBoardDetail(boardId);

      this.boardComments = await findAllBoardComment(boardId);
    },

    async saveBoard() {
      const boardId = this.$route.params.boardId;
      const data = {
        boardId,
        boardTitle : this.boardDetail.boardTitle,
        boardContent : this.boardDetail.boardContent,
      }

      console.log('test' ,data);

      // await modifyBoardDetail(data);
    },

    modeChange() {
      if( this.mode === 'EDIT'){
        this.mode = 'VIEW';
      }else {
        this.mode = 'EDIT';
      }
    }
  },
  async mounted () {
    await this.loadBoard();
  }
};
</script>

<style scoped>

.flex {
  display: flex;
  margin: 5px 0;
}

.label {
  width: 100px;
  text-align: left;
  font-style: bold;
  margin-top: 10px;
}

.field {
  background: #f9f9f9;
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  text-align: left;
}

.edit {
  background: #fff;
  outline: 1px solid #ddd;
}

textarea {
  all: unset; /* 기본 스타일 제거 */
  -webkit-appearance: none; 
  -moz-appearance: none; 
  appearance: none; 
  width: 100%; 
  height: 200px; /* 원하는 높이 설정 */
  background-color: transparent; /* 배경 투명 */
  border: none; /* 테두리 제거 */
  outline: none; /* 포커스 시 테두리 제거 */
  font-size: 16px; /* 글자 크기 */
  resize: none; /* 크기 조정 불가능 */
  overflow-x: hidden;
  word-wrap: break-word;
}

.content {
  height: 200px;
  overflow-y: auto;
}

.comment-container {
  padding: 20px 0;
  border-bottom: 1px solid #ddd;
}

.name-area {
  display: flex;
  align-items: flex-end;
}

.name-area > .name {
  font-weight: bold;
}
.name-area > .date {
  color: #666;
  font-size: 12px;
  margin-left: 5px;
}

.comment-area {
  text-align: left;
  margin-top: 2px;
}

.comment-edit {
  background: #fff;
  outline: 1px solid #ddd;
  padding: 10px;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  text-align: left;
  margin-top: 10px;
}
.comment-edit > textarea {
  height: 50px;
}
.comment-edit > button {
  width: 60px;
  margin-left: 5px;
}

input {
  all: unset; /* 기본 스타일을 모두 제거 */
  -webkit-appearance: none; /* Webkit 브라우저에서 기본 스타일 제거 */
  -moz-appearance: none; /* Firefox 브라우저에서 기본 스타일 제거 */
  appearance: none; /* 기본 브라우저 스타일 제거 */
  width: 100%;
}

button + button {
 margin-left: 5px;
}

</style>
