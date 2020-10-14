const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

function showLoadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}
function removeLoadingSpinner() {
    if (!loader.hidden) {
        loader.hidden = true;
        quoteContainer.hidden = false;
    }
}

//get quote from API
async function getQuote() {
    showLoadingSpinner();
    //to fix CORPS issue, call Proxy API first
    const proxyURL = 'https://cors-anywhere.herokuapp.com/';
    const apiURL = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';

    try {
        const response = await fetch(proxyURL + apiURL);
        const data = await response.json();
        if (data.quoteAuthor === '') {
            authorText.innerText = "Unknown";

        }
        else {
            authorText.innerText = data.quoteAuthor;

        }
        if (data.quoteText.length > 50) {
            quoteText.classList.add('long-quote');
        }
        else {
            quoteText.classList.remove('long-quote');

        }

        quoteText.innerText = data.quoteText;
        //stop loaderishow quote
        removeLoadingSpinner();

    }
    catch (error) {
        getQuote();//when it gets error try again
        console.log("no quote :(", error);
    }

}

function tweetQuote() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterURL = `https://twitter.com/intent/tweet?text=${quote}-${author}`;
    window.open(twitterURL, '_blank');
}

//event listeners
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);

getQuote();