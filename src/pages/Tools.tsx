
import { useState } from 'react';
import ToolItem from '../components/ToolItem';
import { CheckCircle, Package, AlertTriangle } from 'lucide-react';

const Tools = () => {
  const [tools, setTools] = useState([
    {
      id: 'tool-1',
      name: 'Ethernet Cable Tester',
      category: 'Network Testing',
      required: true,
      checked: true,
      description: 'Tests cable continuity and wiring'
    },
    {
      id: 'tool-2',
      name: 'Router (Backup)',
      category: 'Network Equipment',
      required: true,
      checked: false,
      description: 'Replacement router for emergencies'
    },
    {
      id: 'tool-3',
      name: 'Laptop with Diagnostic Software',
      category: 'Diagnostics',
      required: true,
      checked: true,
      description: 'Primary diagnostic and configuration tool'
    },
    {
      id: 'tool-4',
      name: 'Fiber Optic Tools',
      category: 'Fiber Equipment',
      required: false,
      checked: false,
      description: 'Fiber cutting and splicing tools'
    },
    {
      id: 'tool-5',
      name: 'OTDR (Optical Time Domain Reflectometer)',
      category: 'Fiber Testing',
      required: false,
      checked: false,
      description: 'Tests fiber optic cable integrity'
    },
    {
      id: 'tool-6',
      name: 'Power Drill',
      category: 'Installation',
      required: false,
      checked: true,
      description: 'For mounting equipment and running cables'
    },
    {
      id: 'tool-7',
      name: 'Cable Crimping Tool',
      category: 'Cable Management',
      required: true,
      checked: false,
      description: 'Creates RJ45 connections'
    },
    {
      id: 'tool-8',
      name: 'Wi-Fi Analyzer',
      category: 'Wireless Testing',
      required: false,
      checked: true,
      description: 'Analyzes wireless signal strength and interference'
    }
  ]);

  const toggleTool = (id: string) => {
    setTools(tools.map(tool => 
      tool.id === id ? { ...tool, checked: !tool.checked } : tool
    ));
  };

  const checkedTools = tools.filter(tool => tool.checked).length;
  const requiredTools = tools.filter(tool => tool.required);
  const checkedRequiredTools = requiredTools.filter(tool => tool.checked).length;
  const allRequiredChecked = checkedRequiredTools === requiredTools.length;

  const categories = [...new Set(tools.map(tool => tool.category))];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Tool Checklist</h1>
        
        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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
                  <ToolItem key={tool.id} tool={tool} onToggle={toggleTool} />
                ))}
            </div>
          </div>
        ))}

        {/* Quick Actions */}
        <div className="mt-8 bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="flex space-x-4">
            <button
              onClick={() => setTools(tools.map(tool => ({ ...tool, checked: tool.required })))}
              className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
            >
              Check Required Only
            </button>
            <button
              onClick={() => setTools(tools.map(tool => ({ ...tool, checked: true })))}
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
            >
              Check All Tools
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
