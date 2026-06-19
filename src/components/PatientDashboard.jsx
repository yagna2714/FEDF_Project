import img1 from '../img1.jpg';
import img2 from '../img2.jpg';

export default function PatientDashboard({
  activePatientTab,
  patientPortalSearchId,
  patientPortalStatus,
  patientPortalSummary,
  personalProfileData,
  setPatientPortalSearchId,
  switchPatientTab,
  logout,
  savePatientProfileData,
  handleProfileChange,
  patientRegistry,
  showSearchResult,
  patientSearchQuery,
  matchedPatient,
  setPatientSearchQuery,
  fetchPatientSummaryFromPortal,
  triggerDischargeNotificationRequest,
  downloadPatientPortalPDF
}) {
  const statusCardClass = patientPortalStatus?.type === 'success'
    ? 'search-result-card active-success-block'
    : patientPortalStatus?.type === 'pending'
      ? 'search-result-card active-pending-block'
      : 'search-result-card active-missing-block';

  return (
    <div id="patient-dashboard" className={`page-container ${activePatientTab ? 'active' : ''}`}>
      <div className="dashboard-layout">
        <aside className="sidebar">
          <div className="sidebar-brand">
            <h2>HealNest</h2>
            <p className="sidebar-tagline">Care that continues after discharge</p>
          </div>
          <nav className="sidebar-menu">
            <a href="#" className={`menu-item ${activePatientTab === 'home' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); switchPatientTab('home'); }}>My Health Home</a>
            <a href="#" className={`menu-item ${activePatientTab === 'profile' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); switchPatientTab('profile'); }}>Personal Profile</a>
            <a href="#" className={`menu-item ${activePatientTab === 'summaries' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); switchPatientTab('summaries'); }}>Medical Summaries</a>
            <a href="#" className={`menu-item ${activePatientTab === 'history' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); switchPatientTab('history'); }}>History Module</a>
            <a href="#" className={`menu-item ${activePatientTab === 'followup' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); switchPatientTab('followup'); }}>Follow-Up</a>
            <a href="#" className="menu-item logout" onClick={(e) => { e.preventDefault(); logout(); }}>Sign Out</a>
          </nav>
        </aside>
        <div className="main-wrapper">
          <main className="main-content">
            <div id="pat-tab-home" className={`patient-tab ${activePatientTab === 'home' ? 'active' : ''}`}>
              <header className="content-header">
                <h2>Welcome to Your HealNest Patient Portal</h2>
                <p className="date">Personal Post-Discharge Healing Center</p>
              </header>
              <section className="patient-gallery-hero">
                <div className="gallery-wrapper-grid">
                  <div className="custom-card-img text-overlay-style">
                    <img src={img2} alt="Modern Post-Op Guidance" className="gallery-image" />
                    <h4>Modern Post-Op Guidance</h4>
                  </div>
                  <div className="custom-card-img text-overlay-style">
                    <img src={img1} alt="24/7 Clinical Support Matrix" className="gallery-image" />
                    <h4>24/7 Clinical Support Matrix</h4>
                  </div>
                </div>
              </section>
              <section className="hospital-info-card informative-why-section">
                <h3>Why Choose HealNest Clinical Care Systems?</h3>
                <p>HealNest redefines recovery boundaries by ensuring smooth transitions from modern critical hospital wards to home settings. Our automated digital ecosystem bridges communication gaps between recovering clients and treating clinical staff.</p>
                <div className="value-pillars-container">
                  <div className="pillar-box">
                    <strong>Real-time Telemetry Tracking</strong>
                    <p>Critical incidents and threshold telemetry changes route straight to active emergency response boards instantly.</p>
                  </div>
                  <div className="pillar-box">
                    <strong>Instant Document Synchronization</strong>
                    <p>Discharge summary modifications made by treating specialists mirror onto patient profiles right away without manual delivery delays.</p>
                  </div>
                  <div className="pillar-box">
                    <strong>Strategic Compliance Mapping</strong>
                    <p>Structured medical directives, follow-up timelines, and surgical details stay organized in one place.</p>
                  </div>
                </div>
              </section>
            </div>
            <div id="pat-tab-profile" className={`patient-tab ${activePatientTab === 'profile' ? 'active' : ''}`}>
              <header className="content-header">
                <h2>Personal Clinical Profile Registry</h2>
                <p className="date">Comprehensive patient identification records</p>
              </header>
              <div className="form-container">
                <form id="patient-editable-profile-form" onSubmit={savePatientProfileData}>
                  <div className="profile-form-section">
                    <h3>General Demographics</h3>
                    <div className="form-grid">
                      <div className="input-group">
                        <label htmlFor="p-prof-fullname">Full Name</label>
                        <input type="text" id="p-prof-fullname" required placeholder="Enter your full name" value={personalProfileData.fullName} onChange={(event) => handleProfileChange('fullName', event.target.value)} />
                      </div>
                      <div className="input-group">
                        <label htmlFor="p-prof-pid">Patient ID</label>
                        <input type="text" id="p-prof-pid" required placeholder="Enter registry identification ID (e.g. PT-0891)" value={personalProfileData.patientId} onChange={(event) => handleProfileChange('patientId', event.target.value)} />
                      </div>
                      <div className="input-group">
                        <label htmlFor="p-prof-dobage">Date of Birth / Age</label>
                        <input type="text" id="p-prof-dobage" required placeholder="e.g., DD Month YYYY / Age" value={personalProfileData.dobAge} onChange={(event) => handleProfileChange('dobAge', event.target.value)} />
                      </div>
                      <div className="input-group">
                        <label htmlFor="p-prof-gender">Gender</label>
                        <input type="text" id="p-prof-gender" required placeholder="e.g., Male / Female / Other" value={personalProfileData.gender} onChange={(event) => handleProfileChange('gender', event.target.value)} />
                      </div>
                      <div className="input-group">
                        <label htmlFor="p-prof-blood">Blood Group</label>
                        <input type="text" id="p-prof-blood" required placeholder="e.g., O RhD positive (O+)" value={personalProfileData.bloodGroup} onChange={(event) => handleProfileChange('bloodGroup', event.target.value)} />
                      </div>
                      <div className="input-group">
                        <label htmlFor="p-prof-contact">Contact Number</label>
                        <input type="text" id="p-prof-contact" required placeholder="Enter mobile or phone number" value={personalProfileData.contactNumber} onChange={(event) => handleProfileChange('contactNumber', event.target.value)} />
                      </div>
                      <div className="input-group full-width">
                        <label htmlFor="p-prof-email">Email Address</label>
                        <input type="email" id="p-prof-email" required placeholder="name@domain.com" value={personalProfileData.emailAddress} onChange={(event) => handleProfileChange('emailAddress', event.target.value)} />
                      </div>
                      <div className="input-group full-width">
                        <label htmlFor="p-prof-address">Address</label>
                        <textarea id="p-prof-address" rows="2" required placeholder="Enter full residential location details..." value={personalProfileData.address} onChange={(event) => handleProfileChange('address', event.target.value)} />
                      </div>
                    </div>
                  </div>
                  <div className="profile-form-section mid-spacing">
                    <h3>Emergency Contact</h3>
                    <div className="form-grid">
                      <div className="input-group">
                        <label htmlFor="p-prof-econname">Emergency Contact Name</label>
                        <input type="text" id="p-prof-econname" required placeholder="Enter primary dynamic responder name" value={personalProfileData.emergencyName} onChange={(event) => handleProfileChange('emergencyName', event.target.value)} />
                      </div>
                      <div className="input-group">
                        <label htmlFor="p-prof-econrel">Relationship</label>
                        <input type="text" id="p-prof-econrel" required placeholder="e.g., Spouse, Sibling, Parent" value={personalProfileData.emergencyRelationship} onChange={(event) => handleProfileChange('emergencyRelationship', event.target.value)} />
                      </div>
                      <div className="input-group full-width">
                        <label htmlFor="p-prof-econphone">Phone Number</label>
                        <input type="text" id="p-prof-econphone" required placeholder="Enter emergency access phone number" value={personalProfileData.emergencyPhone} onChange={(event) => handleProfileChange('emergencyPhone', event.target.value)} />
                      </div>
                    </div>
                  </div>
                  <div className="profile-form-section mid-spacing">
                    <h3>Medical Information</h3>
                    <div className="form-grid">
                      <div className="input-group">
                        <label htmlFor="p-prof-doc">Primary Physician/Doctor</label>
                        <input type="text" id="p-prof-doc" required placeholder="Enter designated chief treating consultant" value={personalProfileData.primaryPhysician} onChange={(event) => handleProfileChange('primaryPhysician', event.target.value)} />
                      </div>
                      <div className="input-group">
                        <label htmlFor="p-prof-conditions">Medical Conditions</label>
                        <input type="text" id="p-prof-conditions" required placeholder="List chronic or acute conditions" value={personalProfileData.medicalConditions} onChange={(event) => handleProfileChange('medicalConditions', event.target.value)} />
                      </div>
                      <div className="input-group full-width">
                        <label htmlFor="p-prof-allergies">Allergies</label>
                        <input type="text" id="p-prof-allergies" required placeholder="List compound drug or food allergies" value={personalProfileData.allergies} onChange={(event) => handleProfileChange('allergies', event.target.value)} />
                      </div>
                      <div className="input-group full-width">
                        <label htmlFor="p-prof-meds">Current Medications</label>
                        <textarea id="p-prof-meds" rows="2" required placeholder="List all daily or scheduled medication regimens..." value={personalProfileData.currentMedications} onChange={(event) => handleProfileChange('currentMedications', event.target.value)} />
                      </div>
                      <div className="input-group full-width">
                        <label htmlFor="p-prof-surgeries">Past Surgeries</label>
                        <textarea id="p-prof-surgeries" rows="2" required placeholder="List operations or clinical surgical histories..." value={personalProfileData.pastSurgeries} onChange={(event) => handleProfileChange('pastSurgeries', event.target.value)} />
                      </div>
                    </div>
                  </div>
                  <button type="submit" className="btn-action">Save Profile Parameters</button>
                </form>
              </div>
            </div>
            <div id="pat-tab-summaries" className={`patient-tab ${activePatientTab === 'summaries' ? 'active' : ''}`}>
              <header className="content-header">
                <h2>My Medical Summaries</h2>
                <p className="date">Retrieve authenticated hospital clearance sheets instantly</p>
              </header>
              <div className="form-container search-summary-engine-block">
                <h3>Fetch Real-Time Discharge Summaries</h3>
                <p className="instruction-lbl">Enter your designated Patient ID below to review current status metrics, query the live system, or request discharge authorization updates.</p>
                <div className="search-box wide-search-bar">
                  <input type="text" id="patient-portal-search-input" placeholder="Type assigned Patient ID..." value={patientPortalSearchId} onChange={(event) => setPatientPortalSearchId(event.target.value)} />
                  <button className="btn-search" type="button" onClick={fetchPatientSummaryFromPortal}>Search Database</button>
                </div>
                <div className="interaction-buttons-row">
                  <button type="button" className="btn-request-discharge" onClick={triggerDischargeNotificationRequest}>Send Discharge Clearance Request to Doctor</button>
                </div>
              </div>
              {patientPortalStatus && (
                <div id="patient-portal-summary-status-card" className={statusCardClass}>
                  <div className="status-alert-header">{patientPortalStatus.title}</div>
                  <p>{patientPortalStatus.message}</p>
                </div>
              )}
              {patientPortalSummary && (
                <div id="patient-portal-pdf-area" className="preview-card">
                  <div id="patient-pdf-render-zone" className="pdf-capture-box">
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
                            <td id="p-pdf-name">{patientPortalSummary.name}</td>
                            <td><strong>Age / DOB:</strong></td>
                            <td id="p-pdf-age-dob">{patientPortalSummary.ageDob}</td>
                          </tr>
                          <tr>
                            <td><strong>Ward No:</strong></td>
                            <td id="p-pdf-ward">{patientPortalSummary.ward}</td>
                            <td><strong>Treating Physician:</strong></td>
                            <td id="p-pdf-doctor">{patientPortalSummary.doctor}</td>
                          </tr>
                          <tr>
                            <td><strong>Admission Date:</strong></td>
                            <td id="p-pdf-admission">{patientPortalSummary.admission}</td>
                            <td><strong>Discharge Date:</strong></td>
                            <td id="p-pdf-discharge">{patientPortalSummary.discharge}</td>
                          </tr>
                          <tr>
                            <td colSpan="4" className="table-section-title">DIAGNOSIS</td>
                          </tr>
                          <tr>
                            <td colSpan="4" id="p-pdf-diagnosis" className="block-text">{patientPortalSummary.diagnosis}</td>
                          </tr>
                          <tr>
                            <td colSpan="4" className="table-section-title">PROCEDURES PERFORMED</td>
                          </tr>
                          <tr>
                            <td colSpan="4" id="p-pdf-procedures" className="block-text">{patientPortalSummary.procedures}</td>
                          </tr>
                          <tr>
                            <td colSpan="4" className="table-section-title">MEDICATIONS PRESCRIBED AT DISCHARGE</td>
                          </tr>
                          <tr>
                            <td colSpan="4" id="p-pdf-medications" className="block-text">{patientPortalSummary.medications}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div id="p-pdf-signature-block" className="signature-display">
                      <p><strong>Digitally Verified & Approved By:</strong></p>
                      <div className="signature-img-wrapper">
                        <img id="p-saved-signature-img" src={patientPortalSummary.signatureData || ''} alt="Doctor Signature" />
                      </div>
                      <p className="signature-date">Signed Timestamp: <span id="p-sign-timestamp">{patientPortalSummary.timestamp}</span></p>
                    </div>
                  </div>
                  <div className="action-dock">
                    <button type="button" className="btn-download" onClick={downloadPatientPortalPDF}>⬇ Download PDF</button>
                  </div>
                </div>
              )}
            </div>
            <div id="pat-tab-history" className={`patient-tab ${activePatientTab === 'history' ? 'active' : ''}`}>
              <header className="content-header">
                <h2>Clinical Visit History Module</h2>
                <p className="date">Historical registry log criteria across past hospitalizations</p>
              </header>
              <div className="table-card">
                <h3>Historical Consultation & Admission Logs</h3>
                <div className="table-responsive">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>VISIT DATE</th>
                        <th>DIAGNOSIS / REASON</th>
                        <th>ATTENDING FACULTY</th>
                        <th>PRESCRIBED PHARMACOLOGY THERAPY</th>
                        <th>TREATMENT GIVEN</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td><strong>11 May 2026</strong></td>
                        <td>Acute Myocardial Infarction (AMI / STEMI)</td>
                        <td>Dr. Sharma</td>
                        <td>Tab Clopidogrel 75mg, Tab Atorvastatin 40mg</td>
                        <td>Emergency Coronary Angioplasty with Drug-Eluting Stent (DES) placement in LAD artery. ICU monitoring for 3 days post-procedure. IV Heparin anticoagulation. Cardiac rehabilitation initiated.</td>
                      </tr>
                      <tr>
                        <td><strong>14 Jan 2025</strong></td>
                        <td>Acute Gastroenteritis & Dehydration</td>
                        <td>Dr. Patel</td>
                        <td>IV Fluids, Tab Ondansetron 4mg, Oral Rehydration</td>
                        <td>Intravenous fluid resuscitation (Ringer's Lactate 2L over 6 hrs). Anti-emetic therapy administered. Dietary restriction with gradual oral rehydration. Discharged after 48 hrs observation.</td>
                      </tr>
                      <tr>
                        <td><strong>22 Aug 2022</strong></td>
                        <td>Symptomatic Cholelithiasis (Gallstones)</td>
                        <td>Dr. Mehta</td>
                        <td>Tab Pantoprazole 40mg, Post-Op Analgesics</td>
                        <td>Laparoscopic Cholecystectomy performed under general anesthesia. 3 port technique used. No intraoperative complications. Post-operative pain managed with IV Ketorolac. Discharged on Day 2 post-surgery.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div id="pat-tab-followup" className={`patient-tab ${activePatientTab === 'followup' ? 'active' : ''}`}>
              <header className="content-header">
                <h2>Scheduled Follow-Up & Clinical Consultations</h2>
                <p className="date">Next appointment counters and recovery timelines</p>
              </header>
              <div className="stats-grid">
                <div className="stat-box compliance">
                  <span className="stat-number" id="followup-date-lbl">15 June 2026</span>
                  <span className="stat-label">Next Visit Date Scheduled</span>
                </div>
                <div className="stat-box">
                  <span className="stat-number" id="followup-time-lbl">10:30 AM</span>
                  <span className="stat-label">Appointment Time Frame</span>
                </div>
                <div className="stat-box alert">
                  <span className="stat-number" id="followup-countdown-lbl">19 Days</span>
                  <span className="stat-label">Countdown to Consultation</span>
                </div>
              </div>
              <div className="hospital-info-card generic-follow-instruction-block">
                <h3>Pre-Visit Consultation Directives</h3>
                <p>Please remember to bring all physical prescription vials, log profile updates, and monitor dynamic home blood pressure metrics regularly prior to coming in.</p>
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
