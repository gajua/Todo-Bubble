import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import TodoForm from './TodoForm'
import TodoItem from './TodoItem'
import { cssReflection } from '../lib/styles/common'

const Container = styled.section`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  overflow: hidden;
`

const FormContainer = styled.div`
  position: absolute;
  width: 350px;
  height: 350px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  box-shadow: inset 20px 20px 20px rgba(0, 0, 0, 0.05),
  25px 35px 20px rgba(0, 0, 0, 0.05), 25px 30px 30px rgba(0, 0, 0, 0.05),
  inset -20px -20px 25px rgba(255, 255, 255, 0.9);
  border-radius: 56% 44% 58% 42% / 43% 36% 64% 57%;
  
  transition: 0.5s;
  backdrop-filter: blur(5px);

  z-index:10;

  h2 {
    color: #333;
    font-size: 1.5em;
    margin-bottom: 15px;
  }

  :hover {
    border-radius: 50%;
  }
  
  /* 물방울 빛 반사 */
  ::before {
    top: 50px;
    left: 85px;
    width: 35px;
    height: 35px;
    ${cssReflection}
  }
  ::after {
    top: 90px;
    left: 110px;
    width: 15px;
    height: 15px;
    ${cssReflection}
  }
`

const TodoList = styled.ul`
  /* Todo 리스트 */
  display: flex;
`

export default function Todo() {
  const [todoList, setTodoList] = useState(
    JSON.parse(localStorage.getItem('todo')) ?? []
  );

  useEffect(() => {
    localStorage.setItem('todo', JSON.stringify(todoList));
  }, [todoList]);

  return (
    <Container>
      <FormContainer reflectionOpacity={0.9}>
        <h2>Todo Bubble</h2>
        <TodoForm setTodoList={setTodoList} />
      </FormContainer>
      <TodoList>
        {todoList.map((todoData) =>
          <TodoItem key={todoData.id} todoData={todoData} setTodoList={setTodoList} />
        )}
      </TodoList>
    </Container>
  )
}

/*
  TodoForm에서는 새로운 Todo를 추가하는 로직
  TodoItem에서는 Todo를 삭제, 수정하는 로직을 담당

  투두에 들어가야 하는 정보?
  1. 투두 내용
  2. 투두 수행 여부
  3. 투두 ID

  => 이걸 객체 모양으로 하자.
  {
    text: "투두 내용",
    isDone: false,
    id: 0
  }
*/