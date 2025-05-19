import React from 'react';

function Footer() {
  return (
    <footer className="bg-black text-white py-4 mt-5" >
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h5 className="mb-3">Compiler Design Project</h5>
            <p className="mb-0">A comprehensive tool for English to Spanish translation and analysis.</p>
          </div>
          <div className="col-md-6 text-md-end">
            <h5 className="mb-3">Team Members</h5>
            <p className="mb-0">
              Parthik Mangal<br />
              Sweta Chand<br />
              Abhishek Singh
            </p>
          </div>
        </div>
        <hr className="my-4 border-secondary" />
        <div className="text-center">
          <p className="mb-0">&copy; {new Date().getFullYear()} SmartLang. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer; 