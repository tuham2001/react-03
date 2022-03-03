import styled from 'styled-components'
import React from 'react'

export const Link = ({ className, children, ...restProps }) => (
  // eslint-disable-next-line jsx-a11y/anchor-is-valid
  <a className={className} >
    {children}
  </a>
)

export const StyledLink = styled(Link)`
  font-weight:bold;
  background-color:red;
`