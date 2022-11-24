export function toIsoDate(date: Date) {
    return date.toISOString().split('T')[0];
}