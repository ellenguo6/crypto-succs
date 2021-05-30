pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "./PotOwnershipInterface.sol";

// import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract SuccOwnership is ERC721 {
    // string name = "CryptoSuccs";
    // string symbol = "CS";

    modifier succIdInRange(uint256 succId) {
        require(succId < succs.length, "Succulent ID out of range");
        _;
    }

    event newSucc(
        address owner,
        uint256 succId,
        uint256 parent1Id,
        uint256 parent2Id,
        uint256 genes
    );

    struct Succ {
        uint256 genes;
        uint64 sproutTime;
        uint32 potId;
        uint8 timesWatered;
        uint8 watersNeededIndex;
        bool isBlooming;
    }

    uint8[8] public watersNeeded = [
        uint8(1),
        uint8(2),
        uint8(4),
        uint8(8),
        uint8(15),
        uint8(25),
        uint8(40),
        uint8(60)
    ];

    Succ[] succs;

    mapping(address => uint256) ownerToWaterOrbs;

    PotOwnershipInterface PotOwnership;

    constructor(
        address PotOwnership_,
        string memory name_,
        string memory symbol_
    ) ERC721(name_, symbol_) {
        require(
            PotOwnership_ != address(0),
            "PotOwnership contract cannot be 0"
        );
        PotOwnership = PotOwnershipInterface(PotOwnership_);
        // name = name_;
        // symbol = symbol_;
    }

    function _createSucc(
        uint256 _parent1Id,
        uint256 _parent2Id,
        uint256 _genes,
        address _owner
    ) internal returns (uint256) {
        uint256 watersNeededIndex = 0;
        if (_parent1Id != 0) {
            watersNeededIndex = succs[_parent1Id].watersNeededIndex / 2;
        } else if (_parent2Id != 0) {
            watersNeededIndex = succs[_parent2Id].watersNeededIndex / 2;
        }
        succs.push(
            Succ(
                _genes,
                uint64(block.timestamp),
                0,
                0,
                uint8(watersNeededIndex),
                false
            )
        );
        uint256 _newSuccIndex = succs.length - 1;
        _safeMint(_owner, _newSuccIndex);
        emit newSucc(_owner, _newSuccIndex, _parent1Id, _parent2Id, _genes);
        return _newSuccIndex;
        // return 0;
    }

    function buySucc(uint256 _genes, uint256 _price)
        external
        payable
        returns (uint256)
    {
        require(msg.value == _price, "Wrong price paid for succulent");
        return _createSucc(0, 0, _genes, msg.sender);
    }

    function succsOfOwner(address _owner)
        external
        view
        returns (uint256[] memory ownerTokens)
    {
        uint256 tokenCount = balanceOf(_owner);

        if (tokenCount == 0) {
            // Return an empty array
            return new uint256[](0);
        } else {
            uint256[] memory result = new uint256[](tokenCount);
            uint256 totalSuccs = succs.length - 1;
            uint256 resultIndex = 0;

            // We count on the fact that all succulents have IDs starting at 1 and increasing
            // sequentially up to the totalSucc count.
            uint256 succId;

            for (succId = 1; succId <= totalSuccs; succId++) {
                if (ownerOf(succId) == _owner) {
                    result[resultIndex] = succId;
                    resultIndex++;
                }
            }

            return result;
        }
    }

    function putSuccInPot(uint256 _succId, uint256 _potId)
        external
        returns (bool)
    {
        require(
            ownerOf(_succId) == msg.sender,
            "msg.sender does not own this succulent"
        );
        require(
            PotOwnership.ownerOf(_potId) == msg.sender,
            "msg.sender does not own this pot"
        );
        succs[_succId].potId = uint32(_potId);
        return PotOwnership.setPotSucc(_potId, _succId);
    }

    function getSuccInfo(uint256 _succId)
        external
        view
        succIdInRange(_succId)
        returns (
            uint256 genes,
            uint256 sproutTime,
            uint256 potId,
            uint256 timesWatered,
            uint256 watersNeededIndex,
            bool isBlooming
        )
    {
        Succ memory _thisSucc = succs[_succId];
        genes = _thisSucc.genes;
        sproutTime = uint256(_thisSucc.sproutTime);
        potId = uint256(_thisSucc.potId);
        timesWatered = uint256(_thisSucc.timesWatered);
        watersNeededIndex = uint256(_thisSucc.watersNeededIndex);
        isBlooming = _thisSucc.isBlooming;
    }

    function getSuccAge(uint256 _succId)
        external
        view
        succIdInRange(_succId)
        returns (uint256)
    {
        return block.timestamp - uint256(succs[_succId].sproutTime);
    }

    function getPotOwnership() external view returns (PotOwnershipInterface) {
        return PotOwnership;
    }
}
