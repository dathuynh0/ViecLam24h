import dayjs from "dayjs";

const transformLocationTime = (time) => {
    return dayjs(time).format('DD/MM/YYYY HH:mm')
} 

export default transformLocationTime;