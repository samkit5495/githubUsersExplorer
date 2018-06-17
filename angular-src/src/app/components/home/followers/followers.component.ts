import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../services/user.service";
import * as d3 from "d3";

@Component({
  selector: 'app-followers',
  templateUrl: './followers.component.html',
  styleUrls: ['./followers.component.css']
})
export class FollowersComponent implements OnInit {

  barChartData = [];

  constructor(private userService: UserService) {

  }

  ngOnInit() {
    this.userService.getTopUsersByFollowers()
      .subscribe(res => {
        this.barChartData = res['data'];
        var svg = d3.select("svg"),
          margin = {top: 20, right: 20, bottom: 30, left: 50},
          width = +svg.attr("width") - margin.left - margin.right,
          height = +svg.attr("height") - margin.top - margin.bottom;

        var tooltip = d3.select("body").append("div").attr("class", "toolTip");

        var x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
          y = d3.scaleLinear().rangeRound([height, 0]);

        var colours = d3.scaleOrdinal()
          .range(["#6F257F", "#CA0D59"]);

        var g = svg.append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        x.domain(this.barChartData.map(function (d) {
          return d.login;
        }));
        y.domain([0, d3.max(this.barChartData, function (d) {
          return d.followers;
        })]);

        g.append("g")
          .attr("class", "axis axis--x")
          .attr("transform", "translate(0," + height + ")")
          .call(d3.axisBottom(x));

        g.append("g")
          .attr("class", "axis axis--y")
          .call(d3.axisLeft(y).ticks(5).tickFormat(function (d) {
            return d;
          }).tickSizeInner([-width]))
          .append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", 6)
          .attr("dy", "0.71em")
          .attr("text-anchor", "end")
          .attr("fill", "#5D6971")
          .text('Followers');

        g.selectAll(".bar")
          .data(this.barChartData)
          .enter().append("rect")
          .attr("x", function (d) {
            return x(d.login);
          })
          .attr("y", function (d) {
            return y(d.followers);
          })
          .attr("width", x.bandwidth())
          .attr("height", function (d) {
            return height - y(d.followers);
          })
          .attr("fill", function (d) {
            return colours(d.login);
          })
          .on("mouseover", function (d) {
            tooltip
              .style("left", d3.event.pageX - 50 + "px")
              .style("top", d3.event.pageY - 70 + "px")
              .style("display", "inline-block")
              .html((d.login) + "<br>" + (d.followers));
          })
          .on("mouseout", function (d) {
            tooltip.style("display", "none");
          });
      });
  }
}
