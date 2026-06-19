export const initialPatientRegistry = [
  { id: 'PT-0891', name: 'Ravi Kumar', diagnosis: 'AMI / STEMI', doctor: 'Dr. Sharma', discharge: '11 May 2026', status: 'Discharged' },
  { id: 'PT-0892', name: 'Priya Reddy', diagnosis: 'Appendicitis', doctor: 'Dr. Mehta', discharge: '10 May 2026', status: 'Discharged' },
  { id: 'PT-0893', name: 'Mohammed Iqbal', diagnosis: 'Diabetes T2', doctor: 'Dr. Patel', discharge: '—', status: 'Pending' },
  { id: 'PT-0894', name: 'Ananya Singh', diagnosis: 'Pneumonia', doctor: 'Dr. Kumar', discharge: '—', status: 'Admitted' },
  { id: 'PT-0895', name: 'Sanjay Nair', diagnosis: 'Hip Fracture', doctor: 'Dr. Sharma', discharge: '9 May 2026', status: 'Discharged' },
  { id: 'PT-0896', name: 'Lakshmi Devi', diagnosis: 'Stroke (CVA)', doctor: 'Dr. Iyer', discharge: '—', status: 'Pending' }
];

export const initialProfileData = {
  fullName: '',
  patientId: '',
  dobAge: '',
  gender: '',
  bloodGroup: '',
  contactNumber: '',
  emailAddress: '',
  address: '',
  emergencyName: '',
  emergencyRelationship: '',
  emergencyPhone: '',
  primaryPhysician: '',
  medicalConditions: '',
  allergies: '',
  currentMedications: '',
  pastSurgeries: ''
};

export const initialAlerts = [
  {
    id: 'AL-102',
    type: 'Emergency case',
    message: 'Emergency case: Room 204 telemetry reports sudden SpO2 level Drop (Below 88%)!',
    time: '5 mins ago'
  }
];
