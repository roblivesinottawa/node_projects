const fs = require('fs')
const express = require('express')
const bodyParser = require('body-parser')
const fortunes = require('./data/fortunes.json')

const app = express()
app.use(bodyParser.json())

// access the fortunes endpoint
app.get('/fortunes', (req, res) => { // callback function
    res.json(fortunes)
})

app.get('/fortunes/random', (req, res) => {
    //returns a random number from 0 to 1
    res.json(fortunes[Math.floor(Math.random()) * fortunes.length ])
})

app.get('/fortunes/:id', (req, res) => {
    res.json(fortunes.find(f => f.id == req.params.id))
})

// this function will take care of writing to the file
const writeFortunes = json => {
    fs.writeFile('./data/fortunes.json', JSON.stringify(json),
    err => console.log(err))
}

app.post('/fortunes', (req, res) => {
// object destructuring
const { message, lucky_number, spirit_animal } = req.body;
const fortune_ids = fortunes.map(f => f.id)
const new_fortunes = fortunes.concat({id: (fortune_ids.length > 0 ? Math.max(...fortune_ids) : 0) + 1, 
    message, 
    lucky_number, 
    spirit_animal 
})
// the file system method will update the fortunes.json file everytime we make a post request
writeFortunes(new_fortunes) //calling the function created above
res.json(new_fortunes)

})

app.put('/fortunes/:id', (req, res) => {
    // get the id
    const { id } = req.params
    const old_fortune = fortunes.find(f => f.id == id)

    // if (message) old_fortune.message = message
    // if (lucky_number) old_fortune.lucky_number = lucky_number
    // if (spirit_animal) old_fortune.spirit_animal = spirit_animal

    // to make the above code a little cleaner:
    ['message', 'lucky_number', 'spirit_animal'].forEach(key => {
        if (req.body[key]) old_fortune[key] = req.body[key]
    })

    writeFortunes(fortunes)
    res.json(fortunes)
})

app.delete('/fortunes/:id', (req, res) => {
    const { id } = req.params
    const new_fortunes = fortunes.filter(f => f.id != id)

    writeFortunes(new_fortunes)
    res.json(new_fortunes)
})

module.exports = app


