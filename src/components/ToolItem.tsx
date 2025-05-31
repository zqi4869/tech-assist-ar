
import { Check, X, Package } from 'lucide-react';

interface Tool {
  id: string;
  name: string;
  category: string;
  required: boolean;
  checked: boolean;
  description: string;
}

interface ToolItemProps {
  tool: Tool;
  onToggle: (id: string) => void;
}

const ToolItem = ({ tool, onToggle }: ToolItemProps) => {
  return (
    <div className={`bg-white rounded-lg p-4 border-2 transition-all ${
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
          {tool.required && (
            <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded-full">
              Required
            </span>
          )}
          <button
            onClick={() => onToggle(tool.id)}
            className={`p-2 rounded-full transition-colors ${
              tool.checked
                ? 'bg-green-500 text-white hover:bg-green-600'
                : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
            }`}
          >
            {tool.checked ? <Check className="h-5 w-5" /> : <X className="h-5 w-5" />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ToolItem;
