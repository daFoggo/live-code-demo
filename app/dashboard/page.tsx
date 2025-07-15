import { redirect } from 'next/navigation'

const DashboardPage = () => {
  return (
    redirect('/dashboard/exercises')
  )
};

export default DashboardPage;
