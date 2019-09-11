var margin = { top: 10, right: 40, bottom: 10, left: 10 },
    width = 500 - margin.left - margin.right,
    height = 500 - margin.left - margin.right;

var svg = d3.select("#fp-degree")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");


var eqs = d3.select(".equation").append("div")

d3.json("data/trade_war_analysis.json", function (error, data) {
    //Chart Title
    var ref_date = document.getElementById('quarter').value;
    var metric = document.getElementById('metric').value;
    var lag = "lag0";
    var formatdate= d3.timeFormat("%b-%Y")
    var colname = metric
    d3.select("#fp-degree").select("p").text(colname + " vs " + formatdate(d3.isoParse(ref_date)) + " Opposite Country Degree");
    //filter the data
    var newData = data.filter(function (d) { return (d.End_Date == ref_date); });
    var formatPercent = d3.format(".0%");
    // Add Y axis
    var y = d3.scaleLinear()
        .domain([d3.min(newData,
            function (d) { return d[colname]; }), d3.max(newData, function (d) { return d[colname]; })])
        .range([height, 0]);
    var yaxis = svg.append("g")
        .attr("transform", "translate(30,0)")
        .call(d3.axisLeft(y).tickFormat(formatPercent));

    // Add X axis
    var ori = y(0);
    var x = d3.scaleLinear()
        .domain([0, 1])
        .range([0, width]);
    var xaxis = svg.append("g")
        .attr("transform", "translate(30," + ori + ")")
        .call(d3.axisBottom(x).tickFormat(formatPercent));
    // Add X axis Label
    var xlabel = svg.append("text")
        .attr("transform",
            "translate(" + (width - 20) + " ," +
            (ori + 33) + ")")
        .style("text-anchor", "middle")
        .style("fill", "#000066")
        .style("font-size", "12")
        .text("Opp. Country Degree");
    // Add Y Axix Label
    var ylabel = svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - 13)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .style("fill", "#000066")
        .style("font-size", "12")
        .style("text-anchor", "middle")
        .text(colname);

    // Add a scale for bubble size
    var z = d3.scaleLinear()
        .domain([d3.min(newData, function (d) { return d.Market_Cap; }), d3.max(newData, function (d) { return d.Market_Cap; })])
        .range([3, 20]);
    // Add a scale for bubble color
    var myColor = d3.scaleOrdinal()
        .domain(["US", "CN"])
        .range(["#0003c3", "#e72907"]);

    // -1- Create a tooltip div that is hidden by default:
    var tooltip = d3.select("#fp-degree")
        .append("div")
        .style("opacity", 0)
        .attr("class", "tooltip")
        .style("background-color", "black")
        .style("border-radius", "5px")
        .style("padding", "10px")
        .style("color", "white")

    // -2- Create 3 functions to show / update (when mouse move but stay on same circle) / hide the tooltip
    var showTooltip = function (d) {
        tooltip
            .transition()
            .duration(200)
        tooltip
            .style("opacity", 1)
            .html("Ticker: " + d.Tickers + "<br>Country: " + d.Central_Country + "<br> Opposite Country Degree: " + d.Opposite_Country_Degree +
                "<br>" + colname + ": " + d.Profit_Margin_YoY)
            .style("left", (d3.mouse(this)[0] + 50) + "px")
            .style("top", (d3.mouse(this)[1] + 1325) + "px")
    }
    var moveTooltip = function (d) {
        tooltip
            .style("left", (d3.mouse(this)[0] + 50) + "px")
            .style("top", (d3.mouse(this)[1] + 1325) + "px")
    }
    var hideTooltip = function (d) {
        tooltip
            .transition()
            .duration(200)
            .style("opacity", 0)
    }
    // Add Regression line
    var lg = calcLinear(newData, "Opposite_Country_Degree", "Profit_Margin_YoY", 0, 1);

    var lineplot = svg.append("line")
        .attr("class", "line")
        .attr("transform", "translate(30,0)")
        .attr("x1", x(lg.ptA.x))
        .attr("y1", y(lg.ptA.y))
        .attr("x2", x(lg.ptB.x))
        .attr("y2", y(lg.ptB.y));
    // Add dots
    var scatplot = svg.append('g')
        .selectAll("dot")
        .data(newData)
        .enter()
        .append("circle")
        .attr("class", "bubbles")
        .attr("cx", function (d) { return x(d.Opposite_Country_Degree); })
        .attr("cy", function (d) { return y(d.Profit_Margin_YoY); })
        .attr("r", function (d) { return z(d.Market_Cap); })
        .style("fill", function (d) { return myColor(d.Central_Country); })
        .attr("transform", "translate(30,0)")
        .style("opacity", "0.7")
        // -3- Trigger the functions
        .on("mouseover", showTooltip)
        .on("mousemove", moveTooltip)
        .on("mouseleave", hideTooltip)


    // Add Regressions line


    function calcLinear(data, x, y, minX, maxX) {
        /////////
        //SLOPE//
        /////////

        // Let n = the number of data points
        var n = data.length;

        // Get just the points
        var pts = [];
        data.forEach(function (d, i) {
            var obj = {};
            obj.x = d[x];
            obj.y = d[y];
            obj.mult = obj.x * obj.y;
            pts.push(obj);
        });

        // Let a equal n times the summation of all x-values multiplied by their corresponding y-values
        // Let b equal the sum of all x-values times the sum of all y-values
        // Let c equal n times the sum of all squared x-values
        // Let d equal the squared sum of all x-values
        var sum = 0;
        var xSum = 0;
        var ySum = 0;
        var sumSq = 0;
        pts.forEach(function (pt) {
            sum = sum + pt.mult;
            xSum = xSum + pt.x;
            ySum = ySum + pt.y;
            sumSq = sumSq + (pt.x * pt.x);
        });
        var a = sum * n;
        var b = xSum * ySum;
        var c = sumSq * n;
        var d = xSum * xSum;

        // Plug the values that you calculated for a, b, c, and d into the following equation to calculate the slope
        // slope = m = (a - b) / (c - d)
        var m = (a - b) / (c - d);

        /////////////
        //INTERCEPT//
        /////////////

        // Let e equal the sum of all y-values
        var e = ySum;

        // Let f equal the slope times the sum of all x-values
        var f = m * xSum;

        // Plug the values you have calculated for e and f into the following equation for the y-intercept
        // y-intercept = b = (e - f) / n
        var b = (e - f) / n;

        // Print the equation below the chart
        eqs.text("y = " + m + "x + " + b);

        // return an object of two points
        // each point is an object with an x and y coordinate
        return {
            ptA: {
                x: minX,
                y: m * minX + b
            },
            ptB: {
                x: maxX,
                y: m * maxX + b
            }
        }
    }
    function update(selectedGroup) {
        // check input
        if (selectedGroup == ref_date) {
            var New_date = ref_date;
        } else if (selectedGroup == lag) {
            var new_lag = lag
        } else if (selectedGroup == metric) {
            var new_metric = metric
        }
        
        if (lag != "lag0") {
            colname = metric + "_" + lag;
        } else {
            colname = metric;
        }
        // new title
        d3.select("#fp-degree").select("p").text(colname + " vs " + formatdate(d3.isoParse(ref_date)) + " Opposite Country Degree");
        // Create new data with the selection?

        var dataFilter = data.filter(function (d) { return d.End_Date == ref_date })
        lg = calcLinear(dataFilter, "Opposite_Country_Degree", colname, 0, 1);

        // new xy axis
        y = d3.scaleLinear()
            .domain([d3.min(dataFilter, function (d) { return d[colname]; }), d3.max(dataFilter, function (d) { return d[colname]; })])
            .range([height, 0]);
        ori = y(0);
        yaxis.transition()
            .duration(1000)
            .attr("transform", "translate(30,0)")
            .call(d3.axisLeft(y).tickFormat(formatPercent));
        xaxis.attr("transform", "translate(30," + ori + ")")
            .call(d3.axisBottom(x).tickFormat(formatPercent));
        //new xy label
        xlabel.attr("transform",
            "translate(" + (width - 20) + " ," +
            (ori + 33) + ")")
        ylabel.text(colname)

        // Give these new data to regressions line
        lineplot
            .datum(dataFilter)
            .transition()
            .duration(1000)
            .attr("x1", x(lg.ptA.x))
            .attr("y1", y(lg.ptA.y))
            .attr("x2", x(lg.ptB.x))
            .attr("y2", y(lg.ptB.y));
        // Give these new data to scatter plot    
        scatplot
            .data(dataFilter)
            .transition()
            .duration(1000)
            .attr("cx", function (d) { return x(d.Opposite_Country_Degree); })
            .attr("cy", function (d) { return y(d[colname]); })
    }

    d3.select("#quarter").on("change", function (d) {
        // recover the option that has been chosen
        ref_date = d3.select(this).property("value")
        // run the updateChart function with this selected option
        update(ref_date)
    })
    d3.select("#lag").on("change", function (d) {
        // recover the option that has been chosen
        lag = d3.select(this).property("value")
        // run the updateChart function with this selected option
        update(lag)
    })
    d3.select("#metric").on("change", function (d) {
        // recover the option that has been chosen
        metric = d3.select(this).property("value")
        // run the updateChart function with this selected option
        update(metric)
    })
})




