import React from 'react'
import styled from 'styled-components'
import { Divider } from 'antd'

const UL = styled.ul`
  list-style: none;
  padding-left: 5px;
  a {
    color: #c9cacb;
  }
`

const Title = styled.h3`
  color: #ffffff;
`

const FooterDivider = styled(Divider)`
  margin: 10px 0 25px 0;
  border-color: rgba(255, 255, 255, 0.1);
  width: 50%;
  min-width: 50%;
`

export default function FooterLink({ title, links }) {
  return (
    <div>
      <Title>{title}</Title>
      <FooterDivider />
      <UL>
        {links.map((link) => {
          return (
            <li>
              <a href={link.href}>{link.anchor}</a>
            </li>
          )
        })}
      </UL>
    </div>
  )
}
