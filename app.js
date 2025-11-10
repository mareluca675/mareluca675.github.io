// App State
let currentMode = 'browse';
let currentCategory = 'all';
let currentFlashcardIndex = 0;
let allVocabulary = getAllVocabularyItems();
let flashcardItems = [];
let quizItems = [];
let currentQuizIndex = 0;
let quizScore = 0;
let selectedAnswer = null;
let fillinItems = [];
let currentFillinIndex = 0;
let fillinScore = 0;
let matchingItems = [];
let matchingSelectedTerm = null;
let matchingMatches = 0;
let matchingPairs = [];
let searchQuery = '';
let showFavoritesOnly = false;
let sortBy = 'default';

// User Data (stored in localStorage)
let userData = JSON.parse(localStorage.getItem('vocabUserData')) || {
    favorites: [],
    studied: {},
    mastered: {},
    correct: {},
    incorrect: {},
    streak: 0,
    lastStudyDate: null,
    studyTime: 0,
    wordOfDay: null,
    wordOfDayDate: null,
    spacedRepetition: {},
    recentActivity: []
};

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function initializeApp() {
    setupModeSwitching();
    setupCategoryFiltering();
    setupFlashcards();
    setupQuiz();
    setupFillin();
    setupMatching();
    setupSearch();
    setupTheme();
    setupFavorites();
    setupStatistics();
    setupDailyChallenges();
    setupKeyboardShortcuts();
    checkStreak();
    displayVocabulary();
}

// Mode Switching
function setupModeSwitching() {
    const modeButtons = document.querySelectorAll('.mode-btn');
    modeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const mode = btn.dataset.mode;
            switchMode(mode);
        });
    });
}

function switchMode(mode) {
    currentMode = mode;
    
    // Update active button
    document.querySelectorAll('.mode-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.mode === mode);
    });
    
    // Update active content
    document.querySelectorAll('.mode-content').forEach(content => {
        content.classList.toggle('active', content.id === `${mode}-mode`);
    });
    
    // Mode-specific initialization
    if (mode === 'flashcards') {
        // Reset flashcard to front when switching to flashcard mode
        const flashcard = document.getElementById('flashcard');
        if (flashcard) {
            flashcard.classList.remove('flipped');
        }
        initializeFlashcards();
    } else if (mode === 'quiz') {
        initializeQuiz();
    } else if (mode === 'fillin') {
        initializeFillin();
    } else if (mode === 'matching') {
        initializeMatching();
    } else if (mode === 'statistics') {
        updateStatistics();
    } else if (mode === 'challenges') {
        updateStreakDisplay();
    }
}

// Category Filtering
function setupCategoryFiltering() {
    const categoryButtons = document.querySelectorAll('.category-btn');
    categoryButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            currentCategory = btn.dataset.category;
            categoryButtons.forEach(b => b.classList.toggle('active', b === btn));
            displayVocabulary();
        });
    });
}

function displayVocabulary() {
    const container = document.getElementById('vocabulary-list');
    container.innerHTML = '';
    
    let items = allVocabulary;
    
    // Filter by category
    if (currentCategory !== 'all') {
        const categoryMap = {
            'adverb-adjectives': 'adverbAdjectives',
            'adjective-nouns': 'adjectiveNouns',
            'verb-phrases': 'verbPhrases',
            'phrasal-verbs': 'phrasalVerbs'
        };
        const jsCategory = categoryMap[currentCategory] || currentCategory;
        items = items.filter(item => item.category === jsCategory);
    }
    
    // Filter by search query
    if (searchQuery) {
        items = items.filter(item => 
            item.term.toLowerCase().includes(searchQuery) ||
            item.meaning.toLowerCase().includes(searchQuery)
        );
    }
    
    // Filter by favorites
    if (showFavoritesOnly) {
        items = items.filter(item => isFavorite(item));
    }
    
    // Sort items
    if (sortBy === 'alphabetical') {
        items.sort((a, b) => a.term.localeCompare(b.term));
    } else if (sortBy === 'category') {
        items.sort((a, b) => a.category.localeCompare(b.category));
    }
    
    items.forEach(item => {
        const vocabItem = createVocabItem(item);
        container.appendChild(vocabItem);
    });
    
    if (items.length === 0) {
        container.innerHTML = '<div class="no-results">No vocabulary items found. Try adjusting your search or filters.</div>';
    }
}

function createVocabItem(item) {
    const div = document.createElement('div');
    div.className = 'vocab-item';
    
    const itemHeader = document.createElement('div');
    itemHeader.className = 'vocab-item-header';
    
    const category = document.createElement('div');
    category.className = 'vocab-category';
    category.textContent = formatCategoryName(item.category);
    
    const actions = document.createElement('div');
    actions.className = 'vocab-actions';
    
    const favoriteBtn = document.createElement('button');
    favoriteBtn.className = 'btn-icon vocab-favorite';
    favoriteBtn.innerHTML = isFavorite(item) ? '⭐' : '☆';
    favoriteBtn.title = isFavorite(item) ? 'Remove from favorites' : 'Add to favorites';
    favoriteBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleFavorite(item);
        favoriteBtn.innerHTML = isFavorite(item) ? '⭐' : '☆';
        favoriteBtn.title = isFavorite(item) ? 'Remove from favorites' : 'Add to favorites';
        if (showFavoritesOnly) {
            displayVocabulary();
        }
    });
    
    const audioBtn = document.createElement('button');
    audioBtn.className = 'btn-icon vocab-audio';
    audioBtn.innerHTML = '🔊';
    audioBtn.title = 'Pronounce';
    audioBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        pronounceWord(item.term);
    });
    
    actions.appendChild(favoriteBtn);
    actions.appendChild(audioBtn);
    
    const term = document.createElement('div');
    term.className = 'vocab-term';
    term.textContent = item.term;
    
    const meaning = document.createElement('div');
    meaning.className = 'vocab-meaning';
    meaning.textContent = item.meaning;
    
    const examples = document.createElement('div');
    examples.className = 'vocab-examples';
    const exampleSentences = generateExampleSentences(item);
    if (exampleSentences.length > 0) {
        examples.innerHTML = '<strong>Examples:</strong><ul>' + 
            exampleSentences.map(ex => `<li>${ex}</li>`).join('') + 
            '</ul>';
    }
    
    itemHeader.appendChild(category);
    itemHeader.appendChild(actions);
    
    div.appendChild(itemHeader);
    div.appendChild(term);
    div.appendChild(meaning);
    div.appendChild(examples);
    
    // Track when item is viewed
    div.addEventListener('click', () => {
        markAsStudied(item);
    });
    
    return div;
}

function formatCategoryName(category) {
    const names = {
        'words': 'Word',
        'adverbAdjectives': 'Adverb + Adjective',
        'adjectiveNouns': 'Adjective + Noun',
        'idioms': 'Idiom',
        'phrases': 'Phrase',
        'verbPhrases': 'Verb + Phrase',
        'phrasalVerbs': 'Phrasal Verb'
    };
    return names[category] || category;
}

// Flashcard Functionality
function setupFlashcards() {
    const flipButton = document.getElementById('flip-card');
    const prevButton = document.getElementById('prev-card');
    const nextButton = document.getElementById('next-card');
    
    flipButton.addEventListener('click', (e) => {
        e.stopPropagation();
        flipFlashcard();
    });
    
    prevButton.addEventListener('click', (e) => {
        e.stopPropagation();
        changeFlashcard(-1);
    });
    
    nextButton.addEventListener('click', (e) => {
        e.stopPropagation();
        changeFlashcard(1);
    });
    
    // Only allow clicking on the card itself, not on buttons or text
    const flashcard = document.getElementById('flashcard');
    const flashcardInner = flashcard.querySelector('.flashcard-inner');
    
    flashcardInner.addEventListener('click', (e) => {
        // Don't flip if clicking on buttons
        if (e.target.closest('.btn')) {
            return;
        }
        flipFlashcard();
    });
}

function initializeFlashcards() {
    // Make sure allVocabulary is loaded
    if (!allVocabulary || allVocabulary.length === 0) {
        allVocabulary = getAllVocabularyItems();
    }
    
    flashcardItems = [...allVocabulary];
    if (flashcardItems.length === 0) {
        console.error('No vocabulary items available');
        return;
    }
    
    shuffleArray(flashcardItems);
    currentFlashcardIndex = 0;
    displayFlashcard();
}

function displayFlashcard() {
    if (flashcardItems.length === 0) {
        const termEl = document.getElementById('flashcard-term');
        if (termEl) termEl.textContent = 'No items available';
        return;
    }
    
    const item = flashcardItems[currentFlashcardIndex];
    if (!item) {
        return;
    }
    
    const flashcard = document.getElementById('flashcard');
    if (!flashcard) {
        return;
    }
    
    // Reset card to front side when displaying new card
    flashcard.classList.remove('flipped');
    
    // Update content
    const categoryEl = document.getElementById('flashcard-category');
    const categoryBackEl = document.getElementById('flashcard-category-back');
    const termEl = document.getElementById('flashcard-term');
    const termBackEl = document.getElementById('flashcard-term-back');
    const meaningEl = document.getElementById('flashcard-meaning');
    
    if (categoryEl) categoryEl.textContent = formatCategoryName(item.category);
    if (categoryBackEl) categoryBackEl.textContent = formatCategoryName(item.category);
    if (termEl) termEl.textContent = item.term;
    if (termBackEl) termBackEl.textContent = item.term;
    if (meaningEl) meaningEl.textContent = item.meaning;
    
    // Update counter and progress
    const counterEl = document.getElementById('flashcard-counter');
    const progressEl = document.getElementById('flashcard-progress');
    if (counterEl) {
        counterEl.textContent = `${currentFlashcardIndex + 1} / ${flashcardItems.length}`;
    }
    if (progressEl) {
        const progressPercent = ((currentFlashcardIndex + 1) / flashcardItems.length) * 100;
        progressEl.style.width = `${progressPercent}%`;
    }
    
    // Add examples
    const examplesDiv = document.getElementById('flashcard-examples');
    if (examplesDiv) {
        const examples = generateExampleSentences(item);
        if (examples.length > 0) {
            examplesDiv.innerHTML = '<strong>Examples:</strong><ul>' + 
                examples.map(ex => `<li>${ex}</li>`).join('') + 
                '</ul>';
        } else {
            examplesDiv.innerHTML = '';
        }
    }
    
    // Setup audio buttons
    const audioFront = document.getElementById('flashcard-audio-front');
    const audioBack = document.getElementById('flashcard-audio-back');
    if (audioFront) {
        audioFront.onclick = (e) => {
            e.stopPropagation();
            pronounceWord(item.term);
        };
    }
    if (audioBack) {
        audioBack.onclick = (e) => {
            e.stopPropagation();
            pronounceWord(item.term);
        };
    }
}

function flipFlashcard() {
    const flashcard = document.getElementById('flashcard');
    if (flashcardItems.length === 0) return;
    flashcard.classList.toggle('flipped');
}

function changeFlashcard(direction) {
    if (flashcardItems.length === 0) return;
    
    // Reset to front side immediately
    const flashcard = document.getElementById('flashcard');
    flashcard.classList.remove('flipped');
    
    // Update index
    currentFlashcardIndex += direction;
    
    if (currentFlashcardIndex < 0) {
        currentFlashcardIndex = flashcardItems.length - 1;
    } else if (currentFlashcardIndex >= flashcardItems.length) {
        currentFlashcardIndex = 0;
    }
    
    // Display new card (will reset to front)
    displayFlashcard();
}

// Quiz Functionality
function setupQuiz() {
    document.getElementById('next-question').addEventListener('click', nextQuizQuestion);
    document.getElementById('restart-quiz').addEventListener('click', initializeQuiz);
}

function initializeQuiz() {
    quizItems = [...allVocabulary];
    shuffleArray(quizItems);
    currentQuizIndex = 0;
    quizScore = 0;
    selectedAnswer = null;
    
    document.getElementById('quiz-complete').style.display = 'none';
    document.getElementById('quiz-question').style.display = 'block';
    document.getElementById('quiz-result').style.display = 'none';
    
    displayQuizQuestion();
}

function displayQuizQuestion() {
    if (currentQuizIndex >= quizItems.length) {
        showQuizComplete();
        return;
    }
    
    const item = quizItems[currentQuizIndex];
    const questionDiv = document.getElementById('quiz-question');
    const resultDiv = document.getElementById('quiz-result');
    
    questionDiv.style.display = 'block';
    resultDiv.style.display = 'none';
    
    document.getElementById('quiz-category').textContent = formatCategoryName(item.category);
    document.getElementById('quiz-prompt').textContent = `What does "${item.term}" mean?`;
    
    // Generate wrong answers
    const wrongAnswers = getRandomWrongAnswers(item, 3);
    const allAnswers = [item.meaning, ...wrongAnswers];
    shuffleArray(allAnswers);
    
    const optionsContainer = document.getElementById('quiz-options');
    optionsContainer.innerHTML = '';
    
    allAnswers.forEach((answer, index) => {
        const option = document.createElement('div');
        option.className = 'quiz-option';
        option.textContent = answer;
        option.addEventListener('click', () => selectAnswer(option, answer === item.meaning, item));
        optionsContainer.appendChild(option);
    });
    
    document.getElementById('quiz-question-num').textContent = currentQuizIndex + 1;
    document.getElementById('quiz-total').textContent = quizItems.length;
    document.getElementById('quiz-score').textContent = quizScore;
}

function getRandomWrongAnswers(correctItem, count) {
    const wrongItems = allVocabulary.filter(item => 
        item.meaning !== correctItem.meaning && item.category === correctItem.category
    );
    
    if (wrongItems.length < count) {
        // If not enough items in same category, use any items
        const allWrong = allVocabulary.filter(item => item.meaning !== correctItem.meaning);
        return allWrong.slice(0, count).map(item => item.meaning);
    }
    
    shuffleArray(wrongItems);
    return wrongItems.slice(0, count).map(item => item.meaning);
}

function selectAnswer(optionElement, isCorrect, item) {
    if (selectedAnswer !== null) return;
    
    selectedAnswer = isCorrect;
    
    // Disable all options
    document.querySelectorAll('.quiz-option').forEach(opt => {
        opt.classList.add('disabled');
        opt.style.pointerEvents = 'none';
    });
    
    // Mark correct/incorrect
    if (isCorrect) {
        optionElement.classList.add('correct');
        quizScore++;
        const key = `${item.category}-${item.term}`;
        if (!userData.correct[key]) {
            userData.correct[key] = 0;
        }
        userData.correct[key]++;
        saveUserData();
    } else {
        optionElement.classList.add('incorrect');
        const key = `${item.category}-${item.term}`;
        if (!userData.incorrect[key]) {
            userData.incorrect[key] = 0;
        }
        userData.incorrect[key]++;
        saveUserData();
        // Also highlight the correct answer
        document.querySelectorAll('.quiz-option').forEach(opt => {
            if (opt.textContent === item.meaning) {
                opt.classList.add('correct');
            }
        });
    }
    
    // Show result
    setTimeout(() => {
        showQuizResult(isCorrect);
    }, 500);
}

function showQuizResult(isCorrect) {
    const resultDiv = document.getElementById('quiz-result');
    const messageDiv = document.getElementById('result-message');
    
    resultDiv.style.display = 'block';
    messageDiv.textContent = isCorrect ? '✓ Correct!' : '✗ Incorrect';
    messageDiv.className = `result-message ${isCorrect ? 'correct' : 'incorrect'}`;
}

function nextQuizQuestion() {
    currentQuizIndex++;
    selectedAnswer = null;
    displayQuizQuestion();
}

function showQuizComplete() {
    document.getElementById('quiz-question').style.display = 'none';
    document.getElementById('quiz-result').style.display = 'none';
    document.getElementById('quiz-complete').style.display = 'block';
    
    const percentage = Math.round((quizScore / quizItems.length) * 100);
    document.getElementById('final-score').textContent = quizScore;
    document.getElementById('final-total').textContent = quizItems.length;
    document.getElementById('score-percentage').textContent = `${percentage}%`;
}

// Fill-in Functionality
function setupFillin() {
    document.getElementById('fillin-submit').addEventListener('click', submitFillinAnswer);
    document.getElementById('fillin-input').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            submitFillinAnswer();
        }
    });
    document.getElementById('fillin-next').addEventListener('click', nextFillinQuestion);
    document.getElementById('fillin-restart').addEventListener('click', initializeFillin);
}

function initializeFillin() {
    fillinItems = [...allVocabulary];
    shuffleArray(fillinItems);
    currentFillinIndex = 0;
    fillinScore = 0;
    
    document.getElementById('fillin-complete').style.display = 'none';
    document.getElementById('fillin-question').style.display = 'block';
    document.getElementById('fillin-result').style.display = 'none';
    
    displayFillinQuestion();
}

function displayFillinQuestion() {
    if (currentFillinIndex >= fillinItems.length) {
        showFillinComplete();
        return;
    }
    
    const item = fillinItems[currentFillinIndex];
    const questionDiv = document.getElementById('fillin-question');
    const resultDiv = document.getElementById('fillin-result');
    
    questionDiv.style.display = 'block';
    resultDiv.style.display = 'none';
    
    document.getElementById('fillin-category').textContent = formatCategoryName(item.category);
    
    // Alternate between asking for term and meaning
    const askForTerm = currentFillinIndex % 2 === 0;
    let prompt, correctAnswer;
    
    if (askForTerm) {
        prompt = `What term means: "${item.meaning}"?`;
        correctAnswer = item.term.toLowerCase();
    } else {
        prompt = `What does "${item.term}" mean?`;
        correctAnswer = item.meaning.toLowerCase();
    }
    
    document.getElementById('fillin-prompt').textContent = prompt;
    document.getElementById('fillin-prompt').dataset.answerType = askForTerm ? 'term' : 'meaning';
    document.getElementById('fillin-prompt').dataset.correctAnswer = askForTerm ? item.term : item.meaning;
    
    document.getElementById('fillin-input').value = '';
    document.getElementById('fillin-input').focus();
    document.getElementById('fillin-hint').textContent = '';
    
    document.getElementById('fillin-question-num').textContent = currentFillinIndex + 1;
    document.getElementById('fillin-total').textContent = fillinItems.length;
    document.getElementById('fillin-score').textContent = fillinScore;
}

function submitFillinAnswer() {
    const input = document.getElementById('fillin-input');
    const userAnswer = input.value.trim().toLowerCase();
    const promptDiv = document.getElementById('fillin-prompt');
    const answerType = promptDiv.dataset.answerType;
    const correctAnswerText = promptDiv.dataset.correctAnswer;
    const correctAnswer = correctAnswerText.toLowerCase();
    const item = fillinItems[currentFillinIndex];
    
    // Check if answer is correct (allow for some flexibility)
    const isCorrect = userAnswer === correctAnswer || 
                     checkAnswerSimilarity(userAnswer, correctAnswer);
    
    const questionDiv = document.getElementById('fillin-question');
    const resultDiv = document.getElementById('fillin-result');
    
    questionDiv.style.display = 'none';
    resultDiv.style.display = 'block';
    
    const messageDiv = document.getElementById('fillin-result-message');
    messageDiv.textContent = isCorrect ? '✓ Correct!' : '✗ Incorrect';
    messageDiv.className = `result-message ${isCorrect ? 'correct' : 'incorrect'}`;
    
    if (!isCorrect) {
        document.getElementById('fillin-correct-answer').textContent = `Correct answer: "${correctAnswerText}"`;
        document.getElementById('fillin-correct-answer').style.display = 'block';
    } else {
        document.getElementById('fillin-correct-answer').style.display = 'none';
        fillinScore++;
    }
}

function checkAnswerSimilarity(userAnswer, correctAnswer) {
    // Remove common variations and compare
    const normalize = (str) => str.replace(/[.,;:!?'"]/g, '').trim();
    const normalizedUser = normalize(userAnswer);
    const normalizedCorrect = normalize(correctAnswer);
    
    // Exact match after normalization
    if (normalizedUser === normalizedCorrect) return true;
    
    // Check if user answer contains the correct answer or vice versa (for longer meanings)
    if (normalizedCorrect.length > 20) {
        return normalizedCorrect.includes(normalizedUser) || normalizedUser.includes(normalizedCorrect);
    }
    
    return false;
}

function nextFillinQuestion() {
    currentFillinIndex++;
    displayFillinQuestion();
}

function showFillinComplete() {
    document.getElementById('fillin-question').style.display = 'none';
    document.getElementById('fillin-result').style.display = 'none';
    document.getElementById('fillin-complete').style.display = 'block';
    
    const percentage = Math.round((fillinScore / fillinItems.length) * 100);
    document.getElementById('fillin-final-score').textContent = fillinScore;
    document.getElementById('fillin-final-total').textContent = fillinItems.length;
    document.getElementById('fillin-score-percentage').textContent = `${percentage}%`;
}

// Matching Functionality
function setupMatching() {
    document.getElementById('matching-restart').addEventListener('click', initializeMatching);
}

function initializeMatching() {
    // Select 6 random items for matching
    matchingItems = [...allVocabulary];
    shuffleArray(matchingItems);
    matchingItems = matchingItems.slice(0, Math.min(6, matchingItems.length));
    
    matchingSelectedTerm = null;
    matchingMatches = 0;
    matchingPairs = [];
    
    document.getElementById('matching-complete').style.display = 'none';
    document.getElementById('matching-game').style.display = 'block';
    
    displayMatchingGame();
}

function displayMatchingGame() {
    const termsContainer = document.getElementById('matching-terms');
    const meaningsContainer = document.getElementById('matching-meanings');
    
    termsContainer.innerHTML = '<h3>Terms</h3>';
    meaningsContainer.innerHTML = '<h3>Meanings</h3>';
    
    // Shuffle meanings separately
    const meanings = [...matchingItems].map(item => item.meaning);
    shuffleArray(meanings);
    
    // Create term buttons
    matchingItems.forEach((item, index) => {
        const termBtn = document.createElement('div');
        termBtn.className = 'matching-item';
        termBtn.dataset.index = index;
        termBtn.textContent = item.term;
        termBtn.addEventListener('click', () => selectMatchingTerm(index, termBtn));
        termsContainer.appendChild(termBtn);
    });
    
    // Create meaning buttons
    meanings.forEach((meaning, index) => {
        const meaningBtn = document.createElement('div');
        meaningBtn.className = 'matching-item';
        meaningBtn.textContent = meaning;
        meaningBtn.addEventListener('click', () => selectMatchingMeaning(meaning, meaningBtn));
        meaningsContainer.appendChild(meaningBtn);
    });
    
    document.getElementById('matching-score').textContent = matchingMatches;
    document.getElementById('matching-total').textContent = matchingItems.length;
}

function selectMatchingTerm(index, element) {
    // Clear previous selection
    document.querySelectorAll('.matching-item').forEach(item => {
        item.classList.remove('selected');
    });
    
    if (matchingPairs.includes(index)) {
        return; // Already matched
    }
    
    matchingSelectedTerm = index;
    element.classList.add('selected');
}

function selectMatchingMeaning(meaning, element) {
    if (matchingSelectedTerm === null) {
        return; // No term selected
    }
    
    const item = matchingItems[matchingSelectedTerm];
    
    if (matchingPairs.includes(matchingSelectedTerm)) {
        return; // Already matched
    }
    
    // Check if correct
    if (item.meaning === meaning) {
        // Correct match
        element.classList.add('matched', 'correct');
        const termElement = document.querySelector(`[data-index="${matchingSelectedTerm}"]`);
        termElement.classList.add('matched', 'correct');
        matchingPairs.push(matchingSelectedTerm);
        matchingMatches++;
        
        document.getElementById('matching-score').textContent = matchingMatches;
        
        // Check if all matched
        if (matchingMatches === matchingItems.length) {
            setTimeout(() => {
                showMatchingComplete();
            }, 500);
        }
    } else {
        // Incorrect match
        element.classList.add('incorrect');
        const termElement = document.querySelector(`[data-index="${matchingSelectedTerm}"]`);
        termElement.classList.add('incorrect');
        
        setTimeout(() => {
            element.classList.remove('incorrect');
            termElement.classList.remove('incorrect');
        }, 1000);
    }
    
    matchingSelectedTerm = null;
    document.querySelectorAll('.matching-item').forEach(item => {
        item.classList.remove('selected');
    });
}

function showMatchingComplete() {
    document.getElementById('matching-game').style.display = 'none';
    document.getElementById('matching-complete').style.display = 'block';
    
    const percentage = Math.round((matchingMatches / matchingItems.length) * 100);
    document.getElementById('matching-final-score').textContent = matchingMatches;
    document.getElementById('matching-final-total').textContent = matchingItems.length;
    document.getElementById('matching-score-percentage').textContent = `${percentage}%`;
}

// Search Functionality
function setupSearch() {
    const searchInput = document.getElementById('search-input');
    const clearSearch = document.getElementById('clear-search');
    const sortSelect = document.getElementById('sort-select');
    const favoritesBtn = document.getElementById('show-favorites-only');
    
    searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value.toLowerCase().trim();
        clearSearch.style.display = searchQuery ? 'block' : 'none';
        displayVocabulary();
    });
    
    clearSearch.addEventListener('click', () => {
        searchInput.value = '';
        searchQuery = '';
        clearSearch.style.display = 'none';
        displayVocabulary();
    });
    
    sortSelect.addEventListener('change', (e) => {
        sortBy = e.target.value;
        displayVocabulary();
    });
    
    favoritesBtn.addEventListener('click', () => {
        showFavoritesOnly = !showFavoritesOnly;
        favoritesBtn.classList.toggle('active', showFavoritesOnly);
        displayVocabulary();
    });
}


// Favorites Functionality
function setupFavorites() {
    document.getElementById('favorites-btn').addEventListener('click', () => {
        showFavoritesOnly = !showFavoritesOnly;
        if (showFavoritesOnly) {
            currentMode = 'browse';
            switchMode('browse');
            document.getElementById('show-favorites-only').classList.add('active');
        }
        displayVocabulary();
    });
}

function isFavorite(item) {
    const key = `${item.category}-${item.term}`;
    return userData.favorites.includes(key);
}

function toggleFavorite(item) {
    const key = `${item.category}-${item.term}`;
    const index = userData.favorites.indexOf(key);
    if (index > -1) {
        userData.favorites.splice(index, 1);
    } else {
        userData.favorites.push(key);
    }
    saveUserData();
}

// Pronunciation Functionality
function pronounceWord(text) {
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-US';
        utterance.rate = 0.9;
        window.speechSynthesis.speak(utterance);
    } else {
        alert('Text-to-speech is not supported in your browser.');
    }
}

// Example Sentences Generator
function generateExampleSentences(item) {
    const examples = [];
    const term = item.term.toLowerCase();
    const category = item.category;
    
    // Generate context-appropriate examples
    if (category === 'words') {
        if (term.includes('lodge')) {
            examples.push('We stayed at a cozy mountain lodge during our hiking trip.');
        } else if (term.includes('hostel')) {
            examples.push('The backpackers found an affordable hostel in the city center.');
        } else if (term.includes('solitude')) {
            examples.push('She enjoyed the peaceful solitude of the countryside.');
        } else if (term.includes('pilgrimage')) {
            examples.push('Many people make a pilgrimage to this sacred site every year.');
        } else if (term.includes('trek')) {
            examples.push('The trek through the mountains was challenging but rewarding.');
        }
    } else if (category === 'idioms') {
        if (term.includes('bring the house down')) {
            examples.push('The comedian\'s performance brought the house down with laughter.');
        } else if (term.includes('face the music')) {
            examples.push('After making a mistake, he had to face the music and accept the consequences.');
        } else if (term.includes('let one\'s hair down')) {
            examples.push('After the exam, we decided to let our hair down and celebrate.');
        }
    } else if (category === 'phrasalVerbs') {
        if (term.includes('put off')) {
            examples.push('We had to put off the meeting until next week.');
        } else if (term.includes('put up with')) {
            examples.push('I can\'t put up with this noise anymore.');
        } else if (term.includes('set off')) {
            examples.push('We set off early in the morning for our journey.');
        }
    }
    
    // Generic examples if none found
    if (examples.length === 0) {
        examples.push(`The word "${item.term}" is commonly used in English.`);
        examples.push(`Understanding "${item.term}" will help improve your vocabulary.`);
    }
    
    return examples.slice(0, 2); // Return max 2 examples
}

// Theme Functionality
function setupTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    const isDark = localStorage.getItem('theme') === 'dark';
    
    if (isDark) {
        document.body.classList.add('dark-mode');
        themeToggle.textContent = '☀️';
    }
    
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDarkNow = document.body.classList.contains('dark-mode');
        localStorage.setItem('theme', isDarkNow ? 'dark' : 'light');
        themeToggle.textContent = isDarkNow ? '☀️' : '🌙';
    });
}

// Statistics Functionality
function setupStatistics() {
    // Statistics are updated when mode is switched
}

function updateStatistics() {
    const totalStudied = Object.keys(userData.studied).length;
    const mastered = Object.keys(userData.mastered).length;
    const totalCorrect = Object.values(userData.correct).reduce((sum, val) => sum + val, 0);
    const totalIncorrect = Object.values(userData.incorrect).reduce((sum, val) => sum + val, 0);
    const accuracy = totalCorrect + totalIncorrect > 0 
        ? Math.round((totalCorrect / (totalCorrect + totalIncorrect)) * 100) 
        : 0;
    const studyTimeHours = Math.floor(userData.studyTime / 60);
    
    document.getElementById('stat-total-studied').textContent = totalStudied;
    document.getElementById('stat-mastered').textContent = mastered;
    document.getElementById('stat-accuracy').textContent = `${accuracy}%`;
    document.getElementById('stat-streak').textContent = userData.streak;
    document.getElementById('stat-time').textContent = `${studyTimeHours}h`;
    document.getElementById('stat-favorites').textContent = userData.favorites.length;
    
    // Category stats
    const categoryStats = {};
    Object.keys(vocabularyData).forEach(category => {
        const items = vocabularyData[category];
        const studied = items.filter(item => {
            const key = `${category}-${item.term}`;
            return userData.studied[key];
        }).length;
        categoryStats[category] = {
            total: items.length,
            studied: studied,
            mastered: items.filter(item => {
                const key = `${category}-${item.term}`;
                return userData.mastered[key];
            }).length
        };
    });
    
    const categoryList = document.getElementById('category-stats-list');
    categoryList.innerHTML = '';
    Object.keys(categoryStats).forEach(category => {
        const data = categoryStats[category];
        const percent = data.total > 0 ? Math.round((data.studied / data.total) * 100) : 0;
        const item = document.createElement('div');
        item.className = 'category-stat-item';
        item.innerHTML = `
            <div class="category-stat-header">
                <span>${formatCategoryName(category)}</span>
                <span>${data.studied}/${data.total} (${percent}%)</span>
            </div>
            <div class="category-stat-bar">
                <div class="category-stat-fill" style="width: ${percent}%"></div>
            </div>
            <div class="category-stat-mastered">Mastered: ${data.mastered}</div>
        `;
        categoryList.appendChild(item);
    });
    
    // Recent activity
    const recentActivity = document.getElementById('recent-activity');
    recentActivity.innerHTML = '';
    const activities = userData.recentActivity.slice(-5).reverse();
    if (activities.length === 0) {
        recentActivity.innerHTML = '<p>No recent activity. Start studying to see your progress!</p>';
    } else {
        activities.forEach(activity => {
            const div = document.createElement('div');
            div.className = 'activity-item';
            div.innerHTML = `<strong>${activity.action}</strong> - ${activity.item} <span class="activity-time">${activity.time}</span>`;
            recentActivity.appendChild(div);
        });
    }
}

// Daily Challenges Functionality
function setupDailyChallenges() {
    const today = new Date().toDateString();
    document.getElementById('challenge-date').textContent = today;
    
    // Check if we need a new word of the day
    if (!userData.wordOfDayDate || userData.wordOfDayDate !== today) {
        setWordOfDay();
    } else {
        displayWordOfDay();
    }
    
    document.getElementById('wotd-audio').addEventListener('click', () => {
        if (userData.wordOfDay) {
            pronounceWord(userData.wordOfDay.term);
        }
    });
    
    document.getElementById('wotd-favorite').addEventListener('click', () => {
        if (userData.wordOfDay) {
            toggleFavorite(userData.wordOfDay);
            document.getElementById('wotd-favorite').textContent = 
                isFavorite(userData.wordOfDay) ? '⭐ Remove from Favorites' : '⭐ Add to Favorites';
        }
    });
    
    document.getElementById('start-daily-quiz').addEventListener('click', () => {
        startDailyQuiz();
    });
    
    updateStreakDisplay();
}

function setWordOfDay() {
    const today = new Date().toDateString();
    const randomItem = allVocabulary[Math.floor(Math.random() * allVocabulary.length)];
    userData.wordOfDay = randomItem;
    userData.wordOfDayDate = today;
    saveUserData();
    displayWordOfDay();
}

function displayWordOfDay() {
    if (!userData.wordOfDay) {
        setWordOfDay();
        return;
    }
    
    const item = userData.wordOfDay;
    document.getElementById('wotd-term').textContent = item.term;
    document.getElementById('wotd-category').textContent = formatCategoryName(item.category);
    document.getElementById('wotd-meaning').textContent = item.meaning;
    const examples = generateExampleSentences(item);
    document.getElementById('wotd-example').innerHTML = examples.length > 0 
        ? `<strong>Example:</strong> ${examples[0]}` 
        : '';
    document.getElementById('wotd-favorite').textContent = 
        isFavorite(item) ? '⭐ Remove from Favorites' : '⭐ Add to Favorites';
}

function startDailyQuiz() {
    // Start a quiz with 5 random words
    quizItems = [...allVocabulary];
    shuffleArray(quizItems);
    quizItems = quizItems.slice(0, 5);
    currentQuizIndex = 0;
    quizScore = 0;
    selectedAnswer = null;
    
    switchMode('quiz');
    initializeQuiz();
}

function checkStreak() {
    const today = new Date().toDateString();
    const lastStudy = userData.lastStudyDate;
    
    if (!lastStudy) {
        userData.lastStudyDate = today;
        saveUserData();
        return;
    }
    
    if (lastStudy === today) {
        // Already studied today
        return;
    }
    
    const lastDate = new Date(lastStudy);
    const todayDate = new Date(today);
    const daysDiff = Math.floor((todayDate - lastDate) / (1000 * 60 * 60 * 24));
    
    if (daysDiff === 1) {
        // Consecutive day
        userData.streak++;
    } else if (daysDiff > 1) {
        // Streak broken
        userData.streak = 1;
    }
    
    userData.lastStudyDate = today;
    saveUserData();
    updateStreakDisplay();
}

function updateStreakDisplay() {
    document.getElementById('streak-display').textContent = userData.streak;
    const message = userData.streak === 0 
        ? 'Start your streak today!'
        : userData.streak < 7
        ? 'Keep it up!'
        : userData.streak < 30
        ? 'Great job!'
        : 'Amazing dedication!';
    document.getElementById('streak-message').textContent = message;
}

// Enhanced tracking functions
function markAsStudied(item) {
    const key = `${item.category}-${item.term}`;
    if (!userData.studied[key]) {
        userData.studied[key] = 0;
    }
    userData.studied[key]++;
    
    // Add to recent activity
    userData.recentActivity.push({
        action: 'Studied',
        item: item.term,
        time: new Date().toLocaleTimeString()
    });
    
    // Keep only last 20 activities
    if (userData.recentActivity.length > 20) {
        userData.recentActivity.shift();
    }
    
    checkStreak();
    saveUserData();
}

function markAsMastered(item) {
    const key = `${item.category}-${item.term}`;
    userData.mastered[key] = true;
    saveUserData();
}

function saveUserData() {
    localStorage.setItem('vocabUserData', JSON.stringify(userData));
}

// Keyboard Shortcuts
function setupKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        // Don't trigger shortcuts when typing in inputs
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
            return;
        }
        
        // Ctrl/Cmd + K for search
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            document.getElementById('search-input').focus();
        }
        
        // Number keys for mode switching
        if (e.key >= '1' && e.key <= '7' && !e.ctrlKey && !e.metaKey) {
            const modes = ['browse', 'flashcards', 'quiz', 'fillin', 'matching', 'statistics', 'challenges'];
            const modeIndex = parseInt(e.key) - 1;
            if (modes[modeIndex]) {
                switchMode(modes[modeIndex]);
            }
        }
    });
}

// Update switchMode to handle new modes - wrap the original
const originalSwitchModeFunction = switchMode;
switchMode = function(mode) {
    originalSwitchModeFunction(mode);
    if (mode === 'statistics') {
        updateStatistics();
    } else if (mode === 'challenges') {
        updateStreakDisplay();
    }
};


// Utility Functions
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

