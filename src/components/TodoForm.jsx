import React, { useRef } from 'react'
import styled from 'styled-components'

const Form = styled.form`
  /* 투두를 입력받는 폼 */

  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;

  gap: 20px;
`

const InputWrapper = styled.div`
  position: relative;
  width: 225px;
  box-shadow: inset 2px 5px 10px rgba(0, 0, 0, 0.1),
          inset -2px -5px 10px rgba(255, 255, 255, 1),
          15px 15px 10px rgba(0, 0, 0, 0.05),
          15px 10px 150px rgba(0, 0, 0, 0.025);
  border-radius: 25px;
  overflow: hidden;

  ::before {
    content: "";
    position: absolute;
    top: 8px;
    left: 50%;
    transform: translateX(-50%);
    width: 65%;
    height: 5px;
    background-color: rgba(255, 255, 255, 0.5);
    border-radius: 5px;
  }
`

const Input = styled.input`
  border: none;
  outline: none;
  background-color: transparent;
  width: 100%;
  font-size: 1em;
  padding: 10px 15px;

  &[type="submit"] {
    text-transform: uppercase;
    font-size: 1em;

    color: #fff;
    background-color: #ff0f5b;

    cursor: pointer;
  }
`

const InputButtonWrapper = styled(InputWrapper)`
  /* 투두 Submit Button */

  width: 140px;

  box-shadow: inset 2px 5px 10px rgba(0, 0, 0, 0.1),
    15px 15px 10px rgba(0, 0, 0, 0.05),
    15px 10px 150px rgba(0, 0, 0, 0.025);
  transition: 0.5s;

  :hover {
    width: 160px;
  }
`

export default function TodoForm({ setTodoList }) {
  const todoInputRef = useRef(null);

  const onTodoSubmit = (event) => {
    event.preventDefault();

    const currentInputVal = todoInputRef.current.value;
    if (!currentInputVal) {
      alert('저장할 투두를 입력해주세요.');
      return;
    }

    setTodoList((prev) => [...prev, {
      text: currentInputVal,
      isDone: false,
      id: Date.now()
    }]);

    todoInputRef.current.value = "";
  }

  return (
    <Form onSubmit={onTodoSubmit}>
      <label className="sr-only" htmlFor="todo">투두 입력하기</label>
      <InputWrapper>
        <Input ref={todoInputRef} id="todo" type="text" name="todo" placeholder="Create your Todo List" />
      </InputWrapper>
      <InputButtonWrapper>
        <Input type="submit" value="bubble pop!" />
      </InputButtonWrapper>
    </Form>
  )
}
