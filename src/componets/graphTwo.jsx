import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const ApexChart = () => {
  const [chartData, setChartData] = useState({
    series: [
      {
        name: 'New Student',
        data: [0, 70, 68, 51, 100, 200, 100, 120, 80, 60, 120,80],
      },
      {
        name: 'Student Left',
        data: [0, 32, 45, 32, 74, 122, 41, 89, 50, 30, 20, 40],
      },
    ],
    options: {
      chart: {
        height: 300,
        type: 'area',
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth',
      },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      },
      yaxis: {
        labels: {
          formatter: function (val) {
            // return '₹ ' + val; // Prefix the value with Rupee symbol
            return + val; 
          },
        },  
      },
   
    },
  });

  return (
    <>
      <div id="chart">
        <ReactApexChart options={chartData.options} series={chartData.series} type="area" height={300} />
      </div>
      <div id="html-dist"></div>
    </>
  );
};

export default ApexChart;



// https://apexcharts.com/react-chart-demos/bar-charts/