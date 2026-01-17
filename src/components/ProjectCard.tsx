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
    image?: string;
}

const ProjectCard = ({ title, description, topTags, techTags, footerText, link, github, span = false, image }: ProjectCardProps) => {
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
            className={`glass-panel rounded-2xl h-full card-hover-effect flex flex-col ${span ? 'md:col-span-2 lg:col-span-1' : ''} group relative overflow-hidden`}
        >
            {image && (
                <div className="h-48 w-full relative overflow-hidden">
                    <img
                        src={image}
                        alt={title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent"></div>
                </div>
            )}

            <div className="p-6 flex flex-col flex-grow">
                <div className="mb-4 flex items-center justify-between">
                    <div className="flex flex-wrap gap-2">
                        {topTags.map((tag, i) => (
                            <span
                                key={i}
                                className={`px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider rounded border ${getTagStyles(tag.type)}`}
                            >
                                {tag.label}
                            </span>
                        ))}
                    </div>
                    {github && (
                        <a
                            href={github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-500 hover:text-white transition-colors relative z-20"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Github className="w-5 h-5" />
                        </a>
                    )}
                </div>

                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                    {title}
                </h3>

                <p className={`text-gray-400 leading-relaxed mb-6 flex-grow ${link ? 'text-sm' : 'text-sm'}`}>
                    {description}
                </p>

                <div className="mt-auto space-y-4">
                    {techTags && techTags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                            {techTags.map((tag, i) => (
                                <span
                                    key={i}
                                    className="text-[10px] font-mono text-gray-500 border border-gray-800 px-2 py-0.5 rounded bg-gray-900/50"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}

                    {footerText && (
                        <div className="pt-4 border-t border-white/5 flex justify-between items-center text-xs text-gray-500 uppercase tracking-widest font-mono">
                            <span>{footerText}</span>
                            <span className="text-white group-hover:translate-x-1 transition-transform">&rarr;</span>
                        </div>
                    )}
                </div>
            </div>
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
