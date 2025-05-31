
import { useState } from 'react';
import { Search, Filter, Calendar, MapPin, Clock } from 'lucide-react';

const WorkHistory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const workHistory = [
    {
      id: 'job-001',
      date: '2024-05-30',
      title: 'Router Configuration Issue',
      location: '123 Business Plaza, Suite 450',
      duration: '2.5 hours',
      status: 'completed',
      solution: 'Updated router firmware to v2.1.4 and reconfigured DHCP settings. Issue was caused by outdated firmware conflicting with new ISP settings.',
      toolsUsed: ['Ethernet tester', 'Router', 'Laptop'],
      customerRating: 5,
      notes: 'Customer very satisfied. Provided additional network optimization tips.'
    },
    {
      id: 'job-002',
      date: '2024-05-29',
      title: 'Fiber Optic Installation',
      location: '456 Tech Park Dr',
      duration: '4 hours',
      status: 'completed',
      solution: 'Installed new fiber optic line from street to building. Configured ONT and tested speeds. Achieved 940 Mbps down / 880 Mbps up.',
      toolsUsed: ['Fiber tools', 'Splice kit', 'OTDR', 'Power meter'],
      customerRating: 5,
      notes: 'Clean installation. Customer upgraded from 50 Mbps DSL.'
    },
    {
      id: 'job-003',
      date: '2024-05-28',
      title: 'Network Switch Replacement',
      location: '789 Corporate Blvd',
      duration: '1.5 hours',
      status: 'completed',
      solution: 'Replaced failed 24-port switch with new enterprise-grade model. All ports tested and labeled. Network performance restored.',
      toolsUsed: ['Switch', 'Cable tester', 'Laptop', 'Label maker'],
      customerRating: 4,
      notes: 'Minimal downtime. Completed during lunch break as requested.'
    },
    {
      id: 'job-004',
      date: '2024-05-27',
      title: 'Wi-Fi Dead Zone Resolution',
      location: '321 Retail Center',
      duration: '3 hours',
      status: 'completed',
      solution: 'Installed 2 additional access points to eliminate dead zones. Configured mesh network and optimized channel selection.',
      toolsUsed: ['Access points', 'Wi-Fi analyzer', 'Drill', 'Cable tools'],
      customerRating: 5,
      notes: 'Store now has full Wi-Fi coverage. Staff very happy with improvement.'
    }
  ];

  const filteredHistory = workHistory.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || job.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Work History & Solutions</h1>
        
        {/* Search and Filter */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search jobs by title or location..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <select
                className="pl-10 pr-8 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
              >
                <option value="all">All Jobs</option>
                <option value="completed">Completed</option>
                <option value="in-progress">In Progress</option>
                <option value="pending">Pending</option>
              </select>
            </div>
          </div>
        </div>

        {/* Work History Cards */}
        <div className="space-y-6">
          {filteredHistory.map((job) => (
            <div key={job.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{job.title}</h3>
                    <div className="flex items-center text-gray-600 mt-2 space-x-4">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span className="text-sm">{job.date}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span className="text-sm">{job.location}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        <span className="text-sm">{job.duration}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                      {job.status}
                    </span>
                    <div className="flex items-center">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span
                          key={i}
                          className={`text-lg ${
                            i < job.customerRating ? 'text-yellow-400' : 'text-gray-300'
                          }`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Solution Applied</h4>
                    <p className="text-gray-700 bg-green-50 p-3 rounded-md">{job.solution}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Tools Used</h4>
                    <div className="flex flex-wrap gap-2">
                      {job.toolsUsed.map((tool) => (
                        <span
                          key={tool}
                          className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {job.notes && (
                  <div className="mt-4">
                    <h4 className="font-medium text-gray-900 mb-2">Additional Notes</h4>
                    <p className="text-gray-600 italic">{job.notes}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorkHistory;
