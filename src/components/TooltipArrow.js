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
    const {
      targetTop,
      targetRight,
      targetBottom,
      targetLeft,
      windowWidth,
      windowHeight,
      helperWidth,
      helperHeight,
      helperPosition,
      padding,
    } = props

    const available = {
      left: targetLeft,
      right: windowWidth - targetRight,
      top: targetTop,
      bottom: windowHeight - targetBottom,
    }

    const couldPositionAt = position => {
      return (
        available[position] >
        (hx.isHoriz(position)
          ? helperWidth + padding * 2
          : helperHeight + padding * 2)
      )
    }

    const autoPosition = coords => {
      const positionsOrder = hx.bestPositionOf(available)
      for (let j = 0; j < positionsOrder.length; j++) {
        if (couldPositionAt(positionsOrder[j])) {
          return coords[positionsOrder[j]]
        }
      }
      return coords.center
    }

    const pos = helperPosition => {
      const hX = hx.isOutsideX(targetLeft + helperWidth, windowWidth)
        ? hx.isOutsideX(targetRight + padding, windowWidth)
          ? targetRight - helperWidth
          : targetRight - helperWidth + padding
        : targetLeft - padding
      const x = hX > padding ? hX : padding
      const hY = hx.isOutsideY(targetTop + helperHeight, windowHeight)
        ? hx.isOutsideY(targetBottom + padding, windowHeight)
          ? targetBottom - helperHeight
          : targetBottom - helperHeight + padding
        : targetTop - padding
      const y = hY > padding ? hY : padding
      const coords = {
        top: [x, targetTop - helperHeight - padding * 2],
        right: [targetRight + padding * 2, y],
        bottom: [x, targetBottom + padding * 2],
        left: [targetLeft - helperWidth - padding * 2, y],
        center: [
          windowWidth / 2 - helperWidth / 2,
          windowHeight / 2 - helperHeight / 2,
        ],
      }
      if (helperPosition === 'center' || couldPositionAt(helperPosition)) {
        return coords[helperPosition]
      }
      return autoPosition(coords)
    }

    const p = pos(helperPosition)
    console.info(`translate(${targetLeft - p[0]}px, 0)`)
    // return `translate(0,0)`
    return `translate(${targetLeft - p[0] + 5}px, 0)`
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
