const revealBtn = document.getElementById('reveal-project-btn');
const secretProject = document.getElementById('secret-project');

revealBtn.addEventListener('click', (e) => {
  if (secretProject.style.display === 'none' || !secretProject.style.display) {
    // <-- added this line as you asked:
    secretProject.style.display = 'block';
    revealBtn.textContent = 'Hide Secret Project';
  } else {
    secretProject.style.display = 'none';
    revealBtn.textContent = 'Show Secret Project';
  }

  const circle = document.createElement('span');
  circle.classList.add('ripple');
  revealBtn.appendChild(circle);

  const maxDim = Math.max(revealBtn.clientWidth, revealBtn.clientHeight);
  circle.style.width = circle.style.height = maxDim + 'px';

  const rect = revealBtn.getBoundingClientRect();
  circle.style.left = e.clientX - rect.left - maxDim / 2 + 'px';
  circle.style.top = e.clientY - rect.top - maxDim / 2 + 'px';

  setTimeout(() => circle.remove(), 600);
});

window.addEventListener("load", () => {
  const loadingScreen = document.getElementById("loading-screen");
  if (loadingScreen) {
    setTimeout(() => loadingScreen.style.display = "none", 3000);
  }

  const hudLoader = document.getElementById("hud-loader");
  const sound = document.getElementById("boot-sound");

  if (sound) {
    sound.volume = 0.7;
    sound.play().catch(() => {});
  }

  if (hudLoader) {
    setTimeout(() => hudLoader.style.display = "none", 4000);
  }
});

document.addEventListener("click", () => {
  const sound = document.getElementById("boot-sound");
  if (sound && sound.paused) {
    sound.play();
  }
});
const quizData = [
    {
      question: "What is my full name?",
      options: ["Yash Gupta", "Yash Verma", "Aman Gupta"],
      answer: "Yash Gupta"
    },
    {
      question: "Which field am I most passionate about?",
      options: ["Finance", "Web Dev & AI/ML", "Gaming"],
      answer: "Web Dev & AI/ML"
    },
    {
      question: "Which year did I win a hackathon?",
      options: ["2023", "2024", "2025"],
      answer: "2024"
    },
    {
        question:"What language I enjoy the most?",
        options:["Python","JavaScript","Java","C++","C"],
        answer:"Python"
    }
  ];
  
  const container = document.getElementById("quiz-container");
  
  quizData.forEach((q, i) => {
    const qDiv = document.createElement("div");
    qDiv.classList.add("quiz-question");
  
    // Create question text
    const questionText = document.createElement("p");
    questionText.innerHTML = `<strong>${q.question}</strong>`;
    qDiv.appendChild(questionText);
  
    // Create options
    q.options.forEach((opt, idx) => {
      // Unique id for input
      const optionId = `q${i}option${idx}`;
  
      // Create input radio
      const input = document.createElement("input");
      input.type = "radio";
      input.id = optionId;
      input.name = `q${i}`;
      input.value = opt;
  
      // Create label linked to input via for attribute
      const label = document.createElement("label");
      label.htmlFor = optionId;
      label.textContent = opt;
  
      // Wrap input and label in a div for styling
      const optionDiv = document.createElement("div");
      optionDiv.classList.add("quiz-option");
      optionDiv.appendChild(input);
      optionDiv.appendChild(label);
  
      qDiv.appendChild(optionDiv);
    });
  
    container.appendChild(qDiv);
  });
  
  document.getElementById("submit-quiz").addEventListener("click", () => {
    let score = 0;
    quizData.forEach((q, i) => {
      const selected = document.querySelector(`input[name="q${i}"]:checked`);
      if (selected && selected.value === q.answer) score++;
    });
    document.getElementById("quiz-result").innerText =
      `🎉 You scored ${score} out of ${quizData.length}!`;
  });

   


  const animatedSections = document.querySelectorAll('.animated-section');

function checkSections() {
  animatedSections.forEach(section => {
    const rect = section.getBoundingClientRect();
    if(rect.top < window.innerHeight - 100) {
      section.style.animationName = 'fadeUp';
      section.style.opacity = 1;
      section.style.transform = 'translateY(0)';
      section.querySelector('.slide-left').style.animationPlayState = 'running';
      section.querySelector('.slide-right').style.animationPlayState = 'running';
    }
  });
}
window.addEventListener('scroll', checkSections);
window.addEventListener('load', checkSections);
document.querySelectorAll('.read-more-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      alert('This will link to the full article soon! 🚀');
    });
  });
  VanillaTilt.init(document.querySelectorAll(".blog-card"), {
    max: 15,
    speed: 400,
    glare: true,
    "max-glare": 0.5,
  });
  const board = document.getElementById("tic-tac-toe-board");
  const status = document.getElementById("tic-tac-toe-status");
  const restartBtn = document.getElementById("restart-btn");
  
  let currentPlayer = "X";
  let cells = Array(9).fill("");
  
  function drawBoard() {
    board.innerHTML = "";
    cells.forEach((cell, i) => {
      const cellDiv = document.createElement("div");
      cellDiv.textContent = cell;
      cellDiv.addEventListener("click", () => makeMove(i));
      board.appendChild(cellDiv);
    });
    status.textContent = `Player ${currentPlayer}'s turn`;
  }
  
  function makeMove(i) {
    if (cells[i] !== "" || checkWinner()) return;
    cells[i] = currentPlayer;
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    drawBoard();
    const winner = checkWinner();
    if (winner) {
      status.textContent = winner === "Draw" ? "It's a draw! 😐" : `🎉 Player ${winner} wins!`;
    }
  }
  

  
  restartBtn.addEventListener("click", () => {
    cells = Array(9).fill("");
    currentPlayer = "X";
    drawBoard();
  });
  
  window.addEventListener("load", drawBoard);
  