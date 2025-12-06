import { motion } from 'framer-motion';

const Marquee = ({ text }: { text: string }) => {
  return (
    <div className="relative flex overflow-hidden bg-primary text-primary-foreground py-2 text-sm">
      <motion.div
        className="flex whitespace-nowrap"
        animate={{
          x: ['0%', '-100%'],
        }}
        transition={{
          ease: 'linear',
          duration: 25,
          repeat: Infinity,
        }}
      >
        <span className="mx-4">{text}</span>
        <span className="mx-4">{text}</span>
        <span className="mx-4">{text}</span>
        <span className="mx-4">{text}</span>
      </motion.div>
    </div>
  );
};

export default Marquee;
