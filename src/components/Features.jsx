import React from "react";

const Features = () => {
  return (
    <div className="w-[1440px] h-[900px] relative bg-[#cbdafa]  overflow-hidden">
      <div data-svg-wrapper className="left-0 top-0 absolute">
        <svg
          width="1440"
          height="900"
          viewBox="0 0 1440 900"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="1440" height="900" fill="white" />
        </svg>
      </div>
      <div className="w-[817px] h-[486px] left-[304px] top-[414px] absolute bg-black/0  overflow-hidden">
        <div className="p-4 left-[546px] top-[55px] absolute bg-white/60 rounded-[20px] border border-[#d9d9d9] flex-col justify-start items-start gap-4 inline-flex">
          <div data-svg-wrapper>
            <svg
              width="208"
              height="247"
              viewBox="0 0 208 247"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
            >
              <rect width="208" height="247" fill="#E3E3E3" />
              <rect
                width="208"
                height="247"
                fill="url(#pattern0_184_5)"
                fill-opacity="0.2"
              />
              <defs>
                <pattern
                  id="pattern0_184_5"
                  patternContentUnits="objectBoundingBox"
                  width="1"
                  height="1"
                >
                  <use
                    xlink:href="#image0_184_5"
                    transform="matrix(0.00625 0 0 0.00526316 0 0.0789474)"
                  />
                </pattern>
                <image
                  id="image0_184_5"
                  width="160"
                  height="160"
                  xlink:href="data:image/png;base64,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"
                />
              </defs>
            </svg>
          </div>
          <div className="h-20 flex-col justify-start items-start gap-2 flex">
            <div className="self-stretch justify-start items-start inline-flex">
              <div className="grow shrink basis-0 text-[#1e1e1e] text-base font-normal font-['Inter'] leading-snug">
                Cambria Hotel Downtown
              </div>
            </div>
            <div className="justify-start items-start inline-flex">
              <div className="text-[#1e1e1e] text-base font-normal font-['Inter'] leading-snug">
                Phoenix, AZ
              </div>
            </div>
            <div className="self-stretch justify-start items-start inline-flex">
              <div className="text-[#757575] text-sm font-normal font-['Inter'] leading-tight">
                $$
              </div>
            </div>
          </div>
        </div>
        <div className="p-4 left-[289px] top-[55px] absolute bg-white/60 rounded-[20px] border border-[#d9d9d9] flex-col justify-start items-start gap-4 inline-flex">
          <div data-svg-wrapper>
            <svg
              width="208"
              height="247"
              viewBox="0 0 208 247"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
            >
              <rect width="208" height="247" fill="#E3E3E3" />
              <rect
                width="208"
                height="247"
                fill="url(#pattern0_184_58)"
                fill-opacity="0.2"
              />
              <defs>
                <pattern
                  id="pattern0_184_58"
                  patternContentUnits="objectBoundingBox"
                  width="1"
                  height="1"
                >
                  <use
                    xlink:href="#image0_184_58"
                    transform="matrix(0.00625 0 0 0.00526316 0 0.0789474)"
                  />
                </pattern>
                <image
                  id="image0_184_58"
                  width="160"
                  height="160"
                  xlink:href="data:image/png;base64,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"
                />
              </defs>
            </svg>
          </div>
          <div className="h-20 flex-col justify-start items-start gap-2 flex">
            <div className="self-stretch justify-start items-start inline-flex">
              <div className="grow shrink basis-0 text-[#1e1e1e] text-base font-normal font-['Inter'] leading-snug">
                Holiday Inn
              </div>
            </div>
            <div className="justify-start items-start inline-flex">
              <div className="text-[#1e1e1e] text-base font-normal font-['Inter'] leading-snug">
                Seattle, WA
              </div>
            </div>
            <div className="self-stretch justify-start items-start inline-flex">
              <div className="text-[#757575] text-sm font-normal font-['Inter'] leading-tight">
                $$
              </div>
            </div>
          </div>
        </div>
        <div className="p-4 left-[32px] top-[55px] absolute bg-white/60 rounded-[20px] border border-[#d9d9d9] flex-col justify-start items-start gap-4 inline-flex">
          <div data-svg-wrapper>
            <svg
              width="208"
              height="247"
              viewBox="0 0 208 247"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
            >
              <rect width="208" height="247" fill="#E3E3E3" />
              <rect
                width="208"
                height="247"
                fill="url(#pattern0_184_13)"
                fill-opacity="0.2"
              />
              <defs>
                <pattern
                  id="pattern0_184_13"
                  patternContentUnits="objectBoundingBox"
                  width="1"
                  height="1"
                >
                  <use
                    xlink:href="#image0_184_13"
                    transform="matrix(0.00625 0 0 0.00526316 0 0.0789474)"
                  />
                </pattern>
                <image
                  id="image0_184_13"
                  width="160"
                  height="160"
                  xlink:href="data:image/png;base64,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"
                />
              </defs>
            </svg>
          </div>
          <div className="h-20 flex-col justify-start items-start gap-2 flex">
            <div className="self-stretch justify-start items-start inline-flex">
              <div className="grow shrink basis-0 text-[#1e1e1e] text-base font-normal font-['Inter'] leading-snug">
                Koloa Landing Resort
              </div>
            </div>
            <div className="justify-start items-start inline-flex">
              <div className="text-[#1e1e1e] text-base font-normal font-['Inter'] leading-snug">
                Kauaii, HI
              </div>
            </div>
            <div className="self-stretch justify-start items-start inline-flex">
              <div className="text-[#757575] text-sm font-normal font-['Inter'] leading-tight">
                $$$
              </div>
            </div>
          </div>
        </div>
        <div className="left-[237px] top-[15px] absolute text-black text-2xl font-medium font-['Montserrat'] leading-[33.60px]">
          Popular Hotels This Week
        </div>
      </div>

      <div className="w-[266px] h-[716px] left-[18px] top-[128px] absolute bg-white/60 rounded-[20px]  overflow-hidden">
        <div className="p-6 left-[13px] top-[72px] absolute bg-[#fdf6ea] rounded-lg border border-[#d9d9d9] flex-col justify-start items-start gap-6 inline-flex">
          <div data-svg-wrapper>
            <svg
              width="116"
              height="20"
              viewBox="0 0 116 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 1.66667L12.575 6.88334L18.3333 7.72501L14.1667 11.7833L15.15 17.5167L10 14.8083L4.85 17.5167L5.83333 11.7833L1.66666 7.72501L7.425 6.88334L10 1.66667Z"
                stroke="#2C2C2C"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M34 1.66667L36.575 6.88334L42.3333 7.72501L38.1667 11.7833L39.15 17.5167L34 14.8083L28.85 17.5167L29.8333 11.7833L25.6667 7.72501L31.425 6.88334L34 1.66667Z"
                stroke="#2C2C2C"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M58 1.66667L60.575 6.88334L66.3333 7.72501L62.1667 11.7833L63.15 17.5167L58 14.8083L52.85 17.5167L53.8333 11.7833L49.6667 7.72501L55.425 6.88334L58 1.66667Z"
                stroke="#2C2C2C"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M82 1.66667L84.575 6.88334L90.3333 7.72501L86.1667 11.7833L87.15 17.5167L82 14.8083L76.85 17.5167L77.8333 11.7833L73.6667 7.72501L79.425 6.88334L82 1.66667Z"
                stroke="#2C2C2C"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M106 1.66667L108.575 6.88334L114.333 7.72501L110.167 11.7833L111.15 17.5167L106 14.8083L100.85 17.5167L101.833 11.7833L97.6667 7.72501L103.425 6.88334L106 1.66667Z"
                stroke="#2C2C2C"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          <div className="self-stretch h-[143px] flex-col justify-start items-start gap-1 flex">
            <div className="justify-start items-start inline-flex">
              <div className="text-[#1e1e1e] text-2xl font-semibold font-['Inter'] leading-[28.80px]">
                Delta Airlines
              </div>
            </div>
            <div className="self-stretch justify-start items-start inline-flex">
              <div className="grow shrink basis-0 text-[#1e1e1e] text-base font-normal font-['Inter'] leading-snug">
                “Delta employees were so wonderful and helpful, our flight was
                delayed and we were greatly compensated!”
              </div>
            </div>
          </div>
          <div className="self-stretch justify-start items-start gap-3 inline-flex">
            <div className="w-10 h-10 relative rounded-full  overflow-hidden">
              <img
                className="w-10 h-10 left-0 top-0 absolute"
                src="https://placehold.co/40x40"
              />
            </div>
            <div className="grow shrink basis-0 flex-col justify-start items-start gap-0.5 inline-flex">
              <div className="self-stretch text-[#757575] text-base font-semibold font-['Inter'] leading-snug">
                Jane Doe
              </div>
              <div className="self-stretch text-[#b3b3b3] text-base font-normal font-['Inter'] leading-snug">
                January 2025
              </div>
            </div>
          </div>
        </div>
        <div className="w-[129px] left-[68px] top-[19px] absolute text-center text-black text-2xl font-bold font-['Montserrat'] leading-normal">
          Top Flight
          <br />
          Reviews
        </div>
        <div className="p-6 left-[13px] top-[393px] absolute bg-[#fdf6ea] rounded-lg border border-[#d9d9d9] flex-col justify-start items-start gap-6 inline-flex">
          <div data-svg-wrapper>
            <svg
              width="116"
              height="20"
              viewBox="0 0 116 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 1.66669L12.575 6.88335L18.3333 7.72502L14.1667 11.7834L15.15 17.5167L10 14.8084L4.85 17.5167L5.83333 11.7834L1.66666 7.72502L7.425 6.88335L10 1.66669Z"
                stroke="#2C2C2C"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M34 1.66669L36.575 6.88335L42.3333 7.72502L38.1667 11.7834L39.15 17.5167L34 14.8084L28.85 17.5167L29.8333 11.7834L25.6667 7.72502L31.425 6.88335L34 1.66669Z"
                stroke="#2C2C2C"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M58 1.66669L60.575 6.88335L66.3333 7.72502L62.1667 11.7834L63.15 17.5167L58 14.8084L52.85 17.5167L53.8333 11.7834L49.6667 7.72502L55.425 6.88335L58 1.66669Z"
                stroke="#2C2C2C"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M82 1.66669L84.575 6.88335L90.3333 7.72502L86.1667 11.7834L87.15 17.5167L82 14.8084L76.85 17.5167L77.8333 11.7834L73.6667 7.72502L79.425 6.88335L82 1.66669Z"
                stroke="#2C2C2C"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M106 1.66669L108.575 6.88335L114.333 7.72502L110.167 11.7834L111.15 17.5167L106 14.8084L100.85 17.5167L101.833 11.7834L97.6667 7.72502L103.425 6.88335L106 1.66669Z"
                stroke="#2C2C2C"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          <div className="self-stretch h-[99px] flex-col justify-start items-start gap-1 flex">
            <div className="justify-start items-start inline-flex">
              <div className="text-[#1e1e1e] text-2xl font-semibold font-['Inter'] leading-[28.80px]">
                Spirit Airlines
              </div>
            </div>
            <div className="self-stretch justify-start items-start inline-flex">
              <div className="grow shrink basis-0 text-[#1e1e1e] text-base font-normal font-['Inter'] leading-snug">
                “Flight attendants were extremely helpful with any questions.”
              </div>
            </div>
          </div>
          <div className="self-stretch justify-start items-start gap-3 inline-flex">
            <div className="w-10 h-10 relative rounded-full  overflow-hidden">
              <img
                className="w-10 h-10 left-0 top-0 absolute"
                src="https://placehold.co/40x40"
              />
            </div>
            <div className="grow shrink basis-0 flex-col justify-start items-start gap-0.5 inline-flex">
              <div className="self-stretch text-[#757575] text-base font-semibold font-['Inter'] leading-snug">
                Jane Joe
              </div>
              <div className="self-stretch text-[#b3b3b3] text-base font-normal font-['Inter'] leading-snug">
                December 2024
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-[792px] px-[82px] py-[81px] left-[304px] top-[151px] absolute bg-white/0 justify-start items-start gap-[117px] inline-flex overflow-hidden">
        <div className="text-black text-2xl font-bold font-['Montserrat'] leading-normal">
          Save More
        </div>
        <div className="text-black text-2xl font-bold font-['Montserrat'] leading-normal">
          Easy Search
        </div>
        <div className="text-black text-2xl font-bold font-['Montserrat'] leading-normal">
          Itinerary
        </div>
        <div className="text-center text-black text-base font-medium font-['Montserrat'] leading-none">
          Discover ways to <br />
          save big on one <br />
          website.
        </div>
        <div className="text-center text-black text-base font-medium font-['Montserrat'] leading-none">
          Simple search
          <br />
          customizations
          <br />
          and price ranges.
        </div>
        <div className="text-center text-black text-base font-medium font-['Montserrat'] leading-none">
          Save your trip
          <br />
          ideas for later.
        </div>
      </div>
    </div>
  );
};

export default Features;
