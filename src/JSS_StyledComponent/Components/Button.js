import styled from 'styled-components'

export const Button = styled.button`
  background: ${props => props.primary ? 'blue' : 'orange'};
  color:#fff;
  border:none;
  border-radius:0.5rem;
  font-weight:bold;
  opacity:1;
    &:hove{
      opacity:0.7;
      trasition:all 0.5s;
    }
    &.button_style{
      font-size:25px
    }
`

export const SmallButton = styled(Button)`
    background-color:orange;
    font-size:0.5rem;
    padding:0.5rem;
`