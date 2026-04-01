type Props = {
  strings?: string[]
  style?: 'primary' | 'secondary'
  className?: string
}

export function BinarySeparator({
  strings = ['Do', 'Things', 'Your', 'Way'],
  style = 'primary',
  className = '',
}: Props) {
  const binaries = strings.map((string) =>
    string
      .split('')
      .map((char) => char.charCodeAt(0).toString(2))
      .join(' ')
  )

  return (
    <a-separator
      className={['style--' + style, className].filter(Boolean).join(' ')}
      data-intersect
    >
      <span className="a__triangle" />

      <span className="a__binaries">
        {binaries.map((binary, bi) => (
          <span key={bi}>
            <span className="a__code js-code">
              {binary.split('').map((char, ci) => (
                <span
                  key={ci}
                  className={[
                    'a__char',
                    'a__char--' + (char === ' ' ? 'blank' : char),
                    'js-char',
                  ].join(' ')}
                >
                  {char}
                </span>
              ))}
            </span>
            <span className="a__stripes" />
          </span>
        ))}
      </span>

      <span className="a__triangle" />
    </a-separator>
  )
}
