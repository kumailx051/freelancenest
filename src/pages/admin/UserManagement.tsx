import React, { useState, useEffect } from 'react';
import { collection, getDocs, doc, updateDoc, deleteDoc, query, orderBy } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { 
  Users, 
  Search, 
  Filter, 
  MoreVertical, 
  Trash2, 
  Shield, 
  ShieldCheck,
  UserX,
  MapPin
} from 'lucide-react';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: 'freelancer' | 'client';
  accountType?: 'freelancer' | 'client';
  status: 'active' | 'suspended' | 'pending';
  profilePictureUrl?: string;
  location?: string;
  profileTitle?: string;
  createdAt: any;
  lastLogin?: any;
  isVerified: boolean;
}

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [showActions, setShowActions] = useState<string | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    filterUsers();
  }, [users, searchTerm, roleFilter, statusFilter]);

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      const usersQuery = query(collection(db, 'users'), orderBy('createdAt', 'desc'));
      const usersSnapshot = await getDocs(usersQuery);
      
      const usersData: User[] = [];
      usersSnapshot.forEach((doc) => {
        const userData = doc.data();
        usersData.push({
          id: doc.id,
          firstName: userData.firstName || '',
          lastName: userData.lastName || '',
          email: userData.email || '',
          role: userData.accountType || userData.role || 'freelancer',
          accountType: userData.accountType || userData.role || 'freelancer',
          status: userData.status || 'active',
          profilePictureUrl: userData.profilePictureUrl || '',
          location: userData.location || '',
          profileTitle: userData.profileTitle || '',
          createdAt: userData.createdAt,
          lastLogin: userData.lastLogin,
          isVerified: userData.isVerified || false
        });
      });
      
      setUsers(usersData);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filterUsers = () => {
    let filtered = users;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(user => 
        user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (user.accountType || user.role).toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Role filter
    if (roleFilter !== 'all') {
      filtered = filtered.filter(user => (user.accountType || user.role) === roleFilter);
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(user => user.status === statusFilter);
    }

    setFilteredUsers(filtered);
  };

  const handleUserAction = async (userId: string, action: 'suspend' | 'activate' | 'verify' | 'delete') => {
    try {
      const userRef = doc(db, 'users', userId);
      
      switch (action) {
        case 'suspend':
          await updateDoc(userRef, { status: 'suspended' });
          break;
        case 'activate':
          await updateDoc(userRef, { status: 'active' });
          break;
        case 'verify':
          await updateDoc(userRef, { isVerified: true });
          break;
        case 'delete':
          if (window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
            await deleteDoc(userRef);
          }
          break;
      }
      
      fetchUsers(); // Refresh the list
      setShowActions(null);
    } catch (error) {
      console.error('Error updating user:', error);
      alert('Failed to update user. Please try again.');
    }
  };

  const handleBulkAction = async (action: 'suspend' | 'activate' | 'delete') => {
    if (selectedUsers.length === 0) return;
    
    if (action === 'delete' && !window.confirm(`Are you sure you want to delete ${selectedUsers.length} users?`)) {
      return;
    }

    try {
      const promises = selectedUsers.map(userId => {
        const userRef = doc(db, 'users', userId);
        if (action === 'delete') {
          return deleteDoc(userRef);
        } else {
          return updateDoc(userRef, { status: action === 'suspend' ? 'suspended' : 'active' });
        }
      });
      
      await Promise.all(promises);
      setSelectedUsers([]);
      fetchUsers();
    } catch (error) {
      console.error('Error performing bulk action:', error);
      alert('Failed to perform bulk action. Please try again.');
    }
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      active: 'bg-[#ffeee3] text-[#FF6B00]',
      suspended: 'bg-[#ffeee3] text-[#2E2E2E]',
      pending: 'bg-[#ffeee3] text-[#FF6B00]'
    };
    return styles[status as keyof typeof styles] || 'bg-[#ffeee3] text-[#2E2E2E]';
  };

  const getRoleBadge = (role: string) => {
    const styles = {
      freelancer: 'bg-[#ffeee3] text-[#FF6B00] border border-[#FF6B00]',
      client: 'bg-[#ffeee3] text-[#2E2E2E] border border-[#2E2E2E]'
    };
    return styles[role as keyof typeof styles] || 'bg-[#ffeee3] text-[#2E2E2E] border border-[#2E2E2E]';
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#ffeee3] pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF6B00]"></div>
            <span className="ml-3 text-[#2E2E2E]">Loading users...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#ffeee3] pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#2E2E2E]">User Management</h1>
            <p className="text-[#2E2E2E]/70">Manage and monitor all platform users</p>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-[#2E2E2E]/50">
              {filteredUsers.length} of {users.length} users
            </span>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full border border-[#ffeee3] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent"
                />
              </div>

              {/* Filters */}
              <div className="flex space-x-4">
                <div className="flex items-center space-x-2">
                  <Filter className="w-5 h-5 text-[#FF6B00]" />
                  <select
                    value={roleFilter}
                    onChange={(e) => setRoleFilter(e.target.value)}
                    className="border border-[#ffeee3] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
                  >
                    <option value="all">All Roles</option>
                    <option value="freelancer">Freelancers</option>
                    <option value="client">Clients</option>
                  </select>
                </div>

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="border border-[#ffeee3] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="suspended">Suspended</option>
                  <option value="pending">Pending</option>
                </select>
              </div>
            </div>

            {/* Bulk Actions */}
            {selectedUsers.length > 0 && (
              <div className="mt-4 p-4 bg-[#ffeee3] rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#2E2E2E]">
                    {selectedUsers.length} users selected
                  </span>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleBulkAction('activate')}
                      className="px-3 py-1 bg-[#FF6B00] text-white text-sm rounded hover:bg-[#FF6B00]/90"
                    >
                      Activate
                    </button>
                    <button
                      onClick={() => handleBulkAction('suspend')}
                      className="px-3 py-1 bg-[#2E2E2E] text-white text-sm rounded hover:bg-[#2E2E2E]/90"
                    >
                      Suspend
                    </button>
                    <button
                      onClick={() => handleBulkAction('delete')}
                      className="px-3 py-1 bg-[#2E2E2E] text-white text-sm rounded hover:bg-[#2E2E2E]/90"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left">
                    <input
                      type="checkbox"
                      checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedUsers(filteredUsers.map(user => user.id));
                        } else {
                          setSelectedUsers([]);
                        }
                      }}
                      className="rounded border-[#ffeee3] text-[#FF6B00] focus:ring-[#FF6B00]"
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Joined
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedUsers.includes(user.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedUsers([...selectedUsers, user.id]);
                          } else {
                            setSelectedUsers(selectedUsers.filter(id => id !== user.id));
                          }
                        }}
                        className="rounded border-[#ffeee3] text-[#FF6B00] focus:ring-[#FF6B00]"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          {user.profilePictureUrl ? (
                            <img 
                              src={user.profilePictureUrl} 
                              alt={`${user.firstName} ${user.lastName}`}
                              className="h-10 w-10 rounded-full object-cover"
                            />
                          ) : (
                            <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                              <Users className="w-6 h-6 text-gray-600" />
                            </div>
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="flex items-center">
                            <div className="text-sm font-medium text-gray-900">
                              {user.firstName} {user.lastName}
                            </div>
                            {user.isVerified && (
                              <ShieldCheck className="w-4 h-4 text-[#FF6B00] ml-2" />
                            )}
                          </div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                          {user.location && (
                            <div className="text-xs text-gray-400 flex items-center mt-1">
                              <MapPin className="w-3 h-3 mr-1" />
                              {user.location}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className={`inline-flex w-fit px-3 py-1 text-xs font-semibold rounded-full ${getRoleBadge(user.accountType || user.role)}`}>
                          {(user.accountType || user.role).toUpperCase()}
                        </span>
                        {user.profileTitle && (
                          <div className="text-xs text-gray-500 mt-1">{user.profileTitle}</div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(user.status)}`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {user.createdAt ? new Date(user.createdAt.toDate()).toLocaleDateString() : 'N/A'}
                    </td>
                    <td className="px-6 py-4 relative">
                      <button
                        onClick={() => setShowActions(showActions === user.id ? null : user.id)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <MoreVertical className="w-5 h-5" />
                      </button>
                      
                      {showActions === user.id && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border">
                          <div className="py-1">
                            {user.status === 'active' ? (
                              <button
                                onClick={() => handleUserAction(user.id, 'suspend')}
                                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                              >
                                <UserX className="w-4 h-4 mr-2" />
                                Suspend User
                              </button>
                            ) : (
                              <button
                                onClick={() => handleUserAction(user.id, 'activate')}
                                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                              >
                                <Shield className="w-4 h-4 mr-2" />
                                Activate User
                              </button>
                            )}
                            
                            {!user.isVerified && (
                              <button
                                onClick={() => handleUserAction(user.id, 'verify')}
                                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                              >
                                <ShieldCheck className="w-4 h-4 mr-2" />
                                Verify User
                              </button>
                            )}
                            
                            <button
                              onClick={() => handleUserAction(user.id, 'delete')}
                              className="flex items-center px-4 py-2 text-sm text-red-700 hover:bg-red-50 w-full text-left"
                            >
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete User
                            </button>
                          </div>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredUsers.length === 0 && (
            <div className="text-center py-12">
              <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No users found matching your criteria</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserManagement;