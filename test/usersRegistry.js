const UsersRegistry = require('../src/usersRegistry.js');
const User = require('../src/user.js');
const assert = require('chai').assert;
let customFs;
let userRegistry;
beforeEach(function(){
  customFs = require('./customFs.js');
  userRegistry = new UsersRegistry(customFs,'./data/todoList.json');
  userRegistry.load();
})
describe('userRegistry',function(){
  describe('getAUser',function(){
    it('should give a specified user',function(){
      let user = userRegistry.getAUser('pallabi');
      let userInStringFormat = JSON.stringify(user);
      assert.include(userInStringFormat,'pallabi');
    })
    it('should give undefined if request user is not present in it',function(){
      let user = userRegistry.getAUser('joy');
      assert.isUndefined(user);
    })
  })
  describe('write',function(){
    it('should write all user information in storage file',function(){
      userRegistry.write();
      customFs = JSON.stringify(customFs);
      assert.include(customFs,'pallabi')
      assert.include(customFs,"objective")
    })
  })
  describe('addNewUser',function(){
    it('add a given user in allUsers',function(){
      assert.isUndefined(userRegistry.getAUser('ashish'));
      userRegistry.addNewUser(new User('ashish'));
      assert.deepEqual(userRegistry.getAUser('ashish'),new User('ashish'));
    })
  })
})
