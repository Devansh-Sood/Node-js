const fs = require('fs')
const chalk = require('chalk')


const addnote = (title,body) => {
    const notes = loadnotes()

  /*  const duplicatenotes = notes.filter( (note) => {    //to check if notes with same title are present
        return note.title === title                         //if true then it will save the notes in duplicatenotes array
    })

    // entering only notes with different title else 'Title already exists' messsage will be displayed
    if(duplicatenotes.length ===0)
    {
    notes.push({
        title : title,
        body : body
    })*/

debugger
    const duplicatenote = notes.find( (note) => {          //to check if notes with same title are present and stops when it finds the duplicate note
        return note.title === title                         //find returns value as undefined if condition is false
    })

    // entering only notes with different title else 'Title already exists' messsage will be displayed
    if(!duplicatenote)
    {
    notes.push({
        title : title,
        body : body
    })

    savednotes(notes)
    console.log(chalk.green.inverse('New note added'))
    }
    else{
        console.log(chalk.red.inverse('Title already exists'))
    }
}

const loadnotes = () =>
{
    try{
        const databuffer = fs.readFileSync('notes.json')
        const datajson = databuffer.toString()
        return JSON.parse(datajson)
    }
    catch(e)
    {
        return []
    }
}

const savednotes = (notes) => {
    const datajson = JSON.stringify(notes)
    fs.writeFileSync('notes.json' , datajson)
}


const removenote = (title) => {
    const notes = loadnotes()
    const notestokeep = notes.filter( (note) => {             //notes with different title are going to notestokeep array
        return note.title !== title
    })

    if(notes.length > notestokeep.length){
    console.log(chalk.green.inverse('Note Removed'))
    savednotes(notestokeep)
    }
    else{
    console.log(chalk.red.inverse('No Note Found'))
    }

}

const listnotes = () => {
    const notes = loadnotes()
   console.log(chalk.inverse('Your Notes . . .'))
   notes.forEach( (note) => {
       console.log(note.title)
   })
}

const readnotes = (title) => {
    const notes = loadnotes()
    const foundnote = notes.find( (note) => {
        return note.title === title
    })
    if(foundnote){
        console.log(chalk.inverse(foundnote.title))
        console.log(foundnote.body)
    }
    else{
        console.log(chalk.red.inverse('Note not found'))
    }
}

module.exports = {
    addnote : addnote,
    removenote : removenote,
    listnotes : listnotes,
    readnotes : readnotes
}