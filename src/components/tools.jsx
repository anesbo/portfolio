import React from 'react';
import '../styles/tools.css'; // Import the new CSS file

function Tools() {
  return (
    <section id='tools' className="tools-section scroll-section">
      <h2 className="tools-title">Tools I Use</h2>
      <div className="tools-grid">
        <div className="tool-card">
          <img src="/images/tools/vscode.svg" alt="VS Code logo" />
          <p>VS Code</p>
        </div>
        <div className="tool-card">
          <img src="/images/tools/git.svg" alt="Git logo" />
          <p>Git & GitHub</p>
        </div>
        <div className="tool-card">
          <img src="/images/tools/figma.svg" alt="Figma logo" />
          <p>Figma</p>
        </div>
        <div className="tool-card">
          <img src="/images/tools/vite.svg" alt="Vite logo" />
          <p>Vite</p>
        </div>
        <div className="tool-card">
          <img src="/images/tools/npm.svg" alt="NPM logo" />
          <p>NPM</p>
        </div>
      </div>
    </section>
  );
}

export default Tools;