let chai = require('chai');
let assert = chai.assert;
let SessionManager = require('../src/sessionManager.js');

const idGenerator=()=>12345;
let sessionManager;
describe('SessionManager',function() {
  beforeEach( function(){
    sessionManager = new SessionManager(idGenerator);
  })
  describe('#getSessionID',function(){
    it('should give sessionid',function() {
      assert.equal(sessionManager.getSessionID(),12345);
    })
  })
  describe('#createSession',function() {
    it('should create session for user',function() {
      let sessionid = sessionManager.createSession('pallabi');
      assert.equal(sessionid,12345);
      assert.deepEqual(sessionManager.sessions,{12345:"pallabi"});
    })
  })
  describe('#isLoggedin',function() {
    it('should give true if given sessionid is present in sessions',function() {
      let sessionid = sessionManager.createSession('pallabi');
      assert.ok(sessionManager.isLoggedin(sessionid));
    })
    it('should give false if given sessionid is not present in sessions',function() {
      assert.isNotOk(sessionManager.isLoggedin(45687));
    })
  })
  describe('#getUserName',function() {
    it('should return userName for given sessionid',function() {
      let sessionid = sessionManager.createSession('pallabi');
      assert.deepEqual(sessionManager.getUserName(sessionid),'pallabi');
    })
  })
  describe('#deleteSession',function() {
    it('should delete session for given sessionid',function() {
      let sessionid = sessionManager.createSession('pallabi');
      assert.ok(sessionManager.isLoggedin(sessionid));
      sessionManager.deleteSession(sessionid);
      assert.isNotOk(sessionManager.isLoggedin(sessionid));
    })
  })
})
