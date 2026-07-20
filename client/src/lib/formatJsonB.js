export const format = (jsonb) => {
    return jsonb.trim()
    .split(/\n+/)          // tách theo dòng trống hoặc xuống dòng
    .map((p) => p.trim())
    .filter((p) => p.length > 0);
}

export const transformText = (jsonb) => {
    if (Array.isArray(jsonb)) {
        return jsonb.join('\n')
    }

    return ''
}

export const formatDateForInput = (date) => {
  if (!date) return ''
  
  const d = new Date(date)
  
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  
  return `${year}-${month}-${day}`
}