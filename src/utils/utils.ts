// Date format 
export function formatDate(isoString: string): string{
    const date = new Date(isoString)
    const formatter = new Intl.DateTimeFormat('es-ES',{
        year:'numeric',
        month:'numeric',
        day: 'numeric',
        hour:'numeric'
    })
    return formatter.format(date)
}