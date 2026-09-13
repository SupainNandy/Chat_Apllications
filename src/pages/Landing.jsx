import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { IoChatbubblesOutline, IoSpeedometerOutline, IoShieldCheckmarkOutline } from 'react-icons/io5';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const Landing = () => {
    const container = useRef();

    useGSAP(() => {
        gsap.from(".nav-anim", { y: -10, opacity: 0, duration: 0.6, ease: "power2.out", stagger: 0.1 });
        gsap.from(".hero-anim", { y: 25, opacity: 0, duration: 0.8, ease: "power3.out", stagger: 0.15, delay: 0.2 });
        gsap.from(".cta-btn", { y: 15, opacity: 0, duration: 0.6, ease: "power2.out", stagger: 0.1, delay: 0.5 });
        gsap.from(".feature-card", { y: 30, opacity: 0, duration: 0.8, ease: "power3.out", stagger: 0.15, delay: 0.7 });
    }, { scope: container });

    return (
        <div ref={container} className="min-h-screen bg-[var(--color-app-bg)] text-[var(--color-text-primary)] font-sans selection:bg-[var(--color-primary)] selection:text-white flex flex-col relative overflow-hidden">
            
            {/* Background Glows */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[var(--color-primary)] rounded-full blur-[120px] opacity-10 pointer-events-none"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600 rounded-full blur-[120px] opacity-10 pointer-events-none"></div>

            {/* Navbar */}
            <nav className="flex items-center justify-between px-6 py-6 max-w-7xl w-full mx-auto relative z-10">
                <div className="flex items-center gap-2 text-[var(--color-primary)] nav-anim">
                    <span className="text-3xl leading-none font-bold">◈</span>
                    <span className="font-bold text-xl text-[var(--color-text-primary)] tracking-tight">ChatFlow</span>
                </div>
                <div className="flex items-center gap-4 nav-anim">
                    <Link to="/login" className="text-sm font-semibold text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors">
                        Sign In
                    </Link>
                    <Link to="/signup" className="text-sm font-semibold bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white px-5 py-2.5 rounded-full transition-all shadow-lg shadow-[var(--color-primary)]/20 hover:shadow-[var(--color-primary)]/40 hover:-translate-y-0.5">
                        Get Started
                    </Link>
                </div>
            </nav>

            {/* Hero Section */}
            <main className="flex-1 flex flex-col items-center justify-center px-6 text-center relative z-10 mt-10">
                <div className="hero-anim inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1E2430] border border-[var(--color-border-subtle)] text-[11px] font-semibold text-[var(--color-primary)] uppercase tracking-wider mb-8 shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-[var(--color-primary)] animate-pulse"></span>
                    ChatFlow v2.0 is live
                </div>
                
                <h1 className="hero-anim text-5xl md:text-7xl font-extrabold tracking-tight mb-6 max-w-4xl bg-gradient-to-br from-white via-[#F8FAFC] to-[#94A3B8] bg-clip-text text-transparent leading-[1.1]">
                    Communicate <br className="hidden md:block"/> at the speed of thought.
                </h1>
                
                <p className="hero-anim text-[var(--color-text-secondary)] text-lg md:text-xl max-w-2xl mb-10 leading-relaxed">
                    A premium, real-time chat platform built for modern teams. Experience seamless messaging, file sharing, and collaboration in a beautifully crafted interface.
                </p>
                
                <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                    <Link to="/signup" className="cta-btn w-full sm:w-auto text-base font-semibold bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white px-8 py-4 rounded-full transition-all shadow-xl shadow-[var(--color-primary)]/20 hover:shadow-[var(--color-primary)]/40 hover:-translate-y-1">
                        Start Chatting Now
                    </Link>
                    <Link to="/login" className="cta-btn w-full sm:w-auto text-base font-semibold bg-[#1E2430] hover:bg-[#252B36] text-[var(--color-text-primary)] border border-[var(--color-border-subtle)] px-8 py-4 rounded-full transition-all hover:-translate-y-1">
                        Sign In to Account
                    </Link>
                </div>

                {/* Feature Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-24 max-w-5xl w-full text-left">
                    <div className="feature-card p-6 rounded-2xl bg-[#11141B] border border-[var(--color-border-subtle)] hover:border-[var(--color-primary)]/50 transition-colors group">
                        <div className="w-12 h-12 rounded-xl bg-[var(--color-chat-bg)] border border-[var(--color-border-subtle)] flex items-center justify-center text-[var(--color-primary)] mb-4 group-hover:scale-110 transition-transform">
                            <IoSpeedometerOutline className="w-6 h-6" />
                        </div>
                        <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-2">Lightning Fast</h3>
                        <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">Real-time WebSocket integration ensures your messages are delivered instantly, without delay.</p>
                    </div>
                    
                    <div className="feature-card p-6 rounded-2xl bg-[#11141B] border border-[var(--color-border-subtle)] hover:border-[var(--color-primary)]/50 transition-colors group">
                        <div className="w-12 h-12 rounded-xl bg-[var(--color-chat-bg)] border border-[var(--color-border-subtle)] flex items-center justify-center text-[var(--color-primary)] mb-4 group-hover:scale-110 transition-transform">
                            <IoChatbubblesOutline className="w-6 h-6" />
                        </div>
                        <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-2">Beautiful Interface</h3>
                        <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">A dark-first, premium aesthetic designed to reduce eye strain and keep you focused on conversations.</p>
                    </div>

                    <div className="feature-card p-6 rounded-2xl bg-[#11141B] border border-[var(--color-border-subtle)] hover:border-[var(--color-primary)]/50 transition-colors group">
                        <div className="w-12 h-12 rounded-xl bg-[var(--color-chat-bg)] border border-[var(--color-border-subtle)] flex items-center justify-center text-[var(--color-primary)] mb-4 group-hover:scale-110 transition-transform">
                            <IoShieldCheckmarkOutline className="w-6 h-6" />
                        </div>
                        <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-2">Secure & Private</h3>
                        <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">Your data is yours. Industry-standard authentication and robust security protocols protect your chats.</p>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="w-full py-8 text-center border-t border-[var(--color-border-subtle)] mt-16 relative z-10 bg-[#0B0D12]">
                <div className="flex flex-col items-center justify-center gap-2">
                    <span className="text-xs font-bold text-[var(--color-text-secondary)] uppercase tracking-wider">Crafted With ❤️</span>
                    <div className="flex items-center gap-1.5">
                        <span className="text-sm font-semibold text-[var(--color-text-primary)]">Developed by</span>
                        <span className="text-base font-extrabold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent filter drop-shadow-[0_0_8px_rgba(34,211,238,0.4)]">Supain</span>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Landing;
