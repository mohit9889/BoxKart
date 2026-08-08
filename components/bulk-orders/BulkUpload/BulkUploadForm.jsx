'use client';

import { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';
import Icon from '@/components/Icon';
import { Alert } from '@/components/ui';

/**
 * Mock parsed rows from an uploaded CSV/Excel file.
 * Simulates a mix of valid and invalid entries.
 */
const MOCK_PARSED_ROWS = [
  {
    id: 1,
    product: 'Corrugated Box',
    dimensions: '12 × 10 × 6″',
    quantity: 2000,
    ply: '3-Ply',
    valid: true,
    error: null,
  },
  {
    id: 2,
    product: 'Mailer Box',
    dimensions: '8 × 6 × 3″',
    quantity: 1500,
    ply: '3-Ply',
    valid: true,
    error: null,
  },
  {
    id: 3,
    product: 'Shipping Box',
    dimensions: '—',
    quantity: 500,
    ply: '5-Ply',
    valid: false,
    error: 'Dimensions are missing',
  },
  {
    id: 4,
    product: 'Die-Cut Box',
    dimensions: '6 × 4 × 2″',
    quantity: 3000,
    ply: '3-Ply',
    valid: true,
    error: null,
  },
  {
    id: 5,
    product: '',
    dimensions: '10 × 8 × 4″',
    quantity: 100,
    ply: '3-Ply',
    valid: false,
    error: 'Product name missing; quantity below 500',
  },
  {
    id: 6,
    product: 'Courier Box',
    dimensions: '14 × 12 × 8″',
    quantity: 5000,
    ply: '5-Ply',
    valid: true,
    error: null,
  },
];

const ACCEPTED_TYPES = [
  'text/csv',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
];

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

/**
 * Bulk upload UI for CSV/Excel files.
 * Handles drag-and-drop, file validation, row preview, and submit flow.
 */
export default function BulkUploadForm() {
  const [uploadState, setUploadState] = useState('empty');
  // empty | selected | parsing | preview | submitting | success | error
  const [file, setFile] = useState(null);
  const [fileError, setFileError] = useState('');
  const [rows, setRows] = useState([]);
  const [dragOver, setDragOver] = useState(false);
  const [quoteRef, setQuoteRef] = useState('');
  const inputRef = useRef(null);

  const validRows = rows.filter((r) => r.valid);
  const invalidRows = rows.filter((r) => !r.valid);

  /** Validate file type and size. */
  const validateFile = useCallback((f) => {
    if (!ACCEPTED_TYPES.includes(f.type) && !f.name.match(/\.(csv|xlsx?)$/i)) {
      return 'Please upload a CSV or Excel file (.csv, .xlsx)';
    }
    if (f.size > MAX_FILE_SIZE) {
      return 'File size exceeds 5 MB limit';
    }
    return '';
  }, []);

  /** Handle file selection from input or drop. */
  const handleFile = useCallback(
    (f) => {
      const error = validateFile(f);
      if (error) {
        setFileError(error);
        setFile(null);
        setUploadState('empty');
        return;
      }
      setFileError('');
      setFile(f);
      setUploadState('selected');
    },
    [validateFile]
  );

  const handleInputChange = useCallback(
    (e) => {
      const f = e.target.files?.[0];
      if (f) handleFile(f);
    },
    [handleFile]
  );

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      setDragOver(false);
      const f = e.dataTransfer.files?.[0];
      if (f) handleFile(f);
    },
    [handleFile]
  );

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setDragOver(false);
  }, []);

  /** Start parsing the uploaded file (mocked). */
  const handleParse = useCallback(() => {
    setUploadState('parsing');
    setTimeout(() => {
      setRows([...MOCK_PARSED_ROWS]);
      setUploadState('preview');
    }, 1500);
  }, []);

  /** Remove a single row from the preview. */
  const handleRemoveRow = useCallback((id) => {
    setRows((prev) => prev.filter((r) => r.id !== id));
  }, []);

  /** Submit the valid rows (mocked). */
  const handleSubmit = useCallback(() => {
    setUploadState('submitting');
    setTimeout(() => {
      if (Math.random() > 0.1) {
        const ref = `BU-${Date.now().toString(36).toUpperCase().slice(-6)}`;
        setQuoteRef(ref);
        setUploadState('success');
      } else {
        setUploadState('error');
      }
    }, 2000);
  }, []);

  /** Reset everything. */
  const handleReset = useCallback(() => {
    setFile(null);
    setFileError('');
    setRows([]);
    setUploadState('empty');
    setQuoteRef('');
    if (inputRef.current) inputRef.current.value = '';
  }, []);

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  // ── Success State ──
  if (uploadState === 'success') {
    return (
      <div className="text-center py-12">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', delay: 0.2 }}
          className="w-20 h-20 bg-accent-light rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <Icon name="CheckCircle" size={40} className="text-accent" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-charcoal mb-3">
            Bulk Quote Submitted!
          </h2>
          <p className="text-text-secondary mb-2">
            Reference: <strong className="text-charcoal">{quoteRef}</strong>
          </p>
          <p className="text-text-secondary mb-2">
            {validRows.length} product{validRows.length !== 1 ? 's' : ''}{' '}
            submitted for quoting.
          </p>
          <p className="text-text-secondary mb-8 max-w-md mx-auto">
            Our team will review your requirements and share pricing within 24
            hours.
          </p>
          <div className="flex justify-center gap-3 flex-wrap">
            <Link href="/products" className="btn-primary">
              Browse Products
            </Link>
            <button onClick={handleReset} className="btn-outline">
              Upload Another File
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Error Banner */}
      {uploadState === 'error' && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Alert variant="error">
            <div className="flex items-center justify-between gap-4 w-full">
              <span>
                Something went wrong while submitting. Please try again.
              </span>
              <button
                onClick={() => setUploadState('preview')}
                className="btn-outline text-sm px-3 py-1.5 shrink-0"
              >
                <Icon name="RefreshCw" size={14} className="inline mr-1" />
                Retry
              </button>
            </div>
          </Alert>
        </motion.div>
      )}

      {/* File Error */}
      {fileError && <Alert variant="warning">{fileError}</Alert>}

      {/* ── Drop Zone / File Selection ── */}
      {(uploadState === 'empty' || uploadState === 'selected') && (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`border-2 border-dashed rounded-xl p-8 md:p-12 text-center transition-colors ${
            dragOver
              ? 'border-kraft bg-kraft-bg'
              : 'border-border hover:border-border-hover'
          }`}
        >
          {uploadState === 'empty' ? (
            <>
              <div className="w-14 h-14 bg-warm-gray rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Icon
                  name="FileText"
                  size={28}
                  className="text-text-tertiary"
                />
              </div>
              <p className="font-semibold text-charcoal mb-1">
                Drag &amp; drop your CSV or Excel file
              </p>
              <p className="text-sm text-text-secondary mb-4">
                Supported: .csv, .xlsx — Max 5 MB
              </p>
              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                className="btn-outline text-sm"
              >
                Browse Files
              </button>
              <input
                ref={inputRef}
                type="file"
                accept=".csv,.xlsx,.xls"
                onChange={handleInputChange}
                className="hidden"
                aria-label="Upload CSV or Excel file"
              />
              <p className="text-xs text-text-tertiary mt-4">
                Need a template?{' '}
                <button
                  type="button"
                  className="text-kraft font-medium hover:underline"
                  onClick={() => {
                    /* In production, this would download a template file */
                    alert(
                      'Template download will be available once the backend is connected.'
                    );
                  }}
                >
                  Download CSV template
                </button>
              </p>
            </>
          ) : (
            // File selected — show file info
            <div className="flex items-center justify-center gap-4">
              <div className="w-12 h-12 bg-accent-light rounded-xl flex items-center justify-center shrink-0">
                <Icon name="FileText" size={24} className="text-accent" />
              </div>
              <div className="text-left">
                <p className="font-medium text-charcoal text-sm">{file.name}</p>
                <p className="text-xs text-text-secondary">
                  {formatFileSize(file.size)}
                </p>
              </div>
              <button
                type="button"
                onClick={handleReset}
                className="ml-2 p-2 rounded-lg hover:bg-warm-gray transition-colors"
                aria-label="Remove file"
              >
                <Icon name="X" size={16} className="text-text-tertiary" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* Parse Button */}
      {uploadState === 'selected' && (
        <div className="flex justify-center">
          <button
            type="button"
            onClick={handleParse}
            className="btn-accent flex items-center gap-2"
          >
            Validate &amp; Preview <Icon name="ArrowRight" size={16} />
          </button>
        </div>
      )}

      {/* ── Parsing State ── */}
      {uploadState === 'parsing' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="card-bk p-8 text-center"
        >
          <div className="w-12 h-12 bg-kraft-bg rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon
              name="Loader2"
              size={24}
              className="text-kraft animate-spin"
            />
          </div>
          <p className="font-medium text-charcoal mb-1">
            Validating your file…
          </p>
          <p className="text-sm text-text-secondary">
            Checking product data and quantities
          </p>
        </motion.div>
      )}

      {/* ── Preview Table ── */}
      {(uploadState === 'preview' ||
        uploadState === 'submitting' ||
        uploadState === 'error') && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="card-bk overflow-hidden"
        >
          {/* Summary Badges */}
          <div className="flex items-center gap-3 p-4 border-b border-border">
            <span className="badge badge-accent">{validRows.length} valid</span>
            {invalidRows.length > 0 && (
              <span className="badge badge-danger">
                {invalidRows.length} invalid
              </span>
            )}
            <span className="text-xs text-text-tertiary ml-auto">
              {rows.length} total rows
            </span>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-warm-gray text-left">
                  <th className="px-4 py-3 font-medium text-text-secondary">
                    Product
                  </th>
                  <th className="px-4 py-3 font-medium text-text-secondary">
                    Dimensions
                  </th>
                  <th className="px-4 py-3 font-medium text-text-secondary">
                    Qty
                  </th>
                  <th className="px-4 py-3 font-medium text-text-secondary">
                    Ply
                  </th>
                  <th className="px-4 py-3 font-medium text-text-secondary text-center">
                    Status
                  </th>
                  <th className="px-4 py-3 w-10" />
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {rows.map((row) => (
                    <motion.tr
                      key={row.id}
                      layout
                      exit={{ opacity: 0, height: 0 }}
                      className={`border-b border-border ${
                        row.valid ? '' : 'bg-danger-light/50'
                      }`}
                    >
                      <td className="px-4 py-3 text-charcoal font-medium">
                        {row.product || (
                          <span className="text-danger italic">Missing</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-text-secondary">
                        {row.dimensions}
                      </td>
                      <td className="px-4 py-3 text-text-secondary">
                        {row.quantity.toLocaleString('en-IN')}
                      </td>
                      <td className="px-4 py-3 text-text-secondary">
                        {row.ply}
                      </td>
                      <td className="px-4 py-3 text-center">
                        {row.valid ? (
                          <span
                            className="inline-flex items-center gap-1 text-accent text-xs font-medium"
                            title="Valid"
                          >
                            <Icon name="CheckCircle" size={14} /> Valid
                          </span>
                        ) : (
                          <span
                            className="inline-flex items-center gap-1 text-danger text-xs font-medium"
                            title={row.error}
                          >
                            <Icon name="AlertCircle" size={14} /> Invalid
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <button
                          type="button"
                          onClick={() => handleRemoveRow(row.id)}
                          disabled={uploadState === 'submitting'}
                          className="p-1 rounded hover:bg-warm-gray transition-colors disabled:opacity-50"
                          aria-label={`Remove ${row.product || 'row'}`}
                        >
                          <Icon
                            name="Trash2"
                            size={14}
                            className="text-text-tertiary"
                          />
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>

          {/* Invalid Row Hint */}
          {invalidRows.length > 0 && (
            <div className="px-4 py-3 bg-warning-light border-t border-warning/20">
              <p className="text-xs text-text-secondary">
                <Icon
                  name="Info"
                  size={12}
                  className="inline mr-1 text-warning"
                />
                Invalid rows will be excluded from the quote. Remove or fix them
                in your file and re-upload.
              </p>
            </div>
          )}

          {/* Empty after removal */}
          {rows.length === 0 && (
            <div className="p-8 text-center">
              <p className="text-text-secondary text-sm mb-3">
                No rows remaining.
              </p>
              <button onClick={handleReset} className="btn-outline text-sm">
                Upload a new file
              </button>
            </div>
          )}

          {/* Actions */}
          {rows.length > 0 && (
            <div className="flex items-center justify-between p-4 border-t border-border">
              <button
                type="button"
                onClick={handleReset}
                disabled={uploadState === 'submitting'}
                className="btn-ghost text-sm"
              >
                Cancel
              </button>
              <motion.button
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={handleSubmit}
                disabled={
                  validRows.length === 0 || uploadState === 'submitting'
                }
                className="btn-accent flex items-center gap-2"
              >
                {uploadState === 'submitting' ? (
                  <>
                    <Icon name="Loader2" size={16} className="animate-spin" />
                    Submitting…
                  </>
                ) : (
                  <>
                    Submit {validRows.length} Product
                    {validRows.length !== 1 ? 's' : ''} for Quote
                    <Icon name="ArrowRight" size={16} />
                  </>
                )}
              </motion.button>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}
