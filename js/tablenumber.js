var table_d = d3.select('#number_of_s')
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
    var number_1 = startData.map(function (d){
        return (Math.round(d.Number_of_suppliers*d.US_Degree))
    });
    var number_2 = startData.map(function (d){
        return ((d.US_Degree*100).toFixed(2)+'%')
    })
    var number_3 = startData.map(function (d){
        return (Math.round(d.Number_of_suppliers*d.CN_Degree))
    })
    var number_4 = startData.map(function (d){
        return ((d.CN_Degree*100).toFixed(2)+"%")
    })
    var number_5 = startData.map(function (d){
        return (d.Number_of_suppliers)
    })
    var number_6 = endData.map(function (d){
        return (Math.round(d.Number_of_suppliers*d.US_Degree))
    })
    var number_7 = endData.map(function (d){
        return ((d.US_Degree*100).toFixed(2)+'%')
    })
    var number_8 = endData.map(function (d){
        return (Math.round(d.Number_of_suppliers*d.CN_Degree))
    })
    var number_9 = endData.map(function (d){
        return ((d.CN_Degree*100).toFixed(2)+"%")
    })
    var number_10 = endData.map(function (d){
        return (d.Number_of_suppliers)
    })
    var n1 = table_d.append("td").text(number_1)
    var n2 = table_d.append("td").text(number_2)
    var n3 = table_d.append("td").text(number_3)
    var n4 = table_d.append("td").text(number_4)
    var n5 = table_d.append("td").text(number_5)
    var n6 = table_d.append("td").text(number_6)
    var n7 = table_d.append("td").text(number_7)
    var n8 = table_d.append("td").text(number_8)
    var n9 = table_d.append("td").text(number_9)
    var n10 = table_d.append("td").text(number_10)

    d3.select("#company").on("change", function (d) {
        // recover the option that has been chosen
        ticker = d3.select(this).property("value")
        console.log("a")
        // run the table function with this selected option
        update_table(ticker)
    });
    function update_table(newvalue) {
        // check input
        startData = data.filter(function (d) {
            if (d.Tickers == newvalue & d.End_Date == start_date) {
                return d
            }
        });
        endData = data.filter(function (d) {
            if (d.Tickers == newvalue & d.End_Date == End_Date) {
                return d
            }
        });
        number_1 = startData.map(function (d){
            return (Math.round(d.Number_of_suppliers*d.US_Degree))
        })
        number_2 = startData.map(function (d){
            return ((d.US_Degree*100).toFixed(2)+'%')
        })
        number_3 = startData.map(function (d){
            return (Math.round(d.Number_of_suppliers*d.CN_Degree))
        })
        number_4 = startData.map(function (d){
            return ((d.CN_Degree*100).toFixed(2)+"%")
        })
        number_5 = startData.map(function (d){
            return (d.Number_of_suppliers)
        })
        number_6 = endData.map(function (d){
            return (Math.round(d.Number_of_suppliers*d.US_Degree))
        })
        number_7 = endData.map(function (d){
            return ((d.US_Degree*100).toFixed(2)+'%')
        })
        number_8 = endData.map(function (d){
            return (Math.round(d.Number_of_suppliers*d.CN_Degree))
        })
        number_9 = endData.map(function (d){
            return ((d.CN_Degree*100).toFixed(2)+"%")
        })
        number_10 = endData.map(function (d){
            return (d.Number_of_suppliers)
        })
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
    }
    
})