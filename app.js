const express = require("express")
const app = express()
const percentRound = require ('percent-round');


const pollingData = require('./data')

app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.set('view engine', 'ejs')



app.get('/', (req, res) =>{
    res.redirect("/1")
})


app.get('/data', (req, res) =>{
    res.json(pollingData) 
})

app.get('/results:id', (req,res)=>{
    var optionResults = []
    var optionArray =[]
    var resultsArray =[]
    
    for(poll in pollingData.polls){
        if (pollingData.polls[poll].pollId == req.params.id){
            for(option in pollingData.polls[poll].options){
                resultsArray.push(pollingData.polls[poll].options[option].votes)
                optionArray.push(pollingData.polls[poll].options[option].optionText)
            }
        }
    }
    if(optionArray.length==0){
        res.status(404).render("results")
    }
    else{
        var rounded = percentRound(resultsArray)
        for (option in optionArray){
            temp =[]
            temp.push(optionArray[option])
            temp.push(rounded[option])
            optionResults.push(temp)
    
        }
    
        optionResults.sort(function(first, second) {
            return second[1] - first[1];
          });
    
        res.render("results", {thankYou: 'Thank you for your response', winner: optionResults[0][0], second: optionResults[1][0], last: optionResults[2][0], 
            winnerColour: optionResults[0][1], secondColour: optionResults[1][1], lastColour: optionResults[2][1], 
            winnerScore: optionResults[0][1],secondScore: optionResults[1][1],lastScore: optionResults[2][1]  })
    }
    
}
)

app.get('/:id', (req, res)=>{
    const requestedPoll = req.params.id -1
    if (pollingData.polls[requestedPoll] == undefined){
        res.status(404).render("index")
    }
    else{   
        res.status(200).render("index", {question: pollingData.polls[requestedPoll].question,
             firstOption: pollingData.polls[requestedPoll].options[0].optionText,
              secondOption: pollingData.polls[requestedPoll].options[1].optionText,
               thirdOption: pollingData.polls[requestedPoll].options[2].optionText})
    }
})

app.post('/:id', (req, res, next)=>{
    const pollID = req.params.id

    if(req.body.chosen ==""){
        res.status(404).redirect("/"+req.params.id)
    }
    else{
        for(poll in pollingData.polls){
            if (pollingData.polls[poll].pollId == pollID){
                for(option in pollingData.polls[poll].options){
                    if (pollingData.polls[poll].options[option].optionText == req.body.chosen){
                        pollingData.polls[poll].options[option].votes +=1
                        res.status(200).redirect('/results' +pollID)
                        return next()
                    }
                }
            }
        }
        res.status(404).redirect('/results' +pollID)
    }    
})

app.get('*', (req, res)=>{
    res.redirect("/1")
}
)

module.exports = app