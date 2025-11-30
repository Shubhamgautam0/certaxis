// components/CAList.tsx
import React, { useState } from 'react';
import './ViewCA.css';

interface CertificateAuthority {
  id: string;
  commonName: string;
  organization: string;
  organizationalUnit: string;
  locality: string;
  state: string;
  country: string;
  createdAt: string;
  status: 'active' | 'expired' | 'revoked';
}

interface CAListProps {
  onEdit?: (ca: CertificateAuthority) => void;
  onDelete?: (id: string) => void;
}

const ViewCA: React.FC<CAListProps> = ({ onEdit, onDelete }) => {
  // Dummy data 
  const [cas, setCas] = useState<CertificateAuthority[]>([
    {
      id: '1',
      commonName: 'example.com',
      organization: 'Company Inc.',
      organizationalUnit: 'IT Department',
      locality: 'New York',
      state: 'New York',
      country: 'US',
      createdAt: '2024-01-15',
      status: 'active'
    },
    {
      id: '2',
      commonName: 'test.org',
      organization: 'Test Corporation',
      organizationalUnit: 'Security Team',
      locality: 'San Francisco',
      state: 'California',
      country: 'US',
      createdAt: '2024-01-10',
      status: 'active'
    },
    {
      id: '3',
      commonName: 'myapp.local',
      organization: 'Development Co.',
      organizationalUnit: 'DevOps',
      locality: 'Austin',
      state: 'Texas',
      country: 'US',
      createdAt: '2024-01-05',
      status: 'active'
    }
  ]);

  const [editingCa, setEditingCa] = useState<CertificateAuthority | null>(null);
  const [editFormData, setEditFormData] = useState<Partial<CertificateAuthority>>({});

  const handleEdit = (ca: CertificateAuthority) => {
    if (onEdit) {
      onEdit(ca);
    } else {
      // Default edit behavior
      setEditingCa(ca);
      setEditFormData({ ...ca });
    }
  };

  const handleDelete = (id: string) => {
    if (onDelete) {
      onDelete(id);
    } else {
      // Default delete behavior
      if (window.confirm('Are you sure you want to delete this CA?')) {
        setCas(prev => prev.filter(ca => ca.id !== id));
      }
    }
  };

  const handleSaveEdit = () => {
    if (editingCa && editFormData) {
      setCas(prev => 
        prev.map(ca => 
          ca.id === editingCa.id 
            ? { ...ca, ...editFormData }
            : ca
        )
      );
      setEditingCa(null);
      setEditFormData({});
    }
  };

  const handleCancelEdit = () => {
    setEditingCa(null);
    setEditFormData({});
  };

  const handleEditInputChange = (field: keyof CertificateAuthority, value: string) => {
    setEditFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const getStatusBadge = (status: string) => {
    const statusClasses = {
      active: 'status-active',
      expired: 'status-expired',
      revoked: 'status-revoked'
    };

    return (
      <span className={`status-badge ${statusClasses[status as keyof typeof statusClasses]}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="ca-list-container">
      <h2 className="ca-list-title">Certificate Authorities</h2>
      
      {cas.length === 0 ? (
        <div className="no-cas-message">
          No Certificate Authorities found. Create your first CA above.
        </div>
      ) : (
        <div className="ca-table-container">
          <table className="ca-table">
            <thead>
              <tr>
                <th>Common Name</th>
                <th>Organization</th>
                <th>Organizational Unit</th>
                <th>Locality</th>
                <th>State</th>
                <th>Country</th>
                <th>Created</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {cas.map(ca => (
                <tr key={ca.id}>
                  <td>{ca.commonName}</td>
                  <td>{ca.organization}</td>
                  <td>{ca.organizationalUnit}</td>
                  <td>{ca.locality}</td>
                  <td>{ca.state}</td>
                  <td>{ca.country}</td>
                  <td>{new Date(ca.createdAt).toLocaleDateString()}</td>
                  <td>{getStatusBadge(ca.status)}</td>
                  <td>
                    <div className="action-buttons">
                      <button
                        onClick={() => handleEdit(ca)}
                        className="btn-edit"
                        title="Edit CA"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(ca.id)}
                        className="btn-delete"
                        title="Delete CA"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Edit Modal */}
      {editingCa && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Edit Certificate Authority</h3>
            <div className="edit-form">
              <div className="input-group">
                <label>Common Name:</label>
                <input
                  type="text"
                  value={editFormData.commonName || ''}
                  onChange={(e) => handleEditInputChange('commonName', e.target.value)}
                />
              </div>
              <div className="input-group">
                <label>Organization:</label>
                <input
                  type="text"
                  value={editFormData.organization || ''}
                  onChange={(e) => handleEditInputChange('organization', e.target.value)}
                />
              </div>
              <div className="input-group">
                <label>Organizational Unit:</label>
                <input
                  type="text"
                  value={editFormData.organizationalUnit || ''}
                  onChange={(e) => handleEditInputChange('organizationalUnit', e.target.value)}
                />
              </div>
              <div className="input-group">
                <label>Locality:</label>
                <input
                  type="text"
                  value={editFormData.locality || ''}
                  onChange={(e) => handleEditInputChange('locality', e.target.value)}
                />
              </div>
              <div className="input-group">
                <label>State:</label>
                <input
                  type="text"
                  value={editFormData.state || ''}
                  onChange={(e) => handleEditInputChange('state', e.target.value)}
                />
              </div>
              <div className="input-group">
                <label>Country:</label>
                <input
                  type="text"
                  value={editFormData.country || ''}
                  maxLength={2}
                  onChange={(e) => handleEditInputChange('country', e.target.value)}
                />
              </div>
              <div className="modal-actions">
                <button onClick={handleCancelEdit} className="btn-secondary">
                  Cancel
                </button>
                <button onClick={handleSaveEdit} className="btn-primary">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewCA;