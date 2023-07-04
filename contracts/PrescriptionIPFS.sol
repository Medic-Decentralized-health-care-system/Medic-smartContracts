// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;


contract PrescriptionIPFS{
    struct Prescriptions{
        string ipfsHash;
        address patientAddress;
        uint256 documentId;
    }

    mapping(address => Prescriptions[]) public records;

    function addPrescription(string memory _ipfsHash, address _patientAddress ,uint256 _documentId) public{
        records[_patientAddress].push(Prescriptions(_ipfsHash, _patientAddress, _documentId));
    }

    function getPrescription(address _patientAddress, uint256 _documentId) public view returns(string memory){
        uint256 i;
        for(i=0; i<records[_patientAddress].length; i++){
            if(records[_patientAddress][i].documentId == _documentId){
                return records[_patientAddress][i].ipfsHash;
            }
        }
        return "No Prescription Found";
    }

    function getPrescriptionCount(address _patientAddress) public view returns(uint256){
        return records[_patientAddress].length;
    }
}