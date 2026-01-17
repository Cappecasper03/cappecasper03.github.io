import { Github } from 'lucide-react';
import { motion } from 'framer-motion';

interface Tag {
    label: string;
    type: 'personal' | 'school' | 'duration' | 'tech';
}

interface ProjectCardProps {
    title: string;
    description: string;
    topTags: Tag[];
    techTags?: string[];
    footerText?: string;
    link?: string;
    github?: string;
    span?: boolean;
}

const ProjectCard = ({ title, description, topTags, techTags, footerText, link, github, span = false }: ProjectCardProps) => {
    const getTagStyles = (type: Tag['type']) => {
        switch (type) {
            case 'personal':
                return 'bg-blue-500/10 text-blue-300 border-blue-500/20';
            case 'school':
                return 'bg-purple-500/10 text-purple-300 border-purple-500/20';
            case 'duration':
                return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
            default:
                return 'bg-white/5 text-gray-400 border-white/10';
        }
    };

    const CardContent = (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`glass-panel p-6 rounded-2xl h-full card-hover-effect flex flex-col ${span ? 'md:col-span-2 lg:col-span-1' : ''} group relative`}
        >
            <div className="mb-6 flex items-center justify-between">
                {/* Decorative Spacer replaced by Github if present */}
                <div className="w-12 h-12 flex items-center justify-center opacity-0"></div>
                {github && (
                    <a
                        href={github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-500 hover:text-white transition-colors relative z-20"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Github className="w-6 h-6" />
                    </a>
                )}
            </div>

            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                {title}
            </h3>

            <div className="flex flex-wrap gap-2 mb-4">
                {topTags.map((tag, i) => (
                    <span
                        key={i}
                        className={`px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider rounded border ${getTagStyles(tag.type)}`}
                    >
                        {tag.label}
                    </span>
                ))}
            </div>

            <p className={`text-gray-400 leading-relaxed mb-6 flex-grow ${link ? 'text-sm' : ''}`}>
                {description}
            </p>

            {techTags && techTags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-auto">
                    {techTags.map((tag, i) => (
                        <span
                            key={i}
                            className="text-xs font-mono text-gray-500 border border-gray-800 px-2 py-1 rounded bg-gray-900/50"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            )}

            {footerText && (
                <div className="mt-auto pt-4 border-t border-white/5 flex justify-between items-center text-sm text-gray-500">
                    <span>{footerText}</span>
                    <span className="text-white group-hover:translate-x-1 transition-transform">&rarr;</span>
                </div>
            )}
        </motion.div>
    );

    if (link) {
        return (
            <a href={link} className="block h-full no-underline">
                {CardContent}
            </a>
        );
    }

    return CardContent;
};

export default ProjectCard;
