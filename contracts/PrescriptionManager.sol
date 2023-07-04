//SPDX-License-Identifier: MIT
// pragma solidity ^0.8.0;

// contract PrescriptionManager {

//     struct Medicine {
//         string drug;
//         string tablet;
//         string dosage;
//     }
//     struct Prescription {
//         uint256 id;
//         address patient;
//         address doctor;
//         string title;
//         string bloodPressure;
//         string pulseRate;
//         string disease;
//         string remarks;
//         Medicine[] medicines; //Array of struct medicine 
//         uint256 timestamp;
//     }
    
//     mapping(address => Prescription[]) private prescriptions;

    
//     function addPrescription(
//         address _patient,
//         address _doctor,
//         string memory _disease,
//         string memory _title,
//         string memory _bloodPressure,
//         string memory _pulseRate,
//         string memory _remarks,
//         Medicine[] memory _medicines
//     ) public {
//         uint256 id = prescriptions[_patient].length;
//         uint256 timestamp = block.timestamp;
        
//         Prescription memory newPrescription = Prescription(
//             id,
//             _patient,
//             _doctor,
//             _disease,
//             _title,
//             _bloodPressure,
//             _pulseRate,
//             _remarks,
//             _medicines,
//             timestamp
//         );
        
//         prescriptions[_patient].push(newPrescription);
//     }
    
//     function getPrescription(address _patient, uint256 _index) public view returns (
//         uint256 id,
//         address patient,
//         address doctor,
//         string memory disease,
//         string memory title , 
//         string memory bloodPressure,
//         string memory pulseRate,
//         Medicine[] memory medicines,
//         string memory remarks,
//         uint256 timestamp
//     ) {
//         Prescription memory prescription = prescriptions[_patient][_index];
//         uint256 medicinesLength = prescription.medicines.length;
        
//         return (
//             prescription.id,
//             prescription.patient,
//             prescription.doctor,
//             prescription.disease,
//             prescription.title,
//             prescription.bloodPressure,
//             prescription.pulseRate,
//             prescription.medicines,
//             prescription.remarks,
//             prescription.timestamp
//         );
//     }
    
//     function getPrescriptionCount(address _patient) public view returns (uint256) {
//         return prescriptions[_patient].length;
//     }
// }
