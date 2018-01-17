let chai = require('chai');
let assert = chai.assert;
let request = require('./requestSimulator.js');
process.env.COMMENT_STORE = "./testStore.json";
let app = require('../app.js');
let th = require('./testHelper.js');

describe('app',()=>{
  describe('GET /bad',()=>{
    it('responds with 404',done=>{
      request(app,{method:'GET',url:'/bad'},(res)=>{
        assert.equal(res.statusCode,404);
        done();
      })
    })
  })
  describe('GET /login',()=>{
    it('gives the login page',done=>{
      request(app,{method:'GET',url:'/login'},res=>{
        th.status_is_ok(res);
        th.body_contains(res,'Login Page');
        done();
      })
    })
  })

  describe('GET /login',()=>{
    it('serves the login page',done=>{
      request(app,{method:'GET',url:'/login'},res=>{
        th.status_is_ok(res);
        th.body_does_not_contain(res,'Login Failed');
        th.should_not_have_cookie(res,'message');
        done();
      })
    })
  })
    it('serves the login page with message for a failed login',done=>{
      request(app,{method:'GET',url:'/login',headers:{'cookie':'message=Login Failed'}},res=>{
        th.status_is_ok(res);
        th.body_contains(res,'Login Failed');
        th.should_not_have_cookie(res,'message');
        done();
      })
    })
    describe('GET /home.html',()=>{
      it('gives the home page',done=>{
        let user = {userName:"pallabi"};
        let header = {cookie:"sessionid=12345"};
        request(app,{
          method:'GET',url:'/home.html',headers:header,user:user},res=>{
          th.status_is_ok(res);
          th.body_contains(res,'TO-DO');
          done();
        })
      })
    })
  })
  describe('POST /login',()=>{
    it('redirects to guestBook for valid user',done=>{
      request(app,{method:'POST',url:'/login',body:'userName=pallabi'},res=>{
        th.should_be_redirected_to(res,'/home.html');
        done();
      })
    })
    it('redirects to login.html with message for invalid user',done=>{
      request(app,{method:'POST',url:'/login',body:'userName=badUser'},res=>{
        th.should_be_redirected_to(res,'/login');
        th.should_have_expiring_cookie(res,'message','Login Failed');
        done();
      })
    })
  })
