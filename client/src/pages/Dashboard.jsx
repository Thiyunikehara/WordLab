import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { Activity, Clock, Settings, LogOut } from 'lucide-react';
import toast from 'react-hot-toast';

const Dashboard = () => {
    const [history, setHistory] = useState([]);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserAndHistory = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/login');
                return;
            }

            try {
                const storedUser = JSON.parse(localStorage.getItem('user'));
                setUser(storedUser);

                const res = await axios.get('http://localhost:5000/api/tools/history', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setHistory(res.data);
            } catch (err) {
                console.error(err);
                toast.error('Session expired, please log in again.');
                localStorage.removeItem('token');
                navigate('/login');
            }
        };

        fetchUserAndHistory();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        toast.success('Logged out successfully');
        navigate('/login');
    };

    if (!user) return <div className="p-8 text-center text-gray-500">Loading...</div>;

    return (
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-8">
            {/* Sidebar */}
            <div className="w-full md:w-64 shrink-0">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col h-full min-h-[400px]">
                    <div className="mb-8">
                        <div className="w-16 h-16 bg-brand-100 text-brand-600 rounded-full flex items-center justify-center text-2xl font-bold mb-4">
                            {user.name.charAt(0).toUpperCase()}
                        </div>
                        <h2 className="text-xl font-bold text-slate-800 truncate">{user.name}</h2>
                        <p className="text-sm text-gray-500 truncate">{user.email}</p>
                    </div>

                    <nav className="space-y-2 flex-grow">
                        <Link to="/dashboard" className="flex items-center gap-3 px-4 py-2 text-brand-600 bg-brand-50 rounded-lg font-medium">
                            <Activity size={18} />
                            Activity History
                        </Link>
                        <Link to="/profile" className="flex items-center gap-3 px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg font-medium transition-colors">
                            <Settings size={18} />
                            Profile Settings
                        </Link>
                    </nav>

                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg font-medium transition-colors mt-auto w-full text-left"
                    >
                        <LogOut size={18} />
                        Log Out
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                    <h1 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                        <Clock className="text-brand-500" />
                        Recent Activity
                    </h1>

                    {history.length === 0 ? (
                        <div className="text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                            <p className="text-gray-500 mb-4">You haven't used any tools yet.</p>
                            <Link to="/" className="text-brand-600 font-medium hover:underline">Explore tools</Link>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {history.map((item) => (
                                <div key={item._id} className="p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                                    <div>
                                        <h3 className="font-semibold text-slate-800 text-lg">{item.toolName}</h3>
                                        <p className="text-sm text-gray-500 line-clamp-1 mt-1 font-mono bg-gray-100 rounded px-2 w-fit">
                                            {item.resultSummary || `${item.inputTextLength || 0} characters processed`}
                                        </p>
                                    </div>
                                    <div className="text-xs text-gray-400 shrink-0">
                                        {new Date(item.createdAt).toLocaleString()}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
