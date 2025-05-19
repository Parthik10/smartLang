import React from 'react';
import { colors, shadows, spacing, borderRadius, typography } from '../../styles/common';

const InputSection = ({ input, setInput, handleTranslate, isLoading }) => {
  return (
    <div style={{
      backgroundColor: colors.white,
      borderRadius: borderRadius.medium,
      padding: spacing.xl,
      boxShadow: shadows.medium,
      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      minHeight: '400px',
      width: '90%',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing.lg,
        borderBottom: `2px solid ${colors.primary}`,
        paddingBottom: spacing.md
      }}>
        <h2 style={{ 
          margin: 0, 
          color: colors.text.primary,
          ...typography.h2,
          fontSize: '1.8rem'
        }}>English Input</h2>
        <div style={{
          backgroundColor: '#e3f2fd',
          padding: `${spacing.xs} ${spacing.md}`,
          borderRadius: borderRadius.small,
          color: colors.primary,
          fontWeight: 'bold',
          fontSize: typography.small.fontSize,
          border: `1px solid ${colors.primary}`
        }}>EN</div>
      </div>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter English text here..."
        rows={8}
        style={{
          width: '100%',
          padding: spacing.md,
          borderRadius: borderRadius.small,
          border: `2px solid ${colors.border}`,
          fontSize: typography.body.fontSize,
          marginBottom: spacing.lg,
          resize: 'vertical',
          transition: 'border-color 0.2s ease',
          flex: 1,
          minHeight: '200px',
          ':focus': {
            outline: 'none',
            borderColor: colors.primary
          }
        }}
      />
      <button 
        onClick={handleTranslate}
        disabled={isLoading || !input.trim()}
        style={{
          backgroundColor: isLoading || !input.trim() ? colors.text.light : colors.primary,
          color: colors.white,
          padding: `${spacing.md} ${spacing.lg}`,
          border: 'none',
          borderRadius: borderRadius.small,
          cursor: isLoading || !input.trim() ? 'not-allowed' : 'pointer',
          fontSize: typography.body.fontSize,
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: spacing.sm,
          transition: 'all 0.2s ease',
          fontWeight: '600',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          ':hover': {
            backgroundColor: isLoading || !input.trim() ? colors.text.light : '#1565c0',
            transform: 'translateY(-2px)',
            boxShadow: shadows.medium
          },
          ':active': {
            transform: 'translateY(0)'
          }
        }}
      >
        {isLoading ? (
          <div style={{ display: 'flex', gap: spacing.xs }}>
            <span className="loading-dot" style={{
              width: '8px',
              height: '8px',
              backgroundColor: colors.white,
              borderRadius: '50%',
              animation: 'bounce 0.5s infinite'
            }}></span>
            <span className="loading-dot" style={{
              width: '8px',
              height: '8px',
              backgroundColor: colors.white,
              borderRadius: '50%',
              animation: 'bounce 0.5s infinite 0.1s'
            }}></span>
            <span className="loading-dot" style={{
              width: '8px',
              height: '8px',
              backgroundColor: colors.white,
              borderRadius: '50%',
              animation: 'bounce 0.5s infinite 0.2s'
            }}></span>
          </div>
        ) : (
          'Translate'
        )}
      </button>
    </div>
  );
};

export default InputSection; 