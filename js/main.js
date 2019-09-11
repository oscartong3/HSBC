var marketCapCentrals = $("#marketCapCentral").slider({id: "mcc", scale: 'logarithmic', min: 0, max: 1000, range: true, tooltip: "hide", value: [0, 1000]});
var marketCapSuppliers = $("#marketCapSupplier").slider({id: "mcs", scale: 'logarithmic', min: 0, max: 1000, range: true, tooltip: "hide", value: [0, 1000]});
var roaCentrals = $("#roaCentral").slider({id: "rc", min: 0, max: 1000, range: true, tooltip: "hide", value: [0, 1000]});
var roaSuppliers = $("#roaSupplier").slider({id: "rs", min: 0, max: 1000, range: true, tooltip: "hide", value: [0, 1000]});
var relationValue = $("#relationValue").slider({id: "rv", scale: 'logarithmic', min: 0, max: 1000, range: true, tooltip: "hide", value: [0, 1000]});

function max_width() {
    return $("#container").width();
}

function max_height() {
    return 500;
}

// Move d to be adjacent to the cluster node.
// from: https://bl.ocks.org/mbostock/7881887
function cluster() {

    var nodes,
        strength = 0.1;

    function force(alpha) {

        // scale + curve alpha value
        alpha *= strength * alpha;

        nodes.forEach(function (d) {
            var cluster = clusters[d.region];

            let dx = d.x - cluster.x,
                dy = d.y - cluster.y,
                l = Math.sqrt(dx * dx + dy * dy),
                r = d.size;

            if (l != r) {
                l = (l - r) / l * alpha;
                d.vx = -dx * l;
                d.vy = -dy * l;
            }
        });

    }

    force.initialize = function (_) {
        nodes = _;
    }

    force.strength = _ => {
        strength = _ == null ? strength : _;
        return force;
    };

    return force;

}

function toPrettyString(number) {
    if (number == "--") return number;
    if (number > 1e12)
        return (number / 1e12).toFixed(2) + "T";
    else if (number > 1e9)
        return (number / 1e9).toFixed(2) + "B";
    else if (number > 1e6)
        return (number / 1e6).toFixed(2) + "M";
    else if (number > 1e3)
        return (number / 1e3).toFixed(2) + "K";
    else
        return number.toFixed(0);
}

// convert permille ratio to real number with given max and min
function ratioToNumber(permilles, minv, maxv) {
    var ret = [];
    ret.push(minv + (maxv - minv) * permilles[0] / 1000);
    ret.push(minv + (maxv - minv) * permilles[1] / 1000 + 0.0001);
    return ret;
}

var w = max_width();
var h = max_height();
var tooltip = Tooltip("vis-tooltip", 230);

var highlight_link_color = "blue";
var default_link_color = "#888";
var central_node_color = tinycolor("#dc3545");
var supplier1_node_color = tinycolor("#007bff");
var supplier2_node_color = tinycolor("#20c997")
var link_color = tinycolor(default_link_color);
var non_hover_alpha = 0.3;
var non_focus_alpha = 0.15;
var nominal_base_node_size = 8;
var nominal_stroke = 1.5;
var max_stroke = 4.5;
var max_base_node_size = 36;
var min_zoom = 0.1;
var max_zoom = 2;
var zoom = d3.zoom().scaleExtent([min_zoom, max_zoom]);
var transform = d3.zoomIdentity;
var force_distance = 200;
var link_simulation = d3.forceSimulation()
    .force("link", d3.forceLink().id(function (d) { return d.ticker; }))
    .force("charge", d3.forceManyBody().strength(-150))
    //.force("x", d3.forceX().strength(.1))
    //.force("y", d3.forceY().strength(.1))
    .force("collide", d3.forceCollide().radius(function (d) { return d.size + 2; }).iterations(2))
    .force("center", d3.forceCenter(0, 0));
var cluster_simulation = d3.forceSimulation()
    .force('cluster', cluster().strength(0.1))
    .force("collide", d3.forceCollide().radius(function (d) { return d.size + 2; }).iterations(2))

var clusters = {};
var centrality = "none";

var canvas = d3.select("#vis");
var context = canvas.node().getContext("2d");
zoom(canvas);

d3.json("data/automobile_new.json", function (error, graph) {
    console.log(error);

    var focus_node = null, highlight_node = null, center_node = null;
    var center_x = 0, center_y = 0;
    var active_node_set = [], active_link_set = [];
    // save the graph as an adjacency list
    // TODO: currently all edges are undirected
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

    function hasVisibleConnectionWithType(d, type) {
        for (var n in edgeList[d.ticker]) {
            var node = nodesMap[n];
            if (node.type == type && node.visible && edgeList[d.ticker][n].visible) {
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

    function searchWithName(name) {
        resetFilters();
        updateHighlight(null);
        var node_found = searchNodeWithName(name);
        updateFocus(node_found);
        // if focus node is supplier2, check explore more suppliers
        if (node_found !== null && node_found.type == 'supplier2' &&
            !$("#exploreMoreSuppliers").hasClass("checked")) {
            $("#exploreMoreSuppliers").click();
        }
        updateCanvas();
    }

    // show infobox at bottom left
    function showInformation(node) {
        if (node === null) {
            $("#searchInfoBox").hide();
            $("#infoCountry").html("");
            $("#infoTicker").html("");
            $("#infoName").html("");
            $("#infoMarketCap").html("");
            $("#infoSector").html("");
            $("#infoRoa").html("");
            $("#infoIndustry").html("");
            $("#infoNumSupplier").html("");
        } else {
            $("#searchInfoBox").show();
            $("#infoCountry").html(node.country);
            $("#infoTicker").html(node.ticker);
            $("#infoName").html(node.name);
            $("#infoMarketCap").html("USD: " + toPrettyString(node.market_cap));
            $("#infoSector").html(node.sector);
            if (node.roa == "--")
                $("#infoRoa").html(node.roa);
            else
                $("#infoRoa").html(node.roa.toFixed(4));
            $("#infoIndustry").html(node.industry);
            $("#infoNumSupplier").html(node.num_supplier);
        }
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
            if (d2 < node.size * node.size) return node;
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
            content += '<p class="main">' + "Market Cap: USD " + toPrettyString(node.market_cap) + '</span></p>'
            tooltip.showTooltip(content, d3.event)
        }
    }

    function updateFocus(node) {
        focus_node = node;
        showInformation(focus_node);
        if (node !== null) {
            center_node = node;
            center_x = node.x;
            center_y = node.y;
            // show supplier list of the focus node
            if (centrality == "none") {
                $("#slValueTitle").html("Relation Value");
            } else if (centrality == "auth") {
                $("#slValueTitle").html("Authority Score");
            } else if (centrality == "hub") {
                $("#slValueTitle").html("Hub Score");
            } else {
                $("#slValueTitle").html(centrality[0].toUpperCase() + centrality.slice(1));
            }
            var supplier_list = [];
            for (var b in edgeList[node.ticker]) {
                if (edgeList[node.ticker][b].source.ticker == b) {
                    if (centrality == "none")
                        supplier_list.push({v: edgeList[node.ticker][b].relation, src: nodesMap[b]});
                    else
                        supplier_list.push({v: nodesMap[b]["centrality_" + centrality], src: nodesMap[b]});
                }
            }
            supplier_list.sort((a, b) => (b.v - a.v));
            var supplier_list_html = "";
            for (var i = 0; i < Math.min(10, supplier_list.length); i ++) {
                supplier_list_html += "<tr><th scope=\"row\">" + (i + 1) + "</th>";
                supplier_list_html += "<td>" + supplier_list[i].src.name + "</td>";
                supplier_list_html += "<td>" + supplier_list[i].src.country + "</td>";
                supplier_list_html += "<td>" + supplier_list[i].v.toLocaleString() + "</td></tr>";
            }
            $("#suppliersList").show();
            $("#suppliersListBody").html(supplier_list_html);
        } else {
            center_node = null;
            $("#suppliersList").hide();
        }
    }

    // show the full network of a given node (central - supplier1 - supplier2)
    function showFullNetworkWithName(name) {
        var node = searchNodeWithName(name);
        if (node != null) {
            resetFilters();
            updateFocus(null);
            $("#exploreMoreSuppliers").addClass(["active", "checked"]);
            // set all nodes invisible
            graph.nodes.forEach(function (d) { d.visible = false; });
            graph.links.forEach(function (d) { d.visible = false; });
            node.visible = true;
            // set directed connected nodes visible
            for (var b in edgeList[node.ticker]) {
                nodesMap[b].visible = true;
                edgeList[node.ticker][b].visible = true;
            }
            if (node.type == "manufacturer") {
                // set supplier2 visible
                for (var b in edgeList[node.ticker]) {
                    if (edgeList[node.ticker][b].type != 'layer1') continue;
                    for (var c in edgeList[b]) {
                        if (edgeList[b][c].type != 'layer2') continue;
                        nodesMap[c].visible = true;
                        edgeList[b][c].visible = true;
                    }
                }
            }
            center_node = node;
            center_x = node.x;
            center_y = node.y;
            restart();
        }
    }

    // called when the window is resized
    function resize() {
        var width = max_width(), height = max_height();
        canvas.attr("width", width).attr("height", height);
        w = width;
        h = height;
        updateCanvas();
    }

    // restart link force simulation
    function restart(force) {
        force = typeof force !== 'undefined' ? force : false;

        // if active set does not change, do not restart
        // compare the length for this
        var n_nodes_before = active_node_set.length;
        var n_links_before = active_link_set.length;

        active_node_set = [];
        active_link_set = [];

        for (var i = 0; i < graph.nodes.length; i++)
            if (graph.nodes[i].visible)
                active_node_set.push(graph.nodes[i]);

        for (var i = 0; i < graph.links.length; i++) {
            var d = graph.links[i];
            if (d.source.visible && d.target.visible && d.visible)
                active_link_set.push(d);
        }

        if (force || active_node_set.length != n_nodes_before || active_link_set.length != n_links_before) {
            link_simulation.nodes(active_node_set);
            link_simulation.force("link").links(active_link_set).distance(force_distance);
            link_simulation.alpha(0.5).restart();
        }
        
    }

    // reset all filters to default values
    function resetFilters() {
        $('select.ms').multipleSelect('checkAll');
        $("input:checkbox.filter").not("#exploreMoreSuppliers > input").parent().removeClass(["active", "checked"]);
        $(".btn-group > select.filter").val("100");
        updateFilter();
    }

    // update filter
    function updateFilter() {
        var sectorSupplier = $("#sectorSupplier").multipleSelect('getSelects', 'value');
        var regionCentral = $("#regionCentral").multipleSelect('getSelects', 'value');
        var regionSupplier = $("#regionSupplier").multipleSelect('getSelects', 'value');
        var filterRelationship = $("#relationship").multipleSelect('getSelects', 'value');
        var exploreMore = $("#exploreMoreSuppliers").hasClass("checked");

        var marketCapCentral_permille = marketCapCentrals.slider("getValue");
        var marketCapSupplier_permille = marketCapSuppliers.slider("getValue");
        var roaCentral_permille = roaCentrals.slider("getValue");
        var roaSupplier_permille = roaSuppliers.slider("getValue");
        var relationV_permille = relationValue.slider("getValue");
        var marketCapCentral = ratioToNumber(marketCapCentral_permille, marketCapCentralmin, marketCapCentralmax);
        var marketCapSupplier = ratioToNumber(marketCapSupplier_permille, marketCapSuppliermin, marketCapSuppliermax);
        var roaCentral = ratioToNumber(roaCentral_permille, roaCentralmin, roaCentralmax);
        var roaSupplier = ratioToNumber(roaSupplier_permille, roaSuppliermin, roaSuppliermax);

        $("#marketCapCentralBtm").html("$" + toPrettyString(marketCapCentral[0]));
        $("#marketCapCentralTop").html("$" + toPrettyString(marketCapCentral[1]));
        $("#marketCapSupplierBtm").html("$" + toPrettyString(marketCapSupplier[0]));
        $("#marketCapSupplierTop").html("$" + toPrettyString(marketCapSupplier[1]));
        $("#roaCentralBtm").html(roaCentral[0].toFixed(0));
        $("#roaCentralTop").html(roaCentral[1].toFixed(0));
        $("#roaSupplierBtm").html(roaSupplier[0].toFixed(0));
        $("#roaSupplierTop").html(roaSupplier[1].toFixed(0));

        var noFilter = (sectorSupplier.length == $("#sectorSupplier > option").length &&
            regionCentral.length == $("#regionCentral > option").length && 
            regionSupplier.length == $("#regionSupplier > option").length && 
            filterRelationship.length == $("#filterRelationship > option").length);

        // modify visibility of all links
        graph.links.forEach(function (d) {
            d.visible = filterRelationship.includes(d.account);
            d.visible &= !((d.type == "layer2") && (!exploreMore));
        });

        // modify visibility of central nodes
        graph.nodes.forEach(function (d) {
            if (d.type == 'manufacturer') {
                d.visible = regionCentral.includes(d.region);
                d.visible &= (d.market_cap >= marketCapCentral[0] && d.market_cap <= marketCapCentral[1]);
                d.visible &= (d.roa >= roaCentral[0] && d.roa <= roaCentral[1]);
            } else {
                d.visible = true;
                if (d.type == 'supplier2' && !exploreMore) d.visible = false;
                d.visible &= sectorSupplier.includes(d.sector);
                d.visible &= regionSupplier.includes(d.region);
                d.visible &= (d.market_cap >= marketCapSupplier[0] && d.market_cap <= marketCapSupplier[1]);
                d.visible &= (d.roa >= roaSupplier[0] && d.roa <= roaSupplier[1]);
            }

        });

        // modify visibility of supplier nodes
        if (!noFilter) {
            graph.nodes.forEach(function (d) {
                if (d.type == 'supplier1') {
                    d.visible &= hasVisibleConnectionWithType(d, "manufacturer");
                }
            });
            graph.nodes.forEach(function (d) {
                if (d.type == 'supplier2') {
                    d.visible &= hasVisibleConnectionWithType(d, "supplier1");
                }
            });
        }

        // update relation value max and min
        relationVmax = relationVmin = undefined;
        for (var i = 0; i < graph.links.length; i++) {
            var l = graph.links[i];
            if (l.visible && l.source.visible && l.target.visible) {
                if (relationVmax == undefined || relationVmax < l.relation)
                    relationVmax = l.relation;
                if (relationVmin == undefined || relationVmin > l.relation)
                    relationVmin = l.relation;
            }   
        }
        var relationV = ratioToNumber(relationV_permille, relationVmin, relationVmax);
        $("#relationVBtm").html("$" + toPrettyString(relationV[0]));
        $("#relationVTop").html("$" + toPrettyString(relationV[1]));

        for (var i = 0; i < graph.links.length; i++) {
            var l = graph.links[i];
            l.visible &= (l.relation >= relationV[0] && l.relation <= relationV[1])
        }
        // filter out isolated suppliers accordingly
        if (!noFilter) {
            graph.nodes.forEach(function (d) {
                if (d.type == 'supplier1') {
                    d.visible &= hasVisibleConnectionWithType(d, "manufacturer");
                }
            });
            graph.nodes.forEach(function (d) {
                if (d.type == 'supplier2') {
                    d.visible &= hasVisibleConnectionWithType(d, "supplier1");
                }
            });
        }

        /*if (relationValue != 'none' && relationValueV != 100) {
            // calculate the percentage on the fly
            
            if (relationValue == 'top')
                relation_values.sort(function (a, b) { return b - a; });
            else
                relation_values.sort(function (a, b) { return a - b; });
            var ref_id = Math.min(Math.max(Math.floor(relation_values.length * relationValueV / 100), 0), relation_values.length - 1);
            var reference = relation_values[ref_id];
            
        }*/

        // update center node and focus node
        if ((focus_node !== null) && !focus_node.visible)
            updateFocus(null);
        if (focus_node === null) center_node = null;

        if ($("#groupByRegion").hasClass("checked"))
            updateCanvas();
        else
            restart();
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
        if (center_node !== null) {
            center_node.x = center_x;
            center_node.y = center_y;
        }
        if ($("#groupByRegion").hasClass("checked"))
            cluster_simulation.tick(20);
        else
            link_simulation.tick(5);
        updateCanvas();
    }
    link_simulation.on("tick", tick_handler);
    cluster_simulation.on("tick", tick_handler);

    // listener of filters
    $("select.filter").on("change", function (e) {
        updateFilter();
    });
    $("input:checkbox.filter").on("change", function (e) {
        $(this).parent().siblings().removeClass("active");
        $(this).parent().siblings().removeClass("checked");
        $(this).parent().toggleClass("checked");
        if (!$(this).parent().hasClass("checked")) {
            $(this).parent().siblings("select").val("100");
        }
        updateFilter();
    });
    $('[data-provide="slider"]').on("change", function(e) {
        updateFilter();
    });

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
    $("#showNetworkBtn").click(function() {
        showFullNetworkWithName($("#search").val());
    })

    // function buttons below the graph
    $("#groupByRegion > input:checkbox").on("change", function(e) {
        $(this).parent().toggleClass("checked");
        if (!$(this).parent().hasClass("checked")) {
            cluster_simulation.stop();
            restart(true);
        } else {
            link_simulation.stop();
            cluster_simulation.alpha(1.5).restart();
        }
    });
    $("#centrality > .dropdown-item").on("click", function(e) {
        $(this).siblings().removeClass("active");
        $("#centralityBtn").html($(this).html());
        var index = $("#centrality > .dropdown-item").index(this);
        switch (index) {
            case 0:
                centrality = "hub";
                break;
            case 1:
                centrality = "auth";
                break;
            case 2:
                centrality = "degree";
                break;
            case 3:
                centrality = "closeness";
                break;
            case 4:
                centrality = "betweenness";
                break;
            default:
                centrality = "none";
                break;
        }
        $(this).addClass("active");
        if (centrality != "none") {
            $("#legend").attr("src", "icon/centrality_legend.png");
            $("#centralityBtn").addClass("active");
        } else {
            $("#legend").attr("src", "icon/legend.png");
            $("#centralityBtn").removeClass("active");
        }
        updateFocus(focus_node);
        updateCanvas();
    });


    /* ==================================================================== */
    /* drawing functions */
    function setAlphas(alpha) {
        central_node_color.setAlpha(alpha);
        supplier1_node_color.setAlpha(alpha);
        supplier2_node_color.setAlpha(alpha);
        link_color.setAlpha(alpha);
    }

    function drawLink(d) {
        if (d.visible && d.source.visible && d.target.visible) {
            context.beginPath();
            context.moveTo(d.source.x, d.source.y);
            context.lineTo(d.target.x, d.target.y);
            context.lineWidth = d.score;
            context.strokeStyle = link_color.toString();
            context.stroke();
        }
    }

    function drawNode(d) {
        if (d.visible) {
            context.beginPath();
            context.moveTo(d.x + d.size, d.y);
            context.arc(d.x, d.y, d.size, 0, 2 * Math.PI);
            context.strokeStyle = "white";

            // determine color based on node type
            if (d.type == "manufacturer") color = central_node_color.clone().toHsl();
            else if (d.type == "supplier1") color = supplier1_node_color.clone().toHsl();
            else color = supplier2_node_color.clone().toHsl();

            if (centrality != "none")
                color.h = (color.h + d["centrality_" + centrality] * 90 - 45) % 360;
            context.fillStyle = tinycolor(color).toString();
            
            // change the saturate given the centrality
            /*saturate_degree = 0;
            if (centrality != "none")
                saturate_degree = (d["centrality_" + centrality] * 70) - 35;
            if (saturate_degree > 0)
                context.fillStyle = color.brighten(saturate_degree).toString();
            else
                context.fillStyle = color.darken(-saturate_degree).toString();*/
            
            context.fill();
            context.stroke();
        }
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

        // update colors based on current state
        link_color = tinycolor(default_link_color);
        if (focus_node !== null) {
            setAlphas(non_focus_alpha);
        } else if (highlight_node !== null) {
            setAlphas(non_hover_alpha);
            link_color.setAlpha(non_hover_alpha / 2);
        } else {
            setAlphas(1);
        }
        graph.links.forEach(drawLink);
        graph.nodes.forEach(drawNode);
        drawHighlight();

        // draw group labels when in cluster mode
        if ($("#groupByRegion").hasClass("checked")) {
            context.font = "80px Arial";
            context.fillStyle = "black";
            context.textAlign = "center";
            for (var label in clusters) {
                var k = 1.1 + Math.sqrt(clusters[label].count) / 100;
                var tx = clusters[label].x * k;
                var ty = clusters[label].y * k;
                context.fillText(label, tx, ty);
            }
            
        }

        context.restore();
    }


    /* ==================================================================== */
    /* Initialization */
    resize();
    canvas.call(zoom.transform, d3.zoomIdentity.translate(w / 2, h / 2).scale(0.3));
    d3.select(window).on("resize", resize)
    $("#dataLoading").hide();

    // initialize visibility
    graph.nodes.forEach(function (d) { d.visible = (d.type != "supplier2"); });
    graph.links.forEach(function (d) { d.visible = (d.type != "layer2"); });

    // initialize max/min value for sliders
    var marketCapCentralmax, marketCapCentralmin, marketCapSuppliermax, marketCapSuppliermin;
    var roaCentralmax, roaCentralmin, roaSuppliermax, roaSuppliermin, relationVmax, relationVmin;
    graph.nodes.forEach((d) => {
        if (d.type == "manufacturer") {
            if (marketCapCentralmax == undefined || marketCapCentralmax < d.market_cap)
                marketCapCentralmax = d.market_cap;
            if (marketCapCentralmin == undefined || marketCapCentralmin > d.market_cap)
                marketCapCentralmin = d.market_cap;
            if (roaCentralmax == undefined || roaCentralmax < d.roa)
                roaCentralmax = d.roa;
            if (roaCentralmin == undefined || roaCentralmin > d.roa)
                roaCentralmin = d.roa;
        } else {
            if (marketCapSuppliermax == undefined || marketCapSuppliermax < d.market_cap)
                marketCapSuppliermax = d.market_cap;
            if (marketCapSuppliermin == undefined || marketCapSuppliermin > d.market_cap)
                marketCapSuppliermin = d.market_cap;
            if (roaSuppliermax == undefined || roaSuppliermax < d.roa)
                roaSuppliermax = d.roa;
            if (roaSuppliermin == undefined || roaSuppliermin > d.roa)
                roaSuppliermin = d.roa;
        }
    });

    // initialize cluster centers
    var regions = {}; /*{"China": {id: 0, count: 0}, 
                "Hong Kong": {id: 1, count: 0},
                "USA": {id: 2, count: 0},
                "Africa": {id: 6, count: 0},
                "North America": {id: 3, count: 0},
                "APAC": {id: 5, count: 0},
                "Latin America": {id: 4, count: 0},
                "Europe": {id: 8, count: 0},
                "Middle East": {id: 7, count: 0}};*/
    var num_regions = 0;
    graph.nodes.forEach(function (d) {
        if (!regions.hasOwnProperty(d.region)) 
            regions[d.region] = {id: num_regions ++, count: 0};
        regions[d.region].count ++;
    });
    for (var label in regions) {
        var tx = Math.cos(regions[label].id * Math.PI * 2 / num_regions) * 1000;
        var ty = Math.sin(regions[label].id * Math.PI * 2 / num_regions) * 1000;
        clusters[label] = {x: tx, y: ty, count: regions[label].count};
    }

    // initialize force simulation
    cluster_simulation.nodes(graph.nodes);
    cluster_simulation.stop();
    link_simulation.nodes(graph.nodes);
    link_simulation.force("link").links(graph.links).distance(force_distance);
    updateFilter();
});    