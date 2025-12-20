import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Github, Mail, Linkedin, Instagram } from 'lucide-react';

export default function AboutPage() {
  const navigate = useNavigate();

  const developers = [
    {
      id: 1,
      name: 'Dien Akmalin Rizqi Akbar',
      nim: 'L02240028',
      role: 'Mahasiswa Data Science Universitas Sebelas Maret',
      image: '/src/assets/dien.jpeg',
      isEmoji: false,
      description: 'Lead developer working on frontend and backend architecture',
      email: 'dien@filmkita.com',
      github: '#',
      linkedin: '#',
      instagram: 'https://instagram.com/ilydien'
    },
    {
      id: 2,
      name: 'Muhammad Rasyid Haunan',
      nim: 'L0224007',
      role: 'Mahasiswa Data Science Universitas Sebelas Maret',
      image: '/src/assets/rasyid.jpeg',
      isEmoji: false,
      description: 'Specializing in API development and database optimization',
      email: 'rasyid@filmkita.com',
      github: '#',
      linkedin: '#',
      instagram: 'https://instagram.com/rasyidhnn'
    }
  ];

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(to bottom right, #0f172a, #1e293b, #0f172a)' }}>
      {/* Header */}
      <header className="border-b border-slate-700 bg-slate-900/50 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-amber-400 hover:text-amber-300 transition-colors font-medium"
            >
              <ChevronLeft className="w-5 h-5" />
              Kembali
            </button>

            <div className="flex items-center gap-3">
              <div className="w-11 h-11 bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center rounded-lg shadow-lg">
                <span className="text-white font-bold text-lg">F</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white tracking-tight">FILMKITA</h1>
                <p className="text-xs text-amber-400 font-medium">About Us</p>
              </div>
            </div>

            <div className="w-24"></div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* About Section */}
        <div className="mb-16">
          <h2 className="text-5xl font-bold text-white mb-6 tracking-tight">About FilmKita</h2>
          <div className="bg-gradient-to-br from-slate-700/50 to-slate-800/50 border border-slate-600 rounded-xl p-8">
            <p className="text-slate-300 text-lg leading-relaxed mb-4">
              FilmKita adalah platform analisis film dan televisi terdepan yang dirancang khusus untuk memberikan insights mendalam tentang industri hiburan. 
              Kami menyediakan data komprehensif, analitik real-time, dan dashboard interaktif untuk membantu pengambilan keputusan bisnis yang lebih baik.
            </p>
            <p className="text-slate-300 text-lg leading-relaxed">
              Dengan teknologi terkini dan tim profesional, kami berkomitmen untuk menjadi partner terpercaya dalam menganalisis tren produksi film dan televisi 
              secara global.
            </p>
          </div>
        </div>

        {/* Developer Team Section */}
        <div>
          <h2 className="text-4xl font-bold text-white mb-12 tracking-tight">Developer Team</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {developers.map((dev) => (
              <div
                key={dev.id}
                className="bg-gradient-to-br from-slate-700/50 to-slate-800/50 border border-slate-600 rounded-2xl p-12 hover:border-amber-400/50 transition-all group"
              >
                {/* Avatar */}
                <div className="flex justify-center mb-8">
                  {dev.isEmoji ? (
                    <div className="w-32 h-32 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center text-6xl shadow-lg group-hover:shadow-orange-500/50 transition-all">
                      {dev.image}
                    </div>
                  ) : (
                    <img 
                      src={dev.image} 
                      alt={dev.name}
                      className="w-32 h-32 rounded-full object-cover shadow-lg group-hover:shadow-orange-500/50 transition-all border-4 border-amber-500"
                    />
                  )}
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-white text-center mb-2">{dev.name}</h3>
                <p className="text-slate-400 text-sm font-medium text-center mb-4">NIM: {dev.nim}</p>
                <p className="text-amber-400 text-base font-medium text-center mb-6">{dev.role}</p>
                <p className="text-slate-300 text-center text-base leading-relaxed mb-8">
                  {dev.description}
                </p>

                {/* Contact Links */}
                <div className="flex items-center justify-center gap-4">
                  <a
                    href={`mailto:${dev.email}`}
                    className="p-2 bg-slate-700/50 hover:bg-amber-500/20 text-slate-300 hover:text-amber-400 rounded-lg transition-all"
                    title="Email"
                  >
                    <Mail className="w-5 h-5" />
                  </a>
                  <a
                    href={dev.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-slate-700/50 hover:bg-amber-500/20 text-slate-300 hover:text-amber-400 rounded-lg transition-all"
                    title="Instagram"
                  >
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a
                    href={dev.github}
                    className="p-2 bg-slate-700/50 hover:bg-amber-500/20 text-slate-300 hover:text-amber-400 rounded-lg transition-all"
                    title="GitHub"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                  <a
                    href={dev.linkedin}
                    className="p-2 bg-slate-700/50 hover:bg-amber-500/20 text-slate-300 hover:text-amber-400 rounded-lg transition-all"
                    title="LinkedIn"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-16">
          <h3 className="text-3xl font-bold text-white mb-8 tracking-tight">Key Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: '📊', title: 'Analytics Dashboard', desc: 'Dashboard interaktif dengan visualisasi data real-time' },
              { icon: '🎬', title: 'Film Database', desc: 'Database komprehensif dengan jutaan data film dan series' },
              { icon: '🔍', title: 'Advanced Search', desc: 'Pencarian canggih dengan berbagai filter dan kategori' },
              { icon: '📈', title: 'Trend Analysis', desc: 'Analisis tren produksi dan performa industri hiburan' }
            ].map((feature, idx) => (
              <div key={idx} className="bg-gradient-to-br from-slate-700/50 to-slate-800/50 border border-slate-600 rounded-lg p-6">
                <div className="text-3xl mb-4">{feature.icon}</div>
                <h4 className="text-white font-bold mb-2">{feature.title}</h4>
                <p className="text-slate-400 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-700 bg-slate-900/50 backdrop-blur-md mt-24">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-center md:text-left text-slate-400 text-sm font-medium">
              © 2024 FILMKITA. All rights reserved.
            </p>
            <div className="flex gap-6">
              <button onClick={() => navigate('/about')} className="text-slate-400 hover:text-amber-400 text-sm transition-colors">
                About
              </button>
              <a href="#" className="text-slate-400 hover:text-amber-400 text-sm transition-colors">
                Privacy
              </a>
              <a href="#" className="text-slate-400 hover:text-amber-400 text-sm transition-colors">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
