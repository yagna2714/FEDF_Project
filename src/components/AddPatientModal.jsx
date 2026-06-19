export default function AddPatientModal({
  showAddPatientModal,
  closeAddPatientModal,
  newPatientForm,
  setNewPatientForm,
  submitNewPatient
}) {
  return (
    <div id="add-patient-modal" className={`modal-overlay ${showAddPatientModal ? '' : 'hidden'}`}>
      <div className="modal-card">
        <div className="modal-header">
          <h3>Register Patient Record</h3>
          <button className="close-modal-btn" onClick={closeAddPatientModal}>&times;</button>
        </div>
        <div className="modal-body">
          <div className="pic-input-group">
            <label>PATIENT ID</label>
            <div className="icon-field">
              <span className="field-icon">#</span>
              <input
                type="text"
                id="new-p-id"
                placeholder="e.g. PT-0897"
                value={newPatientForm.id}
                onChange={(event) => setNewPatientForm((current) => ({ ...current, id: event.target.value }))}
              />
            </div>
          </div>
          <div className="pic-input-group">
            <label>PATIENT NAME</label>
            <div className="icon-field">
              <span className="field-icon">👤</span>
              <input
                type="text"
                id="new-p-name"
                placeholder="Enter name"
                value={newPatientForm.name}
                onChange={(event) => setNewPatientForm((current) => ({ ...current, name: event.target.value }))}
              />
            </div>
          </div>
          <div className="pic-input-group">
            <label>DIAGNOSIS</label>
            <div className="icon-field">
              <span className="field-icon">📄</span>
              <input
                type="text"
                id="new-p-diagnosis"
                placeholder="Enter initial diagnosis summary"
                value={newPatientForm.diagnosis}
                onChange={(event) => setNewPatientForm((current) => ({ ...current, diagnosis: event.target.value }))}
              />
            </div>
          </div>
          <div className="pic-input-group">
            <label>ATTENDING DOCTOR</label>
            <div className="icon-field">
              <span className="field-icon">🩺</span>
              <select
                id="new-p-doctor"
                value={newPatientForm.doctor}
                onChange={(event) => setNewPatientForm((current) => ({ ...current, doctor: event.target.value }))}
              >
                <option value="Dr. Sharma">Dr. Sharma</option>
                <option value="Dr. Mehta">Dr. Mehta</option>
                <option value="Dr. Patel">Dr. Patel</option>
                <option value="Dr. Kumar">Dr. Kumar</option>
                <option value="Dr. Iyer">Dr. Iyer</option>
              </select>
            </div>
          </div>
          <div className="pic-input-group">
            <label>ADMISSION DATE</label>
            <div className="icon-field">
              <span className="field-icon">📅</span>
              <input
                type="text"
                id="new-p-admission"
                placeholder="e.g., 11 May 2026 or —"
                value={newPatientForm.admission}
                onChange={(event) => setNewPatientForm((current) => ({ ...current, admission: event.target.value }))}
              />
            </div>
          </div>
          <div className="pic-input-group">
            <label>CURRENT ADMISSION STATUS</label>
            <div className="icon-field">
              <span className="field-icon">⚡</span>
              <select
                id="new-p-status"
                value={newPatientForm.status}
                onChange={(event) => setNewPatientForm((current) => ({ ...current, status: event.target.value }))}
              >
                <option value="Discharged">Discharged</option>
                <option value="Admitted">Admitted</option>
                <option value="Pending">Pending</option>
              </select>
            </div>
          </div>
          <button className="btn-generate-patient" type="button" onClick={submitNewPatient}>
            Generate Patient
          </button>
        </div>
      </div>
    </div>
  );
}
