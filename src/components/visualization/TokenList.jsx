import React from 'react';
import { colors, shadows, spacing, borderRadius, typography } from '../../styles/common';

const TokenList = ({ tokens }) => {
  return (
    <div className="token-list">
      <h3 className="section-header">Lexical Analysis</h3>
      <div className="token-grid">
        {tokens.map((token, index) => (
          <div key={index} className="token-item">
            <span className="token-type">{token.type}</span>
            <span className="token-value">{token.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TokenList; 