import dayjs from "dayjs";

const transformLocationTime = (time) => {
    return dayjs(time).format('DD/MM/YYYY HH:mm')
} 

export const calculateDate = (time) => {
    const pastDate = new Date(time);

    const currentDate = new Date();

    const millisecondsPerDay = 24 * 60 * 60 * 1000;

    const timeDiff = currentDate - pastDate;
    const numberDay = Math.floor(timeDiff / millisecondsPerDay);

    return numberDay;
}

export default transformLocationTime;