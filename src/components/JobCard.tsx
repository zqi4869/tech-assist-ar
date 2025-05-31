import { Clock, MapPin, AlertCircle, CheckCircle, FileText } from 'lucide-react';

interface Job {
  id: string;
  workId?: string;
  title: string;
  location: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'pending' | 'in-progress' | 'completed';
  estimatedTime: string;
  description: string;
  equipment: string[];
  humanNotes?: string;
}

interface JobCardProps {
  job: Job;
  isCurrentJob?: boolean;
}

const JobCard = ({ job, isCurrentJob = false }: JobCardProps) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'text-red-600 bg-red-50';
      case 'high': return 'text-orange-600 bg-orange-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      default: return 'text-green-600 bg-green-50';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'in-progress': return <Clock className="h-5 w-5 text-blue-600" />;
      default: return <AlertCircle className="h-5 w-5 text-gray-600" />;
    }
  };

  return (
    <div className={`bg-white rounded-lg shadow-md p-6 border-l-4 ${
      isCurrentJob ? 'border-l-orange-500 ring-2 ring-orange-200' : 'border-l-gray-300'
    }`}>
      <div className="flex justify-between items-start mb-4">
        <div>
          <div className="flex items-center space-x-2 mb-1">
            <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
            {job.workId && (
              <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs font-mono">
                {job.workId}
              </span>
            )}
          </div>
          <div className="flex items-center text-gray-600 mt-1">
            <MapPin className="h-4 w-4 mr-1" />
            <span className="text-sm">{job.location}</span>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {getStatusIcon(job.status)}
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(job.priority)}`}>
            {job.priority.toUpperCase()}
          </span>
        </div>
      </div>
      
      <p className="text-gray-700 mb-4">{job.description}</p>
      
      {job.humanNotes && (
        <div className="mb-4 p-3 bg-blue-50 rounded-md">
          <h4 className="font-medium text-blue-900 mb-1 flex items-center text-sm">
            <FileText className="h-4 w-4 mr-1" />
            Field Notes
          </h4>
          <p className="text-sm text-blue-800">{job.humanNotes}</p>
        </div>
      )}
      
      <div className="flex flex-col space-y-2">
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            <span>Est. {job.estimatedTime}</span>
          </div>
          <span>Equipment: {job.equipment.join(', ')}</span>
        </div>
        
        {/* Highlighted CPE placeholder */}
        <div className="border-2 border-blue-500 rounded-lg p-3 bg-blue-50">
          <span className="text-base font-bold text-blue-700">CPE</span>
          <span className="block font-medium mt-1">Cisco Catalyst 4000</span>
        </div>
      </div>
      
      {isCurrentJob && (
        <div className="mt-4 p-3 bg-orange-50 rounded-md">
          <p className="text-orange-800 font-medium text-sm">📍 Current Job</p>
        </div>
      )}
    </div>
  );
};

export default JobCard;
