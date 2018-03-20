// Google Script to use google API's for Pie chart
// Load the Visualization API and the piechart package.
 	google.load('visualization', '1.0', {'packages':['corechart']});

// Set a callback to run when the Google Visualization API is loaded.
	google.setOnLoadCallback(drawChart);
	// Callback that creates and populates a data table, 
	// instantiates the pie chart, passes in the data and
	// draws it.
function drawChart() {
	// Create the data table.
	data = new google.visualization.DataTable();
	data.addColumn('string', 'Topping');
	data.addColumn('number', 'Slices');
	data.addRows([
	['Love', 3],
	['Hate', 1]
	]);
// Set chart options

	options = {'title':'Love/Hate Percentage',
	'pieHole': 0.4,
	'width':480,
	'height':480,
	'titleTextStyle': {color: 'red',fontSize:20},
	'chartArea.backgroundColor': '#383838',
	'backgroundColor' : '#383838'};

// Instantiate and draw our chart, passing in some options.
	chart = new google.visualization.PieChart(document.getElementById('chart_div'));
	chart.draw(data, options);
}

function updChart(input) {
	// Create the data table.
	// Instantiate and draw our chart, passing in some options.
	data.setCell(0,1,JSON.parse(input).love_per);
	data.setCell(1,1,JSON.parse(input).hate_per);
	chart.draw(data, options);
}

function update_graph(data_rcvd) {
	console.log("update_graph called" + JSON.parse(data_rcvd).love_per);
	google.setOnLoadCallback(updChart);

}
