export const getDateTime = (date?: Date) => {
  return date != null ? new Date(date).getTime() : 0
}
