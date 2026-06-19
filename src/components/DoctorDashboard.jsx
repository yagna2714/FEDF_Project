export default function DoctorDashboard({
  activeDoctorTab,
  activeAlerts,
  patientRegistry,
  newPatientForm,
  showAddPatientModal,
  dischargeForm,
  summaryActive,
  summaryData,
  matchedPatient,
  showSearchResult,
  setShowSearchResult,
  patientSearchQuery,
  openDischargeSummaryFromRecord,
  openAddPatientModal,
  closeAddPatientModal,
  submitNewPatient,
  setPatientSearchQuery,
  updateInlineRegistryField,
  triggerDischargeNotificationRequest,
  resolveAlert,
  triggerSimulatedEmergency,
  setShowSignatureModal,
  setDischargeForm,
  generateSummary,
  downloadSummaryPDF,
  finalizeDocument,
  switchTab,
  logout
}) {
  return (
    <div id="doctor-dashboard" className="page-container active">
      <div className="dashboard-layout">
        <aside className="sidebar">
          <div className="sidebar-brand">
            <h2>HealNest</h2>
            <p className="sidebar-tagline">Care that continues after discharge</p>
          </div>
          <nav className="sidebar-menu">
            <a
              href="#"
              className={`menu-item ${activeDoctorTab === 'overview' ? 'active' : ''}`}
              onClick={(e) => { e.preventDefault(); switchTab('overview'); }}
            >
              Overview Home
            </a>
            <a
              href="#"
              className={`menu-item ${activeDoctorTab === 'discharge' ? 'active' : ''}`}
              onClick={(e) => { e.preventDefault(); switchTab('discharge'); }}
            >
              Discharge Summary
            </a>
            <a
              href="#"
              className={`menu-item ${activeDoctorTab === 'records' ? 'active' : ''}`}
              onClick={(e) => { e.preventDefault(); switchTab('records'); }}
            >
              Patient Records
            </a>
            <a
              href="#"
              className={`menu-item ${activeDoctorTab === 'alerts' ? 'active' : ''}`}
              onClick={(e) => { e.preventDefault(); switchTab('alerts'); }}
            >
              Alerts HUB <span className="badge-count">{activeAlerts.length}</span>
            </a>
          </nav>
          <div className="sidebar-footer">
            <a href="#" className="menu-item logout" onClick={(e) => { e.preventDefault(); logout(); }}>Sign Out</a>
          </div>
        </aside>
        <div className="main-wrapper">
          <main className="main-content">
            <div id="tab-overview" className={`dashboard-tab ${activeDoctorTab === 'overview' ? 'active' : ''}`}>
              <header className="content-header">
                <h2>Welcome to HealNest Doctor Portal</h2>
                <p className="date">Clinical Management Environment</p>
              </header>
              <section className="hospital-info-card">
                <h3>Hospital Overview</h3>
                <p>Manage discharge summaries, patient recovery updates, and follow-up schedules efficiently with HealNest.</p>
              </section>
              <section className="stats-grid">
                <div className="stat-box">
                  <span className="stat-number">14</span>
                  <span className="stat-label">Pending Discharge Forms</span>
                </div>
                <div className="stat-box">
                  <span className="stat-number">128</span>
                  <span className="stat-label">Active Monitored Patients</span>
                </div>
                <div className="stat-box">
                  <span className="stat-number">8</span>
                  <span className="stat-label">Follow-ups Scheduled Today</span>
                </div>
                <div className="stat-box alert">
                  <span className="stat-number">{activeAlerts.length}</span>
                  <span className="stat-label">Critical Alerts Flagged</span>
                </div>
              </section>
              <section className="overview-gallery">
                <h3>Clinical Workspace &amp; Monitoring System</h3>
                <div className="doctor-photos-grid">
                  <div className="doctor-photo-card">
                    <img src="img4.png" alt="Digital Medical Records System" className="doctor-portal-img" />
                    <div className="photo-caption">
                      <strong>Digital Health Records</strong>
                      <p>Secure electronic medical records accessible at your fingertips for real-time patient data review.</p>
                    </div>
                  </div>
                  <div className="doctor-photo-card">
                    <img src="img5.png" alt="Clinical Team Collaboration" className="doctor-portal-img" />
                    <div className="photo-caption">
                      <strong>Collaborative Care Environment</strong>
                      <p>Physicians and nursing staff coordinate seamlessly using the HealNest integrated clinical platform.</p>
                    </div>
                  </div>
                  <div className="doctor-photo-card">
                    <img src="img6.png" alt="Patient Discharge Workflow" className="doctor-portal-img" />
                    <div className="photo-caption">
                      <strong>Discharge Workflow Process</strong>
                      <p>Streamlined patient journey from admission through discharge with digital record management at every step.</p>
                    </div>
                  </div>
                </div>
              </section>
            </div>
            <div id="tab-discharge" className={`dashboard-tab ${activeDoctorTab === 'discharge' ? 'active' : ''}`}>
              <header className="content-header">
                <h2>Generate Discharge Summary</h2>
                <p className="date">Create formal documentation and digital clearance papers</p>
              </header>
              <div className="form-container">
                <form id="discharge-form" onSubmit={generateSummary}>
                  <div className="form-grid">
                    <div className="input-group">
                      <label>Patient Name</label>
                      <input
                        type="text"
                        id="ds-name"
                        required
                        placeholder="Enter name"
                        value={dischargeForm.name}
                        onChange={(event) => setDischargeForm((current) => ({ ...current, name: event.target.value }))}
                      />
                    </div>
                    <div className="input-group">
                      <label>Patient Date of Birth</label>
                      <input
                        type="date"
                        id="ds-dob"
                        required
                        value={dischargeForm.dob}
                        onChange={(event) => setDischargeForm((current) => ({ ...current, dob: event.target.value }))}
                      />
                    </div>
                    <div className="input-group">
                      <label>Patient Age</label>
                      <input
                        type="number"
                        id="ds-age"
                        required
                        placeholder="Enter age"
                        value={dischargeForm.age}
                        onChange={(event) => setDischargeForm((current) => ({ ...current, age: event.target.value }))}
                      />
                    </div>
                    <div className="input-group">
                      <label>Ward No.</label>
                      <input
                        type="text"
                        id="ds-ward"
                        required
                        placeholder="e.g., Ward-304"
                        value={dischargeForm.ward}
                        onChange={(event) => setDischargeForm((current) => ({ ...current, ward: event.target.value }))}
                      />
                    </div>
                    <div className="input-group">
                      <label>Date of Admission</label>
                      <input
                        type="date"
                        id="ds-admission"
                        required
                        value={dischargeForm.admission}
                        onChange={(event) => setDischargeForm((current) => ({ ...current, admission: event.target.value }))}
                      />
                    </div>
                    <div className="input-group">
                      <label>Date of Discharge</label>
                      <input
                        type="date"
                        id="ds-discharge"
                        required
                        value={dischargeForm.discharge}
                        onChange={(event) => setDischargeForm((current) => ({ ...current, discharge: event.target.value }))}
                      />
                    </div>
                    <div className="input-group full-width">
                      <label>Patient ID Mapping Link</label>
                      <input
                        type="text"
                        id="ds-id-link"
                        required
                        placeholder="e.g., PT-0891"
                        value={dischargeForm.idLink}
                        onChange={(event) => setDischargeForm((current) => ({ ...current, idLink: event.target.value }))}
                      />
                    </div>
                    <div className="input-group full-width">
                      <label>Treating Physician</label>
                      <input
                        type="text"
                        id="ds-doctor"
                        required
                        placeholder="Enter physician name"
                        value={dischargeForm.doctor}
                        onChange={(event) => setDischargeForm((current) => ({ ...current, doctor: event.target.value }))}
                      />
                    </div>
                    <div className="input-group full-width">
                      <label>Diagnosis</label>
                      <input
                        type="text"
                        id="ds-diagnosis"
                        required
                        placeholder="Enter diagnosis details"
                        value={dischargeForm.diagnosis}
                        onChange={(event) => setDischargeForm((current) => ({ ...current, diagnosis: event.target.value }))}
                      />
                    </div>
                    <div className="input-group full-width">
                      <label>Procedures Performed</label>
                      <textarea
                        id="ds-procedures"
                        rows="3"
                        required
                        placeholder="List surgical or clinical procedures..."
                        value={dischargeForm.procedures}
                        onChange={(event) => setDischargeForm((current) => ({ ...current, procedures: event.target.value }))}
                      />
                    </div>
                    <div className="input-group full-width">
                      <label>Medications at Discharge</label>
                      <textarea
                        id="ds-medications"
                        rows="3"
                        required
                        placeholder="List discharge medication regimen..."
                        value={dischargeForm.medications}
                        onChange={(event) => setDischargeForm((current) => ({ ...current, medications: event.target.value }))}
                      />
                    </div>
                  </div>
                  <button type="submit" className="btn-action">Generate Discharge Summary</button>
                </form>
              </div>
              <div id="summary-preview-area" className={`preview-card ${summaryActive ? '' : 'hidden'}`}>
                <div id="pdf-render-zone" className="pdf-capture-box">
                  <div className="document-header">
                    <h2>HEALNEST HOSPITAL SYSTEMS</h2>
                    <p className="doc-sub">Official Patient Discharge Summary Record</p>
                    <div className="doc-divider"></div>
                  </div>
                  <div className="document-body">
                    <table className="doc-table">
                      <tbody>
                        <tr>
                          <td><strong>Patient Name:</strong></td>
                          <td>{summaryData?.name || ''}</td>
                          <td><strong>Age / DOB:</strong></td>
                          <td>{summaryData?.ageDob || ''}</td>
                        </tr>
                        <tr>
                          <td><strong>Ward No:</strong></td>
                          <td>{summaryData?.ward || ''}</td>
                          <td><strong>Treating Physician:</strong></td>
                          <td>{summaryData?.doctor || ''}</td>
                        </tr>
                        <tr>
                          <td><strong>Admission Date:</strong></td>
                          <td>{summaryData?.admission || ''}</td>
                          <td><strong>Discharge Date:</strong></td>
                          <td>{summaryData?.discharge || ''}</td>
                        </tr>
                        <tr>
                          <td colSpan="4" className="table-section-title">DIAGNOSIS</td>
                        </tr>
                        <tr>
                          <td colSpan="4" id="pdf-diagnosis" className="block-text">{summaryData?.diagnosis || ''}</td>
                        </tr>
                        <tr>
                          <td colSpan="4" className="table-section-title">PROCEDURES PERFORMED</td>
                        </tr>
                        <tr>
                          <td colSpan="4" id="pdf-procedures" className="block-text">{summaryData?.procedures || ''}</td>
                        </tr>
                        <tr>
                          <td colSpan="4" className="table-section-title">MEDICATIONS PRESCRIBED AT DISCHARGE</td>
                        </tr>
                        <tr>
                          <td colSpan="4" id="pdf-medications" className="block-text">{summaryData?.medications || ''}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div id="pdf-signature-block" className={`signature-display ${summaryData?.isSigned ? '' : 'hidden'}`}>
                    <p><strong>Digitally Verified & Approved By:</strong></p>
                    <div className="signature-img-wrapper">
                      <img id="saved-signature-img" src={summaryData?.signatureData || ''} alt="Doctor Signature" />
                    </div>
                    <p className="signature-date">Signed Timestamp: <span id="sign-timestamp">{summaryData?.timestamp || ''}</span></p>
                  </div>
                </div>
                <div className="action-dock">
                  <button id="btn-trigger-sign" className={`btn-approve ${summaryData?.isSigned ? 'hidden' : ''}`} onClick={() => setShowSignatureModal(true)}>Approve and Sign Summary</button>
                  <button id="btn-final-approve" className={`btn-final ${summaryData?.isSigned ? '' : 'hidden'}`} onClick={finalizeDocument}>Approve</button>
                  <button id="btn-download-pdf" className={`btn-download ${summaryData?.isSigned ? '' : 'hidden'}`} onClick={downloadSummaryPDF}>Download PDF</button>
                </div>
              </div>
            </div>
            <div id="tab-records" className={`dashboard-tab ${activeDoctorTab === 'records' ? 'active' : ''}`}>
              <header className="content-header">
                <h2>Patient Clinical Records</h2>
                <p className="date">Lookup registry histories and register fresh incoming profiles</p>
              </header>
              <div className="records-control-bar">
                <div className="search-box">
                  <input
                    type="text"
                    id="patient-search-input"
                    placeholder="Enter Patient ID to lookup..."
                    value={patientSearchQuery}
                    onChange={(event) => setPatientSearchQuery(event.target.value)}
                  />
                  <button className="btn-search" type="button" onClick={() => setShowSearchResult(true)}>Search</button>
                </div>
                <button className="btn-add" type="button" onClick={openAddPatientModal}>+ Add Patient</button>
              </div>
              <div id="search-result-container" className={`search-output ${showSearchResult ? '' : 'hidden'}`}>
                {showSearchResult && matchedPatient ? (
                  <div className="search-result-card">
                    <h4>Patient Match Discovered</h4>
                    <div className="result-details-grid">
                      <p><strong>Tracking ID:</strong> #{matchedPatient.id}</p>
                      <p><strong>Full Name:</strong> {matchedPatient.name}</p>
                      <p><strong>Condition:</strong> {matchedPatient.diagnosis}</p>
                      <p><strong>Physician:</strong> {matchedPatient.doctor}</p>
                      <p><strong>Discharge Status:</strong> <span className={`status-pill ${matchedPatient.status.toLowerCase() === 'discharged' ? 'status-discharged' : matchedPatient.status.toLowerCase() === 'pending' ? 'status-pending' : 'status-admitted'}`}>{matchedPatient.status}</span></p>
                    </div>
                  </div>
                ) : (
                  <div className="search-result-card no-match">
                    <p>⚠️ No tracking metrics match recorded patient identity index: "<strong>{patientSearchQuery}</strong>"</p>
                  </div>
                )}
              </div>
              <div className="table-card">
                <h3>Recent Tracking Logs</h3>
                <div className="table-responsive">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>PATIENT ID</th>
                        <th>NAME</th>
                        <th>DIAGNOSIS</th>
                        <th>DOCTOR</th>
                        <th>DISCHARGE DATE</th>
                        <th>STATUS</th>
                      </tr>
                    </thead>
                    <tbody id="patient-table-body">
                      {patientRegistry.map((patient, idx) => (
                        <tr key={patient.id}>
                          <td><strong className="clickable-id" onClick={() => openDischargeSummaryFromRecord(patient.id)}>{`#${patient.id}`}</strong></td>
                          <td className="clickable-name" onClick={() => openDischargeSummaryFromRecord(patient.id)}>{patient.name}</td>
                          <td>{patient.diagnosis}</td>
                          <td>{patient.doctor}</td>
                          <td><input type="text" className="table-inline-input" value={patient.discharge} onChange={(event) => updateInlineRegistryField(idx, 'discharge', event.target.value)} /></td>
                          <td>
                            <select className={`table-inline-select status-select-${patient.status.toLowerCase()}`} value={patient.status} onChange={(event) => updateInlineRegistryField(idx, 'status', event.target.value)}>
                              <option value="Discharged">Discharged</option>
                              <option value="Admitted">Admitted</option>
                              <option value="Pending">Pending</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div id="tab-alerts" className={`dashboard-tab ${activeDoctorTab === 'alerts' ? 'active' : ''}`}>
              <header className="content-header">
                <h2>Emergency Alerts Hub</h2>
                <p className="date">Active monitoring response logs</p>
              </header>
              <div className="alerts-layout">
                <div className="alert-summary-box">
                  <h3 id="alert-summary-title">System Status: {activeAlerts.length} Active Incidents</h3>
                  <p>Review emergency clinical listings below. Resolving items removes them from system popups.</p>
                  <button className="btn-trigger-demo" type="button" onClick={triggerSimulatedEmergency}>Simulate Incoming Emergency Alert</button>
                </div>
                <div id="alerts-list-wrapper" className="alerts-feed">
                  {activeAlerts.map((alert) => (
                    <div key={alert.id} className={`alert-item-card ${alert.type.toLowerCase().includes('emergency') ? 'emergency-critical' : 'warning-issue'}`}>
                      <div className="alert-icon-left">⚠️</div>
                      <div className="alert-body-content">
                        <div className="alert-meta-line">
                          <span className="alert-tag-type">{alert.type.toUpperCase()}</span>
                          <span className="alert-time-span">{alert.time}</span>
                        </div>
                        <p className="alert-msg-text">{alert.message}</p>
                        <button className="btn-resolve" type="button" onClick={() => resolveAlert(alert.id)}>Dismiss Incident</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </main>
          <footer className="dashboard-footer">
            <p>© 2026 HealNest Hospital Systems. All rights reserved.</p>
          </footer>
        </div>
      </div>
    </div>
  );
}
