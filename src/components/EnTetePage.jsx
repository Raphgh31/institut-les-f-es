import { motion } from 'framer-motion'

export default function EnTetePage({ titre, children, image, alt }) {
  return (
    <section className={`entete-page ${image ? 'entete-page--image' : ''}`}>
      <div className="conteneur entete-page__grille">
        <motion.div
          className="entete-page__texte"
          initial="cache"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        >
          <motion.h1 variants={{ cache: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}>{titre}</motion.h1>
          {children && (
            <motion.div
              className="entete-page__intro"
              variants={{ cache: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
            >
              {children}
            </motion.div>
          )}
        </motion.div>
        {image && (
          <motion.img
            className="entete-page__image"
            src={image}
            alt={alt}
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 0.61, 0.36, 1] }}
          />
        )}
      </div>
    </section>
  )
}
