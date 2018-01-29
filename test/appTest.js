// let chai = require('chai');
// let assert = chai.assert;
// let request = require('./requestSimulator.js');
// process.env.COMMENT_STORE = "./testStore.json";
// let app = require('../app.js');
// let th = require('./testHelper.js');
//
//
// let sessionid;
// beforeEach(function(){
//   request(app,{method:'POST',url:'/login',body:'userName=pallabi'},res=>{
//     sessionid=res.headers['Set-Cookie'].split('=')[1];
//   })
//   let fs = require('./customFs.js');
//   app.initialize(fs);
// })
//
// describe.skip('app',()=>{
//   describe('GET /bad',()=>{
//     it('responds with 404',done=>{
//       request(app,{method:'GET',url:'/bad'},(res)=>{
//         assert.equal(res.statusCode,404);
//         done();
//       })
//     })
//   })
//
//   describe('GET /login',()=>{
//     it('serves the login page',done=>{
//       request(app,{method:'GET',url:'/login'},res=>{
//         th.status_is_ok(res);
//         th.body_does_not_contain(res,'Login Failed');
//         th.should_not_have_cookie(res,'message');
//         done();
//       })
//     })
//   })
//     it('serves the login page with message for a failed login',done=>{
//       request(app,{method:'GET',url:'/login',headers:{'cookie':'message=Login Failed'}},res=>{
//         th.status_is_ok(res);
//         th.body_contains(res,'Login Failed');
//         th.should_not_have_cookie(res,'message');
//         done();
//       })
//     })
//   describe('GET /home.html',()=>{
//     it('gives the home page',done=>{
//       let user = {userName:"pallabi"};
//       let header = {cookie:"sessionid=12345"};
//       request(app,{method:'GET',url:'/home.html',headers:header,user},res=>{
//         th.status_is_ok(res);
//         th.body_contains(res,'TO-DO');
//         done();
//       })
//     })
//   })
//   describe('GET /todoList',()=>{
//     it('gives the all existing todo lists',done=>{
//       let user = {userName:"pallabi"};
//       let header = {cookie:sessionid};
//       request(app,{method:'GET',url:'/todoList',headers:header,user},res=>{
//         th.status_is_ok(res);
//         th.body_contains(res,'pallabi');
//         done();
//       })
//     })
//   })
//   describe('GET /createToDo',()=>{
//     it('should redirect to login page',done=>{
//       let header = {cookie:sessionid}
//       let user = {userName:"pallabi"};
//       request(app,{method:'GET',url:'/createToDo',headers:header,user},res=>{
//           th.status_is_ok(res);
//           th.body_contains(res,'Create A ToDo')
//         done();
//       })
//     })
//   })
//   describe('POST /createToDo',function(){
//     let options = {
//       url:'/createToDo',
//       method:'POST'
//     }
//     it('should add a todo in user todos',function(done){
//       options.headers={cookie:`sessionid=${sessionid}`}
//       options.body='title=testing&description=foo&item=["1","2"]',
//       request(app,options,res=>{
//         th.should_be_redirected_to(res,'/viewTodo.html');
//         done();
//       })
//     })
//     it('should add a todo in user todos even when there is no item',function(done){
//       options.headers={cookie:`sessionid=${sessionid}`}
//       options.body='title=testing&description=foo&item=""',
//       request(app,options,res=>{
//         th.should_be_redirected_to(res,'/viewTodo.html');
//         done();
//       })
//     })
//   })
//   describe('GET /singletodo',()=>{
//     it('should give a specified todo',function(done){
//       let options ={
//         url:'/singletodo',
//         method:'GET',
//         headers:{cookie:`todoId=4; sessionid=${sessionid}`}
//       };
//       request(app,options,res=>{
//         th.status_is_ok(res);
//         th.body_contains(res,"vsnbm,");
//         th.body_contains(res,"fhghm,");
//         th.body_contains(res,"edit")
//         done()
//       })
//     })
//   })
//   describe('GET /logout',()=>{
//     it('should redirect to login page',done=>{
//       let user = {userName:"pallabi"};
//       let header = {cookie:"sessionid=12345"};
//       request(app,{method:'GET',url:'/logout',headers:header,user},res=>{
//           th.should_be_redirected_to(res,'/login');
//         done();
//       })
//     })
//   })
//   describe('GET /delete',()=>{
//     it('should delete a todo',done=>{
//       let user = {userName:"pallabi"};
//       let header = {cookie:`sessionid=${sessionid}`};
//       request(app,{method:'GET',url:'/delete',headers:header,user},res=>{
//           th.should_be_redirected_to(res,'/viewTodo.html');
//         done();
//       })
//     })
//   })
//   describe('POST /deleteItem',function(){
//     it('should delete a specified todoItem from user todo',function(done){
//       let options ={
//         url:'/deleteItem',
//         method:'POST',
//         body:'itemId=0',
//         headers:{cookie:`todoId=4; sessionid=${sessionid}`}
//       };
//       request(app,options,res=>{
//         th.status_is_ok(res);
//         th.body_contains(res,"itemId");
//         done();
//       })
//     })
//   })
//   describe('POST /login',()=>{
//     it('redirects to guestBook for valid user',done=>{
//       request(app,{method:'POST',url:'/login',body:'userName=pallabi'},res=>{
//         th.should_be_redirected_to(res,'/home.html');
//         done();
//       })
//     })
//     it('redirects to login.html with message for invalid user',done=>{
//       request(app,{method:'POST',url:'/login',body:'userName=badUser'},res=>{
//         th.should_be_redirected_to(res,'/login');
//         th.should_have_expiring_cookie(res,'message','Login Failed');
//         done();
//       })
//     })
//   })
//   describe('POST /changeItemStatus',()=>{
//     it('it should change item status',done=>{
//       let options ={
//         url:'/changeItemStatus',
//         method:'POST',
//         body:'itemId=0',
//         headers:{cookie:`todoId=4; sessionid=${sessionid}`}
//       }
//       request(app,options,res=>{
//         th.status_is_ok(res);
//         done();
//       })
//     })
//   })
//   describe('POST /editItem',function(){
//     it('should edit the description of specified todo item',function(done){
//         let options ={
//         url:'/editItem',
//         method:'POST',
//         body:'itemId=0&newObjective=testing on mocha test',
//         headers:{cookie:`todoId=4; sessionid=${sessionid}`}
//       }
//       request(app,options,res=>{
//         th.status_is_ok(res);
//         th.body_contains(res,'testing on mocha test')
//         done();
//       })
//     })
//   })
//   describe('POST /addNewItem',function(){
//     it('should add a new item in user todo',function(done){
//       let options ={
//         url:'/addNewItem',
//         method:'POST',
//         body:'itemObjective=testing on nyc',
//         headers:{cookie:`todoId=4; sessionid=${sessionid}`}
//       };
//       request(app,options,res=>{
//         th.status_is_ok(res);
//         th.body_contains(res,'testing on nyc')
//         done();
//       })
//     })
//   })
//   describe("POST /editTodoTitle",function(){
//     it('should replace todo title with new one',function(done){
//       let options ={
//         url:'/editTodoTitle',
//         method:'POST',
//         body:'newTitle=testing title',
//         headers:{cookie:`todoId=4; sessionid=${sessionid}`}
//       };
//       request(app,options,res=>{
//         th.status_is_ok(res);
//         th.body_contains(res,'testing title')
//         done();
//       })
//     })
//   })
//   describe("POST /editTodoDescription",function(){
//     it('should replace todo description with new description',function(done){
//       let options ={
//         url:'/editTodoDescription',
//         method:'POST',
//         body:'newDescription=testing Description',
//         headers:{cookie:`todoId=4; sessionid=${sessionid}`}
//       };
//       request(app,options,res=>{
//         th.status_is_ok(res);
//         th.body_contains(res,'testing Description')
//         done();
//       })
//     })
//   })
// })
