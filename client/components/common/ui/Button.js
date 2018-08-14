import React from 'react'
import styled from 'styled-components'
import { rgba } from 'polished'

const getButtonBackground = p => {
  if (p.active || p.primary) {
    return p.color || '#EF0060'
  }
  return 'white'
}
// &:hover {
//     background: ${p => (p.color ? rgba(p.color, 0.35) : rgba('blue', 0.35))};
//   }

const StyledButton = styled.button`
  border-radius: 5px;
  border: 1px solid grey;
  background: ${getButtonBackground};
  padding: ${p => (p.loose ? '10px 10px' : '10px 8px')};
  color: ${p => (p.active || p.primary ? 'white' : 'black')};
  width: ${p => (p.wide ? '8rem' : '6rem')};
  cursor: pointer;
`

export const Button = ({ loose, wide, color, active, primary, content }) => (
  <StyledButton {...{ loose, wide, color, active, primary }}>
    {content}
  </StyledButton>
)
