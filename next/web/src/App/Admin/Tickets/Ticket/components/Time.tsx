import moment from 'moment';
import { useMemo } from 'react';

interface TimeProps {
  value: string;
  href?: string;
}

export function Time({ value, href }: TimeProps) {
  const { content, title } = useMemo(() => {
    const v = moment(value);
    return {
      content: getTimeContent(v),
      title: v.format('llll'),
    };
  }, [value]);

  return href ? (
    <a className="text-inherit" href={href} title={title}>
      {content}
    </a>
  ) : (
    <span title={title}>{content}</span>
  );
}

function getTimeContent(value: moment.Moment) {
  const now = moment();
  if (now.diff(value) < 3600000 * 21.5) {
    return value.fromNow();
  }
  if (now.year() === value.year()) {
    if (now.dayOfYear() - value.dayOfYear() === 1) {
      return value.calendar();
    } else {
      return value.format('MM-DD LT');
    }
  }
  return value.format('lll');
}
