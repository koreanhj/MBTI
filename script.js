const questions = [
  {
    text: "자녀가 에너지를 얻는 방식은?",
    a: "친구, 활동, 대화 속에서 활력을 얻는다.",
    b: "혼자 쉬거나 생각을 정리할 때 회복된다.",
    typeA: "E",
    typeB: "I"
  },
  {
    text: "학교에서 돌아온 뒤 자녀의 모습은?",
    a: "오늘 있었던 일을 바로 이야기하고 싶어 한다.",
    b: "방에서 조용히 쉬고 난 뒤 이야기하고 싶어 한다.",
    typeA: "E",
    typeB: "I"
  },
  {
    text: "자녀가 정보를 이해하는 방식은?",
    a: "구체적인 사실, 경험, 현실적인 예시를 좋아한다.",
    b: "가능성, 상상, 미래 이야기를 좋아한다.",
    typeA: "S",
    typeB: "N"
  },
  {
    text: "진로 이야기를 할 때 자녀는?",
    a: "안정성, 현실성, 실제 조건을 중요하게 본다.",
    b: "꿈, 의미, 새로운 가능성을 중요하게 본다.",
    typeA: "S",
    typeB: "N"
  },
  {
    text: "갈등 상황에서 자녀가 원하는 반응은?",
    a: "문제의 원인과 해결 방법을 함께 찾는 것",
    b: "먼저 내 마음을 알아주고 공감해 주는 것",
    typeA: "T",
    typeB: "F"
  },
  {
    text: "친구와 다툰 뒤 자녀에게 더 필요한 말은?",
    a: "무엇이 문제였는지 차분히 생각해 보자.",
    b: "많이 속상했겠다. 네 마음이 힘들었겠구나.",
    typeA: "T",
    typeB: "F"
  },
  {
    text: "공부 계획을 세울 때 자녀는?",
    a: "계획표, 마감일, 순서가 정해져야 편하다.",
    b: "상황에 따라 유연하게 조정하는 것이 편하다.",
    typeA: "J",
    typeB: "P"
  },
  {
    text: "과제를 할 때 자녀의 방식은?",
    a: "미리 끝내고 안정감을 느끼는 편이다.",
    b: "마감이 가까워질수록 집중력이 올라오는 편이다.",
    typeA: "J",
    typeB: "P"
  }
];

let current = 0;
let score = {
  E: 0, I: 0,
  S: 0, N: 0,
  T: 0, F: 0,
  J: 0, P: 0
};

const questionNumber = document.getElementById("questionNumber");
const questionText = document.getElementById("questionText");
const choiceA = document.getElementById("choiceA");
const choiceB = document.getElementById("choiceB");
const progressBar = document.getElementById("progressBar");
const quizArea = document.getElementById("quizArea");
const resultArea = document.getElementById("resultArea");

function showQuestion() {
  const q = questions[current];

  questionNumber.textContent = `${current + 1} / ${questions.length}`;
  questionText.textContent = q.text;
  choiceA.textContent = q.a;
  choiceB.textContent = q.b;

  progressBar.style.width = `${(current / questions.length) * 100}%`;

  choiceA.onclick = () => selectAnswer(q.typeA);
  choiceB.onclick = () => selectAnswer(q.typeB);
}

function selectAnswer(type) {
  score[type]++;
  current++;

  if (current < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  progressBar.style.width = "100%";

  const mbti =
    (score.E >= score.I ? "E" : "I") +
    (score.S >= score.N ? "S" : "N") +
    (score.T >= score.F ? "T" : "F") +
    (score.J >= score.P ? "J" : "P");

  quizArea.classList.add("hidden");
  resultArea.classList.remove("hidden");

  document.getElementById("mbtiResult").textContent = mbti;
  document.getElementById("resultDesc").textContent = getDescription(mbti);

  const tips = document.getElementById("tips");
  tips.innerHTML = "";

  getTips(mbti).forEach(tip => {
    const li = document.createElement("li");
    li.textContent = tip;
    tips.appendChild(li);
  });
}

function getDescription(mbti) {
  const descriptions = {
    ISTJ: "차분하고 책임감이 강하며, 정해진 규칙과 안정적인 환경을 선호하는 아이일 수 있습니다.",
    ISFJ: "섬세하고 배려심이 많으며, 익숙하고 안정적인 관계 안에서 편안함을 느끼는 아이일 수 있습니다.",
    INFJ: "생각이 깊고 의미를 중요하게 여기며, 자신의 내면세계를 존중받고 싶어 하는 아이일 수 있습니다.",
    INTJ: "독립적이고 목표 지향적이며, 논리적인 설명과 자율성을 중요하게 여기는 아이일 수 있습니다.",
    ISTP: "실용적이고 관찰력이 좋으며, 직접 해 보면서 배우는 것을 좋아하는 아이일 수 있습니다.",
    ISFP: "감수성이 풍부하고 자유로운 분위기를 좋아하며, 강요보다 존중에 잘 반응하는 아이일 수 있습니다.",
    INFP: "상상력이 풍부하고 가치관이 뚜렷하며, 자신의 마음을 이해받는 것을 중요하게 여기는 아이일 수 있습니다.",
    INTP: "호기심이 많고 분석적이며, 스스로 생각할 시간을 충분히 필요로 하는 아이일 수 있습니다.",
    ESTP: "활동적이고 현실 감각이 좋으며, 직접 경험하고 움직이면서 배우는 것을 좋아하는 아이일 수 있습니다.",
    ESFP: "밝고 표현력이 좋으며, 즐거운 분위기와 즉각적인 칭찬에 힘을 얻는 아이일 수 있습니다.",
    ENFP: "열정적이고 아이디어가 많으며, 가능성을 열어 주는 대화에 잘 반응하는 아이일 수 있습니다.",
    ENTP: "재치 있고 토론을 좋아하며, 새로운 관점과 도전을 즐기는 아이일 수 있습니다.",
    ESTJ: "체계적이고 책임감이 강하며, 명확한 기준과 목표가 있을 때 안정감을 느끼는 아이일 수 있습니다.",
    ESFJ: "사교적이고 관계를 중요하게 여기며, 인정과 따뜻한 말에 큰 힘을 얻는 아이일 수 있습니다.",
    ENFJ: "공감 능력이 좋고 사람을 잘 챙기며, 의미 있는 목표와 관계 속에서 성장하는 아이일 수 있습니다.",
    ENTJ: "주도적이고 목표 의식이 강하며, 도전적인 과제와 논리적인 대화를 좋아하는 아이일 수 있습니다."
  };

  return descriptions[mbti];
}

function getTips(mbti) {
  const tips = [];

  if (mbti.includes("I")) {
    tips.push("학교에서 돌아온 직후에는 질문보다 충전 시간을 먼저 주세요.");
    tips.push("말이 적다고 문제가 있다고 단정하지 말고, 기다려 주세요.");
  } else {
    tips.push("대화를 통해 에너지를 얻을 수 있으므로 짧은 대화 시간을 자주 만들어 주세요.");
  }

  if (mbti.includes("N")) {
    tips.push("꿈이나 가능성을 먼저 인정한 뒤, 현실적인 계획을 함께 세워 주세요.");
  } else {
    tips.push("구체적인 예시와 현실적인 기준을 제시하면 더 잘 이해할 수 있습니다.");
  }

  if (mbti.includes("F")) {
    tips.push("문제 해결보다 감정 공감이 먼저입니다. '속상했겠다'는 말부터 건네 보세요.");
  } else {
    tips.push("감정을 인정한 뒤 원인과 해결책을 차분히 함께 정리해 주세요.");
  }

  if (mbti.includes("P")) {
    tips.push("긴 계획표보다 짧은 목표와 체크리스트가 더 효과적일 수 있습니다.");
  } else {
    tips.push("계획, 순서, 마감일을 함께 정하면 안정감을 느낄 수 있습니다.");
  }

  return tips;
}

function restartQuiz() {
  current = 0;
  score = {
    E: 0, I: 0,
    S: 0, N: 0,
    T: 0, F: 0,
    J: 0, P: 0
  };

  resultArea.classList.add("hidden");
  quizArea.classList.remove("hidden");
  showQuestion();
}

showQuestion();
