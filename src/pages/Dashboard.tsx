import { useState } from 'react';
import { Link } from 'react-router-dom';
import JobCard from '../components/JobCard';
import { FileText, Clock, CheckCircle, AlertTriangle, Book, Map, Wrench, Camera } from 'lucide-react';

const Dashboard = () => {
  const [currentJob] = useState({
    id: 'job-001',
    workId: 'WO-2024-001',
    title: 'Router Configuration Issue',
    location: '123 Business Plaza, Suite 450',
    priority: 'high' as const,
    status: 'in-progress' as const,
    estimatedTime: '2-3 hours',
    description: 'Customer reports intermittent internet connectivity during peak hours. Previous tech noted possible router firmware issue and DHCP pool exhaustion. Router LED occasionally flashing amber. Check configuration, update firmware if necessary, and optimize DHCP settings.',
    equipment: ['Ethernet tester', 'Router', 'Laptop'],
    humanNotes: 'Customer mentioned connectivity issues started after office expansion. Approximately 40+ devices now connected. Router appears to struggle during morning hours (9-11 AM) when most staff arrive.'
  });

  const [recentJobs] = useState([
    {
      id: 'job-002',
      workId: 'WO-2024-002',
      title: 'Fiber Optic Installation',
      location: '456 Tech Park Dr',
      priority: 'medium' as const,
      status: 'completed' as const,
      estimatedTime: '4 hours',
      description: 'New fiber installation completed successfully. Customer satisfied with speed improvements from 50 Mbps DSL to 940 Mbps fiber.',
      equipment: ['Fiber tools', 'Splice kit', 'OTDR']
    },
    {
      id: 'job-003',
      workId: 'WO-2024-003',
      title: 'Network Switch Replacement',
      location: '789 Corporate Blvd',
      priority: 'low' as const,
      status: 'completed' as const,
      estimatedTime: '1 hour',
      description: 'Replaced faulty 24-port switch with enterprise-grade model. All ports tested and verified. Minimal downtime during lunch break.',
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
            
            {/* Job-Specific Navigation */}
            <div className="mt-6 bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Job Resources for {currentJob.workId}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link
                  to="/sitemap"
                  className="flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-lg transition-colors shadow-md"
                >
                  <Map className="h-5 w-5 mr-2" />
                  Venue Sitemap
                </Link>
                <Link
                  to="/tools"
                  className="flex items-center justify-center bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-4 rounded-lg transition-colors shadow-md"
                >
                  <Wrench className="h-5 w-5 mr-2" />
                  Required Tools
                </Link>
                <Link
                  to="/task-confirmation"
                  className="flex items-center justify-center bg-purple-500 hover:bg-purple-600 text-white font-medium py-3 px-4 rounded-lg transition-colors shadow-md"
                >
                  <Camera className="h-5 w-5 mr-2" />
                  Task Confirmation
                </Link>
                <Link
                  to="/knowledge-base"
                  className="flex items-center justify-center bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-4 rounded-lg transition-colors shadow-md"
                >
                  <Book className="h-5 w-5 mr-2" />
                  Knowledge Base
                </Link>
              </div>
              <p className="text-sm text-gray-600 mt-3 text-center">
                Access job-specific resources and documentation
              </p>
            </div>
            
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
            <div className="mb-4 bg-red-100 border-l-4 border-red-400 rounded-lg p-4">
              <span className="font-bold text-red-700">Safety Warning:</span>
              <span className="ml-2 text-red-800">High EMI area. Take precautions.</span>
            </div>
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
