const QUOTES = [
    'Доброта — это то, что ты делаешь, а не то, о чем ты молишься.',
    'Дай человеку огонь, и ему будет тепло до конца дня. Подожги человека, и ему будет тепло до конца его жизни.',
    'Истина — существо женского пола, поскольку она скорее красива, чем приятна.',
    'В жизни всегда есть место подвигу. Главное — держаться от этого места подальше.',
    'Перед тем как человек умрет, вся жизнь действительно проходит у него перед глазами. Собственно, этот процесс и называется жизнью.',
    'Люди — интересные существа. В мире, полном чудес, им удалось придумать скуку.',
    'Только сами люди могут построить себе лучший мир. Иначе получается клетка.',
    'Всегда помни, что толпа, рукоплещущая твоей коронации, — та же толпа, которая будет рукоплескать твоему обезглавливанию. Люди любят шоу.',
    'Настоящий кот мечтает об одном: прожить жизнь безмятежно, и чтобы люди поменьше в нее вмешивались. В этом он не слишком отличается от людей.',
    'Не всякое имя клеится к человеку. Имя должно быть таким, чтобы в нем было удобно мыть полы.',
    'Поразительно, чего можно добиться добрым словом, особенно если у тебя в руках большая крепкая дубинка.',
    'Когда делаешь шаг с обрыва, жизнь моментально принимает очень четкое направление.',
    'Жизненно важный ингредиент успеха — это не знать, что задуманное вами невозможно выполнить.',
    'Иногда стекло вынуждено блестеть ярче бриллианта, потому что больше нуждается в самоутверждении.',
    'Ненависть — это любовь, повернувшаяся спиной.',
    'То, что нас не убивает, делает нас сильнее! А то, что убивает, делает нас мертвыми!',
    'Он всегда недолюбливал людей, которые «никого не хотели обидеть». Удобная фраза: произнес ее — и обижай кого хочешь.',
    'Собирая мир, Создатель выдал на-гора массу выдающихся и в высшей степени оригинальных идей. Однако сделать мир понимаемым в его задачу не входило.',
    'Не бывает врагов — бывают друзья, с которыми мы еще не познакомились.',
    'Человек, которого можно купить, как правило, ничего не стоит.',
    'Люди, которые ни в ком не нуждаются, нуждаются в том, чтобы люди вокруг видели, что они абсолютно ни в ком не нуждаются.',
    'Есть смерть и есть налоги, только налоги гораздо хуже, потому что смерть случается один раз в жизни, а налоги — каждый год.',
    'Каждая работа выглядит интересной — пока ею не займешься.',
    'Слова и впрямь обладают великой силой. В частности, они умеют слетать с языка до того, как говорящий успеет заткнуть себе рот.',
    'Жизнь - не более чем привычка.',
    'Тишина – это всего-навсего отсутствие шума.'
];

let quoteElement = document.querySelector('.quote');

// рандомим наши уникальные цитатки
function shuffle(arr) {
    var j, temp;
    for (var i = arr.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        temp = arr[j];
        arr[j] = arr[i];
        arr[i] = temp;
    }
    return arr;
};

// let quotes = shuffle(QUOTES)
// let quote = quotes[0];
// quoteElement.innerHTML = `<q>${quote}</q>`;

// кнопка переключения цитат
const quoteRandomBtn = document.querySelector('.quote-refresh');
function getNewQuote() {
    let quotes = shuffle(QUOTES)
    let quote = quotes[0];
    quoteElement.innerHTML = `<q>${quote}</q>`;
}

quoteRandomBtn.addEventListener('click', getNewQuote);

getNewQuote()