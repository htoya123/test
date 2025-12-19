const riddles = [
    {
        text: "Я впервые испытал это именно с тобой",
        answer: "любовь"
    },
    {
        text: "Оно бьётся, когда ты рядом, его нельзя остановить, когда волнуешься",
        answer: "сердце"
    },
    {
        text: "Это не всегда про кровь, это про людей, с которыми хочется быть всегда",
        answer: "семья"
    },
    {
        text: "Я ненавидел этот месяц из-за жары и сессии, но ты подарила мне счастье именно тогда",
        answer: "июнь"
    },
    {
        text: "Финалочка, обитатели острова Олух.",
        answer: "драконы"
    }
];

let current = 0;

const questionEl = document.getElementById("question");
const answerEl = document.getElementById("answer");
const messageEl = document.getElementById("message");

questionEl.textContent = riddles[current].text;

function checkAnswer() {
    const userAnswer = answerEl.value.trim().toLowerCase();

    if (userAnswer === riddles[current].answer) {
        current++;
        answerEl.value = "";
        messageEl.textContent = "";

        if (current < riddles.length) {
            questionEl.textContent = riddles[current].text;
        } else {
            questionEl.innerHTML = `
                Пы❤️. <br>
                <br>
                <br>
                <br>
                Я тебя очень люлю, ты умничка
            `;
            answerEl.style.display = "none";
            document.querySelector("button").style.display = "none";
        }
    } else {
        messageEl.textContent = "Подумай ещё 🙂";
    }
}
