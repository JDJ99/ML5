const video = document.getElementById('webcam')
const featureExtractor = ml5.featureExtractor('MobileNet', modelLoaded)
const label = document.getElementById("label")
let classifier

const thumbsdownbtn = document.querySelector("#thumbsdown")
const thumbsupbtn = document.querySelector("#thumbsup")
const trainbtn = document.querySelector("#train")
const savebtn = document.querySelector("#save")

thumbsdownbtn.addEventListener("click", () => addThumbsdown())
thumbsupbtn.addEventListener("click", () => addThumbsup())
trainbtn.addEventListener("click", () => train())
savebtn.addEventListener("click", () => save())

if (navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
            video.srcObject = stream
        })
        .catch((err) => {
            console.log("Something went wrong!");
        });
}

function modelLoaded(){
    console.log("The mobileNet model is loaded!")
    classifier = featureExtractor.classification(video, videoReady)
}

function videoReady(){
    console.log(classifier)
}

function addThumbsdown(){
    classifier.addImage(video, "thumbs down 👎", addedImage)
}

function addThumbsup() {
    classifier.addImage(video, "thumbs up 👍", addedImage)
}

function train(){
    console.log("start training...")
    classifier.train((lossValue) => {
        console.log(lossValue)
        if(lossValue == null){
            startClassifying()
        }
    })
}

function save(){
    classifier.save();
}

function startClassifying(){
    setInterval(()=>{
        classifier.classify(video, (err, result)=>{
            if(err) console.log(err)
            console.log(result)
            label.innerHTML = result[0].label
        })
    }, 1000)
}

function addedImage(){
    console.log("added image to network")
}