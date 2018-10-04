import styled from 'styled-components'
import * as hx from '../helpers'

const TooltipArrow = styled.span`
  position: absolute;
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 10px solid var(--reactour-accent);
  top: -10px;
  left: -0;
  transform: ${props => {
    const translate = hx.getTransform(props)
    return `translate(${props.targetLeft - translate[0] + 5}px, 0)`
  }};
`
// const TooltipArrow = styled.span`
//   position: absolute;
//   background-color: var(--reactour-accent);
//   height: 1.875em;
//   line-height: 2;
//   padding-left: 0.8125em;
//   padding-right: 0.8125em;
//   font-size: 1em;
//   border-radius: 1.625em;
//   color: white;
//   text-align: center;
//   box-shadow: 0 0.25em 0.5em rgba(0, 0, 0, 0.3);
//   top: -0.8125em;
//   left: -0.8125em;
// `

export default TooltipArrow
