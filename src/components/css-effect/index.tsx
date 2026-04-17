// Example from https://beta.reactjs.org/learn
import './index.scss'

const CssEffect = ({loadingInfo, ...otherProps}) => {
  return (
    <div className="css-center-section">
      <section className="mt-10 p-2">
        <h4 className="my-2">css box shadow</h4>
        <p>
          The box-shadow property creates a rectangular shadow behind an
          element’s entire box.{" "}
        </p>
        <div className="flex gap-5 flex-col justify-center items-center h-auto parent bg-white p-4 shadow">
          <p className="w-1/3 p-2 bg-grey-400 shadow-sm">.shadow-sm</p>
          <p className="w-1/3 p-2 bg-grey-400 shadow">.shadow</p>
          <p className="w-1/3 p-2 bg-grey-400 shadow-md">.shadow-md</p>
          <p className="w-1/3 p-2 bg-grey-400 shadow-lg">.shadow-lg</p>
          <p className="w-1/3 p-2 bg-grey-400 shadow-xl">.shadow-xl</p>
          <p className="w-1/3 p-2 bg-grey-400 shadow-2xl">.shadow-2xl</p>
          <p className="w-1/3 p-2 bg-grey-400 shadow-inner">.shadow-inner</p>
          <p className="w-1/3 p-2 bg-grey-400 shadow-none">.shadow-none</p>
        </div>
      </section>
      <section className="mt-10 p-2">
        <h4 className="my-2">CSS Drop Shadow</h4>
        <p>
          Using drop-shadow allows us to add a shadow to an element that doesn’t
          correspond to its bounding box, but instead uses the element’s alpha
          mask. We could add a drop shadow to a transparent PNG or SVG logo
        </p>

        <div className="flex gap-5 flex-col justify-center items-center h-auto parent bg-white p-4 shadow">
          <div className="flex flex-col items-center shrink-0">
            <p className="font-medium text-sm text-slate-500 font-mono text-center mb-3">
              drop-shadow-sm
            </p>
            <svg
              className="drop-shadow-sm h-28 w-28"
              viewBox="0 0 84 84"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22.0992 77L2.19922 42.5L22.0992 8H61.8992L81.7992 42.5L61.8992 77H22.0992Z"
                fill="#fff"
              ></path>
            </svg>
          </div>
          <div className="flex flex-col items-center shrink-0">
            <p className="font-medium text-sm text-slate-500 font-mono text-center mb-3">
              drop-shadow
            </p>
            <svg
              className="drop-shadow h-28 w-28"
              viewBox="0 0 84 84"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22.0992 77L2.19922 42.5L22.0992 8H61.8992L81.7992 42.5L61.8992 77H22.0992Z"
                fill="#fff"
              ></path>
            </svg>
          </div>
          <div className="flex flex-col items-center shrink-0">
            <p className="font-medium text-sm text-slate-500 font-mono text-center mb-3">
              drop-shadow-md
            </p>
            <svg
              className="drop-shadow-md h-28 w-28"
              viewBox="0 0 84 84"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22.0992 77L2.19922 42.5L22.0992 8H61.8992L81.7992 42.5L61.8992 77H22.0992Z"
                fill="#fff"
              ></path>
            </svg>
          </div>
          <div className="flex flex-col items-center shrink-0">
            <p className="font-medium text-sm text-slate-500 font-mono text-center mb-3">
              drop-shadow-lg
            </p>
            <svg
              className="drop-shadow-lg h-28 w-28"
              viewBox="0 0 84 84"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22.0992 77L2.19922 42.5L22.0992 8H61.8992L81.7992 42.5L61.8992 77H22.0992Z"
                fill="#fff"
              ></path>
            </svg>
          </div>
          <div className="flex flex-col items-center shrink-0">
            <p className="font-medium text-sm text-slate-500 font-mono text-center mb-3">
              drop-shadow-xl
            </p>
            <svg
              className="drop-shadow-xl h-28 w-28"
              viewBox="0 0 84 84"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22.0992 77L2.19922 42.5L22.0992 8H61.8992L81.7992 42.5L61.8992 77H22.0992Z"
                fill="#fff"
              ></path>
            </svg>
          </div>
          <div className="flex flex-col items-center shrink-0">
            <p className="font-medium text-sm text-slate-500 font-mono text-center mb-3">
              drop-shadow-2xl
            </p>
            <svg
              className="drop-shadow-2xl h-28 w-28"
              viewBox="0 0 84 84"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22.0992 77L2.19922 42.5L22.0992 8H61.8992L81.7992 42.5L61.8992 77H22.0992Z"
                fill="#fff"
              ></path>
            </svg>
          </div>
        </div>
      </section>
      <section>
        <div className="relative rounded-xl overflow-auto p-8 bg-gray-200">
          <p>animate-spin</p>
          <div className="flex items-center justify-center">
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-indigo-500 hover:bg-indigo-400 transition ease-in-out duration-150 !cursor-not-allowed"
              disabled=""
            >
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Processing...
            </button>
          </div>
        </div>
      </section>
      <section className="mt-2">
        <div className="relative rounded-xl overflow-auto p-8 bg-gray-200">
          <p>animate-ping</p>
          <div className="flex items-center justify-center">
            <span className="relative inline-flex">
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-sky-500 bg-white dark:bg-slate-800 transition ease-in-out duration-150 cursor-not-allowed ring-1 ring-slate-900/10 dark:ring-slate-200/20"
                disabled=""
              >
                Transactions
              </button>
              <span className="flex absolute h-3 w-3 top-0 right-0 -mt-1 -mr-1">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
              </span>
            </span>
          </div>
        </div>
      </section>
      <section className="mt-2">
        <div className="relative rounded-xl overflow-auto p-8 bg-gray-200">
          <p>animate-pulse</p>
          <div className="flex items-center justify-center">
            <div className="bg-white dark:bg-slate-800 p-4 ring-1 ring-slate-900/5 rounded-lg shadow-lg max-w-xs w-full h-28">
              <div className="flex space-x-4 animate-pulse">
                <div className="rounded-full bg-slate-200 dark:bg-slate-700 h-10 w-10"></div>
                <div className="flex-1 space-y-6 py-1">
                  <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded"></div>
                  <div className="space-y-3">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded col-span-2"></div>
                      <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded col-span-1"></div>
                    </div>
                    <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="mt-2">
        <div className="relative rounded-xl overflow-auto p-8 bg-gray-200">
          <p>animate-bounce</p>
          <div className="flex justify-center">
            <div className="animate-bounce bg-white dark:bg-slate-800 p-2 w-10 h-10 ring-1 ring-slate-900/5 dark:ring-slate-200/20 shadow-lg rounded-full flex items-center justify-center">
              <svg
                className="w-6 h-6 text-violet-500"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
              </svg>
            </div>
          </div>
        </div>
      </section>
      <section className='bg-gray-200 mt-2'>
        <p className='p-3 text-center'>marquee effect</p>
        <div className="slider-section slider-new p-2 overflow-auto">
          <div className="container">
            <div className="slider-wrap">
              <div className="slider-outer">
                <div className="js-marquee-wrapper marquee-reverse">
                  <div
                    className="js-marquee"
                    style={{ marginRight: 50, float: "left" }}
                  >
                    <div
                      className="slider scroll-slide"
                      data-slider-slide-gap-sm-up={15}
                      data-slider-slide-gap-sm={10}
                      data-slider-arrows="primary"
                    >
                      <div>
                        <div
                          className="slider-col"
                          style={{
                            backgroundImage:
                              'url("/images/golden-retriever.png")'
                          }}
                        >
                          <div className="ct__slide-top flex">1</div>
                        </div>
                      </div>
                      <div>
                        <div
                          className="slider-col"
                          style={{
                            backgroundImage:
                              'url("/images/golden-retriever.png")'
                          }}
                        >
                          <div className="ct__slide-top flex">2</div>
                        </div>
                      </div>
                      <div>
                        <div
                          className="slider-col"
                          style={{
                            backgroundImage:
                              'url("/images/golden-retriever.png")'
                          }}
                        >
                          <div className="ct__slide-top flex">3</div>
                        </div>
                      </div>
                      <div>
                        <div
                          className="slider-col"
                          style={{
                            backgroundImage:
                              'url("/images/golden-retriever.png")'
                          }}
                        >
                          <div className="ct__slide-top flex">4</div>
                        </div>
                      </div>
                      <div>
                        <div
                          className="slider-col"
                          style={{
                            backgroundImage:
                              'url("/images/golden-retriever.png")'
                          }}
                        >
                          <div className="ct__slide-top flex">5</div>
                        </div>
                      </div>
                      <div>
                        <div
                          className="slider-col"
                          style={{
                            backgroundImage:
                              'url("/images/golden-retriever.png")'
                          }}
                        >
                          <div className="ct__slide-top flex">6</div>
                        </div>
                      </div>
                      <div>
                        <div
                          className="slider-col"
                          style={{
                            backgroundImage:
                              'url("/images/golden-retriever.png")'
                          }}
                        >
                          <div className="ct__slide-top flex">7</div>
                        </div>
                      </div>
                      <div>
                        <div
                          className="slider-col"
                          style={{
                            backgroundImage:
                              'url("/images/golden-retriever.png")'
                          }}
                        >
                          <div className="ct__slide-top flex">8</div>
                        </div>
                      </div>
                      <div>
                        <div
                          className="slider-col"
                          style={{
                            backgroundImage:
                              'url("/images/golden-retriever.png")'
                          }}
                        >
                          <div className="ct__slide-top flex">9</div>
                        </div>
                      </div>
                      <div>
                        <div
                          className="slider-col"
                          style={{
                            backgroundImage:
                              'url("/images/golden-retriever.png")'
                          }}
                        >
                          <div className="ct__slide-top flex">10</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="js-marquee"
                    style={{ marginRight: 50, float: "left" }}
                  >
                    <div
                      className="slider scroll-slide"
                      data-slider-slide-gap-sm-up={15}
                      data-slider-slide-gap-sm={10}
                      data-slider-arrows="primary"
                    >
                      <div>
                        <div
                          className="slider-col"
                          style={{
                            backgroundImage:
                              'url("/images/golden-retriever.png")'
                          }}
                        >
                          <div className="ct__slide-top flex">1-b</div>
                        </div>
                      </div>
                      <div>
                        <div
                          className="slider-col"
                          style={{
                            backgroundImage:
                              'url("/images/golden-retriever.png")'
                          }}
                        >
                          <div className="ct__slide-top flex">2-b</div>
                        </div>
                      </div>
                      <div>
                        <div
                          className="slider-col"
                          style={{
                            backgroundImage:
                              'url("/images/golden-retriever.png")'
                          }}
                        >
                          <div className="ct__slide-top flex">3-b</div>
                        </div>
                      </div>
                      <div>
                        <div
                          className="slider-col"
                          style={{
                            backgroundImage:
                              'url("/images/golden-retriever.png")'
                          }}
                        >
                          <div className="ct__slide-top flex">4-b</div>
                        </div>
                      </div>
                      <div>
                        <div
                          className="slider-col"
                          style={{
                            backgroundImage:
                              'url("/images/golden-retriever.png")'
                          }}
                        >
                          <div className="ct__slide-top flex">5-b</div>
                        </div>
                      </div>
                      <div>
                        <div
                          className="slider-col"
                          style={{
                            backgroundImage:
                              'url("/images/golden-retriever.png")'
                          }}
                        >
                          <div className="ct__slide-top flex">6-b</div>
                        </div>
                      </div>
                      <div>
                        <div
                          className="slider-col"
                          style={{
                            backgroundImage:
                              'url("/images/golden-retriever.png")'
                          }}
                        >
                          <div className="ct__slide-top flex">7-b</div>
                        </div>
                      </div>
                      <div>
                        <div
                          className="slider-col"
                          style={{
                            backgroundImage:
                              'url("/images/golden-retriever.png")'
                          }}
                        >
                          <div className="ct__slide-top flex">8-b</div>
                        </div>
                      </div>
                      <div>
                        <div
                          className="slider-col"
                          style={{
                            backgroundImage:
                              'url("/images/golden-retriever.png")'
                          }}
                        >
                          <div className="ct__slide-top flex">9-b</div>
                        </div>
                      </div>
                      <div>
                        <div
                          className="slider-col"
                          style={{
                            backgroundImage:
                              'url("/images/golden-retriever.png")'
                          }}
                        >
                          <div className="ct__slide-top flex">10-b</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="slider-outer">
                <div className="js-marquee-wrapper">
                  <div
                    className="js-marquee"
                    style={{ marginRight: 50, float: "left" }}
                  >
                    <div
                      className="slider scroll-slide"
                      data-slider-slide-gap-sm-up={15}
                      data-slider-slide-gap-sm={10}
                      data-slider-arrows="primary"
                    >
                      <div>
                        <div
                          className="slider-col"
                          style={{
                            backgroundImage:
                              'url("/images/cats.jpg")'
                          }}
                        >
                          <div className="ct__slide-top flex">1</div>
                        </div>
                      </div>
                      <div>
                        <div
                          className="slider-col"
                          style={{
                            backgroundImage:
                              'url("/images/cats.jpg")'
                          }}
                        >
                          <div className="ct__slide-top flex">2</div>
                        </div>
                      </div>
                      <div>
                        <div
                          className="slider-col"
                          style={{
                            backgroundImage:
                              'url("/images/cats.jpg")'
                          }}
                        >
                          <div className="ct__slide-top flex">3</div>
                        </div>
                      </div>
                      <div>
                        <div
                          className="slider-col"
                          style={{
                            backgroundImage:
                              'url("/images/cats.jpg")'
                          }}
                        >
                          <div className="ct__slide-top flex">4</div>
                        </div>
                      </div>
                      <div>
                        <div
                          className="slider-col"
                          style={{
                            backgroundImage:
                              'url("/images/cats.jpg")'
                          }}
                        >
                          <div className="ct__slide-top flex">5</div>
                        </div>
                      </div>
                      <div>
                        <div
                          className="slider-col"
                          style={{
                            backgroundImage:
                              'url("/images/cats.jpg")'
                          }}
                        >
                          <div className="ct__slide-top flex">6</div>
                        </div>
                      </div>
                      <div>
                        <div
                          className="slider-col"
                          style={{
                            backgroundImage:
                              'url("/images/cats.jpg")'
                          }}
                        >
                          <div className="ct__slide-top flex">7</div>
                        </div>
                      </div>
                      <div>
                        <div
                          className="slider-col"
                          style={{
                            backgroundImage:
                              'url("/images/cats.jpg")'
                          }}
                        >
                          <div className="ct__slide-top flex">8</div>
                        </div>
                      </div>
                      <div>
                        <div
                          className="slider-col"
                          style={{
                            backgroundImage:
                              'url("/images/cats.jpg")'
                          }}
                        >
                          <div className="ct__slide-top flex">9</div>
                        </div>
                      </div>
                      <div>
                        <div
                          className="slider-col"
                          style={{
                            backgroundImage:
                              'url("/images/cats.jpg")'
                          }}
                        >
                          <div className="ct__slide-top flex">10</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="js-marquee"
                    style={{ marginRight: 50, float: "left" }}
                  >
                    <div
                      className="slider scroll-slide"
                      data-slider-slide-gap-sm-up={15}
                      data-slider-slide-gap-sm={10}
                      data-slider-arrows="primary"
                    >
                      <div>
                        <div
                          className="slider-col"
                          style={{
                            backgroundImage:
                              'url("/images/cats.jpg")'
                          }}
                        >
                          <div className="ct__slide-top flex">1-b</div>
                        </div>
                      </div>
                      <div>
                        <div
                          className="slider-col"
                          style={{
                            backgroundImage:
                              'url("/images/cats.jpg")'
                          }}
                        >
                          <div className="ct__slide-top flex">2-b</div>
                        </div>
                      </div>
                      <div>
                        <div
                          className="slider-col"
                          style={{
                            backgroundImage:
                              'url("/images/cats.jpg")'
                          }}
                        >
                          <div className="ct__slide-top flex">3-b</div>
                        </div>
                      </div>
                      <div>
                        <div
                          className="slider-col"
                          style={{
                            backgroundImage:
                              'url("/images/cats.jpg")'
                          }}
                        >
                          <div className="ct__slide-top flex">4-b</div>
                        </div>
                      </div>
                      <div>
                        <div
                          className="slider-col"
                          style={{
                            backgroundImage:
                              'url("/images/cats.jpg")'
                          }}
                        >
                          <div className="ct__slide-top flex">5-b</div>
                        </div>
                      </div>
                      <div>
                        <div
                          className="slider-col"
                          style={{
                            backgroundImage:
                              'url("/images/cats.jpg")'
                          }}
                        >
                          <div className="ct__slide-top flex">6-b</div>
                        </div>
                      </div>
                      <div>
                        <div
                          className="slider-col"
                          style={{
                            backgroundImage:
                              'url("/images/cats.jpg")'
                          }}
                        >
                          <div className="ct__slide-top flex">7-b</div>
                        </div>
                      </div>
                      <div>
                        <div
                          className="slider-col"
                          style={{
                            backgroundImage:
                              'url("/images/cats.jpg")'
                          }}
                        >
                          <div className="ct__slide-top flex">8-b</div>
                        </div>
                      </div>
                      <div>
                        <div
                          className="slider-col"
                          style={{
                            backgroundImage:
                              'url("/images/cats.jpg")'
                          }}
                        >
                          <div className="ct__slide-top flex">9-b</div>
                        </div>
                      </div>
                      <div>
                        <div
                          className="slider-col"
                          style={{
                            backgroundImage:
                              'url("/images/cats.jpg")'
                          }}
                        >
                          <div className="ct__slide-top flex">10-b</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className='mt-2 star-bg flex flex-auto flex-column overflow-hidden relative h-96 bg-slate-900'>
        <p className='text-center text-white w-full absolute'>Dark sky with dynamic star background</p>
        <div className="signup-space">
          <div className="signup-stars" />
          <div className="signup-stars" />
          <div className="signup-stars" />
          <div className="signup-stars" />
          <div className="signup-stars" />
          <div className="signup-stars" />
        </div>
        <div className="d-flex flex-justify-center z-2">
          <img
            src="/images/hero-glow.svg"
            alt="Glowing universe"
            className="js-warp-hide absolute overflow-hidden events-none max-w-none"
            style={{
              top: "50%",
              left: "50%",
              width: "200%",
              transform: "translate(-50%, -50%)"
            }}
          />
        </div>
      </section>
      <section>
        <h3 className="text-lg font-semibold my-4">Table with fixed header using sticky positioning tailwindcss</h3>
        <div className="h-96 overflow-auto border">
          <table className="min-w-full border border-gray-300 text-sm text-left text-gray-700">

          <thead className="bg-gray-200 text-xs uppercase font-semibold">
          <tr>
          <th className="sticky top-0 bg-gray-200 border px-3 py-2">Model</th>
          <th className="sticky top-0 bg-gray-200 border px-3 py-2">3350-300ML 42U</th>
          <th className="sticky top-0 bg-gray-200 border px-3 py-2">3350-300M 42U</th>
          <th className="sticky top-0 bg-gray-200 border px-3 py-2">3350-350M 42U</th>
          <th className="sticky top-0 bg-gray-200 border px-3 py-2">3350-400M 42U</th>
          <th className="sticky top-0 bg-gray-200 border px-3 py-2">3350-500M 42U</th>
          <th className="sticky top-0 bg-gray-200 border px-3 py-2">3350-600M 42U</th>
          </tr>
          </thead>

          <tbody>

          <tr className="bg-gray-100 font-semibold">
          <td colspan="7" className="border px-3 py-2">General</td>
          </tr>

          <tr>
          <td className="border px-3 py-2">Phase</td>
          <td colspan="6" className="border px-3 py-2">3 Phase In 3 Phase Out</td>
          </tr>

          <tr>
          <td className="border px-3 py-2">Cabinet capacity</td>
          <td className="border px-3 py-2">300KW</td>
          <td className="border px-3 py-2">300KW</td>
          <td className="border px-3 py-2">350KW</td>
          <td className="border px-3 py-2">400KW</td>
          <td className="border px-3 py-2">500KW</td>
          <td className="border px-3 py-2">600KW</td>
          </tr>

          <tr>
          <td className="border px-3 py-2">Battery type</td>
          <td colspan="6" className="border px-3 py-2">External battery</td>
          </tr>

          <tr>
          <td className="border px-3 py-2">Power module capacity</td>
          <td colspan="6" className="border px-3 py-2">50KVA / 50KW</td>
          </tr>

          <tr>
          <td className="border px-3 py-2">Max. power modules</td>
          <td className="border px-3 py-2">6</td>
          <td className="border px-3 py-2">6</td>
          <td className="border px-3 py-2">7</td>
          <td className="border px-3 py-2">8</td>
          <td className="border px-3 py-2">10</td>
          <td className="border px-3 py-2">12</td>
          </tr>

          <tr className="bg-gray-100 font-semibold">
          <td colspan="7" className="border px-3 py-2">Input</td>
          </tr>

          <tr>
          <td className="border px-3 py-2">Rated voltage</td>
          <td colspan="6" className="border px-3 py-2">3 x 380/400/415 VAC (3Ph+N)</td>
          </tr>

          <tr>
          <td className="border px-3 py-2">Voltage range</td>
          <td colspan="6" className="border px-3 py-2">-20% ~ +15%</td>
          </tr>

          <tr>
          <td className="border px-3 py-2">Rated frequency</td>
          <td colspan="6" className="border px-3 py-2">50/60 Hz (auto select)</td>
          </tr>

          <tr>
          <td className="border px-3 py-2">Frequency range</td>
          <td colspan="6" className="border px-3 py-2">40Hz ~ 70Hz</td>
          </tr>

          <tr>
          <td className="border px-3 py-2">Power factor</td>
          <td colspan="6" className="border px-3 py-2">100% load ≥0.99, 50% load ≥0.98</td>
          </tr>

          <tr>
          <td className="border px-3 py-2">THDi</td>
          <td colspan="6" className="border px-3 py-2">&lt;4% @ 100% load</td>
          </tr>

          <tr className="bg-gray-100 font-semibold">
          <td colspan="7" className="border px-3 py-2">Output</td>
          </tr>

          <tr>
          <td className="border px-3 py-2">Rated voltage</td>
          <td colspan="6" className="border px-3 py-2">3 x 380/400/415 VAC (3Ph+N)</td>
          </tr>

          <tr>
          <td className="border px-3 py-2">Voltage regulation</td>
          <td colspan="6" className="border px-3 py-2">≤ ±1% (balanced), ≤ ±2% (unbalanced)</td>
          </tr>

          <tr>
          <td className="border px-3 py-2">Rated frequency</td>
          <td colspan="6" className="border px-3 py-2">50/60Hz</td>
          </tr>

          <tr>
          <td className="border px-3 py-2">Frequency range</td>
          <td colspan="6" className="border px-3 py-2">46–54Hz / 56–64Hz</td>
          </tr>

          <tr>
          <td className="border px-3 py-2">Overload capacity</td>
          <td colspan="6" className="border px-3 py-2">110% 1h, 125% 10min, 150% 1min, &gt;150% 200ms</td>
          </tr>

          <tr>
          <td className="border px-3 py-2">THDv</td>
          <td colspan="6" className="border px-3 py-2">≤2% (linear), ≤4% (non-linear)</td>
          </tr>

          <tr>
          <td className="border px-3 py-2">Efficiency</td>
          <td colspan="6" className="border px-3 py-2">95.5%</td>
          </tr>

          <tr className="bg-gray-100 font-semibold">
          <td colspan="7" className="border px-3 py-2">Battery / Charging</td>
          </tr>

          <tr>
          <td className="border px-3 py-2">Rated voltage</td>
          <td colspan="6" className="border px-3 py-2">±192V ~ ±240V (optional)</td>
          </tr>

          <tr>
          <td className="border px-3 py-2">Float voltage</td>
          <td colspan="6" className="border px-3 py-2">2.28V / cell</td>
          </tr>

          <tr>
          <td className="border px-3 py-2">Equalize voltage</td>
          <td colspan="6" className="border px-3 py-2">2.35V / cell</td>
          </tr>

          <tr>
          <td className="border px-3 py-2">Charging current</td>
          <td colspan="6" className="border px-3 py-2">12A (adjustable)</td>
          </tr>

          <tr className="bg-gray-100 font-semibold">
          <td colspan="7" className="border px-3 py-2">Physical</td>
          </tr>

          <tr>
          <td className="border px-3 py-2">Dimensions (mm)</td>
          <td className="border px-3 py-2">850×600×2010</td>
          <td className="border px-3 py-2">1065×600×2010</td>
          <td className="border px-3 py-2">1065×600×2010</td>
          <td className="border px-3 py-2">1065×600×2010</td>
          <td className="border px-3 py-2">1065×1000×2010</td>
          <td className="border px-3 py-2">1065×1000×2010</td>
          </tr>

          <tr>
          <td className="border px-3 py-2">Weight (kg)</td>
          <td className="border px-3 py-2">490</td>
          <td className="border px-3 py-2">545</td>
          <td className="border px-3 py-2">654</td>
          <td className="border px-3 py-2">932</td>
          <td className="border px-3 py-2">1020</td>
          <td className="border px-3 py-2">1130</td>
          </tr>

          <tr className="bg-gray-100 font-semibold">
          <td colspan="7" className="border px-3 py-2">Environment</td>
          </tr>

          <tr>
          <td className="border px-3 py-2">Temperature</td>
          <td colspan="6" className="border px-3 py-2">0–40°C</td>
          </tr>

          <tr>
          <td className="border px-3 py-2">Humidity</td>
          <td colspan="6" className="border px-3 py-2">0–95% RH (non-condensing)</td>
          </tr>

          <tr>
          <td className="border px-3 py-2">IP Rating</td>
          <td colspan="6" className="border px-3 py-2">IP20</td>
          </tr>

          <tr className="bg-gray-100 font-semibold">
          <td colspan="7" className="border px-3 py-2">Standards</td>
          </tr>

          <tr>
          <td className="border px-3 py-2">Safety</td>
          <td colspan="6" className="border px-3 py-2">IEC/EN 62040-1</td>
          </tr>

          <tr>
          <td className="border px-3 py-2">EMC</td>
          <td colspan="6" className="border px-3 py-2">IEC/EN 62040-2 C3</td>
          </tr>

          </tbody>
          </table>
          </div>
      </section>

      <section className="my-16" id="faq">
        <div className="inline-flex items-center gap-2 text-xs font-medium tracking-widest uppercase text-red-700 mb-3 before:inline-block before:w-5 before:h-0.5 before:bg-red-700">FAQ</div>
        <h2 className="font-serif text-2xl md:text-3xl font-semibold leading-tight text-neutral-950 mb-5 tracking-tight" style="font-family: 'Playfair Display', serif;">Frequently asked questions</h2>
        <div className="border border-stone-200 rounded-xl overflow-hidden my-8 flex flex-col shadow-sm">
          <details className="group border-b border-stone-200 last:border-b-0 bg-white" open="">
            <summary className="flex justify-between items-center p-5 md:px-6 text-base font-medium text-neutral-950 cursor-pointer hover:bg-stone-50 transition-colors list-none [&amp;::-webkit-details-marker]:hidden">
                Do I need a device?
                <span className="shrink-0 w-6 h-6 rounded-full border border-stone-300 flex items-center justify-center text-sm text-neutral-500 transition-all duration-200 group-open:rotate-45 group-open:bg-neutral-950 group-open:border-neutral-950 group-open:text-white">+</span>
            </summary>
            <div className="p-5 md:px-6 pt-0 text-sm font-light text-neutral-700 leading-relaxed">
                No. A single appropriately-sized UPS can protect your entire theater rack.
            </div>
          </details>
          <details className="group border-b border-stone-200 last:border-b-0 bg-white">
            <summary className="flex justify-between items-center p-5 md:px-6 text-base font-medium text-neutral-950 cursor-pointer hover:bg-stone-50 transition-colors list-none [&amp;::-webkit-details-marker]:hidden">
                Will a sound quality?
                <span className="shrink-0 w-6 h-6 rounded-full border border-stone-300 flex items-center justify-center text-sm text-neutral-500 transition-all duration-200 group-open:rotate-45 group-open:bg-neutral-950 group-open:border-neutral-950 group-open:text-white">+</span>
            </summary>
            <div className="p-5 md:px-6 pt-0 text-sm font-light text-neutral-700 leading-relaxed">
                Yes — significantly, in most cases.from unprotected mains.
            </div>
          </details>
        </div>
      </section>
    </div>
  );
};

export default CssEffect;

