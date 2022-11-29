import React, { useEffect, useRef, useState } from 'react'
import styled, { css, keyframes } from 'styled-components'
import { cssReflection } from '../lib/styles/common'

const keyframeItemMove = keyframes`
  0% {
    transform: translateY(100vh);
  }
  100% {
    transform: translateY(-100vh) scale(1);
  }
`

const keyframeItemMorph = keyframes`
  0%,
  100% {
    border-radius: 83% 17% 70% 30% / 40% 34% 66% 60%;
  }
  34% {
    border-radius: 45% 55% 30% 70% / 40% 34% 66% 60%;
  }
  67% {
    border-radius: 73% 27% 75% 25% / 40% 49% 51% 60%;
  }
`

const cssUndoneTodo = css`
  background: #4fc3dc;
  box-shadow: inset 10px 10px rgba(1, 180, 255, 0.05),
    15px 25px 10px rgba(1, 180, 255, 0.1),
    15px 20px 20px rgba(1, 180, 255, 0.1),
    inset -10px -10px 15px rgba(255, 255, 255, 0.5);
`

const cssDoneTodo = css`
  background: #ff2d75;
  box-shadow: inset 10px 10px rgba(89, 28, 97, 0.05),
    15px 25px 10px rgba(78, 4, 107, 0.1),
    15px 20px 20px rgba(187, 13, 178, 0.1),
    inset -10px -10px 15px rgba(221, 209, 215, 0.5);
`

const Item = styled.li`
  /* Todo li */
  list-style: none;
  width: 100px;
  height: 100px;
  margin: 0 4px;

  animation: ${keyframeItemMove} linear infinite;

  animation-duration: ${({ animationDuration }) => animationDuration}s;
  
  :hover{
    /* hover하면 멈추기 */
    animation-play-state: paused;
  }

  ::before {
    top: 15px;
    left: 30px;
    width: 20px;
    height: 20px;

    ${cssReflection}
  }
`

const Label = styled.label`
  /* Todo 라벨 */

  color: #fff;
  
  line-height: 1.2em;
  letter-spacing: 0.1em;
  font-size: 0.8em;

  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  
  transition: 0.25s;
  
  border-radius: 50%;

  cursor: pointer;

  animation: ${keyframeItemMorph} linear infinite;
  animation-duration: ${({ animationDuration }) => animationDuration / 5}s;

  :hover{
    /* hover하면 멈추기 */
    animation-play-state: paused;
  }

  ${({ isDone }) => isDone ? cssDoneTodo : cssUndoneTodo}
`

export default function TodoItem({ todoData, setTodoList }) {
  const inputRef = useRef(null);
  const [animationDuration, setAnimationDuration] = useState(0);

  const onDeleteClick = () => {
    setTodoList((prev) =>
      prev.filter((data) => data.id !== todoData.id)
    );
  }

  const onTodoDoneClick = () => {
    setTodoList((prev) =>
      prev.map((data) => {
        if (data.id === todoData.id) {
          return {
            ...data,
            isDone: inputRef.current.checked
          }
        }
        return data;
      })
    );
  }

  useEffect(() => {
    if (todoData.isDone)
      inputRef.current.checked = true;
    setAnimationDuration(125 / (Math.random() * 19 + 1))
  }, [])

  return (
    <Item reflectionOpacity={0.45} animationDuration={animationDuration}
    >
      <Label onDoubleClick={onDeleteClick} onClick={onTodoDoneClick} isDone={todoData.isDone} animationDuration={animationDuration}>
        <input ref={inputRef} className="sr-only" type="checkbox" name="todoItem" />
        {todoData.text}
      </Label>
    </Item>
  )
}
