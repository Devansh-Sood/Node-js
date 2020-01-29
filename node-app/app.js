const chalk=require('chalk')
const yargs=require('yargs')
const notes = require('./notes')

//create add command
yargs.command({
    command: 'add',
    describe: 'Adding a note',
    builder:{
        title: {
            describe : 'Note title',
            demandOption :true,                //required field
            type: 'string'                   //data is only string not boolean
        },
        body: {
            describe : 'Enter text here',
            demandOption : true,
            type: 'string'
        }
    },
    handler(argv){                            //here argv gives us access to all arguments
       notes.addnote(argv.title,argv.body)
    }
})

//create remove command
yargs.command({
    command: 'remove',
    describe: 'Removing a note',
    builder : {
        title : {
            describe : 'note title',
            demandOption : true,
            type : 'string'
                }
            },
    handler(argv) {
       notes.removenote(argv.title)
    }
})

//creating list command
yargs.command({
    command: 'list',
    describe: 'shows the list of notes',
    handler(){
       notes.listnotes()
    }
})

//create read command
yargs.command({
    command: 'read',
    describe: 'read the note',
    builder: {
        title: {
            describe : 'Read notes',
            demandOption : true,
            type : 'string'
        }
    },
    handler(argv){
        notes.readnotes(argv.title)
    }
})


// console.log(yargs.argv)     //or can use below line
yargs.parse()