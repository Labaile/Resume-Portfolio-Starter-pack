import React, { useState, useEffect } from "react";

const AdminDashboard = () => {
  const [contacts, setContacts] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({});
  const [selectedStatus, setSelectedStatus] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const ADMIN_KEY = 'admin123'; // In production, use proper authentication

  useEffect(() => {
    fetchContacts();
    fetchStats();
  }, [currentPage, selectedStatus, searchTerm]);

  const fetchContacts = async () => {
    try {
      const params = new URLSearchParams({
        page: currentPage,
        limit: 20,
        ...(selectedStatus && { status: selectedStatus }),
        ...(searchTerm && { search: searchTerm })
      });

      const response = await fetch(`http://localhost:5000/api/admin/contacts?${params}`, {
        headers: {
          'x-admin-key': ADMIN_KEY
        }
      });

      if (response.ok) {
        const result = await response.json();
        setContacts(result.data.contacts);
        setPagination(result.data.pagination);
      }
    } catch (error) {
      console.error('Error fetching contacts:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/admin/contacts/stats', {
        headers: {
          'x-admin-key': ADMIN_KEY
        }
      });

      if (response.ok) {
        const result = await response.json();
        setStats(result.data);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      const response = await fetch(`http://localhost:5000/api/admin/contacts/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-key': ADMIN_KEY
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (response.ok) {
        // Update local state
        setContacts(prev => prev.map(contact => 
          contact._id === id ? { ...contact, status: newStatus } : contact
        ));
        fetchStats(); // Refresh stats
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const deleteContact = async (id) => {
    if (!window.confirm('Are you sure you want to delete this contact submission?')) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/admin/contacts/${id}`, {
        method: 'DELETE',
        headers: {
          'x-admin-key': ADMIN_KEY
        }
      });

      if (response.ok) {
        setContacts(prev => prev.filter(contact => contact._id !== id));
        fetchStats(); // Refresh stats
      }
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      new: '#ff6b6b',
      read: '#4ecdc4',
      replied: '#45b7d1',
      archived: '#96ceb4'
    };
    return colors[status] || '#95a5a6';
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="admin-dashboard">
      <h1>Contact Form Management</h1>
      
      {/* Statistics */}
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Submissions</h3>
          <p className="stat-number">{stats.total || 0}</p>
        </div>
        <div className="stat-card">
          <h3>Today</h3>
          <p className="stat-number">{stats.today || 0}</p>
        </div>
        <div className="stat-card">
          <h3>This Week</h3>
          <p className="stat-number">{stats.thisWeek || 0}</p>
        </div>
        <div className="stat-card">
          <h3>New Messages</h3>
          <p className="stat-number">{stats.byStatus?.new || 0}</p>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="filters">
        <div className="filter-group">
          <label>Status:</label>
          <select 
            value={selectedStatus} 
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option value="">All</option>
            <option value="new">New</option>
            <option value="read">Read</option>
            <option value="replied">Replied</option>
            <option value="archived">Archived</option>
          </select>
        </div>
        
        <div className="filter-group">
          <label>Search:</label>
          <input
            type="text"
            placeholder="Search by name, email, or message..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Contacts Table */}
      <div className="contacts-table">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Name</th>
              <th>Email</th>
              <th>Subject</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map(contact => (
              <tr key={contact._id}>
                <td>{new Date(contact.createdAt).toLocaleDateString()}</td>
                <td>{contact.name}</td>
                <td>{contact.email}</td>
                <td>{contact.subject || 'No Subject'}</td>
                <td>
                  <select
                    value={contact.status}
                    onChange={(e) => updateStatus(contact._id, e.target.value)}
                    style={{ color: getStatusColor(contact.status) }}
                  >
                    <option value="new">New</option>
                    <option value="read">Read</option>
                    <option value="replied">Replied</option>
                    <option value="archived">Archived</option>
                  </select>
                </td>
                <td>
                  <button 
                    onClick={() => deleteContact(contact._id)}
                    className="delete-btn"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="pagination">
          <button 
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={!pagination.hasPrevPage}
          >
            Previous
          </button>
          <span>
            Page {pagination.currentPage} of {pagination.totalPages}
          </span>
          <button 
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={!pagination.hasNextPage}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
