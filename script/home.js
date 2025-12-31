const pfpImages = ['images/PFP.png', 'images/Sad.png', 'images/aussie.png', 'images/flashbang.png', 'images/hallowpfp.png', 'images/xmaspfp.png'];

function changeRandomPFP() {
  const pfpEl = document.getElementById('pfp');
  pfpEl.classList.remove('spinning');
  
  // Randomize animation
  const spinDirection = Math.random() > 0.5 ? 'pfpSpinClockwise' : 'pfpSpinCounterClockwise';
  const spinDuration = (0.4 + Math.random() * 0.4).toFixed(2) + 's'; // 0.4s to 0.8s
  
  pfpEl.style.setProperty('--spin-animation', spinDirection);
  pfpEl.style.setProperty('--spin-duration', spinDuration);
  
  // Trigger reflow to restart animation
  void pfpEl.offsetWidth;
  
  pfpEl.classList.add('spinning');
  
  setTimeout(() => {
    const randomIndex = Math.floor(Math.random() * pfpImages.length);
    pfpEl.src = pfpImages[randomIndex];
  }, 300);
}

const hour = new Date().getHours();
const greetingEl = document.getElementById('greeting');

if (hour < 12) {
  greetingEl.textContent = 'Howdy!';
} else if (hour < 17) {
  greetingEl.textContent = "G'day!";
} else if (hour < 21) {
  greetingEl.textContent = 'Evening!';
} else {
  greetingEl.textContent = 'Hey there!';
}
