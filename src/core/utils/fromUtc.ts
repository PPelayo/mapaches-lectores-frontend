import dayjs, { Dayjs } from "dayjs"
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)

export function fromUtc(date : string) : Dayjs{
    return dayjs.utc(date).local()
}