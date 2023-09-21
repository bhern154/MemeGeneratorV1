const memeForm = document.querySelector("#memeForm");
const imageUrlInput = document.querySelector("#imgURL");
const topTextInput = document.querySelector("#topText");
const bottomTextInput = document.querySelector("#bottomText");
const generateMemeButton = document.querySelector("#generateBtn");
const imageContainer = document.querySelector(".flex-container");

//local storage for memes
const localMemes = JSON.parse(localStorage.getItem("memes")) || [];

//retrieve memes from local storage
for (let i = 0; i < localMemes.length; i++) {
    generateMeme(localMemes[i].URL, localMemes[i].TOPTEXT, localMemes[i].BOTTOMTEXT);
    console.log(localMemes[i].URL);
    console.log(localMemes[i].TOPTEXT);
    console.log(localMemes[i].BOTTOMTEXT);
}

//event listener for the Meme Generator form submission
memeForm.addEventListener('submit', function(e){
    e.preventDefault();

    //Extract 3 inputs from form
    const imgUrl = imageUrlInput.value;
    const topText = topTextInput.value;
    const bottomText = bottomTextInput.value;

    //update local storage with new meme
    localMemes.push({ URL: imageUrlInput.value, TOPTEXT: topTextInput.value, BOTTOMTEXT: bottomTextInput.value});
    localStorage.setItem("memes", JSON.stringify(localMemes));

    //function to append meme to the website
    generateMeme(imgUrl, topText, bottomText);
});

//logic to handle the Meme Generator
function generateMeme(imgUrl, topText, bottomText){

    //div container for meme
    const newDiv = document.createElement('div');
    newDiv.classList.add("flex-item");

    //image from url
    const image = document.createElement('img');
    image.src = imgUrl.toString();

    //top text container
    const text1container = document.createElement('div');
    text1container.classList.add("top-text");
    const text1 = document.createElement('div');
    text1.innerText = topText;
    text1container.append(text1);

    //bottom text container (has an extra div .text to align text to the bottom of container)
    const text2container = document.createElement('div');
    text2container.classList.add("bottom-text");
    const text2 = document.createElement('div');
    text2.classList.add("text"); 
    text2.innerText = bottomText;
    text2container.append(text2);

    //create a delete button for each meme and add an event listener to it
    const deleteMeme = document.createElement('button');
    deleteMeme.classList.add("deleteBtn");
    deleteMeme.innerText = "REMOVE";
    deleteMeme.addEventListener('click', function(e){
        e.preventDefault();

        //START CODE - remove meme from local storage
        const getUrl = e.target.parentElement.childNodes[0].src;
        const getTopText = e.target.parentElement.childNodes[1].childNodes[0].innerText;
        const getBottomText = e.target.parentElement.childNodes[2].childNodes[0].innerText;
        for (let i = 0; i < localMemes.length; i++) {
            if (localMemes[i].URL === getUrl.toString() && localMemes[i].TOPTEXT.toUpperCase() === getTopText.toString() && localMemes[i].BOTTOMTEXT.toUpperCase() === getBottomText.toString()) {
                console.log("same");
                localMemes.splice(i, 1);
                localStorage.setItem("memes", JSON.stringify(localMemes));
                break;
            }
        }
        //END CODE - remove meme from local storage

        //remove meme from web page
        deleteMeme.parentElement.remove();
    });

    //append all elements to the web page
    newDiv.append(image);
    newDiv.append(text1container);
    newDiv.append(text2container);
    newDiv.append(deleteMeme);
    imageContainer.append(newDiv);

    //dynamic text size to fit into text container
    //wait to calculate text size until image fully loads
    image.onload = function() {
        fitText(text1container, text1);
        fitText(text2container, text2);
    }

    //reset form
    imageUrlInput.value = "";
    topTextInput.value = "";
    bottomTextInput.value = "";

}

//change the size of the text to fit the text containers
//box -> text container, text -> user text input
function fitText(container, text) {

    const containerHeight = parseInt(window.getComputedStyle(container).height);

    const getTextHeight = () => parseInt(window.getComputedStyle(text).height);
    const getTextFontSize = () => parseInt(window.getComputedStyle(text).fontSize);

    while (getTextHeight() > containerHeight) {
    text.style.fontSize = getTextFontSize() - 1 + 'px'
    }
}