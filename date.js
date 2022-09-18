const date = (options) => {
  const date = new Date()
  return date.toLocaleString('en-us', options)
}

const getDate = () => {
  return date({
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  })
}

const getDay = () => {
  return date({
    weekday: 'long',
  })
}

export default { getDate, getDay }
