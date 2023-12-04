import React, { ReactElement } from 'react'

type HeroProps = {
  image: { heroBanner: string }
}

const Hero: React.FC<HeroProps> = ({ image }): ReactElement => {
  return (
    <div
      style={{
        backgroundImage: `url('${image.heroBanner}')`,
        boxShadow: 'inset 0 0 0 2000px rgba(0, 0, 0, 0.2)',
      }}
      className="p-10 md:p-20 mb-10 rounded-lg bg-cover"
    >
      <p className="text-white font-mono text-md xl:text-lg">Some hero component here...</p>
    </div>
  )
}

export default Hero
