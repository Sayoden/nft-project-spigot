pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NFTMarketplace is ERC721URIStorage, Ownable {
    string public marketplaceName = "Minecraft NFT Market";

    uint256 private _tokenIds;
    event NFTMinted(address indexed player, uint256 tokenId);

    constructor() ERC721("MinecraftNFT", "MCNFT") Ownable(msg.sender) {}

    function getMarketplaceName() public view returns (string memory) {
        return marketplaceName;
    }

    function mintNFT(address player) public onlyOwner returns (uint256) {
        require(player != address(0), "Invalid player address");

        _tokenIds++;
        uint256 newItemId = _tokenIds;

        _mint(player, newItemId);

        emit NFTMinted(player, newItemId);

        return newItemId;
    }

    function getPlayerNFTData(address player) public view returns (uint256[] memory) {
        uint256 balance = balanceOf(player);
        uint256[] memory tokenIds = new uint256[](balance);
        uint256 counter = 0;

        for (uint256 i = 1; i <= _tokenIds; i++) {
            if (ownerOf(i) == player) {
                tokenIds[counter] = i;
                counter++;
            }
        }

        return (tokenIds);
    }

}
