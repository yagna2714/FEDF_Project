export default function SignatureModal({
  showSignatureModal,
  setShowSignatureModal,
  signatureDataUrl,
  canvasRef,
  isDrawing,
  setIsDrawing,
  draw,
  clearSignatureCanvas,
  saveSignatureDraw
}) {
  return (
    <div id="signature-modal" className={`modal-overlay ${showSignatureModal ? '' : 'hidden'}`}>
      <div className="modal-card signature-pad-card">
        <div className="modal-header">
          <h3>Physician Authorization Signature</h3>
          <button className="close-modal-btn" onClick={() => setShowSignatureModal(false)}>&times;</button>
        </div>
        <div className="modal-body">
          <p className="pad-instruction">Draw your electronic signature inside the box below:</p>
          <div className="canvas-wrapper">
            <canvas
              id="signature-canvas"
              ref={canvasRef}
              width={400}
              height={180}
              onMouseDown={(event) => { setIsDrawing(true); draw(event); }}
              onMouseMove={draw}
              onMouseUp={() => setIsDrawing(false)}
              onMouseLeave={() => setIsDrawing(false)}
              onTouchStart={(event) => { setIsDrawing(true); draw(event); }}
              onTouchMove={draw}
              onTouchEnd={() => setIsDrawing(false)}
            />
          </div>
          <div className="canvas-actions">
            <button className="btn-clear" type="button" onClick={clearSignatureCanvas}>Clear Pad</button>
            <button className="btn-approve-sign" type="button" onClick={saveSignatureDraw}>Approve</button>
          </div>
        </div>
      </div>
    </div>
  );
}
