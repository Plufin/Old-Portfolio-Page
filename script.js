const galleryImages = document.querySelectorAll(".galleryImage");
const modal = document.getElementById("imageModal");
const modalImage = document.getElementById("modalImage");
const hoveredScaleFactor = 1.1;
const sideScaleFactor = 1;
const outerScaleFactor = 0.8;
const hoveredOpacity = 1;
const sideOpacity = 0.6;
const outerOpacity = 0.6;
const navImg = document.querySelector('.navImg');
const navMenu = document.querySelector('.ulNav');

//NAV

navImg.addEventListener('click', () => {
    if (getComputedStyle(navMenu).opacity === '0') {
        navMenu.style.opacity = '1'; // Show the menu
        navImg.classList.add('clicked');
    } else {
        navMenu.style.opacity = '0'; // Hide the menu
        navImg.classList.remove('clicked');
    }
});

//GALLERY
galleryImages.forEach((image, index) => {
    image.addEventListener('mouseover', () => {
      galleryImages.forEach((img, i) => {
        const distance = Math.abs(i - index);
        if (distance === 0) {
          img.style.transform = `scale(${hoveredScaleFactor})`;
          img.style.opacity = hoveredOpacity;
          img.style.zIndex = '3';
        } else if (distance === 1) {
          img.style.transform = `scale(${sideScaleFactor})`;
          img.style.opacity = sideOpacity;
          img.style.zIndex = '2';
        } else {
          img.style.transform = `scale(${outerScaleFactor})`;
          img.style.opacity = outerOpacity;
          img.style.zIndex = '1';
        }
      });
    });
  
    image.addEventListener('mouseleave', () => {
      galleryImages.forEach(img => {
        img.style.transform = 'scale(1)';
        img.style.opacity = '1';
        img.style.zIndex = '1';
      });
    });
  });
//QUIZ
const Questions = [{
    q: "2+1 =",
    a: [{ text: "1", isCorrect: false },
    { text: "2", isCorrect: false },
    { text: "3", isCorrect: true },
    ]
 
},
{
    q: "2-1 =",
    a: [{ text: "1", isCorrect: true},
    { text: "2", isCorrect: false },
    { text: "3", isCorrect: false },
    ]
 
},
{
    q: "2*1 =",
    a: [{ text: "1", isCorrect: false },
    { text: "2", isCorrect: true },
    { text: "3", isCorrect: false },
    ]
 
}
]
 
let currQuestion = 0
let score = 0
 
function loadQues() {
    const question = document.getElementById("ques")
    const opt = document.getElementById("opt")
 
    question.textContent = Questions[currQuestion].q;
    opt.innerHTML = ""
 
    for (let i = 0; i < Questions[currQuestion].a.length; i++) {
        const choicesdiv = document.createElement("div");
        const choice = document.createElement("input");
        const choiceLabel = document.createElement("label");
 
        choice.type = "radio";
        choice.name = "answer";
        choice.value = i;
 
        choiceLabel.textContent = Questions[currQuestion].a[i].text;
 
        choicesdiv.appendChild(choice);
        choicesdiv.appendChild(choiceLabel);
        opt.appendChild(choicesdiv);
    }
}
 
loadQues();
 
function loadScore() {
    const totalScore = document.getElementById("score")
    totalScore.textContent = `You scored ${score} out of ${Questions.length}`
}
 
 
function nextQuestion() {
    if (currQuestion < Questions.length - 1) {
        currQuestion++;
        loadQues();
    } else {
        document.getElementById("opt").remove()
        document.getElementById("ques").remove()
        document.getElementById("btn").remove()
        loadScore();
    }
}
 
function checkAns() {
    const selectedAns = parseInt(document.querySelector('input[name="answer"]:checked').value);
 
    if (Questions[currQuestion].a[selectedAns].isCorrect) {
        score++;
        console.log("Correct")
        nextQuestion();
    } else {
        nextQuestion();
    }
}
//END QUIZ

//MODAL
galleryImages.forEach((image) => {
    image.addEventListener("click", () => {
        modalImage.src = image.src;
        modal.style.display = "block";
    });
});

document.getElementById("closeModal").addEventListener("click", () => {
    modal.style.display = "none";
});