import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { Activity, Settings, LogOut, Check } from 'lucide-react';
import toast from 'react-hot-toast';

const Profile = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem('token');
            if (!token) return navigate('/login');

            try {
                const res = await axios.get('http://localhost:5000/api/auth/me', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setUser(res.data);
                setFormData({ name: res.data.name, email: res.data.email, password: '' });
            } catch (err) {
                toast.error('Session expired');
                navigate('/login');
            }
        };
        fetchProfile();
    }, [navigate]);

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const updateData = { name: formData.name, email: formData.email };
            if (formData.password) updateData.password = formData.password;

            const res = await axios.put('http://localhost:5000/api/auth/profile', updateData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUser(res.data.user);
            localStorage.setItem('user', JSON.stringify(res.data.user));
            setFormData({ ...formData, password: '' });
            toast.success('Profile updated successfully');
        } catch (err) {
            toast.error(err.response?.data?.msg || 'Update failed');
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    if (!user) return null;

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
                        <Link to="/dashboard" className="flex items-center gap-3 px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg font-medium transition-colors">
                            <Activity size={18} />
                            Activity History
                        </Link>
                        <Link to="/profile" className="flex items-center gap-3 px-4 py-2 text-brand-600 bg-brand-50 rounded-lg font-medium">
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
                    <h1 className="text-2xl font-bold text-slate-800 mb-6">Profile Settings</h1>

                    <form onSubmit={handleSubmit} className="space-y-5 max-w-lg">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none bg-gray-50"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none bg-gray-50"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">New Password (leave blank to keep current)</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="••••••••"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none bg-gray-50"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="flex items-center justify-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-medium rounded-lg px-6 py-2.5 transition-colors focus:ring-4 focus:ring-brand-300 disabled:opacity-70 mt-6"
                        >
                            {loading ? 'Saving...' : <><Check size={18} /> Save Changes</>}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Profile;
