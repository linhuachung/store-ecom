import React from 'react'
import 'antd/es/button/style'
import './style.scss'
import styled from 'styled-components';
import Header from '../../app/header';
import Footer from '../../app/footer';

const Container = styled.div`
  > .content {
    width: 70%;
    margin: 75px auto 0 auto;

    @media (min-width: 320px) {
      width: 90%;
    }
    @media (min-width: 1024px) {
      width: 70%;
    }
  }
`

export default ({ children, ...props }) => (
    <Container>
        <Header/>
        <div className="content">
            {children}
        </div>
        <Footer/>
    </Container>
)
