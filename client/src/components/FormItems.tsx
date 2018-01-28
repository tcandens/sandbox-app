import * as React from 'react'
import styled, {css} from 'react-emotion'

export const formItem = css`
  font-size: 1.8em;
  width: 100%;
  margin-bottom: 0.3em;
  padding: 0.4em 0.6em;
`
export const Input = styled('input')`
  ${formItem};
`
export const Button = styled('button') `
  ${formItem};
  border: none;
  background-color: pink;
`