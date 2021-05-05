export function attachScrollDrag (
  elem: HTMLElement,
  callbacks?: {
    grabStart?: Function
    grabEnd?: Function
  }
): any {
  let pos = { top: 0, y: 0 }

  const onMouseMove = (e: MouseEvent): void => {
    const dy = e.clientY - pos.y
    elem.scrollTop = pos.top - dy
  }

  const onMouseUp = (): void => {
    elem.classList.remove('grabbing')
    callbacks?.grabEnd(elem)

    elem.removeEventListener('mousemove', onMouseMove)
    elem.removeEventListener('mouseup', onMouseUp)
  }

  const onMouseDown = (e: MouseEvent): void => {
    if (e.buttons !== 1) return

    elem.classList.add('grabbing')
    callbacks?.grabStart(elem)

    pos = {
      top: elem.scrollTop,
      y: e.clientY
    }

    elem.addEventListener('mousemove', onMouseMove)
    elem.addEventListener('mouseup', onMouseUp)
  }

  elem.addEventListener('mousedown', onMouseDown)

  return {
    destroy () {
      elem.removeEventListener('mousemove', onMouseMove)
      elem.removeEventListener('mouseup', onMouseUp)
      elem.removeEventListener('mousedown', onMouseDown)
    }
  }
}
