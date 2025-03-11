export const formatSecondsToMMSS = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60)
  const secondsRemaining = seconds % 60

  return `${minutes.toString().padStart(1, '0')}:${secondsRemaining.toString().padStart(2, '0')}`
}

export const convertToNumeric = (str: string): string => {
  return str.replace(/\D+/g, '')
}
