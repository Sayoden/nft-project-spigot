pragma solidity ^0.8.20;

contract NFTMarketplace {
    string public marketplaceName = "Minecraft NFT Market";

    function getMarketplaceName() public view returns (string memory) {
        return marketplaceName;
    }
}
