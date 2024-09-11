export const parseYouTubeInput = (input: string) => {
    const regex = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;

    const match = input.match(regex);
    if (match && match[2].length === 11) {
      return(match[2]); // Returns the YouTube video ID
    }else{
      return Error("Url not valid!");
    }
  }
  
export const convertDuration = (duration: string): string => {
  const match = duration.match(/PT(\d+)M(\d+)S/);

  if (!match) {
    return "";
  }

  const minutes = parseInt(match[1], 10);
  const seconds = parseInt(match[2], 10);
  const formattedDuration = `${String(minutes).padStart(2, '0')} mins ${String(seconds).padStart(2, '0')} secs`;

  return formattedDuration;
}

export const convertDateToRelative = (dateString: string): string => {
  const currentDate = new Date();
  const date = new Date(dateString);
  const diff = currentDate.getTime() - date.getTime();

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);

  if (years > 0) {
      return years === 1 ? "1 year ago" : `${years} years ago`;
  } else if (months > 0) {
      return months === 1 ? "1 month ago" : `${months} months ago`;
  } else if (days > 0) {
      return days === 1 ? "1 day ago" : `${days} days ago`;
  } else if (hours > 0) {
      return hours === 1 ? "1 hour ago" : `${hours} hours ago`;
  } else if (minutes > 0) {
      return minutes === 1 ? "1 minute ago" : `${minutes} minutes ago`;
  } else {
      return seconds <= 10 ? "just now" : `${seconds} seconds ago`;
  }
}

