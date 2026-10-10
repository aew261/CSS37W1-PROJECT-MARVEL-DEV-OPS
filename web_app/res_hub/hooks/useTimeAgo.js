import { useEffect, useState } from "react"
import dayjs from "dayjs"

export const useTimeAgo = (timestamp) => {
  const now = dayjs()
  const past = dayjs(timestamp)

  const seconds = now.diff(past, "second")
  const minutes = now.diff(past, "minute")
  const hours = now.diff(past, "hour")
  const days = now.diff(past, "day")

  if (seconds < 60) return { type: "relative", value: `${seconds}s` }
  if (minutes < 60) return { type: "relative", value: `${minutes}m` }
  if (hours < 24) return { type: "relative", value: `${hours}h` }
  if (days < 7) return { type: "relative", value: `${days}d` }

  return {
    type: "date",
    date: past.format("D MMMM YYYY"),
    time: past.format("HH:mm")
  }
}

export const useGlobalClock = () => {
  const [, setTick] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setTick((prev) => prev + 1)
    }, 60000) // 1 minute

    return () => clearInterval(interval)
  }, [])
}