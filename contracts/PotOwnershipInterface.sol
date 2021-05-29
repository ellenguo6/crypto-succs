pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

interface PotOwnershipInterface is IERC721 {
    event newPot(address owner, uint256 potId, uint256 design);

    function buyPot(uint256 design, uint256 price)
        external
        payable
        returns (uint256);

    function potsOfOwner(address owner)
        external
        view
        returns (uint256[] memory ownerTokens);

    function setPotSucc(uint256 potId, uint256 succId) external returns (bool);

    function getPotInfo(uint256 potId)
        external
        view
        returns (uint256 design, uint256 succId);

    function setAdmin(address newAdmin) external returns (bool);

    function getPotAge(uint256 potId) external view returns (uint256);
}
