import React from 'react'
import SideBar from './SideBar'
import { CardLinks, Movies } from '../../../Contents/Links'
import { Pie, Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import Movie from '../../../Components/Movie'
import { MovieData } from '../../../Data/MovieData'

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

function Dashboard() {
  // Pie chart data
  const pieData = {
    labels: CardLinks.map((link) => link.name),
    datasets: [
      {
        data: CardLinks.map((link) => link.total),
        backgroundColor: CardLinks.map(() => `#${Math.floor(Math.random() * 16777215).toString(16)}`),
        hoverBackgroundColor: CardLinks.map(() => `#${Math.floor(Math.random() * 16777215).toString(16)}`)
      }
    ]
  }

  // Line chart data
  const lineData = {
    labels: CardLinks.map((link) => link.name),
    datasets: [
      {
        label: 'Total',
        data: CardLinks.map((link) => link.total),
        fill: false,
        backgroundColor: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
        borderColor: `#${Math.floor(Math.random() * 16777215).toString(16)}`
      }
    ]
  }

  const pieOptions = {
    plugins: {
      title: {
        display: true,
        text: 'Card Properties'
      }
    }
  }

  const lineOptions = {
    plugins: {
      title: {
        display: true,
        text: 'Card Properties'
      }
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }

  // Calculate the total movies from the Movies data
// Calculate the total movies from the MovieData
const totalMovies = MovieData.map(( i) => (
  i++
));
  return (
    <SideBar>
      <div className="container grid grid-cols-1 gap-5 justify-between md:grid-cols-2 lg:grid-cols-3 xs:grid-cols-1 xs:truncate">
        {CardLinks?.map((link, i) => (
          <div className="container bg-main hover:bg-subMain h-[150px] w-full px-4 rounded-lg transitions border border-border flex flex-col items-center justify-center cursor-pointer mt-5">
            <div className="flex flex-row items-center gap-2 " key={i}>
              <div className="text-4xl"><link.iconName /></div>
              <h1 className='text-lg font-bold flex  '>{link.name}</h1>
            </div>
            <h1 className='text-emerald-300 text-lg'>{totalMovies[i]}</h1>
          </div>
        ))}
      </div>
      <div className="container grid grid-cols-1 gap-5 justify-between md:grid-cols-2 lg:grid-cols-2 xs:grid-cols-1 xs:truncate mt-5">
        <div className="container bg-main hover:bg-subMain h-[300px] w-full px-4 rounded-lg transitions border border-border flex flex-col items-center justify-center cursor-pointer">
          <Pie data={pieData} options={pieOptions} />
        </div>
        <div className="container bg-main hover:bg-subMain h-[300px] w-full px-4 rounded-lg transitions border border-border flex flex-col items-center justify-center cursor-pointer">
          <Line data={lineData} options={lineOptions} />
        </div>
      </div>
    </SideBar>
  )
}

export default Dashboard