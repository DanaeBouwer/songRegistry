// import the contract artifact
const songRegistry = artifacts.require('./SongRegistry.sol')

// test starts here
contract('songRegistry', function (accounts) {
  // predefine the contract instance
  let songRegistryInstance

  // before each test, create a new contract instance
  beforeEach(async function () {
    songRegistryInstance = await songRegistry.new()
  })

  //First test
  it('checking that a song is correctly added to the registry', async function() {
      await songRegistryInstance.register('Cool song', 'example.com', 1, {'from': accounts[0]})
      let song = await songRegistryInstance.songs(0)
      assert.equal(song.title, 'Cool song', 'Title has not yet been set correctly.')
      assert.equal(song.owner, accounts[0], 'Owner is not account 0')
  })

  //Second test
  it('checking that the song can be bought', async function() {
    await songRegistryInstance.register('Cool song', 'example.com', 1, {'from': accounts[0]})
    await songRegistryInstance.buy(0, {'from': accounts[1], 'value': 1 })
    let buyer = await songRegistryInstance.isBuyer(0, {'from': accounts[1]}) 
    assert.equal(buyer, true, 'buyer is not account 1')

  })

  //Third test
  it('Checking that the number of songs increases with a new registration', async function() {
    await songRegistryInstance.register('Cool song', 'example.com', 1, {'from': accounts[0]})
    let songNumber = await songRegistryInstance.numberOfSongs()
    assert.equal(songNumber, 1, 'number of songs does not increase with new registration')

  })

  //fourth test
    it('Making sure that only true buyers are identified as such', async function() {
    await songRegistryInstance.register('Cool song', 'example.com', 1, {'from': accounts[0]})
    await songRegistryInstance.buy(0, {'from': accounts[1], 'value': 1 })
    let buyer = await songRegistryInstance.isBuyer(5, {'from': accounts[1]}) 
    assert.equal(buyer, false, 'buyer is not account 1')
    
    })

})

