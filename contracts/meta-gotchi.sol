//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "hardhat/console.sol";

contract MetaGotchi is ERC721, Ownable {

    enum type_character { FOOD, SLEEP, HAPPY }

    uint nextId = 0;

    struct Character {
        uint foodLevel;
        uint sleepLevel;
        uint happyLevel;
        // bool isSleeping;
        string name;
    }

    mapping(uint => Character) private _characterDetails;

    constructor(string memory name, string memory symbol) ERC721(name, symbol) {}

    function getTokenDetails(uint _tokenId) public view returns(Character memory) {
        return _characterDetails[_tokenId];
    }

    function mint(string memory nftName) public payable {
        // require(balanceOf(msg.sender) <= 4, "Already create max characters.");
        uint price = 0.001 ether;
        require(msg.value >= price, "Not enough ETH.");
        Character memory thisCharacter = Character(
            block.timestamp, 
            block.timestamp, 
            block.timestamp, 
            nftName
        );
        _characterDetails[nextId] = thisCharacter;
        _safeMint(msg.sender, nextId);
        nextId++;
    }

    function heal(uint _tokenId, type_character _type) public payable {
        require(ownerOf(_tokenId) == msg.sender, "You cannot heal an other Character than yours.");
        uint price = 1 wei;
        require(msg.value >= price, "Not enough Wei.");
        Character storage thisCharacter = _characterDetails[_tokenId];
        // TODO: add Domain logic from Typescript
        if (_type == type_character.FOOD) {
            thisCharacter.foodLevel = block.timestamp;
        } 
        else if (_type == type_character.SLEEP) {
            thisCharacter.sleepLevel = block.timestamp;
            // thisCharacter.isSleeping = !thisCharacter.isSleeping;
        } 
        else if (_type == type_character.HAPPY) {
            thisCharacter.happyLevel = block.timestamp;
        }
    }

    function _beforeTokenTransfer(address from, address to, uint tokenId) internal override view {
        Character storage thisCharacter = _characterDetails[tokenId];
        require(thisCharacter.foodLevel > 0, "This character is dead and cannot be transfered.");
        require(thisCharacter.happyLevel > 0, "This character is dead and cannot be transfered.");
        require(thisCharacter.sleepLevel > 0, "This character is dead and cannot be transfered.");
    }

}
