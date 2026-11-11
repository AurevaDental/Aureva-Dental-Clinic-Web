export function computeKolkataStatus(date = new Date()) {
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Kolkata',
    weekday: 'short',
    hour: 'numeric',
    minute: 'numeric',
    hour12: false
  });
  
  const parts = formatter.formatToParts(date);
  let weekday = '';
  let hour = 0;
  let minute = 0;
  for (const part of parts) {
    if (part.type === 'weekday') weekday = part.value;
    if (part.type === 'hour') hour = parseInt(part.value, 10);
    if (part.type === 'minute') minute = parseInt(part.value, 10);
  }
  
  const currentMinutes = hour * 60 + minute;
  const isMonday = (weekday === 'Mon');
  const openMinutes = isMonday ? 16 * 60 : 9 * 60 + 30; // 16:00 vs 09:30
  const closeMinutes = 21 * 60; // 21:00
  
  if (currentMinutes >= openMinutes && currentMinutes < closeMinutes) {
    return {
      isOpen: true,
      text: 'Open now · till 9 PM'
    };
  } else if (currentMinutes < openMinutes) {
    return {
      isOpen: false,
      text: isMonday ? 'Opens today at 4 PM' : 'Opens today at 9:30 AM'
    };
  } else {
    const tomorrowIsMonday = (weekday === 'Sun');
    return {
      isOpen: false,
      text: tomorrowIsMonday ? 'Closed · opens tomorrow at 4 PM' : 'Closed · opens tomorrow at 9:30 AM'
    };
  }
}
