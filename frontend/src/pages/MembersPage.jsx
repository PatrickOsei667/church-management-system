import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import memberService from '../services/memberService';
import { setMembers, setLoading, setError } from '../redux/slices/memberSlice';

const MembersPage = () => {
  const dispatch = useDispatch();
  const { members, loading } = useSelector((state) => state.members);
  const [filters, setFilters] = useState({ branch_id: '' });

  useEffect(() => {
    const fetchMembers = async () => {
      dispatch(setLoading(true));
      try {
        const data = await memberService.getAll(filters.branch_id);
        dispatch(setMembers(data));
      } catch (err) {
        dispatch(setError(err.message));
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchMembers();
  }, [filters, dispatch]);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Members</h1>

      {loading ? (
        <p>Loading members...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead className="bg-gray-200">
              <tr>
                <th className="border border-gray-300 p-2">ID</th>
                <th className="border border-gray-300 p-2">Name</th>
                <th className="border border-gray-300 p-2">Email</th>
                <th className="border border-gray-300 p-2">Phone</th>
                <th className="border border-gray-300 p-2">Address</th>
                <th className="border border-gray-300 p-2">Role</th>
              </tr>
            </thead>
            <tbody>
              {members.map((member) => (
                <tr key={member.member_id}>
                  <td className="border border-gray-300 p-2">{member.member_id}</td>
                  <td className="border border-gray-300 p-2">{member.member_name}</td>
                  <td className="border border-gray-300 p-2">{member.email}</td>
                  <td className="border border-gray-300 p-2">{member.phone}</td>
                  <td className="border border-gray-300 p-2">{member.address}</td>
                  <td className="border border-gray-300 p-2">{member.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MembersPage;
