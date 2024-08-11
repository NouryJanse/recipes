import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import relativeTime from 'dayjs/plugin/relativeTime'

// unit test needed

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(relativeTime)

const currentTimeZone = 'Europe/Amsterdam'
const nlFormat = 'DD-MM-YYYY HH:mm:ss'
const longFormat = 'YYYY-MM-DD HH:mm:ss.SSSSSS'
const shortFormat = 'HH:mm:ss'
dayjs.tz.setDefault(currentTimeZone)

export const getDateTime = (): string => {
    return dayjs().tz().format(longFormat)
}

export const formatDateTime = (date: string): string => {
    if (date) {
        return dayjs.tz(date, currentTimeZone).format(longFormat)
    }
    return ''
}

export const formatNLDateTime = (date: string): string => {
    if (date) {
        return dayjs(date).tz(currentTimeZone).format(nlFormat)
    }
    return ''
}

export const formatUTCDateTime = (date: Date): string => {
    if (date) {
        return dayjs(date).tz(currentTimeZone).format(longFormat)
    }
    return ''
}

export const getTime = (): string => {
    dayjs.tz.setDefault(currentTimeZone)
    return dayjs().tz().format(shortFormat)
}

export const getTodayMinusDays = (days: number): string => {
    if (days) {
        return dayjs.tz('').endOf('day').subtract(days, 'days').format(longFormat)
    }
    return ''
}

export const getDifferenceInText = (date: string): string => {
    return dayjs(date).fromNow(true)
}

export const getDifferenceInFormat = (
    date: string,
    format: 'ms' | 's' | 'm' | 'h' | 'd' | 'w' | 'M', // ... Q, y
): number => {
    return dayjs().diff(date, format, true)
}
