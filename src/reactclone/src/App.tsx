import React, { useEffect, useMemo, useRef } from 'react'
import { bootstrapSite } from '@clone/site/Site'
import { initSiteScrollbar } from '@clone/controllers/siteScrollbarController'
import { initSWork } from '@clone/controllers/sworkController'
import { initSMyWay } from '@clone/controllers/smywayController'
import { initSCTA } from '@clone/controllers/sctaController'
import { works } from '@clone/data/works'
import { frames } from '@clone/data/frames'

const menu = [
  { id: 'work', text: 'Work' },
  { id: 'contact', text: 'Contact' },
]




const ctaLines = [
  ['L', 'e', `t<span class="sup">'</span>`, 's'],
  ['B', 'u', 'i', 'l', 'd'],
]

export default function App() {
  const scrollbarRef = useRef<HTMLDivElement>(null)

  const workRef = useRef<HTMLElement>(null)
  const myWayRef = useRef<HTMLElement>(null)
  const ctaRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const site = bootstrapSite()
    return () => {
      site.lenis.destroy()
    }
  }, [])



  useEffect(() => {
    if (scrollbarRef.current) initSiteScrollbar(scrollbarRef.current)
  }, [])



  useEffect(() => {
    if (workRef.current) initSWork(workRef.current)
  }, [])

  useEffect(() => {
    if (myWayRef.current) initSMyWay(myWayRef.current)
  }, [])

  useEffect(() => {
    if (ctaRef.current) initSCTA(ctaRef.current)
  }, [])

  const totalWorks = String(works.length).padStart(2, '0')

  const workKeys = useMemo(
    () =>
      works.map(
        (_, index) =>
          Math.random().toString(36).slice(2, 6) +
          '-' +
          String(index).padStart(4, '0') +
          '/' +
          totalWorks
      ),
    [totalWorks]
  )

  return (
    <>
      <div className="site-wrapper js-site-wrapper" style={{ opacity: 0 }}>


        <section ref={workRef} id="work" className="s-work" data-intersect>
          <div className="s__outer">
            <div className="s__inner js-container">
              <h2 className="s__title">
                <span className="s__title__inner js-title">
                  {['W', 'O', 'R', 'K'].map((L) => (
                    <span key={L} className="s__title__letter js-letter">
                      {L}
                    </span>
                  ))}
                </span>
              </h2>

              <div className="s__scene js-scene">
                {works.map((work, index) => {
                  const key = workKeys[index]
                  return (
                    <a-work
                      key={`${work.caption}-${index}`}
                      className="s__scene__work s__scene__work--video js-work"
                    >
                      <div className="a__inner">
                        <a href={work.site} target="_blank" rel="noopener noreferrer">
                          <video
                            data-src={work.src}
                            className="a__video js-video"
                            loop
                            muted
                            playsInline
                            width="1082"
                            height="636"
                          />
                          <div className="a__caption">
                            <div className="a__caption__text">{work.caption}</div>
                            <div className="a__caption__key">#{key}</div>
                          </div>
                        </a>
                      </div>
                    </a-work>
                  )
                })}
              </div>

              <canvas className="s__canvas js-canvas" />
            </div>

            <div className="s__mask-outer">
              <div className="s__mask js-mask">
                <svg className="s__mask__svg js-mask-svg">
                  <path className="s__mask__path-inner js-mask-path-inner" d="" />
                  <path className="s__mask__path-outer js-mask-path-outer" d="" />
                  <path className="s__mask__path-lines js-mask-path-lines" d="" />
                </svg>
              </div>
            </div>

            <div className="s__ruler js-ruler" />
          </div>
        </section>


        <section ref={myWayRef} className="s-my-way" data-intersect>
          <svg
            className="s__smiley js-smiley"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 77.8 77.8"
            xmlSpace="preserve"
          >
            <circle cx="38.9" cy="38.9" r="37.9" fill="none" stroke="currentColor" strokeWidth="2" />
            <circle cx="38.9" cy="38.9" r="8" fill="currentColor" />
          </svg>


          <div className="s__objects js-objects">
            {frames.map((frame, index) => (
              <div key={index} className="a-object a-object--frame">
                <figure className="a__inner">
                  <img src={frame.src} alt={frame.caption.replace(/<[^>]+>/g, '')} className="a__img" />
                  <figcaption
                    className="a__caption"
                    dangerouslySetInnerHTML={{ __html: frame.caption }}
                  />
                </figure>
                <div className="a__side a__side--vertical" />
                <div className="a__side a__side--horizontal" />
              </div>
            ))}
            {Array.from({ length: 10 }).map((_, index) => (
              <div key={`star-${index}`} className="a-object a-object--star">
                <div className="a__side a__side--top-left" />
                <div className="a__side a__side--top-right" />
                <div className="a__side a__side--bottom-left" />
                <div className="a__side a__side--bottom-right" />
              </div>
            ))}
            <div className="s__ruler js-ruler" />
          </div>

          <div className="s__catcher">
            <div className="s__catcher__distorted-wrapper">
              <div className="s__catcher__distorted">
                <div className="s__catcher__text s__catcher__text--distorted">
                  Turning <br />
                  Data <br />
                  into <br />
                  ACTION
                </div>
              </div>
            </div>
            <div className="s__catcher__normal-wrapper">
              <div className="s__catcher__normal">
                <div className="s__catcher__text s__catcher__text--normal">
                  Turning <br />
                  Data <br />
                  into <br />
                  ACTION
                </div>
              </div>
            </div>
          </div>

          <svg className="s__svg js-svg">
            <path className="s__svg__circular-path js-lines-circular-path" d="" />
          </svg>
        </section>

        <section ref={ctaRef} className="s-cta" data-intersect>
          <div id="contact" className="s__inner js-container">
            <div className="s__hover js-hover">
              <div className="s__button js-button">
                <div className="s__button__inner">
                  <div className="s__button__text js-button-text">GO</div>
                </div>
              </div>

              <div className="s__cta js-cta">
                {ctaLines.map((line, i) => (
                  <div
                    key={i}
                    className={
                      's__cta__line s__cta__line--' + (i === 0 ? 'top' : 'bottom')
                    }
                  >
                    <div className="s__cta__text">
                      {line.map((char, j) => (
                        <span key={j} className="s__cta__char">
                          {[0, 1, 2, 3].map((k) => (
                            <span
                              key={k}
                              className="s__cta__char__slice"
                              dangerouslySetInnerHTML={{ __html: char }}
                            />
                          ))}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
                <div className="s__cta__link">
                  BY ABHISHEK SAMAL (ASA)
                </div>
                <div className="s__cta__stars">
                  {[1, 2, 3, 4].map((i) => (
                    <svg
                      key={i}
                      className="s__cta__star"
                      width="49"
                      height="49"
                      viewBox="0 0 49 49"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="m24.5 0 3.3 21.2L49 24.5l-21.2 3.3L24.5 49l-3.3-21.2L0 24.5l21.2-3.3L24.5 0z" />
                    </svg>
                  ))}
                </div>
                <div className="a-dots" />
              </div>
            </div>
          </div>

          <div className="s__grid js-grid">
            <svg className="s__grid__svg js-grid-svg">
              <path className="s__grid__path js-grid-path" d="" />
            </svg>
          </div>
        </section>



      </div>

      <div className="site-mount js-mount" />

      <div className="site-contrast-mask js-contrast-mask" />

      <div ref={scrollbarRef} className="site-scrollbar">
        <div className="site-scrollbar__track" />
        <div className="site-scrollbar__thumb js-thumb" />
      </div>
    </>
  )
}
