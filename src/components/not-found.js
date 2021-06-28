import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

const Mx = styled.div`
  margin-left: auto;
  margin-right: auto;
`

const Container = styled.div`
  height: 100%;
  font-family: Arial, sans-serif;
  font-weight: bold;
  background-size: cover;
  background-repeat: no-repeat;
  min-height: 635px;
  position: relative;
`

const CountUp = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
`

const Number = styled.div`
  font-size: 80px;
`

const Text = styled.div`
  font-size: 15px;
`

class NotFound extends Component {
  render() {
    return (
      <Container>
        <div>
          <Mx>
            <CountUp>
              <Number>404</Number>
              <Text>Page not found</Text>
              <Text>This may not mean anything.</Text>
              <Text>I'm probably working on something that has blown up.</Text>
            </CountUp>
          </Mx>
        </div>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {}
}
export default connect(mapStateToProps, null, null, { forwardRef: true })(NotFound)
