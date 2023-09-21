const memeForm = document.querySelector("#memeForm");
const imageUrlInput = document.querySelector("#imgURL");
const topTextInput = document.querySelector("#topText");
const bottomTextInput = document.querySelector("#bottomText");
const generateMemeButton = document.querySelector("#generateBtn");
const imageContainer = document.querySelector(".flex-container");

//adding local storage for memes
const localMemes = JSON.parse(localStorage.getItem("memes")) || [];

//retrieve memes from local storage
for (let i = 0; i < localMemes.length; i++) {
    generateMeme(localMemes[i].URL, localMemes[i].TOPTEXT, localMemes[i].BOTTOMTEXT);
    console.log(localMemes[i].URL);
    console.log(localMemes[i].TOPTEXT);
    console.log(localMemes[i].BOTTOMTEXT);
}

memeForm.addEventListener('submit', function(e){
    e.preventDefault();

    const imgUrl = imageUrlInput.value;
    const topText = topTextInput.value;
    const bottomText = bottomTextInput.value;

    //update local storage with new meme
    localMemes.push({ URL: imageUrlInput.value, TOPTEXT: topTextInput.value, BOTTOMTEXT: bottomTextInput.value});
    localStorage.setItem("memes", JSON.stringify(localMemes));

    generateMeme(imgUrl, topText, bottomText);
});

function generateMeme(imgUrl, topText, bottomText){

    const newDiv = document.createElement('div');
    newDiv.classList.add("flex-item");

    const image = document.createElement('img');
    image.src = imgUrl.toString();

    const text1container = document.createElement('div');
    text1container.classList.add("top-text");
    const text1 = document.createElement('div');
    // text1.classList.add("text");
    text1.innerText = topText;
    text1container.append(text1);

    const text2container = document.createElement('div');
    text2container.classList.add("bottom-text");
    const text2 = document.createElement('div');
    text2.classList.add("text"); //class aligns text to the bottom of image
    text2.innerText = bottomText;
    text2container.append(text2);

    const deleteMeme = document.createElement('button');
    deleteMeme.classList.add("deleteBtn");
    deleteMeme.innerText = "REMOVE";
    deleteMeme.addEventListener('click', function(e){
        e.preventDefault();

        //END CODE - remove meme from local storage
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

        deleteMeme.parentElement.remove();
    });

    newDiv.append(image);
    newDiv.append(text1container);
    newDiv.append(text2container);
    newDiv.append(deleteMeme);
    imageContainer.append(newDiv);

    //update local storage with new meme
    // localMemes.push({ URL: imageUrlInput.value, TOPTEXT: topTextInput.value, BOTTOMTEXT: bottomTextInput.value});
    // localStorage.setItem("memes", JSON.stringify(localMemes));

    //fit text into text section to account for long text
    fitText(text1container, text1);
    fitText(text2container, text2);

    //reset form
    imageUrlInput.value = "";
    topTextInput.value = "";
    bottomTextInput.value = "";

}


//box is the text container, text is the user text input
function fitText(box, text) {

    const boxHeight = parseInt(window.getComputedStyle(box).height);

    const getTextHeight = () => parseInt(window.getComputedStyle(text).height);
    const getTextFontSize = () => parseInt(window.getComputedStyle(text).fontSize);

    while (getTextHeight() > boxHeight) {
    text.style.fontSize = getTextFontSize() - 1 + 'px'
    }
}