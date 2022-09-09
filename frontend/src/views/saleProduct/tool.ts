import { v4 as uuidv4 } from 'uuid';
import moment from 'moment'

export function uuidGen(): string {
  const date = moment().utcOffset(7).format('YYYYMMDD-HHmm')
  const uuid = uuidv4().replace(/^\w\w\w\w\w\w\w\w-\w\w\w\w/gm, date);
  return uuid
}