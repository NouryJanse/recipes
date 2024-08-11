import truncateString from '../StringHelper'

describe('truncateString', () => {
    it('truncates the string with ... at the end', async () => {
        const result = truncateString(
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum auctor scelerisque urna, et ultrices sapien rhoncus sed.',
            21,
        )
        expect(result.includes('...')).toBeTruthy()
        expect(result.length).toBe(24)
    })
})
