import { Card, CardBody, CardSubtitle, CardTitle, Row, Col } from "reactstrap";
import Chart from "react-apexcharts";
import { hoy } from "./tools"
import { obtenerVentas, ventas } from "../querys"
import { useEffect, useState } from "react";

const SalesChart = () => {
  const options = {
    chart: {
      toolbar: {
        show: false,
      },
      stacked: false,
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 4,
      colors: ["transparent"],
    },
    legend: {
      show: true,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "30%",
        borderRadius: 2,
      },
    },
    colors: ["#0d6efd", "#009efb", "#6771dc"],
    xaxis: {
      categories: [
        "Lun",
        "Mar",
        "Mie",
        "Jue",
        "Vie",
        "Sab",

      ],
    },
    responsive: [
      {
        breakpoint: 1024,
        options: {
          plotOptions: {
            bar: {
              columnWidth: "60%",
              borderRadius: 7,
            },
          },
        },
      },
    ],
  };
  const series = [
    {
      name: "Dyf",
      data: [20, 40, 50, 30, 40, 50],
    },
    {
      name: "Nathan",
      data: [10, 20, 40, 60, 20, 40],
    },
    {
      name: "Danfel",
      data: [70, 25, 20, 80, 60, 40],
    },
  ];

  const [listVentas, setListVentas] = useState(ventas)


  return (
    <Chart options={options} series={series} type="area" height="279" />
  );
};

export default SalesChart;
