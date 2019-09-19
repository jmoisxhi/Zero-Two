/* eslint-disable init-declarations */
const html = require('he');

const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;

module.exports = class Util {
  static decodeHTMLEntities(str) {
    let decodedString = html.decode(str);

    return decodedString;
  }

  static showSeconds(duration) {
    const seconds = Math.floor(duration / SECOND) % 60;
    if (duration < MINUTE) return seconds === 1 ? "a second" : `${seconds} seconds`;

    const minutes = Math.floor(duration / MINUTE) % 60;
    let output = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    if (duration >= HOUR) {
      const hours = Math.floor(duration / HOUR);
      output = `${hours.toString().padStart(2, "0")}:${output}`;
    }

    return output;
  }

  static splitText(str, length) {
    const x = str.substring(0, length).lastIndexOf(" ");
    const pos = x === -1 ? length : x;

    return str.substring(0, pos);
  }

  static secondsToMinutes(seconds) {
    if (seconds < 60) return `${seconds} secs`;
    if (seconds <= 80) return '1 min';

    const minutes = `${Math.ceil(seconds / 60)} mins`;

    return minutes;
  }

  static shuffle(array) {
    let i, j, x;
    for (i = array.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = array[i];
      array[i] = array[j];
      array[j] = x;
    }

    return array;
  }
}