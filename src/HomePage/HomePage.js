import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import axios from "axios";
import * as d3 from "d3";
import { pie, arc } from "d3-shape";
import { scaleOrdinal } from "d3-scale";

function HomePage() {
  var d3Data = {};
  const [chartjsdata, dataSource] = useState({});
  var Labels = [];
  var Data = [];

  const color_vals = [
    "#0074D9",
    "#FF4136",
    "#2ECC40",
    "#FF851B",
    "#7FDBFF",
    "#B10DC9",
    "#FFDC00",
    "#39CCCC",
    "#39CCCC",
    "#01FF70",
    "#85144b",
    "#F012BE",
    "#3D9970",
    "#111111",
    "#AAAAAA",
  ];

  const getBudget = () => {
    axios.get("http://localhost:3000/budget").then(function (res) {
      for (var i = 0; i < res.data.myBudget.length; i++) {
        Data[i] = res.data.myBudget[i].budget;
        Labels[i] = res.data.myBudget[i].title;
        d3Data[res.data.myBudget[i].title] = res.data.myBudget[i].budget;
      }
      dataSource({
        datasets: [
          {
            data: Data,
            backgroundColor: color_vals,
          },
        ],
        labels: Labels,
      });
      created3(d3Data);
    });
  };

  function created3(datad3) {
    var width = 600;
    var height = 500;
    var margin = 100;
    var radius = Math.min(width, height) / 2 - margin;

    var svg = d3
      .select("#d3chart")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", "translate(" + width / 2 + "," + height / 3 + ")");

    var color = scaleOrdinal().domain(Data).range(color_vals);

    var Pie = pie()
      .sort(null)
      .value(function (d) {
        return d.value;
      });
    var data_ready = Pie(d3.entries(datad3));

    var aro = arc()
      .innerRadius(radius * 0.3)
      .outerRadius(radius * 0.8);

    var outerArc = arc()
      .innerRadius(radius * 0.9)
      .outerRadius(radius * 0.9);

    svg
      .selectAll("allSlices")
      .data(data_ready)
      .enter()
      .append("path")
      .attr("d", aro)
      .attr("fill", function (d) {
        return color(d.data.key);
      })
      .attr("stroke", "white")
      .style("stroke-width", "2px")
      .style("opacity", 0.7);

    svg
      .selectAll("allPolylines")
      .data(data_ready)
      .enter()
      .append("polyline")
      .attr("stroke", "black")
      .style("fill", "none")
      .attr("stroke-width", 1)
      .attr("points", function (d) {
        var posA = aro.centroid(d);
        var posB = outerArc.centroid(d);
        var posC = outerArc.centroid(d);
        var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
        posC[0] = radius * 0.95 * (midangle < Math.PI ? 1 : -1);
        return [posA, posB, posC];
      });

    svg
      .selectAll("allLabels")
      .data(data_ready)
      .enter()
      .append("text")
      .text(function (d) {
        console.log(d.data.key);
        return d.data.key;
      })
      .attr("transform", function (d) {
        var pos = outerArc.centroid(d);
        var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
        pos[0] = radius * 0.99 * (midangle < Math.PI ? 1 : -1);
        return "translate(" + pos + ")";
      })
      .style("text-anchor", function (d) {
        var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
        return midangle < Math.PI ? "start" : "end";
      });
  }

  useEffect(() => {
    getBudget();
  }, []);

  return (
    <main className="center" id="main">
      <div className="page-area">
        <article>
          <h1>Stay on track</h1>
          <p>
            Do you know where you are spending your money? If you really stop to
            track it down, you would get surprised! Proper budget management
            depends on real data... and this app will help you with that!
          </p>
        </article>

        <article>
          <h1>Alerts</h1>
          <p>
            What if your clothing budget ended? You will get an alert. The goal
            is to never go over the budget.
          </p>
        </article>

        <article>
          <h1>Results</h1>
          <p>
            People who stick to a financial plan, budgeting every expense, get
            out of debt faster! Also, they to live happier lives... since they
            expend without guilt or fear... because they know it is all good and
            accounted for.
          </p>
        </article>

        <article>
          <h1>Free</h1>
          <p>This app is free!!! And you are the only one holding your data!</p>
        </article>

        <article>
          <h1>Stay on track</h1>
          <p>
            Do you know where you are spending your money? If you really stop to
            track it down, you would get surprised! Proper budget management
            depends on real data... and this app will help you with that!
          </p>
        </article>

        <article>
          <h1>Alerts</h1>
          <p>
            What if your clothing budget ended? You will get an alert. The goal
            is to never go over the budget.
          </p>
        </article>

        <article>
          <h1>Results</h1>
          <p>
            People who stick to a financial plan, budgeting every expense, get
            out of debt faster! Also, they to live happier lives... since they
            expend without guilt or fear... because they know it is all good and
            accounted for.
          </p>
        </article>

        <hr />
        <br />

        <h1>ChartJs</h1>
        <div
          style={{
            height: "400px",
            width: "600px",
            display: "inline-block",
            justifyContent: "center",
          }}
        >
          <Pie data={chartjsdata} />
        </div>

        <h1>D3Js</h1>
        <div>
          <div id="d3chart" />
        </div>
      </div>
    </main>
  );
}

export default HomePage;
