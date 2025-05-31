
import { useState } from 'react';
import { Mic, MicOff, Play, Pause, Volume2, Eye, Brain, FileText } from 'lucide-react';

const ARSession = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isARActive, setIsARActive] = useState(false);
  const [audioLevel, setAudioLevel] = useState(0);

  const [audioNotes] = useState([
    {
      id: 'note-1',
      timestamp: '14:32:15',
      content: 'Customer reports intermittent connectivity issues starting yesterday around 3 PM',
      type: 'voice',
      aiSummary: 'Connectivity issue onset: Yesterday 3 PM'
    },
    {
      id: 'note-2',
      timestamp: '14:35:42',
      content: 'Checking router status lights - power solid green, internet blinking orange',
      type: 'voice',
      aiSummary: 'Router status: Power OK, Internet connection unstable'
    },
    {
      id: 'note-3',
      timestamp: '14:38:21',
      content: 'Firmware version 1.8.2 detected - this is known to have DHCP conflicts',
      type: 'ai',
      aiSummary: 'Issue identified: Firmware v1.8.2 DHCP conflict'
    }
  ]);

  const [aiInsights] = useState([
    {
      type: 'suggestion',
      title: 'Firmware Update Required',
      content: 'The detected firmware version (1.8.2) has known DHCP issues. Update to version 2.1.4 or later.',
      confidence: 95
    },
    {
      type: 'procedure',
      title: 'Recommended Steps',
      content: '1. Backup current config\n2. Update firmware\n3. Reset DHCP settings\n4. Test connectivity',
      confidence: 90
    },
    {
      type: 'warning',
      title: 'Caution',
      content: 'Ensure stable power during firmware update to prevent device corruption.',
      confidence: 100
    }
  ]);

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // Simulate audio level changes when recording
    if (!isRecording) {
      const interval = setInterval(() => {
        setAudioLevel(Math.random() * 100);
      }, 100);
      setTimeout(() => clearInterval(interval), 5000);
    }
  };

  const toggleAR = () => {
    setIsARActive(!isARActive);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">AR Session Control</h1>
        
        {/* AR Status and Controls */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">AR Glasses Status</h3>
              <Eye className={`h-6 w-6 ${isARActive ? 'text-green-600' : 'text-gray-400'}`} />
            </div>
            <div className={`text-center py-4 rounded-lg ${
              isARActive ? 'bg-green-50 text-green-800' : 'bg-gray-50 text-gray-600'
            }`}>
              <p className="text-xl font-bold">{isARActive ? 'ACTIVE' : 'STANDBY'}</p>
              <p className="text-sm mt-1">
                {isARActive ? 'Tracking active, AI monitoring' : 'Ready to activate'}
              </p>
            </div>
            <button
              onClick={toggleAR}
              className={`w-full mt-4 px-4 py-2 rounded-md transition-colors ${
                isARActive
                  ? 'bg-red-500 text-white hover:bg-red-600'
                  : 'bg-green-500 text-white hover:bg-green-600'
              }`}
            >
              {isARActive ? 'Stop AR Session' : 'Start AR Session'}
            </button>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Audio Recording</h3>
              {isRecording ? <MicOff className="h-6 w-6 text-red-600" /> : <Mic className="h-6 w-6 text-gray-400" />}
            </div>
            <div className="text-center py-4">
              <div className={`w-full h-2 bg-gray-200 rounded-full mb-4 ${isRecording ? 'animate-pulse' : ''}`}>
                <div 
                  className="h-2 bg-red-500 rounded-full transition-all duration-100"
                  style={{ width: `${isRecording ? audioLevel : 0}%` }}
                ></div>
              </div>
              <p className={`text-xl font-bold ${isRecording ? 'text-red-600' : 'text-gray-600'}`}>
                {isRecording ? 'RECORDING' : 'READY'}
              </p>
            </div>
            <button
              onClick={toggleRecording}
              className={`w-full px-4 py-2 rounded-md transition-colors ${
                isRecording
                  ? 'bg-red-500 text-white hover:bg-red-600'
                  : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
            >
              {isRecording ? 'Stop Recording' : 'Start Recording'}
            </button>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">AI Assistant</h3>
              <Brain className="h-6 w-6 text-purple-600" />
            </div>
            <div className="text-center py-4 bg-purple-50 rounded-lg">
              <p className="text-xl font-bold text-purple-800">ANALYZING</p>
              <p className="text-sm text-purple-600 mt-1">
                Processing audio and visual data
              </p>
            </div>
            <div className="mt-4 text-sm text-gray-600">
              <p>• Voice recognition: Active</p>
              <p>• Step tracking: Enabled</p>
              <p>• Context analysis: Running</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Audio Notes */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                <Volume2 className="h-6 w-6 mr-2 text-blue-600" />
                Audio Notes & Transcription
              </h2>
            </div>
            <div className="p-6 max-h-96 overflow-y-auto">
              <div className="space-y-4">
                {audioNotes.map((note) => (
                  <div key={note.id} className={`p-4 rounded-lg border-l-4 ${
                    note.type === 'ai' ? 'border-l-purple-500 bg-purple-50' : 'border-l-blue-500 bg-blue-50'
                  }`}>
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-sm font-medium text-gray-600">{note.timestamp}</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        note.type === 'ai' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {note.type === 'ai' ? 'AI Generated' : 'Voice Note'}
                      </span>
                    </div>
                    <p className="text-gray-800 mb-2">{note.content}</p>
                    <div className="bg-white p-2 rounded text-sm">
                      <strong>AI Summary:</strong> {note.aiSummary}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* AI Insights */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                <Brain className="h-6 w-6 mr-2 text-purple-600" />
                AI Insights & Recommendations
              </h2>
            </div>
            <div className="p-6 max-h-96 overflow-y-auto">
              <div className="space-y-4">
                {aiInsights.map((insight, index) => (
                  <div key={index} className={`p-4 rounded-lg ${
                    insight.type === 'warning' ? 'bg-red-50 border border-red-200' :
                    insight.type === 'suggestion' ? 'bg-green-50 border border-green-200' :
                    'bg-blue-50 border border-blue-200'
                  }`}>
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-gray-900">{insight.title}</h4>
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                        {insight.confidence}% confidence
                      </span>
                    </div>
                    <p className="text-gray-700 whitespace-pre-line">{insight.content}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Export Options */}
        <div className="mt-8 bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <FileText className="h-5 w-5 mr-2" />
            Session Export
          </h3>
          <div className="flex space-x-4">
            <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
              Export Audio Notes
            </button>
            <button className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors">
              Generate Report
            </button>
            <button className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition-colors">
              Save AI Insights
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ARSession;
