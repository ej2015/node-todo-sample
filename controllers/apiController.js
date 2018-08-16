var Todos = require('../models/todoModel');
var bodyParser = require('body-parser');

module.exports = function(app){
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.get('/api/todos/:id', function(req, res){
        Todos.findById({ _id: req.params.id}, 
        function(err, todo){
            if (err) throw err;
            res.send(todo);
        });
    });

    app.get('/api/todos', function(req, res){
        console.log(req.body);
        console.log(req.params);
        console.log(req.query);
        if(req.query.username){
            Todos.find({ username: req.query.username}, function(err, todos){
                if(err) throw err;
                res.send(todos);
            })
        }else{
            Todos.find({}, function(err, todos){
                if (err) throw err;
                res.send(todos);
            })
        }
    });

    app.post('/api/todos', function(req, res) {
        if (req.body.id){
          Todos.findByIdAndUpdate(req.body.id, { todo: req.body.todo, 
            isDone: req.body.isDone, 
            hasAttachment: req.body.hasAttachment}, function(err, todo){
                if (err) throw err;
                res.send('Success');
            });
        }else{
            var newTodo = Todos({
                username: 'test',
                todo: req.body.todo,
                isDone: req.body.isDone,
                hasAttachment: req.body.hasAttachment
            });
            newTodo.save(function(err){
                if(err) throw err;
                res.send('Success');
            });

        }
    });

    app.delete('/api/todos', function(req, res){
        Todos.findByIdAndRemove(req.body.id, function(err){
            if (err) throw err;
            res.send('Success');
        })
    })
}