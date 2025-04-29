const iconsContainer = document.querySelector('.background-icons');
  const iconsList = [
    'fab fa-html5',
    'fab fa-css3-alt',
    'fab fa-js-square',
    'fab fa-react',
    'fab fa-node-js',
    'fab fa-github',
    'fab fa-bootstrap',
    'fab fa-php',
    'fab fa-python',
    'fab fa-linux',
    'fab fa-docker',
    'fab fa-vuejs',
    'fab fa-figma'
  ];
  const colors = ['white', 'yellow', '#2196f3'];
  for (let i = 0; i < 20; i++) {
    const icon = document.createElement('i');
    icon.className = iconsList[Math.floor(Math.random() * iconsList.length)];
    icon.style.top = Math.floor(Math.random() * 100) + '%';
    icon.style.left = Math.floor(Math.random() * 100) + '%';
    icon.style.color = colors[Math.floor(Math.random() * colors.length)];
    icon.style.animationDelay = Math.random() * 20 + 's';
    iconsContainer.appendChild(icon);
  }