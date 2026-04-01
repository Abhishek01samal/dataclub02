import dummyVideo from '@clone/assets/works/Dummy.mp4?url'
import pen4 from '@clone/assets/works/Pen-4.mp4?url'
import pen5 from '@clone/assets/works/Pen-5.mp4?url'
import pen6 from '@clone/assets/works/Pen-6.mp4?url'
import pen7 from '@clone/assets/works/Pen-7.mp4?url'
import pen8 from '@clone/assets/works/Pen-8.mp4?url'

export type WorkItem = {
  caption: string
  site: string
  src: string
}

const info: Record<
  string,
  {
    title: string
    site: string
  }
> = {
  Pen: {
    title: 'CodePen',
    site: 'https://codepen.io/wodniack',
  },
  Dummy1: {
    title: 'Dummy Project 1',
    site: 'https://wodniack.dev',
  },
  Dummy2: {
    title: 'Dummy Project 2',
    site: 'https://wodniack.dev',
  },
  Dummy3: {
    title: 'Dummy Project 3',
    site: 'https://wodniack.dev',
  },
  Dummy4: {
    title: 'Dummy Project 4',
    site: 'https://wodniack.dev',
  },
  Dummy5: {
    title: 'Dummy Project 5',
    site: 'https://wodniack.dev',
  },
  Dummy6: {
    title: 'Dummy Project 6',
    site: 'https://wodniack.dev',
  },
  Dummy7: {
    title: 'Dummy Project 7',
    site: 'https://wodniack.dev',
  },
  Dummy8: {
    title: 'Dummy Project 8',
    site: 'https://wodniack.dev',
  },
  Dummy9: {
    title: 'Dummy Project 9',
    site: 'https://wodniack.dev',
  },
  Dummy10: {
    title: 'Dummy Project 10',
    site: 'https://wodniack.dev',
  },
}

function keyFromSrc(src: string) {
  const base = src.split('/').pop() || ''
  return base.split('-')[0].replace(/\.mp4$/i, '')
}

export function buildWorks(): WorkItem[] {
  const videoEntries: { src: string; key: string }[] = [
    { src: pen4, key: keyFromSrc(pen4) },
    { src: pen5, key: keyFromSrc(pen5) },
    { src: pen6, key: keyFromSrc(pen6) },
    { src: pen7, key: keyFromSrc(pen7) },
    { src: pen8, key: keyFromSrc(pen8) },
    { src: dummyVideo, key: keyFromSrc(dummyVideo) },
  ]

  const projects: WorkItem[] = []
  const pens: WorkItem[] = []

  videoEntries.forEach(({ src }) => {
    const key = keyFromSrc(src)
    const project = info[key]
    if (!project) return
    const caption = project.title
    const site = project.site

    if (key === 'Pen') {
      pens.push({
        caption,
        site,
        src,
      })
    } else {
      projects.push({
        caption,
        site,
        src,
      })
    }
  })

  for (let i = 1; i <= 14; i++) {
    const key = `Dummy${i}`
    const project = info[key]
    if (!project) continue

    for (let j = 0; j < 4; j++) {
      projects.push({
        caption: `${project.title} - Video ${j + 1}`,
        site: project.site,
        src: dummyVideo,
      })
    }
  }

  function shuffle<T>(array: T[]) {
    let currentIndex = array.length

    while (currentIndex != 0) {
      const randomIndex = Math.floor(Math.random() * currentIndex)
      currentIndex--
      ;[array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ]
    }
  }

  shuffle(projects)

  const works: WorkItem[] = []
  const chunkSize = Math.floor(projects.length / pens.length) || 1
  let i = 0
  let j = 0
  while (i < projects.length) {
    works.push(projects[i])
    if (j < pens.length && (i + 1) % chunkSize === 0) {
      works.push(pens[j])
      j++
    }
    i++
  }

  return works
}

export const works = buildWorks()
