var snapshot = "5";
$("#timeline").slider({
    ticks: [0, 1, 2, 3, 4, 5, 6, 7],
    ticks_positions: [0, 100 / 12, 25, 500 / 12, 700 / 12, 75, 1100 / 12, 100],
    min: 1,
    max: 6,
    value: 6,
    tooltip: "hide",
    handle: "round"
});
var marketCap = $("#marketCap").slider({id: "mc", scale: 'logarithmic', min: 0, max: 1000, range: true, tooltip: "hide", value: [0, 1000]});

$(document).ready(function () {
    $("#quarter").change(function () {
        var index = $(this)[0].selectedIndex;
        $("#lag").html(lagOptions[index]);
    });
    var lagOptions = [
        "<option value='lag0' selected>No Lag</option><option value='lag1'>1 quarter</option><option value='lag2'>2 quarter</option><option value='lag3'>3 quarter</option><option value='lag4'>4 quarter</option>",
        "<option value='lag0' selected>No Lag</option><option value='lag1'>1 quarter</option><option value='lag2'>2 quarter</option><option value='lag3'>3 quarter</option><option value='lag4'>4 quarter</option>",
        "<option value='lag0' selected>No Lag</option><option value='lag1'>1 quarter</option><option value='lag2'>2 quarter</option><option value='lag3'>3 quarter</option>",
        "<option value='lag0' selected>No Lag</option><option value='lag1'>1 quarter</option><option value='lag2'>2 quarter</option>",
        "<option value='lag0' selected>No Lag</option><option value='lag1'>1 quarter</option>",
        "<option value='lag0' selected>No Lag</option>",
    ];
});

$(document).ready(function () {
    $("#lag").change(function () {
        var val = $(this).val();
        if (val == "lag0") {
            $("#metric").html(metricOptions[1])
        } else {
            $("#metric").html(metricOptions[0])
        }
    });
    var metricOptions = [
        "<option value='Profit_Margin_YoY' selected>Profit Margin</option>\
    <option value='GPM_YoY'>Gross Profit Margin</option>\
    <option value='COGS_Percentage_YoY'>% of COGS</option>\
    <option value='Inventory_turnover_YoY'>Inventory Turnover</option>\
    <option value='STD_Percentage_YoY'>Short Term Debt/Total Liabilities</option>\
    <option value='LTD_Percentage_YoY'>Long Term Debt/Total Liabilities</option>",
        "<option value='Profit_Margin_YoY' selected>Profit Margin</option>\
    <option value='GPM_YoY'>Gross Profit Margin</option>\
    <option value='COGS_Percentage_YoY'>% of COGS</option>\
    <option value='Inventory_turnover_YoY'>Inventory Turnover</option>\
    <option value='Number_of_supplier_countries'>Cross Border Network</option>\
    <option value='STD_Percentage_YoY'>Short Term Debt/Total Liabilities</option>\
    <option value='LTD_Percentage_YoY'>Long Term Debt/Total Liabilities</option>\
    <option value='Number_of_suppliers'>Number of Suppliers</option>"
    ];
});

$(document).ready(function () {
    $("#metric").change(function () {
        var val = $(this).val();
        if ((val == "Number_of_suppliers") || (val == "Number_of_supplier_countries")) {
            $("#lag").html(lagOptions[0])
        } else {
            $("#lag").html(lagOptions[1])
        }
    });
    var lagOptions = [
        "<option value='lag0' selected>No Lag</option>",
        "<option value='lag0' selected>No Lag</option>\
    <option value='lag1' selected>1 quarter</option>\
    <option value='lag2' selected>2 quarter</option>\
    <option value='lag3' selected>3 quarter</option>\
    <option value='lag4' selected>4 quarter</option>"
    ];
});

$(document).ready(function () {
    $("#country").change(function () {
        var val = $(this).val();
        if (val == "CN") {
            $("#company").html(companyOptions[0])
        } else {
            $("#company").html(companyOptions[1])
        }
    });
    var companyOptions = [
        "<option value='000572 CH Equity'>Haima Automobile Group Co Ltd</option>\
    <option value='000800 CH Equity'>FAW CAR Co Ltd</option>\
    <option value='000913 CH Equity'>Zhejiang Qianjiang Motorcycle Co Ltd</option>\
    <option value='000927 CH Equity'>Tianjin Faw Xiali Automobile Co Ltd</option>\
    <option value='000980 CH Equity'>ZOTYE AUTOMOBILE CO LTD-A</option>\
    <option value='1122 HK Equity'>QINGLING MOTORS CO LTD-H</option>\
    <option value='1211 HK Equity'>BYD Co Ltd</option>\
    <option value='175 HK Equity'>Geely Automobile Holdings Ltd</option>\
    <option value='1958 HK Equity'>BAIC Motor Corp Ltd</option>\
    <option value='200054 CH Equity'>Chongqing Jianshe Vehicle System Co Ltd</option>\
    <option value='200550 CH Equity'>Jiangling Motors Corp Ltd</option>\
    <option value='200625 CH Equity'>Chongqing Changan Automobile Co Ltd</option>\
    <option value='2238 HK Equity'>Guangzhou Automobile Group Co Ltd</option>\
    <option value='2333 HK Equity'>Great Wall Motor Co Ltd</option>\
    <option value='489 HK Equity'>Dongfeng Motor Group Co Ltd</option>\
    <option value='600006 CH Equity'>DongFeng Automobile Co Ltd</option>\
    <option value='600099 CH Equity'>Linhai Co Ltd</option>\
    <option value='600104 CH Equity'>SAIC Motor Corp Ltd</option>\
    <option value='600166 CH Equity'>BEIQI FOTON MOTOR CO LTD-A</option>\
    <option value='600303 CH Equity'>Liaoning SG Automotive Group Co Ltd</option>\
    <option value='600418 CH Equity'>Anhui Jianghuai Automobile Group Corp Ltd</option>\
    <option value='600609 CH Equity'>Shenyang Jinbei Automotive Co Ltd</option>\
    <option value='600733 CH Equity'>BAIC BluePark New Energy Technology Co Ltd</option>\
    <option value='600877 CH Equity'>China Jialing Industrial Co Ltd</option>\
    <option value='601127 CH Equity'>Chongqing Sokon Industry Group Co Ltd</option>\
    <option value='601777 CH Equity'>Lifan Industry Group Co Ltd</option>\
    <option value='601965 CH Equity'>China Automotive Engineering Research Institute Co Ltd</option>\
    <option value='603611 CH Equity'>NOBLELIFT INTELLIGENT EQU -A</option>\
    <option value='603766 CH Equity'>Loncin Motor Co Ltd</option>\
    <option value='NIO US Equity'>NIO Inc</option>",
        "<option value='1188 HK Equity'>HYBRID KINETIC GROUP LTD</option>\
    <option value='F US Equity'>Ford Motor Co</option>\
    <option value='GM US Equity'>General Motors Co</option>\
    <option value='HOG US Equity'>Harley-Davidson Inc</option>\
    <option value='THO US Equity'>THOR INDUSTRIES INC</option>\
    <option value='TSLA US Equity'>Tesla Inc</option>\
    <option value='WGO US Equity'>WINNEBAGO INDUSTRIES</option>\
    <option value='ZAAP US Equity'>ZAP</option>"
    ];
});

$(function () {
    $('.ms').multipleSelect({}).multipleSelect('checkAll');
});

// Line Chart of Risk of Opportunity
$("#roLineChart").hide();
$("#linecharts").hide();
$("#searchInfoBox").hide();
var svg_ro = d3.select("#roLineChart")
        .append("svg")
        .attr("width", $("#searchInfoBox").parent().width())
        .attr("height", 300)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");
var line_x_ro = d3.scaleTime()
    .domain([new Date('2018-06-10T00:00:00.000Z'), new Date('2019-04-10T02:00:00Z')])
    .range([0, $("#searchInfoBox").parent().width() - 50]);
var line_x_ro_linear = d3.scaleLinear()
    .domain([0, 3])
    .range([0, $("#searchInfoBox").parent().width() - 75]);
svg_ro.append("g")
        .attr("transform", "translate(25,230)")
        .call(d3.axisBottom(line_x_ro).ticks(4).tickFormat(d3.timeFormat("%b-%Y")))
        .selectAll("text")
        .attr("y", 0)
        .attr("x", 9)
        .attr("dy", ".35em")
        .attr("transform", "rotate(75)")
        .style("text-anchor", "start");
var line_y_ro = d3.scaleLinear()
        .domain([0, 1])
        .range([230, 0]);
var yaxis_ro = svg_ro.append("g")
        .attr("transform", "translate(25,0)")
        .call(d3.axisLeft(line_y_ro));

function toPrettyString(number) {
    if (number == "--") return number;
    if (number > 1e14)
        return (number / 1e12).toFixed(0) + "T";
    else if (number > 1e12)
        return (number / 1e12).toFixed(1) + "T";
    else if (number > 1e11)
        return (number / 1e9).toFixed(0) + "B";
    else if (number > 1e9)
        return (number / 1e9).toFixed(1) + "B";
    else if (number > 1e8)
        return (number / 1e6).toFixed(0) + "M";
    else if (number > 1e6)
        return (number / 1e6).toFixed(1) + "M";
    else if (number > 1e5)
        return (number / 1e3).toFixed(0) + "K";
    else if (number > 1e3)
        return (number / 1e3).toFixed(1) + "K";
}

var number_style = function(d) {
    if (d < 0) return "--";
    else return d.toFixed(3);
}

var tooltip = Tooltip("vis-tooltip", 230);
var w = $("#net").width();
var h = 450;
var highlight_link_color = "blue";
var default_link_color = "#888";
var central_node_color = tinycolor("#dc3545");
var supplier1_node_color = tinycolor("#007bff");
var yellow_color = tinycolor("#ffff00")
var link_color = tinycolor(default_link_color);
var non_hover_alpha = 0.3;
var non_focus_alpha = 0.15;
var min_zoom = 0.1;
var max_zoom = 2;
var zoom = d3.zoom().scaleExtent([min_zoom, max_zoom]);
var transform = d3.zoomIdentity;
var force_distance = 200;
var link_simulation = d3.forceSimulation()
    .force("link", d3.forceLink().id(function (d) { return d.ticker; }))
    .force("charge", d3.forceManyBody().strength(-150))
    .force("collide", d3.forceCollide().radius(function (d) { return d.size[snapshot] + 2; }).iterations(2))
    .force("center", d3.forceCenter(0, 0));

var canvas = d3.select("#vis");
var context = canvas.node().getContext("2d");
context.canvas.width = w;
context.canvas.height = h;
zoom(canvas);

var score_type = "borrow";

d3.json("data/splc_six_quarters.json", function (error, graph) {
    console.log(error);

    var focus_node = null, highlight_node = null;
    var marketCapmax, marketCapmin;

    var nodesMap = {}, edgeList = {};
    graph.nodes.forEach(function (d) {
        nodesMap[d.ticker] = d;
        edgeList[d.ticker] = {};
    });
    graph.links.forEach(function (d) {
        edgeList[d.source][d.target] = d;
        edgeList[d.target][d.source] = d;
    });


    /* ==================================================================== */
    /* Helper Functions */
    // whether node a and b are connected
    function isConnected(a, b) {
        return (b.ticker in edgeList[a.ticker]) || a.index == b.index;
    }

    function hasVisibleConnection(d) {
        for (var n in edgeList[d.ticker]) {
            var node = nodesMap[n];
            if (node.visible && edgeList[d.ticker][n].visible) {
                return true;
            }
        }
        return false;
    }
    
    // move (x, y) to center, here the coordinates are relative to the canvas
    function moveToCenter(x, y) {
        var dcx = (w / 2 - x) / transform.k;
        var dcy = (h / 2 - y) / transform.k;
        canvas.transition()
            .duration(750)
            .call(zoom.transform, transform.translate(dcx, dcy));
    }

    // initialize max/min value for sliders
    function updateMarketCapMinMax() {
        marketCapmin = marketCapmax = undefined;
        graph.nodes.forEach((d) => {
            if (d.market_cap[snapshot] == "--") return;
            if (marketCapmax == undefined || marketCapmax < d.market_cap[snapshot])
                marketCapmax = d.market_cap[snapshot];
            if (marketCapmin == undefined || marketCapmin > d.market_cap[snapshot])
                marketCapmin = d.market_cap[snapshot];
        });
        updateFilter();
    }
    
    // update points in the scatter plot
    function updateScatterData() {
        var visible_nodes = graph.nodes.filter((d) => { return d.visible; });
        Plotly.restyle("scatter", {
            x: [visible_nodes.map((d) => { return d.borrow[snapshot]; })],
            z: [visible_nodes.map((d) => { return d.risk[snapshot]; })],
            y: [visible_nodes.map((d) => { return d.FX[snapshot]; })],
            text: [visible_nodes.map((d) => { return d.name; })],
            marker: {
                size: 5,
                color:graph.nodes.map((d) => { return (Math.sqrt(d.FX[snapshot]**2+d.borrow[snapshot]**2+(1-d.risk[snapshot])**2)); }),
                colorscale:'Viridis',
                opacity: 0.7,
                showscale: true,
                reversescale: true,
                colorbar: { len: 0.5,thickness:20,xpad:0.5},
            }
            ,
        });
    }

    // return the node at a given location (x, y)
    function findNodeAtPosition(x, y) {
        var n = graph.nodes.length,
            dx, dy, d2, node;
        for (var i = 0; i < n; i++) {
            node = graph.nodes[i];
            dx = x - node.x;
            dy = y - node.y;
            d2 = dx * dx + dy * dy;
            if (d2 < node.size[snapshot] * node.size[snapshot]) return node;
        }
        return null;
    }

    // update the highlight node
    function updateHighlight(node) {
        highlight_node = node;
        if (node === null) {
            tooltip.hideTooltip();
        } else {
            content = '<p class="main">' + node.name + '</span></p>'
            content += '<hr class="tooltip-network-hr">'
            content += '<p class="main">' + "Country: " + node.country + '</span></p>'
            content += '<hr class="tooltip-network-hr">'
            content += '<p class="main">' + "Market Cap: USD " + toPrettyString(node.market_cap[snapshot]) + '</span></p>'
            tooltip.showTooltip(content, d3.event)
        }
    }

    // return a node with specific name, set it on focus, move it to center, and show related information
    function searchNodeWithName(name) {
        var node_found = null;
        for (i = 0; i < graph.nodes.length; ++i) {
            node = graph.nodes[i];
            if (node.name == name) {
                node_found = node;
                x = node.x * transform.k + transform.x;
                y = node.y * transform.k + transform.y;
                moveToCenter(x, y);
                break;
            }
        }
        return node_found;
    }

    function searchWithName(name, noFilterReset) {
        if (noFilterReset === undefined)
            resetFilters();
        updateHighlight(null);
        var node_found = searchNodeWithName(name);
        updateFocus(node_found);
        updateCanvas();
    }

    // show infobox at bottom left
    function showInformation(node) {
        if (node === null) {
            $("#searchInfoBox").hide();
            $("#infoCountry").html("");
            $("#infoTicker").html("");
            $("#infoName").html("");
            $("#infoScore").html("");
        } else {
            $("#searchInfoBox").show();
            $("#infoCountry").html(node.country);
            $("#infoTicker").html(node.ticker);
            $("#infoName").html(node.name);
            $("#infoScore").html(node.centrality_score[snapshot].toFixed(4));
        }
    }

    function showCompanyList() {
        // show a complete company list
        var companyListBody_html = "";
        var company_list_borrow = [], company_list_risk = [], company_list_fx = [];
        for (var i in graph.nodes) {
            var n = graph.nodes[i];
            if (n.visible) {
                company_list_borrow.push({v: n.borrow[snapshot], src: n});
                company_list_risk.push({v: n.risk[snapshot], src: n});
                company_list_fx.push({v: n.FX[snapshot], src: n});
            }
        }
        company_list_borrow.sort((a, b) => (b.v - a.v));
        company_list_risk.sort((a, b) => (b.v - a.v));
        company_list_fx.sort((a, b) => (b.v - a.v));
        for (var i = 0; i < Math.min(company_list_borrow.length, 100); i ++) {
            companyListBody_html += "<tr><td>" + company_list_borrow[i].src.name + "</td>";
            companyListBody_html += "<td>" + number_style(company_list_borrow[i].v) + "</td>";
            companyListBody_html += "<td>" + company_list_risk[i].src.name + "</td>";
            companyListBody_html += "<td>" + number_style(company_list_risk[i].v) + "</td>";
            companyListBody_html += "<td>" + company_list_fx[i].src.name + "</td>";
            companyListBody_html += "<td>" + number_style(company_list_fx[i].v) + "</td></tr>";
        }
        $("#companyListBody").html(companyListBody_html);
    }

    function updateFocus(node) {

        focus_node = node;
        showInformation(focus_node);
        if (node !== null) {
            center_node = node;
            center_x = node.x;
            center_y = node.y;

            // update line chart
            var line_data = [];
            for (var i = 2; i < 6; i ++)
                line_data.push({x: i - 2, borrow: node.borrow[i], risk: node.risk[i], fx: node.FX[i]});
            var valueline_ro_borrow = d3.line()
                .x(function (d) { return line_x_ro_linear(d.x); })
                .y(function (d) { return line_y_ro(d.borrow); });
            line_ro_borrow.attr("d", valueline_ro_borrow(line_data));
            var valueline_ro_risk = d3.line()
                .x(function (d) { return line_x_ro_linear(d.x); })
                .y(function (d) { return line_y_ro(d.risk); });
            line_ro_risk.attr("d", valueline_ro_risk(line_data))
            var valueline_ro_fx = d3.line()
                .x(function (d) { return line_x_ro_linear(d.x); })
                .y(function (d) { return line_y_ro(d.fx); });
            line_ro_fx.attr("d", valueline_ro_fx(line_data))
            d3.selectAll(".line_text").remove();
            svg_ro.append('g').attr("class", "line_text").selectAll("text").data(line_data).enter()
                .append('text').text( (d, i) => { return number_style(d.borrow); })
                .attr('transform', 'translate(25,0)')
                .attr('x', (d, i) => { return line_x_ro_linear(d.x); })
                .attr('y', (d, i) => { return line_y_ro(d.borrow); });
            svg_ro.append('g').attr("class", "line_text").selectAll("text").data(line_data).enter()
                .append('text').text( (d, i) => { return number_style(d.risk); })
                .attr('transform', 'translate(25,0)')
                .attr('x', (d, i) => { return line_x_ro_linear(d.x); })
                .attr('y', (d, i) => { return line_y_ro(d.risk); });
            svg_ro.append('g').attr("class", "line_text").selectAll("text").data(line_data).enter()
                .append('text').text( (d, i) => { return number_style(d.fx); })
                .attr('transform', 'translate(25,0)')
                .attr('x', (d, i) => { return line_x_ro_linear(d.x); })
                .attr('y', (d, i) => { return line_y_ro(d.fx); });
            $("#roLineChart").show();
            $("#linecharts").show();

            // fire a change event to update other line charts
            $("#company").html(node.ticker);
            $("#company").trigger("change", []);

        } else {
            $("#roLineChart").hide();
            $("#linecharts").hide();
        }

    }

    // called when the window is resized
    function resize() {
        w = $("#tradewar").width();
        h = 450;
        canvas.attr("width", w).attr("height", h);
        updateCanvas();
    }

    // reset all filters to default values
    function resetFilters() {
        $('select.ms').multipleSelect('checkAll');
        updateFilter();
    }

    // update filter
    function updateFilter() {
        var region = $("#region").multipleSelect('getSelects', 'value');
        
        var marketCap_permille = marketCap.slider("getValue");
        var marketCapV = [];
        marketCapV.push(marketCapmin + (marketCapmax - marketCapmin) * marketCap_permille[0] / 1000);
        marketCapV.push(marketCapmin + (marketCapmax - marketCapmin) * marketCap_permille[1] / 1000 + 0.0001);

        var noFilter = (region.length == $("#region > option").length && marketCap_permille[0] == 0 && marketCap_permille[1] == 1000);

        $("#marketCapBtm").html("$" + toPrettyString(marketCapV[0]));
        $("#marketCapTop").html("$" + toPrettyString(marketCapV[1]));

        // modify visibility of nodes
        graph.nodes.forEach(function (d) {
            if (noFilter) d.visible = true;
            else
                d.visible = region.includes(d.region) && d.market_cap[snapshot] <= marketCapV[1] && d.market_cap[snapshot] >= marketCapV[0];
        });
        graph.nodes.forEach(function (d) {
            d.visible &= hasVisibleConnection(d);
        });

        // update center node and focus node
        if ((focus_node !== null) && !focus_node.visible)
            updateFocus(null);
        if (focus_node === null) center_node = null;
        updateCanvas();
        updateScatterData();
        showCompanyList();
    }


    /* ==================================================================== */
    /* All kinds of event listeners */
    canvas.on("mousemove", function () {
        var p = d3.mouse(this);
        var x = (p[0] - transform.x) / transform.k;
        var y = (p[1] - transform.y) / transform.k;
        closest_node = findNodeAtPosition(x, y);

        if (closest_node !== null &&
            ((!closest_node.visible) ||
                (focus_node !== null && !isConnected(closest_node, focus_node))))
            return;
        if (closest_node !== highlight_node) {
            updateHighlight(closest_node);
            updateCanvas();
        }
    });
    canvas.on("mouseout", function () {
        updateHighlight(null);
    });
    canvas.on("click", function () {
        if (highlight_node !== null) {
            if (highlight_node == focus_node)
                updateFocus(null);
            else {
                updateFocus(highlight_node);
                $("#search").val("");   // reset search input
            }
        } else {
            if (focus_node !== null)
                updateFocus(null);
        }
        updateCanvas();
    });
    canvas.on("dblclick.zoom", function () {
        var p = d3.mouse(this);
        updateHighlight(null);
        moveToCenter(p[0], p[1]);
    });

    // zoom in/out event
    zoom.on("zoom", function () {
        transform = d3.event.transform;
        updateCanvas();
    });

    // ticking event. specify where the nodes should be at each time step
    function tick_handler() {
        link_simulation.tick(5);
        updateCanvas();
    }

    // search function
    var companyNames = [];
    for (var i = 0; i < graph.nodes.length; i++) {
        companyNames.push(graph.nodes[i].name);
    }
    $("#search").autocomplete({
        source: companyNames,
        select: function (e, ui) {
            searchWithName(ui.item.value);
        }
    });
    $("#search").on("keyup", function (e) {
        if (e.keyCode == 13) {
            searchWithName($(this).val());
        }
    })
    $("#searchButton").click(function () {
        searchWithName($("#search").val());
    })

    // buttons of different scores
    $("#scoreFilter :input").change(function() {
        var index = $("#scoreFilter :input").index(this);
        if (index == 0) score_type = "borrow";
        else if (index == 1) score_type = "risk";
        else score_type = "FX";
        updateCanvas();
    });

    $("select.filter").on("change", function (e) {
        updateFilter();
    });

    $('[data-provide="slider"]').on("change", function(e) {
        updateFilter();
    });


    $('#timeline').on('change', function(e){
        snapshot = e.value.newValue - 1;
        if (snapshot < 2) {
            $("#scatter").hide();
            $(".score_legend").attr("src", "icon/legend_2.png");
        } else {
            $("#scatter").show();
            updateScatterData();
            $(".score_legend").attr("src", "icon/score_legend.png");
        }
        showCompanyList();
        updateMarketCapMinMax();
        updateCanvas();
    });


    /* ==================================================================== */
    /* drawing functions */
    function setAlphas(alpha) {
        central_node_color.setAlpha(alpha);
        supplier1_node_color.setAlpha(alpha);
        yellow_color.setAlpha(alpha);
        link_color.setAlpha(alpha);
    }

    function drawLink(d) {
        if (d.visible && d.source.visible && d.target.visible) {
            context.beginPath();
            context.moveTo(d.source.x, d.source.y);
            context.lineTo(d.target.x, d.target.y);
            context.lineWidth = d.score[snapshot];
            context.strokeStyle = link_color.toString();
            context.stroke();
        }
    }

    function drawNode(d) {
        if (!d.visible) return;
        var radius = d.size[snapshot];
        context.beginPath();
        context.moveTo(d.x + radius, d.y);
        context.arc(d.x, d.y, radius, 0, 2 * Math.PI);
        context.strokeStyle = "white";

        // determine color based on node score
        if (snapshot < 2) {
            if (d.size[snapshot] == 3)  // not exist in this quarter
                context.fillStyle = "#cccccc";
            else
                context.fillStyle = (d.type == "manufacturer") ? central_node_color.toString() : supplier1_node_color.toString();
        } else {
            color = yellow_color.toHsl();
            color.h = (color.h - d[score_type][snapshot] * 60) % 360;
            if (d[score_type][snapshot] < 0) color = "#cccccc";        
            context.fillStyle = tinycolor(color).toString();
        }
    
        context.fill();
        context.stroke();
    }

    function drawHighlight() {
        var n = focus_node || highlight_node;
        if (n == undefined) return;
        // draw connected links
        link_color = tinycolor(highlight_link_color);
        setAlphas(1);
        for (var b in edgeList[n.ticker]) {
            var nb = nodesMap[b];
            var l = edgeList[n.ticker][b];
            drawLink(l);
        }
        // draw connected nodes
        for (var b in edgeList[n.ticker]) {
            var nb = nodesMap[b];
            if (edgeList[n.ticker][b].visible)
                drawNode(nb);
        }
        // draw this node
        drawNode(n);
    }

    function updateCanvas() {
        context.save();
        context.clearRect(0, 0, w, h);

        context.translate(transform.x, transform.y);
        context.scale(transform.k, transform.k);

        link_color = tinycolor(default_link_color);
        if (focus_node !== null) {
            setAlphas(non_focus_alpha);
        } else if (highlight_node !== null) {
            setAlphas(non_hover_alpha);
            link_color.setAlpha(non_hover_alpha / 2);
        } else {
            setAlphas(1);
        }
        // update colors based on current state
        graph.links.forEach((d) => { drawLink(d); });
        graph.nodes.forEach((d) => { drawNode(d); });
        drawHighlight();

        context.restore();
    }

    /* ==================================================================== */
    /* Initialization */
    canvas.call(zoom.transform, d3.zoomIdentity.translate(w / 2, h / 2).scale(0.2));
    d3.select(window).on("resize", resize)
    link_simulation.on("tick", tick_handler);

    // initialize visibility
    graph.nodes.forEach(function (d) { d.visible = true; });
    graph.links.forEach(function (d) { d.visible = true; });

    // initialize force simulation
    link_simulation.nodes(graph.nodes);
    link_simulation.force("link").links(graph.links).distance(force_distance);
    link_simulation.alpha(0.5).restart();

    // init scatter plot
    var scatter_data = [{
        x: graph.nodes.map((d) => { return d.borrow[snapshot]; }),
        y: graph.nodes.map((d) => { return d.FX[snapshot]; }),
        z: graph.nodes.map((d) => { return d.risk[snapshot]; }),
        
        text: graph.nodes.map((d) => { return d.name; }),
        type: 'scatter3d',
        mode: 'markers',
        marker: {
            size: 5,
            color:graph.nodes.map((d) => { return (Math.sqrt(d.FX[snapshot]**2+d.borrow[snapshot]**2+(1-d.risk[snapshot])**2)); }),
            colorscale:'Viridis',
            opacity: 0.7,
            showscale: true,
            reversescale: true,
            colorbar: { len: 0.5,thickness:20,xpad:0.5},
        },
        hoverinfo: 'text',
        hoverlabel: 'white'
        
    }];
    var scatter_layout = {
        margin: { l: 0, r: 0, b: 0, t: 0},
        scene: {
            xaxis:{title: 'Borrow Need'},
            yaxis:{title: 'FX Need'},
            zaxis:{title: 'Risk Score'},
            camera: {
                center: {x: 0, y: 0, z: 0},
                up: {x: 0, y: 0, z: 1},
                eye: {x: 1.5, y: 1.5, z: 1.5}
            }
        }
    };
    Plotly.newPlot('scatter', scatter_data, scatter_layout);
    document.getElementById("scatter").on("plotly_click", (data) => {
        searchWithName(data.points[0].text, true);
    });

    // init line chart
    var line_ro_borrow = svg_ro
        .append('g')
        .append("path")
        .attr("class", "line1")
        .attr("transform", "translate(40,0)")
        .attr('fill', 'none');
    var line_ro_risk = svg_ro
        .append('g')
        .append("path")
        .attr("class", "line2")
        .attr("transform", "translate(40,0)")
        .attr('fill', 'none');
    var line_ro_fx = svg_ro
        .append('g')
        .append("path")
        .attr("class", "line3")
        .attr("transform", "translate(40,0)")
        .attr('fill', 'none');

    updateMarketCapMinMax();
    showCompanyList();
    $("#dataLoading").hide();
});