export function convertTimeStringToMinutes(timeString: string) {
  let [hour, minutes] = timeString.split(':').map(Number)

  if (hour === 0) hour = 24

  return hour * 60 + minutes
}
