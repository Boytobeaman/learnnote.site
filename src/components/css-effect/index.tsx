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
    </div>
  );
};

export default CssEffect;

