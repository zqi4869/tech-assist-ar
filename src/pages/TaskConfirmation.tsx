
import { useState } from 'react';
import { Camera, CheckCircle, Upload, X, Eye } from 'lucide-react';

interface TaskPhoto {
  id: string;
  taskName: string;
  description: string;
  photoUrl: string;
  timestamp: string;
  verified: boolean;
  notes?: string;
}

const TaskConfirmation = () => {
  const [taskPhotos, setTaskPhotos] = useState<TaskPhoto[]>([
    {
      id: 'task-1',
      taskName: 'Router Firmware Update',
      description: 'Screenshot showing firmware version updated to v2.1.4',
      photoUrl: '/placeholder.svg',
      timestamp: '2024-05-30 14:23',
      verified: true,
      notes: 'Firmware successfully updated from v1.8.2 to v2.1.4'
    },
    {
      id: 'task-2',
      taskName: 'DHCP Configuration',
      description: 'Router interface showing new DHCP pool settings',
      photoUrl: '/placeholder.svg',
      timestamp: '2024-05-30 14:45',
      verified: true,
      notes: 'Expanded DHCP pool from 50 to 100 devices'
    },
    {
      id: 'task-3',
      taskName: 'LED Status Check',
      description: 'Photo of router with solid green LED after configuration',
      photoUrl: '/placeholder.svg',
      timestamp: '2024-05-30 15:12',
      verified: true,
      notes: 'Router LED changed from flashing amber to solid green'
    },
    {
      id: 'task-4',
      taskName: 'Speed Test Results',
      description: 'Speed test showing improved connectivity',
      photoUrl: '/placeholder.svg',
      timestamp: '2024-05-30 15:20',
      verified: false,
      notes: 'Upload speed improved from 15 Mbps to 45 Mbps'
    },
    {
      id: 'task-5',
      taskName: 'Customer Signature',
      description: 'Work order signed by customer confirming completion',
      photoUrl: '/placeholder.svg',
      timestamp: '2024-05-30 15:35',
      verified: true,
      notes: 'Customer satisfied with resolution and signed off'
    }
  ]);

  const [selectedPhoto, setSelectedPhoto] = useState<TaskPhoto | null>(null);

  const toggleVerification = (taskId: string) => {
    setTaskPhotos(taskPhotos.map(task => 
      task.id === taskId ? { ...task, verified: !task.verified } : task
    ));
  };

  const verifiedTasks = taskPhotos.filter(task => task.verified).length;
  const totalTasks = taskPhotos.length;
  const completionPercentage = Math.round((verifiedTasks / totalTasks) * 100);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Task Confirmation</h1>
        
        {/* Summary */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Work Order: WO-2024-001</h2>
            <div className="flex items-center space-x-2">
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                completionPercentage === 100 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-orange-100 text-orange-800'
              }`}>
                {completionPercentage}% Complete
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{totalTasks}</div>
              <div className="text-sm text-gray-600">Total Tasks</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{verifiedTasks}</div>
              <div className="text-sm text-gray-600">Verified</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{totalTasks - verifiedTasks}</div>
              <div className="text-sm text-gray-600">Pending</div>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-green-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${completionPercentage}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Photo Upload Section */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Task Photo</h3>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h4 className="text-lg font-medium text-gray-900 mb-2">Upload Task Photo</h4>
            <p className="text-gray-600 mb-4">Drag and drop a photo or click to browse</p>
            <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
              <Camera className="h-4 w-4 mr-2" />
              Take Photo
            </button>
          </div>
        </div>

        {/* Task Photos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {taskPhotos.map((task) => (
            <div key={task.id} className="bg-white rounded-lg shadow overflow-hidden">
              <div className="relative">
                <img 
                  src={task.photoUrl} 
                  alt={task.taskName}
                  className="w-full h-48 object-cover cursor-pointer"
                  onClick={() => setSelectedPhoto(task)}
                />
                <button
                  onClick={() => setSelectedPhoto(task)}
                  className="absolute top-2 right-2 p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-70 transition-opacity"
                >
                  <Eye className="h-4 w-4" />
                </button>
                <div className={`absolute top-2 left-2 p-2 rounded-full ${
                  task.verified 
                    ? 'bg-green-500 text-white' 
                    : 'bg-gray-500 text-white'
                }`}>
                  <CheckCircle className="h-4 w-4" />
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2">{task.taskName}</h3>
                <p className="text-sm text-gray-600 mb-3">{task.description}</p>
                
                {task.notes && (
                  <div className="mb-3 p-2 bg-blue-50 rounded text-sm text-blue-800">
                    {task.notes}
                  </div>
                )}
                
                <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                  <span>{task.timestamp}</span>
                </div>
                
                <button
                  onClick={() => toggleVerification(task.id)}
                  className={`w-full py-2 px-4 rounded transition-colors ${
                    task.verified
                      ? 'bg-green-100 text-green-800 hover:bg-green-200'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  {task.verified ? 'Verified ✓' : 'Mark as Verified'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Photo Modal */}
        {selectedPhoto && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-4xl max-h-[90vh] overflow-hidden">
              <div className="flex items-center justify-between p-4 border-b">
                <h3 className="text-lg font-semibold">{selectedPhoto.taskName}</h3>
                <button
                  onClick={() => setSelectedPhoto(null)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              <div className="p-4">
                <img 
                  src={selectedPhoto.photoUrl} 
                  alt={selectedPhoto.taskName}
                  className="w-full max-h-96 object-contain mb-4"
                />
                <p className="text-gray-600 mb-2">{selectedPhoto.description}</p>
                {selectedPhoto.notes && (
                  <div className="p-3 bg-blue-50 rounded text-blue-800">
                    <strong>Notes:</strong> {selectedPhoto.notes}
                  </div>
                )}
                <p className="text-sm text-gray-500 mt-2">Taken: {selectedPhoto.timestamp}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskConfirmation;
