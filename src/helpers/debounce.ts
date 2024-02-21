export function debounce(func: (...args: any[]) => any, delay: number = 200) {
  let timerId: ReturnType<typeof setTimeout>

  return function (...args: any[]) {
    clearTimeout(timerId)

    timerId = setTimeout(() => {
      func(...args)
    }, delay)
  }
}