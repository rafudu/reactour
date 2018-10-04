import styled from 'styled-components'
import * as hx from '../helpers'

const TooltipArrow = styled.span`
  position: absolute;
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 10px solid
    ${props =>
      props.styles && props.styles.backgroundColor
        ? props.styles.backgroundColor
        : `var(--reactour-accent)`};
  top: -10px;
  left: -0;
  transform: ${props => {
    const translate = hx.getTransform(props)
    return `translate(${props.targetLeft - translate[0] + 5}px, 0)`
  }};
`

export default TooltipArrow
