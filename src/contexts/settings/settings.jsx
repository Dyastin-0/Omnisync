export const setTheme = async(theme) => {
  theme == 'light' ? lightTheme() : darkTheme();
}

function lightTheme() {
  document.documentElement.style.setProperty('--base-color', 'rgb(220, 220, 220)');
  document.documentElement.style.setProperty('--secondary-color', 'rgb(200, 200, 200)');
  document.documentElement.style.setProperty('--text-color', 'rgb(45, 45, 45)');
  document.documentElement.style.setProperty('--complement', 'rgb(210, 210, 210)');
}

function darkTheme() {
  document.documentElement.style.setProperty('--base-color', 'rgb(35, 35, 35)');
  document.documentElement.style.setProperty('--secondary-color', 'rgb(45, 45, 45)');
  document.documentElement.style.setProperty('--text-color', 'rgb(255, 255, 255)');
  document.documentElement.style.setProperty('--complement', 'rgb(25, 25, 25)');
}