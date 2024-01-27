const express = require("express")
const app = express()
const percentRound = require ('percent-round');


const pollingData = require('./data')

app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.set('view engine', 'ejs')



app.get('/', (req, res) =>{
    res.render("index", {question: pollingData.question, firstOption: pollingData.options[0].optionText, secondOption: pollingData.options[1].optionText, thirdOption: pollingData.options[2].optionText})
})

app.get('/data', (req, res) =>{
    res.json(pollingData)
    console.log(pollingData)
})

app.post('/', (req, res)=>{
    for(option in pollingData.options){
        if (pollingData.options[option].optionText == req.body.chosen){
            pollingData.options[option].votes +=1
        }
    }
    res.redirect("/results")
    console.log(pollingData)
    
})

app.get('/results', (req,res)=>{
    var optionResults = []
    var optionArray =[]
    var resultsArray =[]
    
    for(option in pollingData.options){
        resultsArray.push(pollingData.options[option].votes)}

    var rounded = percentRound(resultsArray)
    for (option in pollingData.options){
        temp =[]
        temp.push(pollingData.options[option].optionText)
        temp.push(rounded[option])
        optionResults.push(temp)

    }
    optionResults.sort(function(first, second) {
        return second[1] - first[1];
      });

    console.log(optionResults)
    res.render("results", {winner: optionResults[0][0], second: optionResults[1], last: optionResults[2], winnerColour: optionResults[0][1], secondColour: optionResults[1][1], lastColour: optionResults[2][1] })
}
)

app.listen(3000)