import React from 'react';

const ParseTree = ({ tree }) => {
  const renderNode = (node, level = 0) => {
    if (!node) return null;

    // Calculate indentation and connection styles
    const indentStyle = {
      marginLeft: `${level * 40}px`,
      position: 'relative'
    };

    const nodeStyle = {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      padding: '8px 16px',
      backgroundColor: '#f3f4f6',
      borderRadius: '8px',
      border: '1px solid #e5e7eb',
      margin: '4px 0',
      minWidth: '120px'
    };

    const connectionStyle = {
      position: 'relative',
      paddingLeft: '20px'
    };

    const lineStyle = {
      position: 'absolute',
      left: '0',
      top: '0',
      bottom: '0',
      width: '2px',
      backgroundColor: '#e5e7eb'
    };

    return (
      <div style={indentStyle}>
        <div style={nodeStyle}>
          <span className="node-type" style={{ 
            color: '#3b82f6', 
            fontWeight: '600',
            fontSize: '0.875rem',
            textTransform: 'uppercase'
          }}>
            {node.type}
          </span>
          {node.value && (
            <span className="node-value" style={{
              color: '#1f2937',
              fontSize: '0.875rem'
            }}>
              {node.value}
            </span>
          )}
        </div>
        {node.children && node.children.map((child, index) => (
          <div key={index} style={connectionStyle}>
            <div style={lineStyle} />
            {renderNode(child, level + 1)}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="parse-tree" style={{
      width: '100%',
      overflowX: 'auto',
      padding: '1rem',
      backgroundColor: '#ffffff',
      borderRadius: '12px',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
    }}>
      <h3 className="section-header" style={{
        marginBottom: '1.5rem',
        paddingBottom: '0.75rem',
        borderBottom: '2px solid #e5e7eb',
        color: '#111827',
        fontSize: '1.25rem',
        fontWeight: '600'
      }}>
        Syntax Analysis
      </h3>
      <div className="tree-container" style={{
        padding: '1rem',
        minHeight: '200px',
        backgroundColor: '#f8fafc',
        borderRadius: '8px'
      }}>
        {tree && tree.is_valid ? (
          renderNode(tree)
        ) : (
          <div style={{
            padding: '1rem',
            backgroundColor: '#fee2e2',
            color: '#b91c1c',
            borderRadius: '8px',
            border: '1px solid #fecaca'
          }}>
            {tree?.message || 'Invalid sentence structure'}
          </div>
        )}
      </div>
    </div>
  );
};

export default ParseTree; 