pragma solidity ^0.8.0;

import "./PotOwnershipInterface.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract PotOwnership is PotOwnershipInterface, ERC721 {
    address admin;
    // string name = "CryptoPots";
    // string symbol = "CP";

    modifier onlyAdmin() {
        require(msg.sender == admin, "only admin");
        _;
    }

    modifier potIdInRange(uint256 potId) {
        require(potId < pots.length, "Succulent ID out of range");
        _;
    }

    struct Pot {
        uint64 creationTime;
        uint32 succId;
        uint16 design;
    }

    Pot[] pots;

    constructor(string memory name_, string memory symbol_)
        ERC721(name_, symbol_)
    {
        // name = name_;
        // symbol = symbol_;
        admin = msg.sender;
    }

    function _createPot(uint256 _design, address _owner)
        internal
        returns (uint256)
    {
        pots.push(Pot(uint64(block.timestamp), 0, uint16(_design)));
        uint256 _newPotIndex = pots.length - 1;
        _safeMint(_owner, _newPotIndex);
        emit newPot(_owner, _newPotIndex, _design);
        return _newPotIndex;
    }

    function buyPot(uint256 _design, uint256 _price)
        external
        payable
        override
        returns (uint256)
    {
        require(msg.value == _price, "Wrong price paid for pot");
        return _createPot(_design, msg.sender);
    }

    function potsOfOwner(address _owner)
        external
        view
        override
        returns (uint256[] memory ownerTokens)
    {
        uint256 tokenCount = balanceOf(_owner);

        if (tokenCount == 0) {
            // Return an empty array
            return new uint256[](0);
        } else {
            uint256[] memory result = new uint256[](tokenCount);
            uint256 totalPots = pots.length - 1;
            uint256 resultIndex = 0;

            // We count on the fact that all pots have IDs starting at 1 and increasing
            // sequentially up to the totalPots count.
            uint256 potId;

            for (potId = 1; potId <= totalPots; potId++) {
                if (ownerOf(potId) == _owner) {
                    result[resultIndex] = potId;
                    resultIndex++;
                }
            }

            return result;
        }
    }

    function setPotSucc(uint256 _potId, uint256 _succId)
        external
        override
        onlyAdmin
        potIdInRange(_potId)
        returns (bool)
    {
        pots[_potId].succId = uint32(_succId);
        assert(pots[_potId].succId == _succId);
        return true;
    }

    function getPotInfo(uint256 _potId)
        external
        view
        override
        potIdInRange(_potId)
        returns (uint256 design, uint256 succId)
    {
        Pot memory _thisPot = pots[_potId];
        design = uint256(_thisPot.design);
        succId = uint256(_thisPot.succId);
    }

    function setAdmin(address _newAdmin)
        external
        override
        onlyAdmin
        returns (bool)
    {
        admin = _newAdmin;
        return true;
    }

    function getPotAge(uint256 _potId)
        external
        view
        override
        potIdInRange(_potId)
        returns (uint256)
    {
        return block.timestamp - pots[_potId].creationTime;
    }

    function getAdmin() external view returns (address) {
        return admin;
    }
}
