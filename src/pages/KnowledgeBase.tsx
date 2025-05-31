
import { useState } from 'react';
import { Search, Book, AlertTriangle, CheckCircle, Wrench, Wifi, Router, Settings } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const KnowledgeBase = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const knowledgeArticles = [
    {
      id: 'kb-001',
      title: 'Cisco ISR 4331 Router Configuration Guide',
      category: 'Cisco',
      difficulty: 'Intermediate',
      readTime: '8 min',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=200&fit=crop',
      summary: 'Complete guide for configuring Cisco ISR 4331 enterprise router including DHCP, VPN, and security settings.',
      symptoms: ['No internet connectivity', 'Slow network performance', 'VPN connection failures'],
      troubleshooting: [
        {
          issue: 'No Internet Access',
          solution: 'Check WAN interface status with "show ip interface brief". Verify default route with "show ip route".',
          priority: 'high'
        },
        {
          issue: 'DHCP Not Working',
          solution: 'Verify DHCP pool configuration: "show running-config | section dhcp". Check DHCP exclusions.',
          priority: 'medium'
        },
        {
          issue: 'VPN Tunnel Down',
          solution: 'Check crypto map status: "show crypto session". Verify pre-shared keys and ACLs.',
          priority: 'high'
        }
      ],
      steps: [
        'Access router via console cable (9600 baud rate)',
        'Enter privileged mode: enable',
        'Configure hostname: hostname ISR4331',
        'Set up WAN interface: interface GigabitEthernet0/0/0',
        'Configure DHCP pool for LAN clients',
        'Apply security hardening best practices'
      ]
    },
    {
      id: 'kb-002',
      title: 'Netgear Nighthawk AX12 WiFi 6 Router Setup',
      category: 'Netgear',
      difficulty: 'Beginner',
      readTime: '5 min',
      image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=400&h=200&fit=crop',
      summary: 'Step-by-step setup guide for Netgear Nighthawk AX12 including WiFi 6 optimization and parental controls.',
      symptoms: ['Poor WiFi coverage', 'Devices not connecting', 'Slow wireless speeds'],
      troubleshooting: [
        {
          issue: 'WiFi Signal Weak',
          solution: 'Position router centrally, away from interference. Update firmware via web interface.',
          priority: 'medium'
        },
        {
          issue: 'Devices Cannot Connect',
          solution: 'Reset network settings. Check if MAC filtering is enabled in Access Control.',
          priority: 'high'
        },
        {
          issue: 'Slow WiFi 6 Speeds',
          solution: 'Enable WiFi 6 mode in wireless settings. Check client device WiFi 6 compatibility.',
          priority: 'medium'
        }
      ],
      steps: [
        'Connect power adapter and ethernet cable',
        'Access setup wizard at http://192.168.1.1',
        'Run internet connection setup',
        'Configure WiFi name and password',
        'Enable WiFi 6 features',
        'Set up guest network and parental controls'
      ]
    },
    {
      id: 'kb-003',
      title: 'TP-Link Archer AX73 Mesh Configuration',
      category: 'TP-Link',
      difficulty: 'Intermediate',
      readTime: '10 min',
      image: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=400&h=200&fit=crop',
      summary: 'Configure TP-Link Archer AX73 in mesh mode for seamless whole-home coverage and advanced QoS.',
      symptoms: ['Dead zones in coverage', 'Devices switching issues', 'Network congestion'],
      troubleshooting: [
        {
          issue: 'Mesh Nodes Not Connecting',
          solution: 'Reset mesh nodes. Use WPS button for initial pairing. Check distance between nodes.',
          priority: 'high'
        },
        {
          issue: 'Poor Handoff Between Nodes',
          solution: 'Enable band steering and smart connect. Adjust transmit power in advanced settings.',
          priority: 'medium'
        },
        {
          issue: 'QoS Not Working',
          solution: 'Verify device prioritization settings. Check bandwidth allocation in QoS dashboard.',
          priority: 'low'
        }
      ],
      steps: [
        'Install Tether app on mobile device',
        'Connect main router to modem',
        'Add mesh nodes using app wizard',
        'Configure mesh network name',
        'Set up advanced features (QoS, parental controls)',
        'Test coverage throughout the building'
      ]
    },
    {
      id: 'kb-004',
      title: 'ASUS RT-AX88U Gaming Router Optimization',
      category: 'ASUS',
      difficulty: 'Advanced',
      readTime: '12 min',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=200&fit=crop',
      summary: 'Advanced configuration for ASUS RT-AX88U including gaming acceleration, VPN server, and network monitoring.',
      symptoms: ['High gaming latency', 'VPN server issues', 'Bandwidth monitoring needed'],
      troubleshooting: [
        {
          issue: 'High Gaming Ping',
          solution: 'Enable Adaptive QoS gaming mode. Configure gaming accelerator for specific devices.',
          priority: 'high'
        },
        {
          issue: 'VPN Server Not Accessible',
          solution: 'Check port forwarding (1723 for PPTP, 1194 for OpenVPN). Verify firewall settings.',
          priority: 'medium'
        },
        {
          issue: 'AiMesh Connection Failed',
          solution: 'Update firmware on all nodes. Reset and re-pair using ASUS Router app.',
          priority: 'medium'
        }
      ],
      steps: [
        'Access ASUS web interface at http://192.168.1.1',
        'Enable gaming accelerator in Adaptive QoS',
        'Configure VPN server (OpenVPN recommended)',
        'Set up AiMesh for extended coverage',
        'Configure traffic monitoring and alerts',
        'Apply security hardening (WPA3, firewall)'
      ]
    },
    {
      id: 'kb-005',
      title: 'Linksys Velop MX10 Tri-Band Mesh System',
      category: 'Linksys',
      difficulty: 'Beginner',
      readTime: '6 min',
      image: 'https://images.unsplash.com/photo-1483058712412-4245e9b90334?w=400&h=200&fit=crop',
      summary: 'Setup and troubleshooting guide for Linksys Velop MX10 mesh system with intelligent mesh technology.',
      symptoms: ['Inconsistent mesh performance', 'Node connectivity issues', 'Slow backhaul speeds'],
      troubleshooting: [
        {
          issue: 'Nodes Showing Offline',
          solution: 'Check power connections. Use Linksys app to re-add offline nodes. Verify mesh topology.',
          priority: 'high'
        },
        {
          issue: 'Slow Mesh Backhaul',
          solution: 'Position nodes within optimal range (30-50 feet). Use dedicated backhaul band.',
          priority: 'medium'
        },
        {
          issue: 'Parental Controls Not Working',
          solution: 'Update Linksys app. Verify device identification in device list. Reset parental rules.',
          priority: 'low'
        }
      ],
      steps: [
        'Download Linksys app and create account',
        'Connect primary node to modem',
        'Follow app setup wizard',
        'Add additional nodes one by one',
        'Configure WiFi name and password',
        'Test mesh performance and optimize placement'
      ]
    },
    {
      id: 'kb-006',
      title: 'Router Configuration Issue - Business Plaza Resolution',
      category: 'Case Study',
      difficulty: 'Intermediate',
      readTime: '7 min',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=200&fit=crop',
      summary: 'Real-world case study: Resolving intermittent connectivity at 123 Business Plaza through systematic firmware and configuration updates.',
      workId: 'WO-2024-001',
      location: '123 Business Plaza, Suite 450',
      symptoms: ['Intermittent internet connectivity', 'Slow response times during peak hours', 'DHCP lease conflicts'],
      troubleshooting: [
        {
          issue: 'Intermittent Connectivity',
          solution: 'Updated router firmware from v1.8.2 to v2.1.4. Firmware bug was causing DHCP conflicts with ISP.',
          priority: 'high'
        },
        {
          issue: 'DHCP Pool Exhaustion',
          solution: 'Expanded DHCP pool from 192.168.1.100-150 to 192.168.1.50-200. Reduced lease time to 4 hours.',
          priority: 'medium'
        },
        {
          issue: 'DNS Resolution Delays',
          solution: 'Configured secondary DNS servers (8.8.8.8, 1.1.1.1) as backup to ISP DNS.',
          priority: 'low'
        }
      ],
      steps: [
        'Verified physical connections and LED status',
        'Accessed router admin panel (192.168.1.1)',
        'Backed up current configuration',
        'Downloaded firmware v2.1.4 from manufacturer',
        'Performed firmware update via web interface',
        'Reconfigured DHCP settings for optimization',
        'Tested connectivity with multiple devices',
        'Documented configuration changes'
      ],
      technicalNotes: [
        'Router Model: Cisco RV340W',
        'Previous Firmware: v1.8.2 (known DHCP bug)',
        'Updated Firmware: v2.1.4 (stable release)',
        'DHCP Pool: Expanded to accommodate 40+ devices',
        'DNS: Added redundant servers for reliability'
      ],
      humanObservations: 'Customer mentioned issues started after recent office expansion. New devices were exceeding original DHCP pool limit. Router LED was occasionally flashing amber during peak usage times, indicating resource strain.'
    }
  ];

  const filteredArticles = knowledgeArticles.filter(article =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.summary.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'text-green-600 bg-green-50';
      case 'Intermediate': return 'text-yellow-600 bg-yellow-50';
      case 'Advanced': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50';
      case 'medium': return 'text-orange-600 bg-orange-50';
      case 'low': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center mb-8">
          <Book className="h-8 w-8 text-orange-500 mr-3" />
          <h1 className="text-3xl font-bold text-gray-900">Knowledge Base</h1>
        </div>
        
        {/* Search */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search articles by title, category, or description..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredArticles.map((article) => (
            <Card key={article.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-video relative overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 flex items-center space-x-2">
                  <span className="px-2 py-1 bg-white/90 text-gray-800 rounded text-sm font-medium">
                    {article.category}
                  </span>
                  <span className={`px-2 py-1 rounded text-sm font-medium ${getDifficultyColor(article.difficulty)}`}>
                    {article.difficulty}
                  </span>
                </div>
                <div className="absolute bottom-4 right-4 bg-black/70 text-white px-2 py-1 rounded text-sm">
                  {article.readTime}
                </div>
              </div>

              <CardHeader>
                <CardTitle className="text-xl">{article.title}</CardTitle>
                <CardDescription>{article.summary}</CardDescription>
                {article.workId && (
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span className="font-medium">Work ID: {article.workId}</span>
                    <span>Location: {article.location}</span>
                  </div>
                )}
              </CardHeader>

              <CardContent>
                <Tabs defaultValue="symptoms" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="symptoms">Symptoms</TabsTrigger>
                    <TabsTrigger value="troubleshooting">Solutions</TabsTrigger>
                    <TabsTrigger value="steps">Steps</TabsTrigger>
                  </TabsList>

                  <TabsContent value="symptoms" className="mt-4">
                    <div className="space-y-2">
                      {article.symptoms.map((symptom, index) => (
                        <div key={index} className="flex items-center text-sm">
                          <AlertTriangle className="h-4 w-4 text-orange-500 mr-2 flex-shrink-0" />
                          <span>{symptom}</span>
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="troubleshooting" className="mt-4">
                    <div className="space-y-3">
                      {article.troubleshooting.map((item, index) => (
                        <div key={index} className="border rounded-md p-3">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium text-gray-900">{item.issue}</h4>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(item.priority)}`}>
                              {item.priority}
                            </span>
                          </div>
                          <p className="text-sm text-gray-700">{item.solution}</p>
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="steps" className="mt-4">
                    <div className="space-y-2">
                      {article.steps.map((step, index) => (
                        <div key={index} className="flex items-start text-sm">
                          <span className="flex-shrink-0 w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-xs mr-3 mt-0.5">
                            {index + 1}
                          </span>
                          <span>{step}</span>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>

                {article.technicalNotes && (
                  <div className="mt-4 p-3 bg-blue-50 rounded-md">
                    <h4 className="font-medium text-blue-900 mb-2 flex items-center">
                      <Settings className="h-4 w-4 mr-1" />
                      Technical Details
                    </h4>
                    <div className="space-y-1">
                      {article.technicalNotes.map((note, index) => (
                        <p key={index} className="text-sm text-blue-800">{note}</p>
                      ))}
                    </div>
                  </div>
                )}

                {article.humanObservations && (
                  <div className="mt-4 p-3 bg-green-50 rounded-md">
                    <h4 className="font-medium text-green-900 mb-2 flex items-center">
                      <Wrench className="h-4 w-4 mr-1" />
                      Field Technician Notes
                    </h4>
                    <p className="text-sm text-green-800">{article.humanObservations}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default KnowledgeBase;
