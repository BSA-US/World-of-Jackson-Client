import React, {ReactElement} from 'react';
import styled from 'styled-components';

interface H1Props {
  onClick?: Function;
  collapsed?: boolean;
  inline?: boolean;
  children: ReactElement;
}

const Logo = styled.div`
  border-radius: 50%;
  height: 32px;
  width: 32px;
  background-color: #000;
  margin-right: ${props => props.collapsed ? '0px' : '16px'};
`

const Title = styled.button`
  border-radius: 32px;
  border: 2px solid #000;
  background-color: #fff;
  color: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  padding: ${props => props.inline ? '10px' : '16px' } 16px;
  line-height: unset;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: #e7cf46;
  }
`

const InlineTitle = styled(Title)`
  background-color: transparent;
  border: 2px solid transparent;

  &:hover {
    background-color: inherit;
  }
`

const H1 = ({
  children,
  collapsed,
  inline,
  onClick
}: H1Props) => {
  if (inline) {
    return (<InlineTitle onClick={onClick}><Logo />{children}</InlineTitle>)
  }

  if (collapsed) {
    return (<Title onClick={onClick}><Logo collapsed /></Title>)
  }

  return (<Title onClick={onClick}><Logo />{children}</Title>)
}

export default H1;
