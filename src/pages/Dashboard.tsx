
import { useState } from 'react';
import JobCard from '../components/JobCard';
import { FileText, Clock, CheckCircle, AlertTriangle } from 'lucide-react';

const Dashboard = () => {
  const [currentJob] = useState({
    id: 'job-001',
    title: 'Router Configuration Issue',
    location: '123 Business Plaza, Suite 450',
    priority: 'high' as const,
    status: 'in-progress' as const,
    estimatedTime: '2-3 hours',
    description: 'Customer reports intermittent internet connectivity. Previous tech noted possible router firmware issue. Check configuration and update if necessary.',
    equipment: ['Ethernet tester', 'Router', 'Laptop']
  });

  const [recentJobs] = useState([
    {
      id: 'job-002',
      title: 'Fiber Optic Installation',
      location: '456 Tech Park Dr',
      priority: 'medium' as const,
      status: 'completed' as const,
      estimatedTime: '4 hours',
      description: 'New fiber installation completed successfully. Customer satisfied with speed improvements.',
      equipment: ['Fiber tools', 'Splice kit', 'OTDR']
    },
    {
      id: 'job-003',
      title: 'Network Switch Replacement',
      location: '789 Corporate Blvd',
      priority: 'low' as const,
      status: 'completed' as const,
      estimatedTime: '1 hour',
      description: 'Replaced faulty 24-port switch. All ports tested and verified.',
      equipment: ['Switch', 'Cable tester', 'Laptop']
    }
  ]);

  const [instructions] = useState([
    'Always verify customer identity before beginning work',
    'Document all changes made to equipment',
    'Test connections before marking job complete',
    'Take photos of equipment setup for records',
    'Ensure customer signs off on completed work'
  ]);

  const stats = [
    { label: 'Jobs Today', value: '3', icon: FileText, color: 'text-blue-600' },
    { label: 'Hours Logged', value: '6.5', icon: Clock, color: 'text-green-600' },
    { label: 'Completed', value: '2', icon: CheckCircle, color: 'text-green-600' },
    { label: 'Pending', value: '1', icon: AlertTriangle, color: 'text-orange-600' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Field Service Dashboard</h1>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <Icon className={`h-8 w-8 ${stat.color}`} />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Current Job */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Current Job</h2>
            <JobCard job={currentJob} isCurrentJob={true} />
            
            <h2 className="text-xl font-semibold text-gray-900 mb-4 mt-8">Recent Work</h2>
            <div className="space-y-4">
              {recentJobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          </div>

          {/* Instructions */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Job Instructions</h2>
            <div className="bg-white rounded-lg shadow p-6">
              <ul className="space-y-3">
                {instructions.map((instruction, index) => (
                  <li key={index} className="flex items-start">
                    <span className="flex-shrink-0 h-2 w-2 bg-orange-400 rounded-full mt-2 mr-3"></span>
                    <span className="text-gray-700">{instruction}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 bg-blue-50 rounded-lg p-4">
              <h3 className="font-medium text-blue-900 mb-2">Quick Tips</h3>
              <p className="text-sm text-blue-800">
                For router issues, always check firmware version first. Most connectivity problems can be resolved with a simple reboot and configuration update.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
