/** delay - со скольки считаем в секундах */
export const useCountdown = (delay: Ref<number>) => {
  const remainingTime = ref<number>(0)
  const timer = ref<NodeJS.Timeout | null>(null)

  const startCountdown = () => {
    remainingTime.value = delay.value
    timer.value = setInterval(() => {
      if (remainingTime.value > 0) {
        remainingTime.value--
      } else {
        timer.value && clearInterval(timer.value)
      }
    }, 1000)
  }

  return {
    remainingTime,
    startCountdown
  }
}
