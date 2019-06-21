'use strict'

module.exports=function(app){
    const controller=require('./controller');
    
    //GET
    app.get('/notes',controller.getNotes);
    app.get('/notes/:id',controller.getNotesById);
    
    //POST
    app.post('/notes/',controller.addNote);
    app.post('/category/',controller.addCategory);

    //PATCH
    app.patch('/notes/:id',controller.patchNote);
    app.patch('/category/:id',controller.patchCategory);

    //DELETE
    app.delete('/notes/:id',controller.deleteNote);
    app.delete('/category/:id',controller.deleteCategory);
}