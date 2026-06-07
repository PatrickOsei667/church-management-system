import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import branchService from '../services/branchService';
import memberService from '../services/memberService';
import donationService from '../services/donationService';

const DashboardPage = () => {
  const { user } = useSelector((state) => state.auth);
  const [stats, setStats] = useState({
    branches: 0,
    members: 0,
    donations: 0,
    totalDonated: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const branches = await branchService.getAll();
        const membersData = await memberService.getAll();
        const donations = await donationService.getAll();

        const totalDonated = donations.reduce((sum, d) => sum + parseFloat(d.total_amount), 0);

        setStats({
          branches: branches.length,
          members: membersData.data.length,
          donations: donations.length,
          totalDonated,
        });
      } catch (err) {
        console.error('Error fetching stats:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-8">Welcome, {user?.member_name}!</h1>

      {loading ? (
        <p>Loading statistics...</p>
      ) : (
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-blue-500 text-white p-6 rounded shadow">
            <h3 className="text-xl font-bold">Branches</h3>
            <p className="text-3xl mt-2">{stats.branches}</p>
          </div>
          <div className="bg-green-500 text-white p-6 rounded shadow">
            <h3 className="text-xl font-bold">Members</h3>
            <p className="text-3xl mt-2">{stats.members}</p>
          </div>
          <div className="bg-purple-500 text-white p-6 rounded shadow">
            <h3 className="text-xl font-bold">Donations</h3>
            <p className="text-3xl mt-2">{stats.donations}</p>
          </div>
          <div className="bg-orange-500 text-white p-6 rounded shadow">
            <h3 className="text-xl font-bold">Total Donated</h3>
            <p className="text-3xl mt-2">${stats.totalDonated.toFixed(2)}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
