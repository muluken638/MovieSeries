// import {Listbox} from 'react'
import React, { Fragment, useState } from 'react'
import { CatagoriesData } from '../Data/CatagoriesData';
import { FaCheck } from 'react-icons/fa';

const YearData = [
  { title: 'Sort By Year' },
  { title: '1700 - 1800' },
  { title: '1800 - 1900' },
  { title: '1900 - 2000' },
  { title: '2000 - 2100' },
  { title: '2100 - 2200' },
  { title: '2200 - 2300' },
  { title: '2300 - 2400' },
]
const RatesData = [
  { title: 'Sort By Rates' },
  { title: '1 Star' },
  { title: '2 Star' },
  { title: '3 Star' },
  { title: '4 Star' },
  { title: '5 Star' },

]
const TimesData = [
  { title: 'Sort By Hours' },
  { title: '1 - 5 Hours' },
  { title: '5 - 10 Hours' },
  { title: '10 - 15  Hours' },
  { title: '15 - 20 Hours' },

]
function Filters() {

  const [Catagory, setCatagory] = useState({ title: "Catagory" });
  const [Year, setYear] = useState(YearData[0]);
  const [Times, setTimes] = useState(TimesData[0]);
  const [Rates, setRates] = useState(RatesData[0]);


  const Filters = [
    {
      value: Catagory,
      onchange: setCatagory,
      items: CatagoriesData
    }, {
      value: Year,
      onchange: setYear,
      items: YearData
    }, {
      value: Times,
      onchange: setTimes,
      items: TimesData
    }, {
      value: Rates,
      onchange: setRates,
      items: RatesData
    },
  ]

  return (
    <div className="my-6 bg-main border text-dry border-dry-800 grid md:grid-cols-2 lg:gap-12 gap-2 rounded p-6">
      {/* {
        Filters.map((item, index) => (
          <Listbox key={index} value={item.value} onchange={item.onchange}>
            <div className="relative">
              <Listbox.Button className='relative border borer-gray-800 bg-main w-full text-white rounded-lg cursor-default py-4 pl-6 pr-10 text-left text-xs '>
                <span className="block truncate">{item.value.title}</span>
                <span className="absolute inset-y-0 flex items-center pointer-events-none pr-2">
                  <SelectorIcon className="h-5 w-5 " aria-hidden="true" />
                </span>
              </Listbox.Button>
              <Transitions as={Fragment} leave="transitions ease-in duration-100 " leaveFrom="opacity-100" leaveTo="opacity-0">
                <Listbox.Option className="absolute z-10 mt-1 w-full bg-white border border-y-gray-800 text-gray rounded-md shadow-lg max-h-60 py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm  ">
                  {
                    item.items.map((iterm, i) => (
                      <Listbox.Option key={item} className={({ active }) => `relative cursor-default select-none py-2 pl-10 pr-4${active ? "bg-main text-white" : "text-main"
                        }`} value={iterm}>
                        {
                          ({ selected }) => (
                            <>
                              <span className={`block truncated ${selected ? 'font-semibold' : 'font-normal'
                                }`}>
                                {iterm.title}
                              </span>
                              {
                                selected ? (
                                  <span className='absolute inset-y-0 left-0 flex items-center pl-3'>
                                    <FaCheck className='h-5 w-5' aria-hidden='true' />
                                  </span>
                                ) : null
                              }
                            </>
                          )
                        }
                      </Listbox.Option>
                    ))
                  }
                </Listbox.Option>
              </Transitions>
            </div>
          </Listbox>
        ))
      } */}
    </div>
  )
}

export default Filters