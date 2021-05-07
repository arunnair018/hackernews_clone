export default function getPagination(count, current) {
  var shownPages = 3;
  var result = [];
  if (current < shownPages) {
    return [1, 2, 3, 4, 5];
  }
  if (current > count - shownPages) {
    return [count - 4, count - 3, count - 2, count - 1, count];
  }
  return [current - 2, current - 1, current, current + 1, current + 2];
}
