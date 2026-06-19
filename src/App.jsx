import { useEffect, useMemo, useRef, useState } from 'react';
import AuthForm from './components/AuthForm.jsx';
import DoctorDashboard from './components/DoctorDashboard.jsx';
import PatientDashboard from './components/PatientDashboard.jsx';
import AddPatientModal from './components/AddPatientModal.jsx';
import SignatureModal from './components/SignatureModal.jsx';
import Toasts from './components/Toasts.jsx';
import { initialAlerts, initialPatientRegistry, initialProfileData } from './data/initialData.js';

export default function App() {
  const [isSignUpMode, setIsSignUpMode] = useState(true);
  const [authRole, setAuthRole] = useState('');
  const [activePage, setActivePage] = useState('auth');
  const [activeDoctorTab, setActiveDoctorTab] = useState('overview');
  const [activePatientTab, setActivePatientTab] = useState('home');
  const [patientRegistry, setPatientRegistry] = useState(initialPatientRegistry);
  const [personalProfileData, setPersonalProfileData] = useState(initialProfileData);
  const [globalDischargeSummariesCache, setGlobalDischargeSummariesCache] = useState({});
  const [activeAlerts, setActiveAlerts] = useState(initialAlerts);
  const [summaryData, setSummaryData] = useState(null);
  const [patientSearchQuery, setPatientSearchQuery] = useState('');
  const [showSearchResult, setShowSearchResult] = useState(false);
  const [patientPortalSearchId, setPatientPortalSearchId] = useState('');
  const [patientPortalStatus, setPatientPortalStatus] = useState(null);
  const [patientPortalSummary, setPatientPortalSummary] = useState(null);
  const [newPatientForm, setNewPatientForm] = useState({ id: '', name: '', diagnosis: '', doctor: 'Dr. Sharma', admission: '', status: 'Pending' });
  const [dischargeForm, setDischargeForm] = useState({
    name: '',
    dob: '',
    age: '',
    ward: '',
    admission: '',
    discharge: '',
    idLink: '',
    doctor: '',
    diagnosis: '',
    procedures: '',
    medications: ''
  });
  const [summaryActive, setSummaryActive] = useState(false);
  const [toasts, setToasts] = useState([]);
  const [showAddPatientModal, setShowAddPatientModal] = useState(false);
  const [showSignatureModal, setShowSignatureModal] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);

  const canvasRef = useRef(null);
  const ctxRef = useRef(null);

  useEffect(() => {
    const savedProfile = window.localStorage.getItem('healNestPatientProfile');
    if (savedProfile) {
      setPersonalProfileData(JSON.parse(savedProfile));
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.strokeStyle = '#1e3a8a';
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctxRef.current = ctx;
  }, []);

  useEffect(() => {
    setShowSearchResult(patientSearchQuery.trim() !== '');
  }, [patientSearchQuery]);

  const spawnAlertToast = (message) => {
    const id = Date.now();
    setToasts((current) => [...current, { id, message }]);
    window.setTimeout(() => setToasts((current) => current.filter((toast) => toast.id !== id)), 7000);
  };

  const removeToast = (id) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  };

  const toggleAuthMode = () => {
    setIsSignUpMode((current) => !current);
    setAuthRole('');
  };

  const routeToDashboard = (role) => {
    if (role === 'doctor') {
      setActivePage('doctorDashboard');
      setActiveDoctorTab('overview');
    } else if (role === 'patient') {
      setActivePage('patientDashboard');
      setActivePatientTab('home');
    }
  };

  const handleAuthSubmit = (event) => {
    event.preventDefault();
    if (isSignUpMode) {
      window.alert("Account successfully created! You can now switch to 'Log In'.");
      toggleAuthMode();
      return;
    }
    if (!authRole) {
      window.alert('Please select a role before logging in.');
      return;
    }
    routeToDashboard(authRole);
  };

  const logout = () => {
    setActivePage('auth');
    setIsSignUpMode(false);
    setAuthRole('');
  };

  const switchTab = (tabName) => setActiveDoctorTab(tabName);
  const switchPatientTab = (tabName) => setActivePatientTab(tabName);

  const savePatientProfileData = (event) => {
    event.preventDefault();
    window.localStorage.setItem('healNestPatientProfile', JSON.stringify(personalProfileData));
    window.alert('Success! Your profile has been saved successfully.');
    spawnAlertToast(`Profile Confirmed: Data successfully committed for ${personalProfileData.fullName || 'Registered Client'}`);
  };

  const handleProfileChange = (field, value) => {
    setPersonalProfileData((current) => ({ ...current, [field]: value }));
  };

  const generateSummary = (event) => {
    event.preventDefault();
    const targetPatientId = dischargeForm.idLink.trim().toUpperCase();
    if (!targetPatientId) {
      window.alert('Please provide a Patient ID Mapping Link.');
      return;
    }

    const documentPayload = {
      patientId: targetPatientId,
      name: dischargeForm.name,
      ageDob: `${dischargeForm.age} Yrs / ${dischargeForm.dob}`,
      ward: dischargeForm.ward,
      doctor: dischargeForm.doctor,
      admission: dischargeForm.admission,
      discharge: dischargeForm.discharge,
      diagnosis: dischargeForm.diagnosis,
      procedures: dischargeForm.procedures,
      medications: dischargeForm.medications,
      isSigned: false,
      signatureData: '',
      timestamp: ''
    };

    setGlobalDischargeSummariesCache((current) => ({ ...current, [targetPatientId]: documentPayload }));
    setSummaryData(documentPayload);
    setSummaryActive(true);
  };

  const draw = (event) => {
    if (!isDrawing) return;
    event.preventDefault();

    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    if (!canvas || !ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = event.clientX ?? event.touches?.[0]?.clientX;
    const clientY = event.clientY ?? event.touches?.[0]?.clientY;
    if (clientX === undefined || clientY === undefined) return;

    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const clearSignatureCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    if (!canvas || !ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
  };

  const saveSignatureDraw = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dataURL = canvas.toDataURL();
    setShowSignatureModal(false);
    if (summaryData) {
      const signedSummary = {
        ...summaryData,
        isSigned: true,
        signatureData: dataURL,
        timestamp: new Date().toLocaleString()
      };
      setGlobalDischargeSummariesCache((current) => ({ ...current, [signedSummary.patientId]: signedSummary }));
      setSummaryData(signedSummary);
      spawnAlertToast(`Discharge summary signed for ${signedSummary.patientId}.`);
    }
  };

  const finalizeDocument = () => {
    if (!summaryData) return;
    const updatedSummary = { ...summaryData, isSigned: true, timestamp: summaryData.timestamp || new Date().toLocaleString() };
    setSummaryData(updatedSummary);
    setGlobalDischargeSummariesCache((current) => ({ ...current, [updatedSummary.patientId]: updatedSummary }));
    setPatientRegistry((current) =>
      current.map((patient) =>
        patient.id.toUpperCase() === updatedSummary.patientId
          ? { ...patient, status: 'Discharged', discharge: updatedSummary.discharge }
          : patient
      )
    );
    spawnAlertToast(`Success: Document finalized for ${updatedSummary.patientId}! Cross-portal synchronization active.`);
  };

  const downloadSummaryPDF = () => {
    if (!summaryData) return;
    const targetElement = document.getElementById('pdf-render-zone');
    if (!window.html2pdf || !targetElement) return;

    const options = {
      margin: [10, 10, 10, 10],
      filename: `Discharge_Summary_${summaryData.name.replace(/\s+/g, '_')}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, logging: false, letterRendering: true, scrollY: 0 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    targetElement.style.display = 'block';
    window.html2pdf().set(options).from(targetElement).toPdf().get('pdf').then(() => {
      targetElement.style.removeProperty('display');
    }).save();
  };

  const downloadPatientPortalPDF = () => {
    if (!patientPortalSummary) return;
    const targetElement = document.getElementById('patient-pdf-render-zone');
    if (!window.html2pdf || !targetElement) return;

    const options = {
      margin: [10, 10, 10, 10],
      filename: `Verified_Discharge_Summary_${patientPortalSummary.name.replace(/\s+/g, '_')}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, logging: false, letterRendering: true, scrollY: 0 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    targetElement.style.display = 'block';
    window.html2pdf().set(options).from(targetElement).toPdf().get('pdf').then(() => {
      targetElement.style.removeProperty('display');
    }).save();
  };

  const openDischargeSummaryFromRecord = (patientId) => {
    setActiveDoctorTab('discharge');
    const cached = globalDischargeSummariesCache[patientId.toUpperCase()];
    if (cached) {
      setDischargeForm({
        name: cached.name,
        dob: cached.ageDob.split(' / ')[1] || '',
        age: cached.ageDob.split(' Yrs')[0] || '',
        ward: cached.ward,
        admission: cached.admission,
        discharge: cached.discharge,
        idLink: cached.patientId,
        doctor: cached.doctor,
        diagnosis: cached.diagnosis,
        procedures: cached.procedures,
        medications: cached.medications
      });
      setSummaryData(cached);
      setSummaryActive(true);
    } else {
      setDischargeForm((current) => ({ ...current, idLink: patientId.toUpperCase() }));
      setSummaryData(null);
      setSummaryActive(false);
    }
  };

  const updateInlineRegistryField = (index, field, value) => {
    setPatientRegistry((current) => {
      const copy = [...current];
      copy[index] = { ...copy[index], [field]: value };
      return copy;
    });
  };

  const closeAddPatientModal = () => setShowAddPatientModal(false);

  const submitNewPatient = () => {
    const id = newPatientForm.id.trim().toUpperCase();
    if (!id) {
      window.alert('Please provide a valid target Patient ID configuration.');
      return;
    }

    const newPatient = {
      id,
      name: newPatientForm.name || 'Unassigned Patient',
      diagnosis: newPatientForm.diagnosis || 'General Diagnostic Clearance',
      doctor: newPatientForm.doctor,
      discharge: '—',
      admission: newPatientForm.admission || '—',
      status: newPatientForm.status
    };

    setPatientRegistry((current) => [newPatient, ...current]);
    setShowAddPatientModal(false);
    spawnAlertToast(`Fresh Patient Entry Created: Registered ${newPatient.name} successfully!`);
  };

  const matchedPatient = useMemo(() => {
    const query = patientSearchQuery.trim().toUpperCase().replace('#', '');
    if (!query) return null;
    return patientRegistry.find((item) => item.id.toUpperCase().includes(query));
  }, [patientSearchQuery, patientRegistry]);

  const fetchPatientSummaryFromPortal = () => {
    const searchId = patientPortalSearchId.trim().toUpperCase();
    if (!searchId) {
      window.alert('Please enter a Patient ID to query the summaries database.');
      return;
    }

    const profileRegistryData = patientRegistry.find((p) => p.id.toUpperCase() === searchId);
    const summaryDocumentObject = globalDischargeSummariesCache[searchId];
    setPatientPortalSummary(null);

    if (summaryDocumentObject) {
      setPatientPortalStatus({
        type: 'success',
        title: '🎉 DISCHARGE SUMMARY VERIFIED & AVAILABLE',
        message: `Your treating physician (${summaryDocumentObject.doctor}) has approved and digitally signed your discharge summary. Your full document is shown below.`
      });
      setPatientPortalSummary(summaryDocumentObject);
      spawnAlertToast(`Verified discharge summary loaded for ${searchId}.`);
    } else if (profileRegistryData) {
      setPatientPortalStatus({
        type: 'pending',
        title: '⏳ AWAITING PHYSICIAN SIGNATURE',
        message: `Your discharge summary has been prepared by ${profileRegistryData.doctor}. Awaiting final physician signature. You may send a clearance request below.`
      });
      setPatientPortalSummary({
        patientId: searchId,
        name: profileRegistryData.name,
        ageDob: '—',
        ward: '—',
        doctor: profileRegistryData.doctor,
        admission: profileRegistryData.admission || '—',
        discharge: profileRegistryData.discharge || 'Pending',
        diagnosis: profileRegistryData.diagnosis,
        procedures: 'Details to be completed by treating physician.',
        medications: 'Prescription to be confirmed by treating physician.',
        isSigned: false,
        signatureData: '',
        timestamp: 'Awaiting physician signature'
      });
    } else {
      setPatientPortalStatus({
        type: 'missing',
        title: '⚠️ NO RECORD FOUND',
        message: `No summary matched: "${searchId}". Please check your Patient ID or contact clinical administration.`
      });
      setPatientPortalSummary(null);
    }
  };

  const triggerDischargeNotificationRequest = () => {
    const clientLookupId = patientPortalSearchId.trim().toUpperCase() || 'PT-0891';
    const newAlert = {
      id: `AL-${Math.floor(Math.random() * 900 + 100)}`,
      type: 'Operational Issue',
      message: `Expedite Discharge Form Request: Patient holder ${clientLookupId} has sent a clearance signature alert token to your desk.`,
      time: 'Just Now'
    };
    setActiveAlerts((current) => [newAlert, ...current]);
    window.alert(`Discharge alert successfully broadcasted to your physician for Patient ID: ${clientLookupId}.`);
  };

  const resolveAlert = (id) => {
    setActiveAlerts((current) => current.filter((alert) => alert.id !== id));
  };

  const triggerSimulatedEmergency = () => {
    const demoMessages = [
      'Emergency case: Room 204 telemetry reports sudden SpO2 level Drop (Below 88%)!',
      'Emergency case: ER redirection triggered for inbound cardiac post-op case evaluation.',
      'System Warning: Database sync connection timeout noticed on server segment 4B.'
    ];
    const pickMessage = demoMessages[Math.floor(Math.random() * demoMessages.length)];
    const newAlert = {
      id: `AL-${Math.floor(Math.random() * 900 + 100)}`,
      type: pickMessage.includes('Emergency') ? 'Emergency case' : 'Operational Issue',
      message: pickMessage,
      time: 'Just Now'
    };
    setActiveAlerts((current) => [newAlert, ...current]);
    spawnAlertToast(pickMessage);
  };

  return (
    <>
      <Toasts toasts={toasts} removeToast={removeToast} />

      {activePage === 'auth' && (
        <AuthForm
          isSignUpMode={isSignUpMode}
          authRole={authRole}
          setAuthRole={setAuthRole}
          toggleAuthMode={toggleAuthMode}
          handleAuthSubmit={handleAuthSubmit}
        />
      )}

      {activePage === 'doctorDashboard' && (
        <DoctorDashboard
          activeDoctorTab={activeDoctorTab}
          activeAlerts={activeAlerts}
          patientRegistry={patientRegistry}
          newPatientForm={newPatientForm}
          showAddPatientModal={showAddPatientModal}
          dischargeForm={dischargeForm}
          summaryActive={summaryActive}
          summaryData={summaryData}
          patientSearchQuery={patientSearchQuery}
          setPatientSearchQuery={setPatientSearchQuery}
          showSearchResult={showSearchResult}
          matchedPatient={matchedPatient}
          openDischargeSummaryFromRecord={openDischargeSummaryFromRecord}
          openAddPatientModal={() => {
            setNewPatientForm({ id: '', name: '', diagnosis: '', doctor: 'Dr. Sharma', admission: '', status: 'Pending' });
            setShowAddPatientModal(true);
          }}
          closeAddPatientModal={closeAddPatientModal}
          submitNewPatient={submitNewPatient}
          setNewPatientForm={setNewPatientForm}
          updateInlineRegistryField={updateInlineRegistryField}
          triggerDischargeNotificationRequest={triggerDischargeNotificationRequest}
          resolveAlert={resolveAlert}
          triggerSimulatedEmergency={triggerSimulatedEmergency}
          setShowSignatureModal={setShowSignatureModal}
          setDischargeForm={setDischargeForm}
          generateSummary={generateSummary}
          downloadSummaryPDF={downloadSummaryPDF}
          finalizeDocument={finalizeDocument}
          switchTab={switchTab}
          logout={logout}
        />
      )}

      {activePage === 'patientDashboard' && (
        <PatientDashboard
          activePatientTab={activePatientTab}
          patientPortalSearchId={patientPortalSearchId}
          setPatientPortalSearchId={setPatientPortalSearchId}
          patientPortalStatus={patientPortalStatus}
          patientPortalSummary={patientPortalSummary}
          personalProfileData={personalProfileData}
          savePatientProfileData={savePatientProfileData}
          handleProfileChange={handleProfileChange}
          fetchPatientSummaryFromPortal={fetchPatientSummaryFromPortal}
          patientRegistry={patientRegistry}
          patientSearchQuery={patientSearchQuery}
          setPatientSearchQuery={setPatientSearchQuery}
          matchedPatient={matchedPatient}
          showSearchResult={showSearchResult}
          triggerDischargeNotificationRequest={triggerDischargeNotificationRequest}
          downloadPatientPortalPDF={downloadPatientPortalPDF}
          switchPatientTab={switchPatientTab}
          logout={logout}
        />
      )}

      <AddPatientModal
        showAddPatientModal={showAddPatientModal}
        closeAddPatientModal={closeAddPatientModal}
        newPatientForm={newPatientForm}
        setNewPatientForm={setNewPatientForm}
        submitNewPatient={submitNewPatient}
      />

      <SignatureModal
        showSignatureModal={showSignatureModal}
        setShowSignatureModal={setShowSignatureModal}
        canvasRef={canvasRef}
        isDrawing={isDrawing}
        setIsDrawing={setIsDrawing}
        draw={draw}
        clearSignatureCanvas={clearSignatureCanvas}
        saveSignatureDraw={saveSignatureDraw}
      />
    </>
  );
}
