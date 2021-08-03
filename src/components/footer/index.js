import React from 'react'
import styled from 'styled-components'
import { Row, Col, Grid, Divider } from 'antd'
import FooterLink from './footerLink'

const Copyright = styled.p`
  margin: 0 auto;
  color: rgba(255, 255, 255, 0.56);
  margin-bottom: 25px;
`

const FooterWrapper = styled.footer`
  background-color: #190f5d;
`

const FooterDivider = styled(Divider)`
  border-color: rgba(255, 255, 255, 0.1);
`

const generalLinks = [
  {
    href: 'https://welups.com/about',
    anchor: 'About',
  },
  {
    href: 'https://welups.com/#partner',
    anchor: 'Partner',
  },
  {
    href: 'https://welups.com/ecosystem',
    anchor: 'Ecosystem',
  },
]

const developerLinks = [
  {
    href: 'https://welups.com/pdf/Welups_WhitePaper_EN.pdf',
    anchor: 'Whitepaper',
  },
  {
    href: 'https://welups.com/#roadmap',
    anchor: 'Roadmap',
  },
  {
    href: 'https://welups.com/wel-token.html',
    anchor: 'Token',
  },
]

const communityLinks = [
  {
    href: 'https://welups.com/news',
    anchor: 'News',
  },
  {
    href: 'https://welups.com/announcement',
    anchor: 'Announcement',
  },
  {
    href: 'https://welups.com/#',
    anchor: 'Media',
  },
]

const supportLinks = [
  {
    href: 'https://welups.com/contact',
    anchor: 'Contact us',
  },
  {
    href: 'https://welups.com/contact-us',
    anchor: 'FAQ',
  },
]

export default function FooterComponent() {
  const { md } = Grid.useBreakpoint()

  return (
    <FooterWrapper>
      <Row>
        <Divider dashed />
      </Row>
      <Row justify="center" gutter={[0, 0]}>
        <Col xs={20} sm={20} md={20} lg={19} xl={18}>
          <Row>
            <Col span={12} lg={6}>
              <FooterLink title="General" links={generalLinks} />
            </Col>
            <Col span={12} lg={6}>
              <FooterLink title="Developer" links={developerLinks} />
            </Col>
            <Col span={12} lg={6}>
              <FooterLink title="Community" links={communityLinks} />
            </Col>
            <Col span={12} lg={6}>
              <FooterLink title="Support" links={supportLinks} />
            </Col>
          </Row>
        </Col>
      </Row>
      <Row>
        <FooterDivider />
      </Row>
      <Row>
        <Copyright>
          Copyright © All right reserved 2021. WELUPS – Blockchain for Digital Identity
        </Copyright>
      </Row>
    </FooterWrapper>
  )
}
