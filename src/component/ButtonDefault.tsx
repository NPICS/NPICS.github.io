import React from 'react';
import styled from 'styled-components';
import { flex } from './styled'
interface Iprops {
  // width?: string,
  minWidth?: string,
  padding?: string,
  height?: string,
  fontSize?: string,
  text?: string,
  border?: string,
  types?: string,
  disabled?: boolean,
  scale?: boolean,
  children: string | any,
  onClick?: Function | any,
  color?: string
}

const StyledButton = styled.button<Iprops>`
  &:hover {
    background: ${(props => props.types === 'normal' ? "#333333" : '')};
    background: ${(props => props.types === 'second' ? "#FFFFFF" : '')};
    background: ${(props => props.types === 'two' ? "#333" : '')};
    box-shadow: ${(props => props.types === 'second' ? "0px 0px 20px rgba(0, 0, 0, 0.1)" : '')};
    border: ${(props => props.types === 'second' ? "0" : '')};
    transform: ${(props => props.disabled ? '' : props.scale ? 'scale(1.06)' : '')};
  }
  transition: all .2s;
  &:disabled {
    border: ${(props => props.types === 'second' ? "0" : '')};
    box-shadow: ${(props => props.types === 'second' ? "none" : '')};
    background-color: ${(props => props.types === 'normal' ? "rgba(204,204,204)" : '#fff')};
  }
  background: ${(props => {
    switch (props.types) {
      case 'one':
        return 'rgba(255,255,255,.1)';
      case 'two':
        return 'transparent';
      case 'three':
        return 'linear-gradient(284.2deg, #FF0000 0%, #FEB240 101.06%);';
      case 'four':
        return 'rgba(255, 255, 255, 1)';
      case 'disabled':
        return '#999';
      case 'normal':
        return '#000';
      case 'second':
        return '#fff';
      default:
        return null;
    }
  })};
   border: ${(props => {
    switch (props.types) {
      case 'one':
        return '0';
      case 'two':
        return '2px solid rgba(255,255,255,1)';
      case 'three':
        return '0';
      case 'four':
        return '1px solid rgba(255, 255, 255, 3)';
      case 'disabled':
        return '0';
      case 'normal':
        return '0';
      case 'second':
        return '1px solid rgba(0,0,0,.2)';
      default:
        return null;
    }
  })};
  color: ${(props => props.color)};
  color: ${(props => {
    switch (props.types) {
      case 'normal':
        return '#fff';
      case 'second':
        return '#000';
      case 'three':
        return '#fff';
      default:
        return null;
    }
  })};
  background: ${(props => props.disabled ? props.types === 'normal' ? 'rgba(204,204,204)' : "#fff" : '')};
  color: ${(props => props.disabled ? props.types === 'normal' ? '#fff' : "rgba(0,0,0,.5)" : '')};
  min-width: ${(props => props.minWidth)};
  height: ${(props => props.height)};
  font-size: ${(props => props.fontSize)};
  padding: ${(props => props.padding)};
  border-radius: 10px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  /* font-size: 20px; */
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  ${flex}
`

function ButtonDefault(props: Iprops) {

  const onClick = () => {
    if (props.disabled) return
    return props.onClick()
  }

  return (<StyledButton
    {...props}
    onClick={onClick}
    disabled={props.disabled}
  >
    {props.children}
  </StyledButton>
  );
}
ButtonDefault.defaultProps = {
  border: 0,
  minWidth: '200px',
  Width: '200px',
  height: '66px',
  text: 'button',
  fontSize: '14px',
  types: 'one',
  // color: '#fff',
  disabled: false,
}

export default ButtonDefault
