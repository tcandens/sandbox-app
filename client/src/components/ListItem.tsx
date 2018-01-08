import * as React from 'react'
import styled, { css } from 'react-emotion'

const StyledContainer = styled('div') `
  position: relative;
  width: 100%;
  padding: 1em;
  background: lightgrey;
  font-family: sans-serif;
  margin-bottom: 0.7em;
`
const StyledDeleteButton = styled('button') `
  position: absolute;
  top: 0;
  right: 0;
  margin: 1em;
`

interface IProps {
  id: number
  name: string
  description: string
  delete(): void
}
export default function ListItem(props: IProps) {
  return (
    <StyledContainer>
      <StyledDeleteButton
        onClick={props.delete}
      >
        X
      </StyledDeleteButton>
      <h4>{props.name}</h4>
      <span>{props.id}</span>
      <p>{props.description}</p>
    </StyledContainer>
  )
}