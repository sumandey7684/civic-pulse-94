import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  BarChart3,
  Users,
  MapPin,
  AlertCircle,
  CheckCircle,
  Clock,
  Settings,
  FileText,
  TrendingUp,
  Filter,
  Search,
  MoreHorizontal,
  Eye,
  Edit,
  Archive,
} from "lucide-react";
import { Header } from "@/components/Layout/Header";
import { Footer } from "@/components/Layout/Footer";

// --- Helpers ---
const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "Critical": return "bg-red-100 text-red-600";
    case "High": return "bg-orange-100 text-orange-600";
    case "Medium": return "bg-yellow-100 text-yellow-600";
    case "Low": return "bg-green-100 text-green-600";
    default: return "bg-gray-100 text-gray-600";
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "Pending": return "bg-orange-100 text-orange-600";
    case "In Progress": return "bg-blue-100 text-blue-600";
    case "Resolved": return "bg-green-100 text-green-600";
    default: return "bg-gray-100 text-gray-600";
  }
};

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [allIssues, setAllIssues] = useState([]);
  const [filteredIssues, setFilteredIssues] = useState([]);
  const [visibleCount, setVisibleCount] = useState(5);
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingIssue, setEditingIssue] = useState(null);
  const stats = [];
  // TODO: Fill stats and fetch users/issues as needed

  const handleSearch = () => {
    // TODO: Implement search logic
  };
  const handleFilter = (type, value) => {
    // TODO: Implement filter logic
  };

  return (
    <div>
      <Header />
      <main>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="glass-effect hover-lift">
              <CardContent className="p-6 flex justify-between items-center">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <div className="flex items-center mt-1">
                    <TrendingUp className="w-3 h-3 text-green-500 mr-1" />
                    <span className="text-xs text-green-600">{stat.change}</span>
                  </div>
                </div>
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* --- Recent Issues --- */}
        <Card className="glass-effect mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-bold">Recent Issues</CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" size="sm"><Filter className="w-4 h-4 mr-2" />Filter</Button>
                <Button variant="outline" size="sm" onClick={() => setShowSearch(p => !p)}>
                  <Search className="w-4 h-4 mr-2" />Search
                </Button>
              </div>
            </div>
            <AnimatePresence>
              {showSearch && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mt-2 flex gap-2"
                >
                  <input
                    type="text"
                    placeholder="Enter Issue ID"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border rounded px-2 py-1"
                  />
                  <Button onClick={handleSearch}>Go</Button>
                </motion.div>
              )}
            </AnimatePresence>
            <div className="flex gap-2 mt-2 flex-wrap">
              {["Critical", "High", "Medium", "Low"].map((p) => (
                <Button key={p} size="sm" onClick={() => handleFilter("priority", p)}>{p}</Button>
              ))}
              {["In Progress", "Pending", "Resolved"].map((s) => (
                <Button key={s} size="sm" onClick={() => handleFilter("status", s)}>{s}</Button>
              ))}
              <Button variant="outline" size="sm" onClick={() => handleFilter("status", "Resolved")}>
                Show Only Resolved
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <AnimatePresence>
                {filteredIssues.slice(0, visibleCount).map((issue, index) => (
                  <motion.div key={issue.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} transition={{ duration: 0.3, delay: index * 0.05 }} className="p-4 rounded-lg border bg-card hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="font-medium text-sm text-muted-foreground">{issue.id}</span>
                          <Badge className={getPriorityColor(issue.priority)}>{issue.priority}</Badge>
                          <Badge className={getStatusColor(issue.status)}>{issue.status}</Badge>
                        </div>
                        <h4 className="font-semibold text-foreground mb-1 text-lg">{issue.title}</h4>
                        <div className="flex gap-2 mb-1">
                          <span className="text-xs bg-blue-50 px-2 py-1 rounded">Category: {issue.category}</span>
                          <span className="text-xs bg-orange-50 px-2 py-1 rounded">Priority: {issue.priority}</span>
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground mb-2"><MapPin className="w-3 h-3 mr-1" />{issue.location}</div>
                        <div className="text-sm text-muted-foreground">Description: {issue.description}</div>
                      </div>
                      <div className="flex gap-1 ml-4">
                        <Button variant="ghost" size="sm"><Eye className="w-4 h-4" /></Button>
                        <Button variant="ghost" size="sm" onClick={() => setEditingIssue(issue)}><Edit className="w-4 h-4" /></Button>
                        <Button variant="ghost" size="sm"><MoreHorizontal className="w-4 h-4" /></Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            {visibleCount < filteredIssues.length && (
              <div className="mt-4 text-center">
                <Button variant="outline" onClick={() => setVisibleCount((prev) => prev + 5)}>View All Issues</Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* --- Quick Actions --- */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="space-y-6"
        >
          <Card className="glass-effect">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { label: "Create New Issue", icon: AlertCircle },
                { label: "Manage Users", icon: Users },
                { label: "View Map", icon: MapPin },
                { label: "Analytics", icon: BarChart3 },
                { label: "Archived Issues", icon: Archive },
              ].map((action, i) => (
                <motion.div key={i} whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }}>
                  <Button className="w-full justify-start" variant="outline">
                    <action.icon className="w-4 h-4 mr-2" />
                    {action.label}
                  </Button>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

      </main>
      {/* --- Edit Modal --- */}
      <AnimatePresence>
        {editingIssue && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              className="bg-white p-6 rounded w-96"
            >
              <h3 className="font-bold mb-4">Edit Issue {editingIssue.id}</h3>
              <input
                type="text"
                value={editingIssue.title}
                onChange={(e) => setEditingIssue({ ...editingIssue, title: e.target.value })}
                className="w-full mb-2 border px-2 py-1 rounded"
              />
              <select
                value={editingIssue.priority}
                onChange={(e) => setEditingIssue({ ...editingIssue, priority: e.target.value })}
                className="w-full mb-2 border px-2 py-1 rounded"
              >
                <option>Critical</option>
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
              <select
                value={editingIssue.status}
                onChange={(e) => setEditingIssue({ ...editingIssue, status: e.target.value })}
                className="w-full mb-4 border px-2 py-1 rounded"
              >
                <option>In Progress</option>
                <option>Pending</option>
                <option>Resolved</option>
              </select>
              <div className="flex justify-end gap-2">
                <Button onClick={() => setEditingIssue(null)}>Cancel</Button>
                <Button
                  onClick={() => {
                    setFilteredIssues(prev =>
                      prev.map(i => (i.id === editingIssue.id ? editingIssue : i))
                    );
                    setEditingIssue(null);
                  }}
                >
                  Save
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <Footer />
    </div>
  );

}

export default AdminDashboard;
