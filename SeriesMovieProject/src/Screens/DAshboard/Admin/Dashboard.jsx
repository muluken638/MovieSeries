import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SideBar from './SideBar';
import { CardLinks } from '../../../Contents/Links';
import { Pie, Line } from 'react-chartjs-2';
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
} from 'chart.js';

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function Dashboard() {
  const [totals, setTotals] = useState({ totalFilms: 0, totalSeries: 0, totalSeasons: 0 });

  useEffect(() => {
    axios.get('http://localhost:3000/totals')
      .then(response => {
        setTotals(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the totals!', error);
      });
  }, []);

  // Pie chart data
  const pieData = {
    labels: ['Films', 'Series', 'Seasons'],
    datasets: [
      {
        data: [totals.totalFilms, totals.totalSeries, totals.totalSeasons],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
      }
    ]
  };

  // Line chart data
  const lineData = {
    labels: ['Films', 'Series', 'Seasons'],
    datasets: [
      {
        label: 'Total',
        data: [totals.totalFilms, totals.totalSeries, totals.totalSeasons],
        fill: false,
        backgroundColor: '#36A2EB',
        borderColor: '#36A2EB'
      }
    ]
  };

  const pieOptions = {
    plugins: {
      title: {
        display: true,
        text: 'Card Properties'
      }
    }
  };

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
  };

  return (
    <SideBar>
      <div className="container grid grid-cols-1 gap-5 justify-between md:grid-cols-2 lg:grid-cols-3 xs:grid-cols-1 xs:truncate">
        {CardLinks?.map((link, i) => (
          <div className="container bg-main hover:bg-subMain h-[150px] w-full px-4 rounded-lg transitions border border-border flex flex-col items-center justify-center cursor-pointer mt-5" key={i}>
            <div className="flex flex-row items-center gap-2">
              <div className="text-4xl"><link.iconName /></div>
              <h1 className='text-lg font-bold flex'>{link.name}</h1>
            </div>
            <h1 className='text-emerald-300 text-lg'>{totals[`total${link.name.replace('Total ', '')}`]}</h1>
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
  );
}

export default Dashboard;
