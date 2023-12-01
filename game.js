// Iteration 1: Declare variables required for this game
let game = document.getElementById("game-body");
let lifes = document.getElementById("lives");
let time = document.getElementById("timer").textContent;
let zombieNum = 0;
const zombieImages = [
  "zombie-1.png",
  "zombie-2.png",
  "zombie-4.png",
  "zombie-5.png",
  "zombie-6.png",
];
// Iteration 1.2: Add shotgun sound
const shotgunSound = new Audio("./assets/shotgun.wav");
shotgunSound.volume = 0.2;
game.onclick = () => {
  shotgunSound.pause();
  shotgunSound.currentTime = 0;
  shotgunSound.play();
};
// Iteration 1.3: Add background sound
const backgroundSound = new Audio("./assets/bgm.mp3");
backgroundSound.addEventListener("loadeddata", () => {
    backgroundSound.play();
  });
  
  backgroundSound.loop = true;

// Iteration 1.4: Add lives
const maxlives = 3;
var lives = 3;

// Iteration 2: Write a function to make a zombie

function zombieMaker() {
  zombieImg = zombieImages[getRandomInt(0, zombieImages.length)];
  game.innerHTML += `<img src="./assets/${zombieImg}" class="zombie-image" id="zombie${zombieNum}">`;
  let zombie = document.getElementById("zombie" + zombieNum);
  zombie.style.transform = `translateX(${getRandomInt(20, 80)}vw)`;
  zombie.style.animationDuration = `${getRandomInt(2, 6)}s`;
  zombie.onclick = () => {
    zombieDestroyer(zombie);
  };
}

// Iteration 3: Write a function to check if the player missed a zombie

function zommbieChecker(x) {
  if (x.getBoundingClientRect().top <= 0) {
    lives--;
    return true;
  }
  return false;
}

// Iteration 4: Write a function to destroy a zombie when it is shot or missed

function zombieDestroyer(i) {
  i.style.display = "none";
  zombieNum++;
  zombieMaker();
}

// Iteration 5: Creating timer

let timer = setInterval(function () {
  time--;
  document.getElementById("timer").textContent = time;
  let y = document.getElementById("zombie" + zombieNum);
  if (zommbieChecker(y) == true) {
    zombieDestroyer(y);
    if (lives == 0) {
      clearInterval(timer);
      location.href = "./game-over.html";
    }
  }
  if (time == 0) {
    clearInterval(timer);
    location.href = "./win.html";
  }
}, 1000);

// Iteration 6: Write a code to start the game by calling the first zombie

zombieMaker(zombieNum);

// Iteration 7: Write the helper function to get random integer

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}