const fs = {text:''};
let allUsers=[
  {
    "userName": "sayima",
    "allTodo": {
      "0": {
        "id": 0,
        "title": "abc",
        "description": "gbhnj",
        "items": {
          "0": {
            "id": 0,
            "objective": "fgchvj",
            "_isDone": false
          }
        },
        "itemNo": 1
      }
    },
    "todoNo": 1
  },
  {
    "userName": "pallabi",
    "allTodo": {
      "1": {
        "id": 1,
        "title": "nm",
        "description": "hgnmn",
        "items": {
          "0": {
            "id": 0,
            "objective": "mkm",
            "_isDone": true
          }
        },
        "itemNo": 1
      },
      "3": {
        "id": 3,
        "title": "csjg",
        "description": "hfgjhm,",
        "items": {
          "0": {
            "id": 0,
            "objective": "hnm,",
            "_isDone": false
          }
        },
        "itemNo": 1
      },
      "4": {
        "id": 4,
        "title": "vsnbm,",
        "description": "fhghm,",
        "items": {
          "0": {
            "id": 0,
            "objective": "",
            "_isDone": true
          }
        },
        "itemNo": 1
      },
      "10": {
        "id": 10,
        "title": "ab",
        "description": "jeknds",
        "items": {
          "0": {
            "id": 0,
            "objective": "sabse acchha",
            "_isDone": false
          },
          "1": {
            "id": 1,
            "objective": "sabse uncha",
            "_isDone": false
          },
          "2": {
            "id": 2,
            "objective": "kuch ni",
            "_isDone": false
          }
        },
        "itemNo": 3
      },
      "12": {
        "id": 12,
        "title": "av",
        "description": "cd",
        "items": {
          "0": {
            "id": 0,
            "objective": "nothing",
            "_isDone": false
          }
        },
        "itemNo": 1
      },
      "19": {
        "id": 19,
        "title": "todo",
        "description": "work on test",
        "items": {},
        "itemNo": 3
      },
      "20": {
        "id": 20,
        "title": "testing",
        "description": "tesitngs;adga",
        "items": {},
        "itemNo": 5
      }
    },
    "todoNo": 21
  }
]
let loginPage = `<title>Login Page</title></head><body><center><h1>LOGIN PAGE</h1>Bad_login`;
let homepage = `<body><h1>TO-DO</h1><a href="/createToDo"><button type="button">Create To-Do</button></a><a href="/viewToDo.html">`;
let createToDoPage = `<h1><a href="/home.html"><<</a>Create A ToDo</h1>username<form class="create" method="post">`
let viewTodoPage = ` <a href="home.html"><< </a> View TO-DO</h1><br><br><div id="todolist"></div>`;

fs.readFileSync = function(filePath,endcoding){
  if(filePath=='./data/todoList.json'){
    return JSON.stringify(allUsers);
  }
  contents ={
    './public/login.html':loginPage,
    '.public/home.html':homepage,
    './public/createToDo.html':createToDoPage,
    './public/viewToDo.html':viewTodoPage
  }
  return contents[filePath];
}

fs.writeFile = function(filePath,text){
  return this.text=text;
}

fs.existsSync = function(filePath){
  let existingFiles = ['./public/login.html','.public/home.html',
  './public/createToDo.html','./public/viewToDo.html']
  return existingFiles.includes(filePath);
}
module.exports = fs;
