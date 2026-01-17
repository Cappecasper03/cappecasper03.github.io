import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

import ProjectCard from './components/ProjectCard'

function App() {
    const [activeSection, setActiveSection] = useState('about')

    useEffect(() => {
        const handleScroll = () => {
            const sections = ['about', 'games', 'projects', 'contact']

            // Highlight contact if we're near the bottom of the page
            const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100
            if (isAtBottom) {
                setActiveSection('contact')
                return
            }

            const scrollPosition = window.scrollY + window.innerHeight / 3

            for (const section of sections) {
                const element = document.getElementById(section)
                if (element) {
                    const { offsetTop, offsetHeight } = element
                    if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                        setActiveSection(section)
                        break
                    }
                }
            }
        }
        window.addEventListener('scroll', handleScroll)
        handleScroll()
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <div className="min-h-screen">
            <div className="bg-mesh fixed inset-0 pointer-events-none z-[-1]"></div>

            {/* Navigation */}
            <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
                <div className="glass-nav rounded-full px-2 py-2 flex items-center shadow-2xl border border-white/5 relative">
                    <div className="flex space-x-1 relative z-10">
                        {['about', 'games', 'projects', 'contact'].map((section) => (
                            <a
                                key={section}
                                href={`#${section}`}
                                className={`relative px-6 py-2 rounded-full text-sm font-medium transition-all capitalize ${activeSection === section ? 'text-white' : 'text-gray-400 hover:text-white'
                                    }`}
                            >
                                {activeSection === section && (
                                    <motion.div
                                        layoutId="nav-pill"
                                        className="absolute inset-0 bg-white/10 rounded-full z-0"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                                <span className="relative z-10">{section}</span>
                            </a>
                        ))}
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="min-h-screen flex items-center justify-center relative px-4 pt-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center max-w-4xl mx-auto z-10"
                >
                    <div className="mb-4 inline-flex items-center px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-300 text-xs font-mono uppercase tracking-widest">
                        <span className="w-2 h-2 rounded-full bg-blue-400 mr-2 animate-pulse"></span>
                        Available for work
                    </div>
                    <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tight">
                        <span className="text-white">Casper</span>
                        <span className="text-gradient ml-4">Juvas</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
                        Game Developer & C++ Specialist. <br className="hidden md:block" />
                        Building immersive systems and high-performance engines.
                    </p>
                    <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                        <a href="/cv.html" className="group relative px-8 py-4 bg-white text-black font-bold rounded-lg overflow-hidden transition-all hover:scale-105">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <span className="relative z-10 group-hover:text-white transition-colors">View CV</span>
                        </a>
                        <a href="https://github.com/Cappecasper03" target="_blank" className="px-8 py-4 glass-panel rounded-lg font-medium text-white hover:bg-white/5 transition-all hover:scale-105 flex items-center justify-center">
                            GitHub
                        </a>
                    </div>
                </motion.div>
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-gray-500">
                    <ChevronDown className="w-6 h-6" />
                </div>
            </section>

            <main className="max-w-7xl mx-auto px-4 pb-20 space-y-32">
                {/* About Section */}
                <section id="about" className="scroll-mt-32">
                    <div className="flex items-end gap-4 mb-12">
                        <h2 className="text-4xl md:text-5xl font-bold text-white">About Me</h2>
                        <div className="h-1 flex-grow bg-white/5 rounded-full mb-3 max-w-[200px]">
                            <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: '33%' }}
                                className="h-full bg-blue-500 rounded-full"
                            ></motion.div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="lg:col-span-2 glass-panel rounded-2xl p-8 card-hover-effect"
                        >
                            <p className="text-lg text-gray-300 leading-relaxed mb-6">
                                I am a <span className="text-blue-400 font-semibold">C++ Programmer</span> specializing in Game Development.
                                With extensive experience in <span className="text-white">Unreal Engine</span> and proprietary in-house engines,
                                I have a deep understanding of gameplay programming, graphics pipelines, and core systems architecture.
                            </p>
                            <p className="text-gray-400 leading-relaxed">
                                My passion lies in squeezing every bit of performance out of code and building tools that empower other developers.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="glass-panel rounded-2xl p-8 card-hover-effect flex flex-col justify-center"
                        >
                            <div className="space-y-6">
                                <div>
                                    <div className="flex justify-between text-sm text-gray-400 mb-2">
                                        <span>C++ / C#</span>
                                        <span>Expert</span>
                                    </div>
                                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                                        <motion.div initial={{ width: 0 }} whileInView={{ width: '95%' }} className="h-full bg-blue-500"></motion.div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-sm text-gray-400 mb-2">
                                        <span>Unreal Engine</span>
                                        <span>Advanced</span>
                                    </div>
                                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                                        <motion.div initial={{ width: 0 }} whileInView={{ width: '90%' }} className="h-full bg-purple-500"></motion.div>
                                    </div>
                                </div>
                                <div className="pt-4 flex flex-wrap gap-2">
                                    {['Unreal Engine', 'Vulkan', 'OpenGL', 'C++', 'C#', 'Git/SVN'].map(skill => (
                                        <span key={skill} className="px-3 py-1 bg-white/5 rounded-md text-[10px] font-mono uppercase tracking-wider text-blue-300/80 border border-blue-500/10">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Games Section */}
                <section id="games" className="scroll-mt-32">
                    <div className="flex items-end gap-4 mb-12">
                        <h2 className="text-4xl md:text-5xl font-bold text-white">Released Games</h2>
                        <div className="h-1 flex-grow bg-white/5 rounded-full mb-3 max-w-[200px]">
                            <motion.div initial={{ width: 0 }} whileInView={{ width: '33%' }} className="h-full bg-purple-500 rounded-full"></motion.div>
                        </div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="glass-panel rounded-2xl overflow-hidden card-hover-effect group"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2">
                            <div className="relative h-64 md:h-auto overflow-hidden">
                                <img
                                    src="https://cdn.akamai.steamstatic.com/steam/apps/1299290/header.jpg?t=1674297000"
                                    alt="Somber Echoes"
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-gray-900/50"></div>
                            </div>
                            <div className="p-8 flex flex-col justify-center">
                                <h3 className="text-3xl font-display font-bold text-white mb-2">Somber Echoes</h3>
                                <div className="flex gap-2 mb-6">
                                    <span className="px-2 py-0.5 bg-blue-500/10 text-blue-300 text-xs rounded border border-blue-500/20">Steam</span>
                                    <span className="px-2 py-0.5 bg-purple-500/10 text-purple-300 text-xs rounded border border-purple-500/20">Action-Adventure</span>
                                </div>
                                <p className="text-gray-400 mb-8 leading-relaxed">
                                    A cataclysmic event turned the once beautiful Greco-Roman space vessel into breeding grounds for horrors.
                                    As Adrestia, interact with destiny and awaken from the rubble.
                                </p>
                                <a href="https://store.steampowered.com/app/1299290/Somber_Echoes/" target="_blank" className="inline-flex items-center text-white font-medium hover:text-blue-400 transition-colors">
                                    View on Steam <span className="ml-2">&rarr;</span>
                                </a>
                            </div>
                        </div>
                    </motion.div>
                </section>

                {/* Projects Section */}
                <section id="projects" className="scroll-mt-32">
                    <div className="flex items-end gap-4 mb-12">
                        <h2 className="text-4xl md:text-5xl font-bold text-white">Projects</h2>
                        <div className="h-1 flex-grow bg-white/5 rounded-full mb-3 max-w-[200px]">
                            <motion.div initial={{ width: 0 }} whileInView={{ width: '33%' }} className="h-full bg-blue-500 rounded-full"></motion.div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <ProjectCard
                            title="DragonForge-Engine"
                            description="Modern C++ Game Engine featuring a modular multi-renderer architecture. Built from scratch to explore high-performance systems."
                            topTags={[{ label: 'Personal Project', type: 'personal' }]}
                            techTags={['C++ 20', 'Vulkan', 'Engine Dev']}
                            github="https://github.com/Cappecasper03/DragonForge-Engine"
                            span
                        />
                        <ProjectCard
                            title="Burglar"
                            description="Horror & Puzzle game for PSVR 2."
                            topTags={[
                                { label: 'School Project', type: 'school' },
                                { label: '9 Weeks', type: 'duration' }
                            ]}
                            footerText="Unreal Engine 5"
                            link="/projects/burglar.html"
                        />
                        <ProjectCard
                            title="Full Moon Fears"
                            description="Survival Horror experience on PC."
                            topTags={[
                                { label: 'School Project', type: 'school' },
                                { label: '6 Weeks', type: 'duration' }
                            ]}
                            footerText="Unreal Engine 5"
                            link="/projects/full-moon-fears.html"
                        />
                        <ProjectCard
                            title="School Specialization"
                            description="Deep dive into Tengine architecture."
                            topTags={[
                                { label: 'School Project', type: 'school' },
                                { label: '4 Weeks', type: 'duration' }
                            ]}
                            footerText="Tengine"
                            link="/projects/school-specialization.html"
                        />
                    </div>
                </section>

                {/* Contact Section */}
                <section id="contact" className="scroll-mt-32">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="glass-panel rounded-3xl p-8 md:p-12 text-center relative overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-purple-900/20 pointer-events-none"></div>
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-8 relative z-10">Let's Build Something Amazing</h2>
                        <p className="text-gray-400 mb-10 max-w-2xl mx-auto relative z-10">
                            I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.
                        </p>

                        <div className="flex flex-col md:flex-row justify-center gap-6 relative z-10">
                            <a href="mailto:03repsac@gmail.com" className="px-8 py-3 glass-panel text-white font-medium rounded-lg hover:bg-white/10 transition-colors flex items-center justify-center">
                                03repsac@gmail.com
                            </a>

                            <a href="https://www.linkedin.com/in/casper-juvas-0b843627b/" className="px-8 py-3 glass-panel text-white font-medium rounded-lg hover:bg-white/10 transition-colors flex items-center justify-center">
                                LinkedIn
                            </a>
                        </div>
                    </motion.div>
                </section>
            </main>
        </div>
    )
}

export default App
