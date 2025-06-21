import React from 'react';
import { colors, shadows, spacing, borderRadius, typography } from '../../styles/common';


const InputSection = ({
  input,
  setInput,
  handleTranslate,
  isLoading,
  handleGenerate,
  grammarResult,
}) => {
  const categories = ["General", "Business", "Travel", "Technology", "Health"];

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    if (category) {
      handleGenerate(category);
    }
  };

  const renderGrammarResult = () => {
    if (!grammarResult) return null;

    if (grammarResult === "Correct") {
      return (
        <div style={{ color: 'green', marginTop: spacing.sm, fontWeight: 'bold' }}>
          ✓ Correct
        </div>
      );
    }
    
    const [correction, explanation] = grammarResult.split(' - ');

    return (
      <div style={{ color: colors.text.secondary, marginTop: spacing.sm, border: `1px solid ${colors.border}`, padding: spacing.sm, borderRadius: borderRadius.small }}>
        <p><strong style={{ color: 'green' }}>Correction:</strong> {correction}</p>
        {explanation && <p style={{ marginTop: spacing.xs }}><strong style={{ color: 'red' }}>Explanation:</strong>{explanation}</p>}
      </div>
    );
  };

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
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexGrow: 1,
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
      </div>
        <div style={{ marginBottom: spacing.md }}>
          <label htmlFor="category-select" style={{ marginRight: spacing.sm, fontWeight: '500' }}> Generate a sentence:</label>
          <select 
            id="category-select"
            onChange={handleCategoryChange}
            disabled={isLoading}
            style={{
                padding: '8px 12px',
                borderRadius: borderRadius.small,
                border: `1px solid ${colors.border}`,
                backgroundColor: colors.white,
                cursor: 'pointer'
            }}
          >
            <option value="">Select a category...</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter English text here, or generate a sentence from a category above."
        rows={8}
        style={{
          width: '100%',
          padding: spacing.md,
          borderRadius: borderRadius.small,
          border: `2px solid ${colors.border}`,
          fontSize: typography.body.fontSize,
          marginBottom: spacing.sm,
          resize: 'vertical',
          transition: 'border-color 0.2s ease',
          flex: 1,
          minHeight: '200px',
        }}
      />
       {renderGrammarResult()}
       <div style={{height: spacing.lg}}></div>
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