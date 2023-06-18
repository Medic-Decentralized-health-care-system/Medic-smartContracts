// SPDX-License-Identifier : MIT
pragma solidity ^0.8.0;


contract PrescriptionIPFS{
    struct Prescriptions{
        string ipfsHash;
        address ownerAddress;
        uint256 documentId;
    }

    mapping(address => Prescriptions[]) public records;

    function addPrescription(string memory _ipfsHash, uint256 _documentId) public{
        records[msg.sender].push(Prescriptions(_ipfsHash, msg.sender, _documentId));
    }

    function getPrescription(address _ownerAddress, uint256 _documentId) public view returns(string memory){
        uint256 i;
        for(i=0; i<records[_ownerAddress].length; i++){
            if(records[_ownerAddress][i].documentId == _documentId){
                return records[_ownerAddress][i].ipfsHash;
            }
        }
        return "No Prescription Found";
    }

    function getPrescriptionCount(address _ownerAddress) public view returns(uint256){
        return records[_ownerAddress].length;
    }
}