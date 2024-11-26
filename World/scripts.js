// Continent and country data
const continentData = [
    {
      name: "Africa",
      description: "Africa, the second-largest continent, is rich in culture, wildlife, and natural wonders.",
      image: "images/africa.jpg",
      countries: ["Nigeria", "Kenya", "South Africa", "Egypt", "Morocco"],
    },
    {
      name: "Europe",
      description: "Europe, a continent of history and modernity, is home to iconic landmarks and diverse cultures.",
      image: "images/europe.jpg",
      countries: ["France", "Germany", "Italy", "Spain", "United Kingdom"],
    },
    {
      name: "Asia",
      description: "Asia, the largest continent, is known for its ancient civilizations, diverse cultures, and technology hubs.",
      image: "images/asia.jpg",
      countries: ["China", "Japan", "India", "South Korea", "Thailand"],
    },
  ];
  
  // Quiz data
  const quizData = {
    Kenya: [
      {
        question: "What is the capital of Kenya?",
        options: ["Nairobi", "Mombasa"],
        correct: "Nairobi",
      },
      {
        question: "Which is the largest city in Kenya?",
        options: ["Nairobi", "Kisumu"],
        correct: "Nairobi",
      },
      {
        question: "What is Kenya’s official language besides English?",
        options: ["Swahili", "Zulu"],
        correct: "Swahili",
      },
      {
        question: "Which famous national park is located in Kenya?",
        options: ["Maasai Mara", "Kruger National Park"],
        correct: "Maasai Mara",
      },
      {
        question: "Which mountain is the highest in Kenya?",
        options: ["Mount Kilimanjaro", "Mount Kenya"],
        correct: "Mount Kenya",
      },
    ],
    France: [
      {
        question: "What is the capital of France?",
        options: ["Paris", "Lyon"],
        correct: "Paris",
      },
      {
        question: "Which famous monument is in Paris?",
        options: ["Eiffel Tower", "Colosseum"],
        correct: "Eiffel Tower",
      },
      {
        question: "What is the national dish of France?",
        options: ["Ratatouille", "Pizza"],
        correct: "Ratatouille",
      },
      {
        question: "What currency is used in France?",
        options: ["Euro", "Franc"],
        correct: "Euro",
      },
      {
        question: "Which famous French painter created 'Water Lilies'?",
        options: ["Claude Monet", "Pablo Picasso"],
        correct: "Claude Monet",
      },
    ],
    China: [
      {
        question: "What is the capital of China?",
        options: ["Beijing", "Shanghai"],
        correct: "Beijing",
      },
      {
        question: "Which famous wall is in China?",
        options: ["The Great Wall of China", "Berlin Wall"],
        correct: "The Great Wall of China",
      },
      {
        question: "What is the traditional Chinese festival held in spring?",
        options: ["Chinese New Year", "Mid-Autumn Festival"],
        correct: "Chinese New Year",
      },
      {
        question: "Which river is known as the longest in China?",
        options: ["Yangtze River", "Yellow River"],
        correct: "Yangtze River",
      },
      {
        question: "Which ancient Chinese philosopher founded Confucianism?",
        options: ["Confucius", "Laozi"],
        correct: "Confucius",
      },
    ],
  };
  
  
  // Populate continents dynamically
  const continentContainer = document.querySelector(".continent-container");
  
  continentData.forEach((continent) => {
    const continentContent = document.createElement("div");
    continentContent.classList.add("continent-content");
  
    const countryListHTML = continent.countries
      .map((country) => `<p class="country" data-country="${country}">${country}</p>`)
      .join("");
  
    continentContent.innerHTML = `
      <div class="content-row">
        <img src="${continent.image}" alt="${continent.name}" class="continent-image">
        <div class="content-details">
          <h2>${continent.name}</h2>
          <p>${continent.description}</p>
          <div class="country-list">${countryListHTML}</div>
        </div>
      </div>
    `;
    continentContainer.appendChild(continentContent);
  });
  
// Modal and score elements
const quizModal = document.getElementById("quizModal");
const quizContent = document.getElementById("quizContent");
const closeBtn = document.getElementById("closeQuiz");

// Audio files
const correctSound = new Audio("audio/correct.mp3");
const wrongSound = new Audio("audio/wrong.wav");
const quizStartSound = new Audio("audio/quiz-start.wav");
const quizEndSound = new Audio("audio/quiz-end.wav");

// Video files
const countryVideos = {
  Kenya: "videos/kenya.mp4",
  France: "videos/france.mp4",
  China: "videos/china.mp4",
};

// Function to start the quiz
function startQuiz(country) {
  const quiz = quizData[country.trim()];
  if (!quiz) {
    alert(`No quiz available for ${country}`);
    return;
  }

  let score = 0;
  let questionIndex = 0;

  // Play quiz start sound
  quizStartSound.play();

  // Display intro video
  const introVideo = document.getElementById("introVideo");
  introVideo.src = countryVideos[country.trim()] || ""; // Load the video for the selected country
  introVideo.onended = () => {
    // Start showing questions after the video ends
    showQuestion();
  };

  // Function to display a question
  function showQuestion() {
    if (questionIndex >= quiz.length) {
      return endQuiz(score, quiz.length); // End quiz when all questions are answered
    }

    const { question, options, correct } = quiz[questionIndex];

    // Update quiz content dynamically
    quizContent.innerHTML = `
      <h2>${country} Quiz</h2>
      <p><strong>Question ${questionIndex + 1}:</strong> ${question}</p>
      <div class="options-container">
        ${options
          .map(
            (option, index) =>
              `<button class="quiz-option" data-answer="${option}">
                ${index + 1}. ${option}
              </button>`
          )
          .join("")}
      </div>
    `;

    // Add event listeners for buttons
    document.querySelectorAll(".quiz-option").forEach((btn) => {
      btn.addEventListener("click", () => {
        if (btn.dataset.answer === correct) {
          correctSound.play(); // Play correct answer sound
          score++;
        } else {
          wrongSound.play(); // Play wrong answer sound
        }

        questionIndex++;
        showQuestion(); // Display the next question
      });
    });
  }

  // Function to end the quiz
  function endQuiz(score, total) {
    const percentage = (score / total) * 100;
    let gradeMessage;
    let gradeSound;

    if (percentage === 100) {
      gradeMessage = "Excellent! You scored 100%! 🎉";
      gradeSound = quizEndSound;
    } else if (percentage >= 50) {
      gradeMessage = `Good job! You scored ${score} out of ${total}.`;
      gradeSound = quizEndSound;
    } else {
      gradeMessage = `You scored ${score} out of ${total}. Try again!`;
      gradeSound = quizEndSound;
    }

    // Play quiz end sound
    gradeSound.play();

    // Display final score
    quizContent.innerHTML = `
      <h2>Quiz Complete!</h2>
      <p>${gradeMessage}</p>
      <button id="closeQuizBtn">Close</button>
    `;

    document.getElementById("closeQuizBtn").addEventListener("click", () => {
      quizModal.style.display = "none";
    });
  }

  // Show modal and start with intro video
  quizModal.style.display = "block";
  introVideo.play();
}

// Add event listeners to country elements
document.querySelectorAll(".country").forEach((country) => {
  country.addEventListener("click", () => {
    startQuiz(country.textContent.trim());
  });
});
