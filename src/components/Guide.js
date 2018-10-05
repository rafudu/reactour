import styled from 'styled-components'
import * as hx from '../helpers'

const Guide = styled.div`
  --reactour-accent: ${props => props.accentColor};
  position: fixed;
  background-color: #fff;
  transition: transform 0.3s;
  padding: 24px 30px;
  box-shadow: 0 0.5em 3em rgba(0, 0, 0, 0.3);
  top: 0;
  left: 0;
  color: inherit;
  z-index: 1000000;
  max-width: 331px;
  min-width: 150px;
  outline: 0;
  padding-right: 40px;
  border-radius: ${props => props.rounded}px;

  transform: ${props => {
    const translate = hx.getTransformProps(props)
    return `translate(${translate.coords[0]}px, ${translate.coords[1]}px)`
  }};
`
export default Guide
