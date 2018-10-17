import styled from 'styled-components'
import * as hx from '../helpers'
const RIGHT = 'right'
const LEFT = 'left'
const BOTTOM = 'bottom'
const TOP = 'top'
const CENTER = 'center'
const arrowDirectionForPosition = {
  [RIGHT]: `
    border-top: var(--arrow-width) solid transparent;
    border-bottom: var(--arrow-width) solid transparent;
    border-right: var(--arrow-width) solid var(--arrow-background);
    top: 0;
    right: 100%;
  `,
  [LEFT]: `
    border-top: var(--arrow-width) solid transparent;
    border-bottom: var(--arrow-width) solid transparent;
    border-left: var(--arrow-width) solid var(--arrow-background);
    top: 0;
    left: 100%;
  `,
  [BOTTOM]: `

    border-right: var(--arrow-width) solid transparent;
    border-left: var(--arrow-width) solid transparent;
    border-bottom: var(--arrow-width) solid var(--arrow-background);
    left: 0;
    bottom: calc(100% - 1px);
  `,
  [TOP]: `
    margin-bottom: 1px;
    border-right: var(--arrow-width) solid transparent;
    border-left: var(--arrow-width) solid transparent;
    border-top: var(--arrow-width) solid var(--arrow-background);
    left: 0;
    top: calc(100% - 1px);
  `,
  [CENTER]: `
  display: none`,
}

const transformAmountForPosition = props => {
  switch (props.transformAttrs.position) {
    case TOP:
    case BOTTOM:
      return `translate(calc(${props.targetLeft -
        props.transformAttrs.coords[0]}px + calc(var(--arrow-width) / 2)), 0)`
    case LEFT:
    case RIGHT:
      return `translate(0, calc(${props.targetTop -
        props.transformAttrs.coords[1]}px + calc(var(--arrow-width) / 2)))`
    default:
      return `translate(0,0)`
  }
}
const TooltipArrow = styled.span`
  --arrow-width: ${props => (props.width ? props.width : '0.625rem')};
  --arrow-background: ${props =>
    props.styles && props.styles.backgroundColor
      ? props.styles.backgroundColor
      : `var(--reactour-accent)`};
  position: absolute;
  width: 0;
  height: 0;
  ${props => arrowDirectionForPosition[props.transformAttrs.position]}
  transform: ${props => transformAmountForPosition(props)};
`
const TooltipArrowWrapper = props => {
  const transformAttrs = { ...hx.getTransformProps(props) }
  return <TooltipArrow transformAttrs={transformAttrs} {...props} />
}

export default TooltipArrowWrapper
