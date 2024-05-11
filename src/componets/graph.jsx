import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const ApexChart = () => {
  const [chartData, setChartData] = useState({
    series: [
      {
        name: 'Received' ,
        data: [350000, 350000, 350000, 350000, 350000, 350000, 350000, 350000, 350000, 350000, 350000, 350000],
      },
      {
        name: 'Due',
        data: [250000, 250000, 250000, 250000, 250000, 250000, 250000, 250000, 250000, 250000, 250000, 250000],
      },
    ],
    options: {
      chart: {
        type: 'bar',
        height: 300,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '75%',
          endingShape: 'rounded',
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent'],
      },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      },
      yaxis: {
        labels: {
          formatter: function (val) {
            // return '₹ ' + (val) ; // Divide the value by 1000 to display in thousands
            return  + (val) ;
          },
        },
      },
      fill: {
        opacity: 1,
        colors: ['#EE6C4E', '#658DC9'], // Orange for "Received", Blue for "Due"
        type: 'gradient',
        gradient: {
          shade: 'light',
          type: 'vertical',
          shadeIntensity: 0.2,
          gradientToColors: ['#EE6C4E20', '#658DC920'], // Orange and Blue with 20% transparency
          inverseColors: false,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100],
        },
      },
      tooltip: {
        y: {
          formatter: function (val) {
            // return '₹ ' + (val /1000) + ' thousands';
            return  + (val /1000) + ' thousands';
          },
        },
      },
    },
  });

  return (
    <>
      <div id="chart">
        <ReactApexChart options={chartData.options} series={chartData.series} type="bar" height={300} />
      </div>
      <div id="html-dist"></div>
    </>
  );
};

export default ApexChart;




// npm install react react-dom react-apexcharts apexcharts


// https://apexcharts.com/react-chart-demos/column-charts/basic/