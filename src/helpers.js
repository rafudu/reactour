import pick from 'lodash.pick'

export const getNodeRect = node => {
  return pick(node.getBoundingClientRect(), [
    'top',
    'right',
    'bottom',
    'left',
    'width',
    'height',
  ])
}

export const inView = ({ top, right, bottom, left, w, h, threshold = 0 }) => {
  return (
    top >= 0 + threshold &&
    left >= 0 + threshold &&
    bottom <= h - threshold &&
    right <= w - threshold
  )
}

export const isBody = node =>
  node === document.querySelector('body') ||
  node === document.querySelector('html')
export const isHoriz = pos => /(left|right)/.test(pos)
export const isOutsideX = (val, windowWidth) => val > windowWidth
export const isOutsideY = (val, windowHeight) => val > windowHeight
export const safe = sum => (sum < 0 ? 0 : sum)

export const bestPositionOf = positions => {
  return Object.keys(positions)
    .map(p => ({
      position: p,
      value: positions[p],
    }))
    .sort((a, b) => b.value - a.value)
    .map(p => p.position)
}

export const getTransformProps = props => {
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
      (isHoriz(position)
        ? helperWidth + padding * 2
        : helperHeight + padding * 2)
    )
  }

  const autoPosition = coords => {
    const positionsOrder = bestPositionOf(available)
    for (let j = 0; j < positionsOrder.length; j++) {
      if (couldPositionAt(positionsOrder[j])) {
        return {
          coords: coords[positionsOrder[j]],
          position: positionsOrder[j],
        }
      }
    }
    return {
      coords: coords.center,
      position: 'center',
    }
  }

  const pos = helperPosition => {
    const hX = isOutsideX(targetLeft + helperWidth, windowWidth)
      ? isOutsideX(targetRight + padding, windowWidth)
        ? targetRight - helperWidth
        : targetRight - helperWidth + padding
      : targetLeft - padding
    const x = hX > padding ? hX : padding
    const hY = isOutsideY(targetTop + helperHeight, windowHeight)
      ? isOutsideY(targetBottom + padding, windowHeight)
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
      return {
        coords: coords[helperPosition],
        position: helperPosition,
      }
    }
    return autoPosition(coords)
  }

  const p = pos(helperPosition)
  return p
}
