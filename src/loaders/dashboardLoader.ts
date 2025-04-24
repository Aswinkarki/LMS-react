import { redirect } from 'react-router-dom';
import { fetchDashboardData, fetchOverdueBorrowers } from '../services/dashboardService';

export async function dashboardLoader() {
  const accessToken = localStorage.getItem('accessToken');

  if (!accessToken) {
    return redirect('/login');
  }

  try {
    const [dashboard, overdue] = await Promise.all([
      fetchDashboardData(accessToken),
      fetchOverdueBorrowers(accessToken),
    ]);

    return { dashboard, overdue };
  } catch (err: any) {
    console.error('Dashboard loader error:', err);
    // Redirect to login for 401 or 403 errors
    if (err.response && (err.response.status === 401 || err.response.status === 403)) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('username');
      localStorage.removeItem('userId');
      return redirect('/login');
    }
    throw new Response('Failed to load dashboard data', { status: 500 });
  }
}