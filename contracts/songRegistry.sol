pragma solidity >=0.5.0;

contract songRegistry {
    struct Song {
        address owner;
        string title;
        string url;
        uint price;
}

Song[] public songs;

mapping (uint => address[]) buyers;

function register(string memory title, string memory url, uint price) public returns(uint) {
    Song memory song = Song(msg.sender, title, url, price);
    songs.push(song);
    buyers[songs.length - 1].push(msg.sender);
    return songs.length - 1;
}

function numberOfSongs() public view returns(uint) {
    return songs.length;
}

function isBuyer(uint songId) public view returns(bool) {
    address[] storage songBuyers = buyers[songId];
    bool buyer;
    for (uint i; i < songBuyers.length; i++) {
        if (songBuyers[i] == msg.sender) {
            buyer = true;
            } else {
            buyer = false;
     }
    }
    return buyer;
}

function buy(uint songId) public payable {
    Song storage song = songs[songId];
    require(msg.value == song.price, 'Value does not match price');
    buyers[songId].push(msg.sender);
    address(uint16(song.owner)).transfer(msg.value);
    }
}