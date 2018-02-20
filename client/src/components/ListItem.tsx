import * as React from 'react'
import styled, { css } from 'react-emotion'

interface ContainerProps {
  bgColor?: string
  className?: string
}

const Container: React.StatelessComponent<ContainerProps> = props => (
  <div className={props.className}>{props.children}</div>
)

const StyledContainer = styled(Container)`
  position: relative;
  width: 100%;
  padding: 1em;
  background: ${({ bgColor }) => bgColor};
  border-bottom: 3px solid purple;
  font-family: sans-serif;
  margin-bottom: 0.7em;
`
const StyledDeleteButton = styled('button')`
  position: absolute;
  top: 0;
  right: 0;
  margin: 1em;
`

interface IProps {
  id: number
  name: string
  description: string
  fromOther: boolean
  delete(): void
}

export default function ListItem(props: IProps) {
  return (
    <StyledContainer bgColor={props.fromOther ? 'coral' : 'papayawhip'}>
      <StyledDeleteButton onClick={props.delete}>X</StyledDeleteButton>
      <h4>{props.name}</h4>
      <span>{props.id}</span>
      <p>{props.description}</p>
    </StyledContainer>
  )
}
