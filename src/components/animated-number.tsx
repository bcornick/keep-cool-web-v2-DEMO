'use client'

import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion'
import { useEffect, useRef } from 'react'

export function AnimatedNumber({ start, end }: { start: number; end: number }) {
  let ref = useRef(null)
  let isInView = useInView(ref, { once: true, amount: 0.5 })

  let value = useMotionValue(start)
  let spring = useSpring(value, { damping: 30, stiffness: 100 })
  let display = useTransform(spring, (num) =>
    Math.round(num).toLocaleString('en-US'),
  )

  useEffect(() => {
    value.set(isInView ? end : start)
  }, [start, end, isInView, value])

  return <motion.span ref={ref}>{display}</motion.span>
}
