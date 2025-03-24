document.addEventListener('DOMContentLoaded', function() {
    const memoryGame = document.getElementById('memory-game');
    const startGameBtn = document.getElementById('start-game');
    const resetGameBtn = document.getElementById('reset-game');
    if (memoryGame && startGameBtn && resetGameBtn) {
        const wordPairs = [
            { slovak: 'Ahoj', english: 'Hello' },
            { slovak: 'Ďakujem', english: 'Thank you' },
            { slovak: 'Prosím', english: 'Please' },
            { slovak: 'Áno', english: 'Yes' },
            { slovak: 'Nie', english: 'No' },
            { slovak: 'Dobrý deň', english: 'Good day' }
        ];
        let cards = [];
        let flippedCards = [];
        let matchedPairs = 0;
        let isProcessing = false;
        function initGame() {
            memoryGame.innerHTML = '';
            cards = [];
            flippedCards = [];
            matchedPairs = 0;
            isProcessing = false;
            const allCards = [];
            wordPairs.forEach(pair => {
                allCards.push({ text: pair.slovak, type: 'slovak', pair: pair.english });
                allCards.push({ text: pair.english, type: 'english', pair: pair.slovak });
            });
            const shuffledCards = shuffleArray(allCards);
            shuffledCards.forEach((card, index) => {
                const cardElement = document.createElement('div');
                cardElement.className = 'memory-card';
                cardElement.dataset.index = index;
                cardElement.dataset.text = card.text;
                cardElement.dataset.type = card.type;
                cardElement.dataset.pair = card.pair;
                cardElement.addEventListener('click', flipCard);
                memoryGame.appendChild(cardElement);
                cards.push(cardElement);
            });
        }
        function flipCard() {
            if (this.classList.contains('flipped') || isProcessing) {
                return;
            }
            if (flippedCards.length === 2) {
                return;
            }
            this.classList.add('flipped');
            this.textContent = this.dataset.text;
            flippedCards.push(this);
            if (flippedCards.length === 2) {
                isProcessing = true;
                const card1 = flippedCards[0];
                const card2 = flippedCards[1];
                if ((card1.dataset.type === 'slovak' && card2.dataset.type === 'english' && card1.dataset.text === card2.dataset.pair) ||
                    (card1.dataset.type === 'english' && card2.dataset.type === 'slovak' && card1.dataset.text === card2.dataset.pair)) {
                    setTimeout(() => {
                        card1.style.backgroundColor = '#2ecc71';
                        card2.style.backgroundColor = '#2ecc71';
                        card1.removeEventListener('click', flipCard);
                        card2.removeEventListener('click', flipCard);
                        flippedCards = [];
                        isProcessing = false;
                        matchedPairs++;
                        if (matchedPairs === wordPairs.length) {
                            setTimeout(() => {
                                alert('Congratulations! You matched all pairs!');
                            }, 500);
                        }
                    }, 1000);
                } else {
                    setTimeout(() => {
                        card1.classList.remove('flipped');
                        card2.classList.remove('flipped');
                        card1.textContent = '';
                        card2.textContent = '';
                        flippedCards = [];
                        isProcessing = false;
                    }, 1500);
                }
            }
        }
        startGameBtn.addEventListener('click', function() {
            initGame();
            this.textContent = 'Restart Game';
        });
        resetGameBtn.addEventListener('click', function() {
            initGame();
        });
        function shuffleArray(array) {
            const newArray = [...array];
            for (let i = newArray.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
            }
            return newArray;
        }
    }
 });
