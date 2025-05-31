
import { useState } from 'react';
import ToolItem from '../components/ToolItem';
import { CheckCircle, Package, AlertTriangle, MapPin, Wrench } from 'lucide-react';

const Tools = () => {
  const [tools, setTools] = useState([
    {
      id: 'tool-1',
      name: 'Ethernet Cable Tester',
      category: 'Network Testing',
      required: true,
      checked: true,
      description: 'Tests cable continuity and wiring',
      status: 'available'
    },
    {
      id: 'tool-2',
      name: 'Router (Backup)',
      category: 'Network Equipment',
      required: true,
      checked: false,
      description: 'Replacement router for emergencies',
      status: 'available'
    },
    {
      id: 'tool-3',
      name: 'Laptop with Diagnostic Software',
      category: 'Diagnostics',
      required: true,
      checked: true,
      description: 'Primary diagnostic and configuration tool',
      status: 'available'
    },
    {
      id: 'tool-4',
      name: 'Fiber Optic Tools',
      category: 'Fiber Equipment',
      required: false,
      checked: false,
      description: 'Fiber cutting and splicing tools',
      status: 'in-field'
    },
    {
      id: 'tool-5',
      name: 'OTDR (Optical Time Domain Reflectometer)',
      category: 'Fiber Testing',
      required: false,
      checked: false,
      description: 'Tests fiber optic cable integrity',
      status: 'available'
    },
    {
      id: 'tool-6',
      name: 'Power Drill #1',
      category: 'Installation',
      required: false,
      checked: true,
      description: 'For mounting equipment and running cables',
      status: 'functioning'
    },
    {
      id: 'tool-7',
      name: 'Power Drill #2',
      category: 'Installation',
      required: false,
      checked: false,
      description: 'Backup drill for installation work',
      status: 'in-field'
    },
    {
      id: 'tool-8',
      name: 'Power Drill #3',
      category: 'Installation',
      required: false,
      checked: false,
      description: 'Heavy-duty drill for complex installations',
      status: 'in-repair'
    },
    {
      id: 'tool-9',
      name: 'Cable Crimping Tool',
      category: 'Cable Management',
      required: true,
      checked: false,
      description: 'Creates RJ45 connections',
      status: 'functioning'
    },
    {
      id: 'tool-10',
      name: 'Wi-Fi Analyzer',
      category: 'Wireless Testing',
      required: false,
      checked: true,
      description: 'Analyzes wireless signal strength and interference',
      status: 'available'
    },
    {
      id: 'tool-11',
      name: 'Multimeter #1',
      category: 'Electrical Testing',
      required: false,
      checked: false,
      description: 'Digital multimeter for electrical diagnostics',
      status: 'functioning'
    },
    {
      id: 'tool-12',
      name: 'Multimeter #2',
      category: 'Electrical Testing',
      required: false,
      checked: false,
      description: 'Backup multimeter',
      status: 'in-field'
    },
    {
      id: 'tool-13',
      name: 'Cable Puller',
      category: 'Installation',
      required: false,
      checked: false,
      description: 'For running cables through walls and conduits',
      status: 'available'
    },
    {
      id: 'tool-14',
      name: 'Network Switch (24-port)',
      category: 'Network Equipment',
      required: false,
      checked: false,
      description: 'Replacement switch for network expansion',
      status: 'functioning'
    },
    {
      id: 'tool-15',
      name: 'Ladder (6ft)',
      category: 'Installation',
      required: false,
      checked: false,
      description: 'For accessing ceiling-mounted equipment',
      status: 'in-repair'
    }
  ]);

  const toggleTool = (id: string) => {
    setTools(tools.map(tool => 
      tool.id === id ? { ...tool, checked: !tool.checked } : tool
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'functioning': return 'text-green-600 bg-green-50';
      case 'available': return 'text-blue-600 bg-blue-50';
      case 'in-field': return 'text-orange-600 bg-orange-50';
      case 'in-repair': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const checkedTools = tools.filter(tool => tool.checked).length;
  const requiredTools = tools.filter(tool => tool.required);
  const checkedRequiredTools = requiredTools.filter(tool => tool.checked).length;
  const allRequiredChecked = checkedRequiredTools === requiredTools.length;

  const categories = [...new Set(tools.map(tool => tool.category))];

  // Status summary
  const statusCounts = tools.reduce((acc, tool) => {
    acc[tool.status] = (acc[tool.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Tool Inventory & Checklist</h1>
        
        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <Package className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Tools</p>
                <p className="text-2xl font-bold text-gray-900">{checkedTools}/{tools.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <AlertTriangle className="h-8 w-8 text-orange-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Required Tools</p>
                <p className="text-2xl font-bold text-gray-900">{checkedRequiredTools}/{requiredTools.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <CheckCircle className={`h-8 w-8 ${allRequiredChecked ? 'text-green-600' : 'text-gray-400'}`} />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Ready Status</p>
                <p className={`text-2xl font-bold ${allRequiredChecked ? 'text-green-600' : 'text-orange-600'}`}>
                  {allRequiredChecked ? 'READY' : 'PENDING'}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <Wrench className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">In Repair</p>
                <p className="text-2xl font-bold text-red-600">{statusCounts['in-repair'] || 0}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tool Status Overview */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Tool Status Overview</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{statusCounts['functioning'] || 0}</div>
              <div className="text-sm text-gray-600">Functioning</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{statusCounts['available'] || 0}</div>
              <div className="text-sm text-gray-600">Available</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{statusCounts['in-field'] || 0}</div>
              <div className="text-sm text-gray-600">In Field</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">{statusCounts['in-repair'] || 0}</div>
              <div className="text-sm text-gray-600">In Repair</div>
            </div>
          </div>
        </div>

        {/* Status Alert */}
        {!allRequiredChecked && (
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
            <div className="flex items-center">
              <AlertTriangle className="h-5 w-5 text-orange-600 mr-2" />
              <p className="text-orange-800 font-medium">
                Missing required tools! Please check all required items before starting your job.
              </p>
            </div>
          </div>
        )}

        {/* Tools by Category */}
        {categories.map((category) => (
          <div key={category} className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">{category}</h2>
            <div className="space-y-4">
              {tools
                .filter(tool => tool.category === category)
                .map((tool) => (
                  <div key={tool.id} className={`bg-white rounded-lg p-4 border-2 transition-all ${
                    tool.checked 
                      ? 'border-green-300 bg-green-50' 
                      : tool.required 
                        ? 'border-orange-300 bg-orange-50' 
                        : 'border-gray-200'
                  }`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Package className="h-6 w-6 text-gray-600" />
                        <div>
                          <h3 className="font-medium text-gray-900">{tool.name}</h3>
                          <p className="text-sm text-gray-600">{tool.category}</p>
                          <p className="text-xs text-gray-500 mt-1">{tool.description}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(tool.status)}`}>
                          {tool.status.replace('-', ' ').toUpperCase()}
                        </span>
                        {tool.required && (
                          <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded-full">
                            Required
                          </span>
                        )}
                        <button
                          onClick={() => toggleTool(tool.id)}
                          className={`p-2 rounded-full transition-colors ${
                            tool.checked
                              ? 'bg-green-500 text-white hover:bg-green-600'
                              : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                          }`}
                          disabled={tool.status === 'in-repair' || tool.status === 'in-field'}
                        >
                          {tool.checked ? <CheckCircle className="h-5 w-5" /> : <Package className="h-5 w-5" />}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}

        {/* Quick Actions */}
        <div className="mt-8 bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="flex space-x-4">
            <button
              onClick={() => setTools(tools.map(tool => ({ ...tool, checked: tool.required && tool.status !== 'in-repair' && tool.status !== 'in-field' })))}
              className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
            >
              Check Available Required
            </button>
            <button
              onClick={() => setTools(tools.map(tool => ({ ...tool, checked: tool.status !== 'in-repair' && tool.status !== 'in-field' })))}
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
            >
              Check All Available
            </button>
            <button
              onClick={() => setTools(tools.map(tool => ({ ...tool, checked: false })))}
              className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
            >
              Clear All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tools;
