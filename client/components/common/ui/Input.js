import React from 'react'
import styled from 'styled-components'
import {rgba} from 'polished'

const StyledInput = styled.input`
  background: transparent !important;
  border: none;
  border-bottom: ${p => `2px solid ${p.color || 'grey'}`};
  color: ${p => p.color || '#000'};
  padding: 5px 8px;
  text-align: left;
  &:active,
  &:focus {
    border-bottom: 2px solid blue;
  }
  &::placeholder {
    color: ${p => (p.color ? rgba(p.color, 0.5) : '#000')};
  }
`

export const Input = ({color, ...rest}) => <StyledInput color={color} {...rest} />
