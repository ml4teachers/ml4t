import { format } from 'date-fns'
import { de } from 'date-fns/locale'

export default function GermanGitTimestamp({ timestamp }) {
  const formattedDate = format(timestamp, 'd. MMMM yyyy', { locale: de });
  return <>Zuletzt aktualisiert am {formattedDate}</>
}
