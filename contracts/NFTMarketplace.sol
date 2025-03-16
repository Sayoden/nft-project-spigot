pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NFTMarketplace is ERC721URIStorage, Ownable {
    string public marketplaceName = "Minecraft NFT Market";

    uint256 private _tokenIds;

    struct SaleItem {
        address seller;
        uint256 price;
        bool isForSale;
    }

    mapping(uint256 => SaleItem) public nftSales;

    event NFTMinted(address indexed player, uint256 tokenId);
    event NFTListed(uint256 indexed tokenId, address indexed seller, uint256 price);
    event NFTSold(uint256 indexed tokenId, address indexed buyer, uint256 price);

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

    function listNFT(uint256 tokenId, uint256 price) public {
        require(ownerOf(tokenId) == msg.sender, "Not the owner");
        require(price > 0, "Price must be greater than 0");

        nftSales[tokenId] = SaleItem({
            seller: msg.sender,
            price: price,
            isForSale: true
        });

        emit NFTListed(tokenId, msg.sender, price);
    }

    function buyNFT(uint256 tokenId) public payable {
        require(nftSales[tokenId].isForSale, "NFT not for sale");
        require(msg.value >= nftSales[tokenId].price, "Insufficient funds");

        address seller = nftSales[tokenId].seller;
        uint256 price = nftSales[tokenId].price;

        require(seller != address(0), "Invalid seller");

        payable(seller).transfer(msg.value);

        _transfer(seller, msg.sender, tokenId);

        nftSales[tokenId] = SaleItem({
            seller: address(0),
            price: 0,
            isForSale: false
        });

        emit NFTSold(tokenId, msg.sender, price);
    }

    function getAllListedNFTs() public view returns (uint256[] memory, address[] memory, uint256[] memory) {
        uint256 totalListed = 0;

        for (uint256 i = 1; i <= _tokenIds; i++) {
            if (nftSales[i].isForSale) {
                totalListed++;
            }
        }

        uint256[] memory tokenIds = new uint256[](totalListed);
        address[] memory sellers = new address[](totalListed);
        uint256[] memory prices = new uint256[](totalListed);

        uint256 index = 0;
        for (uint256 i = 1; i <= _tokenIds; i++) {
            if (nftSales[i].isForSale) {
                tokenIds[index] = i;
                sellers[index] = nftSales[i].seller;
                prices[index] = nftSales[i].price;
                index++;
            }
        }

        return (tokenIds, sellers, prices);
    }
}
