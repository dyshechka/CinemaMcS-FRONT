export const formatDuration = (duration) => {
    let hours = Math.floor(duration / 60) + " ч. ";
    let minutes = duration % 60 + " мин.";
    return hours + minutes;
};

export const getFormattedDate = (timeStamp) => {
    let date = new Date(timeStamp);
    let formatDate = date.getDate();
    const intMonth = date.getMonth() + 1;
    const month = intMonth < 10 ? "0" + intMonth : intMonth;
    formatDate = formatDate + '.' + month + '.' + date.getFullYear() + ' ';
    formatDate = formatDate + date.getHours() + ':';
    const minutes = date.getMinutes() === 0 ? "00" : date.getMinutes();
    formatDate = formatDate + minutes;
    return formatDate;
};

export const getFormattedDateOnlyDay = (timeStamp) => {
    let date = new Date(timeStamp);
    let formatDate = date.getDate();
    const intMonth = date.getMonth() + 1;
    const month = intMonth < 10 ? "0" + intMonth : intMonth;
    formatDate = formatDate + '.' + month + '.' + date.getFullYear() + ' ';
    return formatDate;
};