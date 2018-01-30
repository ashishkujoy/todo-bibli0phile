let chai = require('chai');
let assert = chai.assert;
let app = require('../app.js');
let SessionManager = require('../src/sessionManager.js');
let fs = require('./customFs.js');
let request = require('supertest');
const idGenerator=()=>12345;


let doesNotHaveCookies = (res)=>{
  const keys = Object.keys(res.headers);
  let key = keys.find(k=>k.match(/set-cookie/i));
  if(key) throw new Error(`Didnot expect Set-Cookie in header of ${keys}`);
}

beforeEach(function(){
  let sessionManager = new SessionManager(idGenerator);
  sessionManager.createSession('pallabi');
  app.initialize(fs,sessionManager);
})


describe('app',function() {
  describe('GET /',function() {
    it('should redirect to login page',function(done) {
      request(app)
        .get('/')
        .expect(302)
        .expect('Location','/login')
        .end(done);
    })
  })
  describe('GET /login',function() {
    it('should give login page',function(done) {
      request(app)
        .get('/login')
        .expect(200)
        .expect(/Login Page/)
        .end(done);
    })
    it('serves the login page with message for a failed login',done=>{
      request(app)
        .get('/login')
        .set('Cookie','message=Login Failed')
        .expect(200)
        .expect(/Login Failed/)
        .expect(doesNotHaveCookies)
        .end(done);
    })
  })
  describe('GET /home.html',()=>{
    it('gives the home page',done=>{
      request(app)
        .get('/home.html')
        .set('Cookie','sessionid=12345')
        .expect(200)
        .expect(/TO-DO/)
        .end(done);
    })
  })
  describe('GET /todoList',()=>{
    it('gives the all existing todo lists',done=>{
      request(app)
        .get('/todoList')
        .set('Cookie','sessionid=12345')
        .expect(200)
        .expect(/pallabi/)
        .end(done);
    })
  })
  describe('GET /createToDo',()=>{
    it('should redirect to login page',done=>{
      request(app)
        .get('/createToDo')
        .set('Cookie','sessionid=12345')
        .expect(200)
        .expect(/Create A ToDo/)
        .end(done);
    })
  })
  describe('POST /createToDo',function(){
    it('should add a todo in user todos',function(done){
      request(app)
        .post('/createToDo')
        .set('Cookie','sessionid=12345')
        .send('title=testing&description=foo&item=["1","2"]')
        .expect(302)
        .expect('Location','/viewTodo.html')
        .end(done);
      })
    it('should add a todo in user todos even when there is no item',function(done){
      request(app)
        .post('/createToDo')
        .set('Cookie','sessionid=12345')
        .send('title=testing&description=foo&item=')
        .expect(302)
        .expect('Location','/viewTodo.html')
        .end(done);
    })
  })
  describe('GET /todo/:todoId',()=>{
    it('should give a specified todo',function(done){
     request(app)
       .get('/todo/4')
       .set('Cookie','sessionid=12345')
       .expect(200)
       .expect(/vsnbm,/)
       .expect(/edit/)
       .end(done);
    })
  })
  describe('GET /logout',()=>{
    it('should redirect to login page',done=>{
     request(app)
       .get('/logout')
       .set('Cookie','sessionid=12345')
       .expect(302)
       .expect('Location','/login')
       .end(done);
    })
  })
  describe('GET /delete',()=>{
    it('should delete a todo',done=>{
     request(app)
       .get('/delete')
       .set('Cookie','sessionid=12345; todoId=4')
       .expect(302)
       .expect('Location','/viewTodo.html')
       .end(done);
    })
  })
  describe('POST /todo/:todoId/item/:itemId/delete',function(){
    it('should delete a specified todoItem from user todo',function(done){
      request(app)
        .post('/todo/4/item/0/delete')
        .set('Cookie','sessionid=12345')
        .expect(200)
        .expect(/itemId/)
        .end(done);
    })
  })
  describe('POST /login',()=>{
    it('redirects to guestBook for valid user',done=>{
      request(app)
        .post('/login')
        .send('userName=pallabi')
        .expect(302)
        .expect('Location','/home.html')
        .end(done);
    })
    it('redirects to login.html with message for invalid user',done=>{
      request(app)
        .post('/login')
        .send('userName=badUser')
        .expect(302)
        .expect('Location','/login')
        .expect('set-cookie','message=Login Failed; Max-Age=5')
        .end(done);
    })
  })
  describe('POST /todo/:todoId/item/:itemId/changeStatus',()=>{
    it('it should change item status',done=>{
      request(app)
        .post('/todo/4/item/0/changeStatus')
        .set('Cookie','sessionid=12345')
        .expect(200)
        .end(done);
    })
  })
  describe('POST /todo/:todoId/item/:itemId/edit',function(){
    it('should edit the description of specified todo item',function(done){
      request(app)
        .post('/todo/4/item/0/edit')
        .set('Cookie','todoId=4; sessionid=12345')
        .send('newObjective=testing on mocha test')
        .expect(200)
        .expect(/testing on mocha test/)
        .end(done);
    })
  })
  describe('POST /todo/:todoId/addNewItem',function(){
    it('should add a new item in user todo',function(done){
      request(app)
        .post('/todo/4/addNewItem')
        .set('Cookie','sessionid=12345')
        .send('itemObjective=testing on nyc')
        .expect(200)
        .expect(/testing on nyc/)
        .end(done);
    })
  })
  describe("POST /todo/:todoId/editTitle",function(){
    it('should replace todo title with new one',function(done){
      request(app)
        .post('/todo/4/editTitle')
        .set('Cookie','sessionid=12345')
        .send('newTitle=testing title')
        .expect(200)
        .expect(/testing title/)
        .end(done);
    })
  })
  describe("POST /todo/:todoId/editDescription",function(){
    it('should replace todo description with new description',function(done){
      request(app)
        .post('/todo/4/editDescription')
        .set('Cookie','sessionid=12345')
        .send('newDescription=testing Description')
        .expect(200)
        .expect(/testing Description/)
        .end(done);
    })
  })
})
