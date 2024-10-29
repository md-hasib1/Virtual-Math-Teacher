let innerUploadImage = document.querySelector(".inner-upload-image")
let input = innerUploadImage.querySelector("input")
let image = document.querySelector("#image")
let loding = document.querySelector("#loding")
let btn = document.querySelector("button")
let text = document.querySelector("#text")
let output = document.querySelector(".output")

const Api_url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyAu9eY1A7kZmEzDKjgWjR0iX0elKbRVXjo"

let fileDetails = {
    mime_type:null,
    data:null

}


async function generateResponse() {
const RequestOption = {
    method:"POST",
    Headers:{ "Content-Type": "application/json"},
    body:JSON.stringify({"contents": [{
        "parts":[
            {"text": "solve the mathamatical problem with proper steps of solution"},
            {
              "inline_data": {
                "mime_type":fileDetails.mime_type,
                "data": fileDetails.data
              }
            }
        ]
        }]
    })

}
 try{
    let response = await fetch(Api_url,RequestOption)
    let data = await response.json()
     let apiResponse = data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g,"$1").trim()
     text.innerHTML = apiResponse
     output.style.display="block"
 }
 catch(e){
    console.log(e)
 }
 finally{
    loding.style.display="none"

 }

     
}
input.addEventListener("change" , () => {
    const file = input.files[0]

    if(!file)return
    let reader = new FileReader()
    reader.onload = (e) => {
    
         let base64data = e.target.result.split(",")[1]
fileDetails.mime_type = file.type;
 fileDetails.data = base64data

 innerUploadImage.querySelector("span").style.display="none"
 innerUploadImage.querySelector("#icon").style.display="none"
 image.style.display="block"
 image.src = `data:${fileDetails.mime_type};base64,${fileDetails.data}`
 output.style.display="none" 
    }

 

    reader.readAsDataURL(file)

})





 innerUploadImage.addEventListener("click",()=>{
    input.click()
})

btn.addEventListener("click", () => {
    loding.style.display="block"
    generateResponse()
})