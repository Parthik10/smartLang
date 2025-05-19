import React from 'react';
import { colors, shadows, spacing, borderRadius, typography } from '../../styles/common';

const OutputSection = ({ translation, error, handleReportError }) => {
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
        borderBottom: `2px solid ${colors.secondary}`,
        paddingBottom: spacing.md
      }}>
        <h2 style={{ 
          margin: 0, 
          color: colors.text.primary,
          ...typography.h2,
          fontSize: '1.8rem'
        }}>Spanish Translation</h2>
        <div style={{
          backgroundColor: '#fff3e0',
          padding: `${spacing.xs} ${spacing.md}`,
          borderRadius: borderRadius.small,
          color: colors.secondary,
          fontWeight: 'bold',
          fontSize: typography.small.fontSize,
          border: `1px solid ${colors.secondary}`
        }}>ES</div>
      </div>
      
      {error ? (
        <div style={{
          backgroundColor: '#ffebee',
          padding: spacing.md,
          borderRadius: borderRadius.small,
          color: colors.error,
          display: 'flex',
          alignItems: 'center',
          gap: spacing.sm,
          border: `1px solid ${colors.error}`,
          flex: 1
        }}>
          <span>⚠️</span>
          <p style={{ margin: 0, fontSize: typography.body.fontSize }}>{error}</p>
        </div>
      ) : translation ? (
        <div style={{
          backgroundColor: colors.background,
          padding: spacing.md,
          borderRadius: borderRadius.small,
          marginBottom: spacing.md,
          border: `1px solid ${colors.border}`,
          flex: 1,
          minHeight: '200px',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <p style={{ 
            margin: 0, 
            fontSize: typography.body.fontSize,
            lineHeight: 1.6,
            color: colors.text.primary,
            flex: 1
          }}>{translation}</p>
          <button 
            onClick={handleReportError}
            style={{
              backgroundColor: colors.white,
              border: `2px solid #FFD700`,
              padding: `${spacing.sm} ${spacing.md}`,
              borderRadius: borderRadius.small,
              marginTop: spacing.md,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: spacing.sm,
              color: colors.text.secondary,
              transition: 'all 0.2s ease',
              fontWeight: '600',
              ':hover': {
                backgroundColor: '#fff3e0',
                borderColor: '#FFA500',
                transform: 'translateY(-2px)',
                boxShadow: shadows.small
              }
            }}
          >
            <span>🔍</span> Report Error
          </button>
        </div>
      ) : (
        <div style={{
          backgroundColor: colors.background,
          padding: spacing.md,
          borderRadius: borderRadius.small,
          color: colors.text.light,
          textAlign: 'center',
          border: `1px dashed ${colors.border}`,
          flex: 1,
          minHeight: '200px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: typography.body.fontSize
        }}>
          Translation will appear here...
        </div>
      )}
    </div>
  );
};

export default OutputSection; 