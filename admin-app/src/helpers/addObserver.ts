const addObserver = () => {
    const animatedEls = document.querySelectorAll('.appFadeIn')
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.contains('appFadeIn')
                        ? entry.target.classList.add('reveal')
                        : ''
                }
            })
        },
        { threshold: 0.1 },
    )

    for (let i = 0; i < animatedEls.length; i++) {
        const elements = animatedEls[i]
        observer.observe(elements)
    }
}

export default addObserver
