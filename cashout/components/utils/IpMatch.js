const matchIp = error.response?.data.error;
const ipPortPattern = /(\d+\.\d+\.\d+\.\d+:\d+)/;
const message = matchIp.match(ipPortPattern);
const match = match(ipPortPattern);
if (
  error.response?.data.error === `connection <monitor> to ${match} timed out` ||
  error.response?.data.error === match
) {
  alert("Slow Network Detected. Check Your Network and Try Again !");
}