export function formatDateString(dateString: string) {
    const date = new Date(dateString);
    const dateTimeFormatter = new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric' });
    const currentDate = new Date();

    return dateTimeFormatter.format(date) + ', ' + currentDate.getFullYear();
}
