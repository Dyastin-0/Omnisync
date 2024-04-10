export const randomColor = () => {
  const darkness = Math.floor(Math.random() * 128);
  const hexValue = darkness.toString(16).padStart(2, '0');
  const hexColor = `#${hexValue}${hexValue}${hexValue}`;

  return hexColor;
}