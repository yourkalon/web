// quiz.js

const quizData = [
    {q:"What does CPU stand for?", o:["Central Process Unit","Central Processing Unit","Computer Personal Unit","Central Processor Utility"], a:1},
    {q:"What is Bitcoin?", o:["Bank","Cryptocurrency","Operating System","Stock"], a:1},
    {q:"Which company created the iPhone?", o:["Samsung","Google","Apple","Sony"], a:2},
    {q:"What is inflation?", o:["Price increase","Gaming","Tax refund","Currency crash"], a:0},
    {q:"What does RAM mean?", o:["Run Access Memory","Random Access Memory","Read Action Mode","Rapid Access Mode"], a:1},
    {q:"What is insurance?", o:["Financial protection","Gaming app","Laptop system","Crypto wallet"], a:0},
    {q:"Which company owns Android?", o:["Apple","Google","Meta","Tesla"], a:1},
    {q:"What is a stock market?", o:["Food market","Place to buy shares","Crypto wallet","Insurance office"], a:1},
    {q:"What does HTML stand for?", o:["Hyper Text Markup Language","High Text Machine Language","Hyper Transfer Main Language","Home Tool Markup Language"], a:0},
    {q:"Which device stores data permanently?", o:["RAM","SSD","Cache","CPU"], a:1},
    // ... baki quiz data
];

// RANDOM QUIZ
function shuffleArray(array){
    for(let i = array.length - 1; i > 0; i--){
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
shuffleArray(quizData);

let currentQuiz = 0;
const question = document.getElementById("question");
const options = document.getElementById("options");
const progress = document.getElementById("progress");

function loadQuiz(){
    const data = quizData[currentQuiz];
    question.innerText = data.q;
    options.innerHTML = "";
    progress.innerText = `Quiz ${currentQuiz + 1} / ${quizData.length}`;
    const optionData = data.o.map((option,index)=>({text:option, correct:index===data.a}));
    shuffleArray(optionData);
    optionData.forEach((option)=>{
        const btn = document.createElement("button");
        btn.classList.add("option");
        btn.innerText = option.text;
        btn.onclick = ()=>checkAnswer(option.correct,btn,optionData);
        options.appendChild(btn);
    });
}

function checkAnswer(correct,btn,optionData){
    const allBtns = document.querySelectorAll(".option");
    allBtns.forEach(b=>b.disabled=true);
    if(correct){
        btn.classList.add("correct");
        btn.innerHTML = "✔ " + btn.innerText;
    }else{
        btn.classList.add("wrong");
        btn.innerHTML = "✖ " + btn.innerText;
        optionData.forEach((option,index)=>{
            if(option.correct){
                allBtns[index].classList.add("correct");
                allBtns[index].innerHTML = "✔ " + allBtns[index].innerText;
            }
        });
    }
    setTimeout(()=>{
        currentQuiz++;
        if(currentQuiz < quizData.length){
            loadQuiz();
        }else{
            question.innerHTML = "🎉 Quiz Completed!";
            options.innerHTML = "";
            progress.innerHTML = `You Finished All ${quizData.length} Quiz`;
        }
    },1800);
}

// LOAD QUIZ FIRST
loadQuiz();

// HIDE OVERLAY AFTER 15 SEC
setTimeout(()=>{
    const overlay = document.getElementById("loadingOverlay");
    overlay.style.opacity = "0";
    overlay.style.visibility = "hidden";
},15000);
