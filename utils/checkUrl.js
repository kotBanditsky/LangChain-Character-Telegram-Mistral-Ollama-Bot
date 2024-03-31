async function isUrl(input) {
  try {
    new URL(input);
    return true;
  } catch (err) {
    return false;
  }
}

export default isUrl;
