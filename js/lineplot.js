var margin = { top: 10, right: 10, bottom: 10, left: 10 },
    width = 250 - margin.left - margin.right,
    height = 250 - margin.left - margin.right;
var svg_1 = d3.select("#linechart1")
    .append("svg")
    .attr("width", 250)
    .attr("height", 300)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");
var svg_2 = d3.select("#linechart2")
    .append("svg")
    .attr("width", 250)
    .attr("height", 300)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");
var svg_3 = d3.select("#linechart3")
    .append("svg")
    .attr("width", 250)
    .attr("height", 300)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");
var svg_4 = d3.select("#linechart4")
    .append("svg")
    .attr("width", 250)
    .attr("height", 300)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

var formatdate= d3.timeFormat("%b-%Y")
var table_us = d3.select('#number_of_us')
var table_cn = d3.select('#number_of_cn')
var table_tot = d3.select('#number_of_total')
d3.json("data/trade_war_analysis.json", function (error, data) {
    var ticker = 'F US Equity'
    var start_date = '2017-12-31T00:00:00.000Z'
    var End_Date = '2019-03-31T00:00:00.000Z'
    var startData = data.filter(function (d) {
        if (d.Tickers == ticker & d.End_Date == start_date) {
            return d
        }
    });
    var endData = data.filter(function (d) {
        if (d.Tickers == ticker & d.End_Date == End_Date) {
            return d
        }
    });
    var number_1 = startData.map(function (d) {
        return (Math.round(d.Number_of_suppliers * d.US_Degree))
    });
    var number_2 = startData.map(function (d) {
        return ((d.US_Degree * 100).toFixed(2) + '%')
    })
    var number_3 = endData.map(function (d) {
        return (Math.round(d.Number_of_suppliers * d.US_Degree))
    })
    var number_4 = endData.map(function (d) {
        return ((d.US_Degree * 100).toFixed(2) + "%")
    })
    var number_5 = (((number_3/number_1)-1)*100).toFixed(2)+"%"
    var number_6 = startData.map(function (d) {
        return (Math.round(d.Number_of_suppliers * d.CN_Degree))
    })
    var number_7 = startData.map(function (d) {
        return ((d.CN_Degree * 100).toFixed(2) + '%')
    })
    var number_8 = endData.map(function (d) {
        return (Math.round(d.Number_of_suppliers * d.CN_Degree))
    })
    var number_9 = endData.map(function (d) {
        return ((d.CN_Degree * 100).toFixed(2) + "%")
    })
    var number_10 = (((number_8/number_6)-1)*100).toFixed(2)+"%"
    var number_11 = startData.map(function (d) {
        return (Math.round(d.Number_of_suppliers))
    });
    var number_12 = '100%'
    var number_13 = endData.map(function (d) {
        return (Math.round(d.Number_of_suppliers))
    });
    var number_14 = '100%'
    var number_15 = (((number_13/number_11)-1)*100).toFixed(2)+"%"

    var n1 = table_us.append("td").text(number_1)
    var n2 = table_us.append("td").text(number_2)
    var n3 = table_us.append("td").text(number_3)
    var n4 = table_us.append("td").text(number_4)
    var n5 = table_us.append("td").text(number_5)
    var n6 = table_cn.append("td").text(number_6)
    var n7 = table_cn.append("td").text(number_7)
    var n8 = table_cn.append("td").text(number_8)
    var n9 = table_cn.append("td").text(number_9)
    var n10 = table_cn.append("td").text(number_10)
    var n11 = table_tot.append("td").text(number_11)
    var n12 = table_tot.append("td").text(number_12)
    var n13 = table_tot.append("td").text(number_13)
    var n14 = table_tot.append("td").text(number_14)
    var n15 = table_tot.append("td").text(number_15)
   
    function update_table(newvalue,sd,ed) {
        if (sd==1){
            start_date='2017-12-31T00:00:00.000Z'
        } else if (sd==2){
            start_date='2018-03-31T00:00:00.000Z'
        } else if (sd==3){
            start_date='2018-06-30T00:00:00.000Z'
        }else if (sd==4){
            start_date='2018-09-30T00:00:00.000Z'
        }else if (sd==5){
            start_date='2018-12-31T00:00:00.000Z'
        }else {
            start_date=sd
        }

        if (ed==2){
            End_Date='2018-03-31T00:00:00.000Z'
        } else if (ed == 3){
            End_Date='2018-06-30T00:00:00.000Z'
        } else if (ed == 4){
            End_Date='2018-09-30T00:00:00.000Z'
        }else if (ed == 5){
            End_Date='2018-12-31T00:00:00.000Z'
        }else if (ed == 6){
            End_Date='2019-03-31T00:00:00.000Z'
        }else {
            End_Date==ed
        }
        d3.select('#startq').text(formatdate(d3.isoParse(start_date)))
        d3.select('#endq').text(formatdate(d3.isoParse(End_Date)))
        // check input
        startData = data.filter(function (d) {
            if (d.Tickers == newvalue & (d.End_Date - d3.isoParse(start_date)==0)) {
                return d
            }
        });
        // console.log(startData)
        endData = data.filter(function (d) {
            if (d.Tickers == newvalue & (d.End_Date - d3.isoParse(End_Date)==0)) {
                return d
            }
        });
    
        number_1 = startData.map(function (d) {
            return (Math.round(d.Number_of_suppliers * d.US_Degree))
        });
        number_2 = startData.map(function (d) {
            return ((d.US_Degree * 100).toFixed(2) + '%')
        })
        number_3 = endData.map(function (d) {
            return (Math.round(d.Number_of_suppliers * d.US_Degree))
        })
        number_4 = endData.map(function (d) {
            return ((d.US_Degree * 100).toFixed(2) + "%")
        })
        number_5 = (((number_3/number_1)-1)*100).toFixed(2)+"%"
        number_6 = startData.map(function (d) {
            return (Math.round(d.Number_of_suppliers * d.CN_Degree))
        })
        number_7 = startData.map(function (d) {
            return ((d.CN_Degree * 100).toFixed(2) + '%')
        })
        number_8 = endData.map(function (d) {
            return (Math.round(d.Number_of_suppliers * d.CN_Degree))
        })
        number_9 = endData.map(function (d) {
            return ((d.CN_Degree * 100).toFixed(2) + "%")
        })
        number_10 = (((number_8/number_6)-1)*100).toFixed(2)+"%"
        number_11 = startData.map(function (d) {
            return (Math.round(d.Number_of_suppliers))
        });
        number_12 = '100%'
        number_13 = endData.map(function (d) {
            return (Math.round(d.Number_of_suppliers))
        });
        number_14 = '100%'
        number_15 = (((number_13/number_11)-1)*100).toFixed(2)+"%"
        n1.transition().duration(500).text(number_1)
        n2.transition().duration(500).text(number_2)
        n3.transition().duration(500).text(number_3)
        n4.transition().duration(500).text(number_4)
        n5.transition().duration(500).text(number_5)
        n6.transition().duration(500).text(number_6)
        n7.transition().duration(500).text(number_7)
        n8.transition().duration(500).text(number_8)
        n9.transition().duration(500).text(number_9)
        n10.transition().duration(500).text(number_10)
        n11.transition().duration(500).text(number_11)
        n12.transition().duration(500).text(number_12)
        n13.transition().duration(500).text(number_13)
        n14.transition().duration(500).text(number_14)
        n15.transition().duration(500).text(number_15)
    }
    var colname_1 = 'Last_Price'
    var colname_2 = 'Revenue'
    var colname_3 = 'Net_Income'
    var colname_4 = 'Inventories'

    var lineData = data.filter(function (d) {
        if (d.Tickers == ticker & d.End_Date != '2017-03-31T00:00:00.000Z') {
            return d
        }
    });

    lineData.forEach(function (d) { d.End_Date = d3.isoParse(d.End_Date) })
    //var myColor = d3.scaleOrdinal()
    //  .domain(["Last_Price", "Revenue", "Gross_Profit"])
    //    .range(d3.schemeSet2);
    var line_x = d3.scaleTime()
        .domain([new Date('2017-12-10T02:00:00Z'), new Date('2019-05-10T02:00:00Z')])
        .range([0, 200]);

    svg_1.append("g")
        .attr("transform", "translate(25,230)")
        .call(d3.axisBottom(line_x).ticks(6).tickFormat(d3.timeFormat("%b-%Y")))
        .selectAll("text")
        .attr("y", 0)
        .attr("x", 9)
        .attr("dy", ".35em")
        .attr("transform", "rotate(75)")
        .style("text-anchor", "start");

    svg_2.append("g")
        .attr("transform", "translate(25,230)")
        .call(d3.axisBottom(line_x).ticks(6).tickFormat(d3.timeFormat("%b-%Y")))
        .selectAll("text")
        .attr("y", 0)
        .attr("x", 9)
        .attr("dy", ".35em")
        .attr("transform", "rotate(75)")
        .style("text-anchor", "start");

    svg_3.append("g")
        .attr("transform", "translate(25,230)")
        .call(d3.axisBottom(line_x).ticks(6).tickFormat(d3.timeFormat("%b-%Y")))
        .selectAll("text")
        .attr("y", 0)
        .attr("x", 9)
        .attr("dy", ".35em")
        .attr("transform", "rotate(75)")
        .style("text-anchor", "start");

    svg_4.append("g")
        .attr("transform", "translate(25,230)")
        .call(d3.axisBottom(line_x).ticks(6).tickFormat(d3.timeFormat("%b-%Y")))
        .selectAll("text")
        .attr("y", 0)
        .attr("x", 9)
        .attr("dy", ".35em")
        .attr("transform", "rotate(75)")
        .style("text-anchor", "start");

    var line_y_1 = d3.scaleLinear()
        .domain([d3.min(lineData,
            function (d) { return d[colname_1]; }), d3.max(lineData, function (d) { return d[colname_1]; })])
        .range([230, 0]);
    var line_y_2 = d3.scaleLinear()
        .domain([d3.min(lineData,
            function (d) { return d[colname_2]; }), d3.max(lineData, function (d) { return d[colname_2]; })])
        .range([230, 0]);
    var line_y_3 = d3.scaleLinear()
        .domain([d3.min(lineData,
            function (d) { return d[colname_3]; }), d3.max(lineData, function (d) { return d[colname_3]; })])
        .range([230, 0]);
    var line_y_4 = d3.scaleLinear()
        .domain([d3.min(lineData,
            function (d) { return d[colname_4]; }), d3.max(lineData, function (d) { return d[colname_4]; })])
        .range([230, 0]);


    var yaxis1 = svg_1.append("g")
        .attr("transform", "translate(25,0)")
        .call(d3.axisLeft(line_y_1));
    var yaxis2 = svg_2.append("g")
        .attr("transform", "translate(25,0)")
        .call(d3.axisLeft(line_y_2));
    var yaxis3 = svg_3.append("g")
        .attr("transform", "translate(25,0)")
        .call(d3.axisLeft(line_y_3));
    var yaxis4 = svg_4.append("g")
        .attr("transform", "translate(25,0)")
        .call(d3.axisLeft(line_y_4));

    var valueline_1 = d3.line()
        .x(function (d) {
            return line_x(d['End_Date']);
        })
        .y(function (d) {
            return line_y_1(d[colname_1]);
        });
    var valueline_2 = d3.line()
        .x(function (d) {
            return line_x(d['End_Date']);
        })
        .y(function (d) {
            return line_y_2(d[colname_2]);
        });
    var valueline_3 = d3.line()
        .x(function (d) {
            return line_x(d['End_Date']);
        })
        .y(function (d) {
            return line_y_3(d[colname_3]);
        });
    var valueline_4 = d3.line()
        .x(function (d) {
            return line_x(d['End_Date']);
        })
        .y(function (d) {
            return line_y_4(d[colname_4]);
        });
    var line1 = svg_1
        .append('g')
        .append("path")
        .attr("class", "line1")
        .attr("d", valueline_1(lineData))
        .attr("transform", "translate(25,0)")
        .attr('fill', 'none')
        .attr('stroke-width', 3)
        .attr('stroke', 'black');
    var line2 = svg_2
        .append('g')
        .append("path")
        .attr("class", "line2")
        .attr("d", valueline_2(lineData))
        .attr("transform", "translate(25,0)")
        .attr('fill', 'none')
        .attr('stroke-width', 3)
        .attr('stroke', 'black');
    var line3 = svg_3
        .append('g')
        .append("path")
        .attr("class", "line3")
        .attr("d", valueline_3(lineData))
        .attr("transform", "translate(25,0)")
        .attr('fill', 'none')
        .attr('stroke-width', 3)
        .attr('stroke', 'black');
    var line4 = svg_4
        .append('g')
        .append("path")
        .attr("class", "line4")
        .attr("d", valueline_4(lineData))
        .attr("transform", "translate(25,0)")
        .attr('fill', 'none')
        .attr('stroke-width', 3)
        .attr('stroke', 'black');

    function update_t(newvalue) {
        // check input
        lineData = data.filter(function (d) {
            if (d.Tickers == newvalue & d.End_Date != '2017-03-31T00:00:00.000Z') {
                return d
            }
        });
        if (lineData.length == 0) {
            $("#linechart1").hide();
            $("#linechart2").hide();
            $("#linechart3").hide();
            $("#linechart4").hide();
        } else {
            $("#linechart1").show();
            $("#linechart2").show();
            $("#linechart3").show();
            $("#linechart4").show();

            lineData.forEach(function (d) { d.End_Date = d3.isoParse(d.End_Date) })
            update_1(colname_1)
            update_2(colname_2)
            update_3(colname_3)
            update_4(colname_4)
        }
    }
    function update_1(newvalue) {
        // check input
        line_y_1.domain([d3.min(lineData,
            function (d) { return d[newvalue]; }),
        d3.max(lineData, function (d) { return d[newvalue]; })]);
        yaxis1.transition().duration(1000).call(d3.axisLeft(line_y_1));
        valueline_1 = d3.line()
            .x(function (d) {
                return line_x(d['End_Date']);
            })
            .y(function (d) {
                return line_y_1(d[newvalue]);
            });
        line1
            .transition()
            .duration(1000)
            .attr("d", valueline_1(lineData))
    }
    function update_2(newvalue) {
        line_y_2 = d3.scaleLinear()
            .domain([d3.min(lineData,
                function (d) { return d[colname_2]; }), d3.max(lineData, function (d) { return d[colname_2]; })])
            .range([230, 0]);
        yaxis2.transition().duration(1000).call(d3.axisLeft(line_y_2));
        valueline_2 = d3.line()
            .x(function (d) {
                return line_x(d['End_Date']);
            })
            .y(function (d) {
                return line_y_2(d[colname_2]);
            });
        line2
            .transition()
            .duration(1000)
            .attr("d", valueline_2(lineData))
    }
    function update_3(newvalue) {
        line_y_3 = d3.scaleLinear()
            .domain([d3.min(lineData,
                function (d) { return d[colname_3]; }), d3.max(lineData, function (d) { return d[colname_3]; })])
            .range([230, 0]);
        yaxis3.transition().duration(1000).call(d3.axisLeft(line_y_3));
        valueline_3 = d3.line()
            .x(function (d) {
                return line_x(d['End_Date']);
            })
            .y(function (d) {
                return line_y_3(d[colname_3]);
            });
        line3
            .transition()
            .duration(1000)
            .attr("d", valueline_3(lineData))
    }
    function update_4(newvalue) {
        line_y_4 = d3.scaleLinear()
            .domain([d3.min(lineData,
                function (d) { return d[colname_4]; }), d3.max(lineData, function (d) { return d[colname_4]; })])
            .range([230, 0]);
        yaxis4.transition().duration(1000).call(d3.axisLeft(line_y_4));
        valueline_4 = d3.line()
            .x(function (d) {
                return line_x(d['End_Date']);
            })
            .y(function (d) {
                return line_y_4(d[colname_4]);
            });
        line4
            .transition()
            .duration(1000)
            .attr("d", valueline_4(lineData))
    }

    
    
    $('#timeline').on('change', function(ev){ 
        var a = $('#timeline').val()
        update_table(ticker,a[0],a[2])});
    
    $("#company").on("change", function () {
        // recover the option that has been chosen
        ticker = $(this).html();
        // run the updateChart function with this selected option
        update_t(ticker);
        update_table(ticker,start_date,End_Date);
    })
    d3.select("#linechart1_sel").on("change", function (d) {
        // recover the option that has been chosen
        colname_1 = d3.select(this).property("value")
        // run the updateChart function with this selected option
        update_1(colname_1)
    })
    d3.select("#linechart2_sel").on("change", function (d) {
        // recover the option that has been chosen
        colname_2 = d3.select(this).property("value")
        // run the updateChart function with this selected option
        update_2(colname_2)
    })
    d3.select("#linechart3_sel").on("change", function (d) {
        // recover the option that has been chosen
        colname_3 = d3.select(this).property("value")
        // run the updateChart function with this selected option
        update_3(colname_3)
    })
    d3.select("#linechart4_sel").on("change", function (d) {
        // recover the option that has been chosen
        colname_4 = d3.select(this).property("value")
        // run the updateChart function with this selected option
        update_4(colname_4)
    })


})
