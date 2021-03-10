const data = [
	{ name: "Oil", value: 38.8 },
	{ name: "Coal", value: 29.1 },
	{ name: "Gas", value: 25.7 },
	{ name: "Renewables", value: 6.4 },   //Energy usage: fuel type breakdown
];

const sectorData = [
	{ name: "Transport", value: 28.2 },
	{ name: "Electricity", value: 25.7 },
	{ name: "Manufacturing", value: 16.9 },
	{ name: "Mining", value: 13.1 },
	{ name: "Residential", value: 7.4 },
	{ name: "Commercial", value: 5.4 },
	{ name: "Agriculture", value: 1.7 },
	{ name: "Construction", value: 0.4 },
    { name: "Water & Waste", value: 0.3},
    { name: "Other", value: 0.9},           //Energy usage: sector breakdown

];


const stateData = [
    {name: "New South Wales", value: 24.9},
    {name: "Victoria", value: 20.9 },
    {name: "Queensland", value: 24.6 },
    {name: "Western Australia", value: 20.4 },
    {name: "South Australia", value: 5.2 },
    {name: "Tasmania", value: 1.8 },
    {name: "Northern Territory", value: 2.3}
]
const svg = d3.select("svg"),
	width = svg.attr("width"),
	height = svg.attr("height");


const sectorWidth = 1050;
const sectorHeight = 500;
const sectorMargin = {top: 40, bottom: 40, left: 40, right: 40}


const radius = 200;
const g = svg
	.append("g")
	.attr("transform", `translate(${width / 2}, ${height / 2})`);
const color = d3.scaleOrdinal(["#1eb30b", "#4ef7ff", "#00acff", "#0000ff"]);
const pie = d3.pie().value((d) => d.value);
const path = d3.arc().outerRadius(radius).innerRadius(0);
const label = d3
	.arc()
	.outerRadius(radius)
	.innerRadius(radius - 90);

const pies = g
	.selectAll(".arc")
	.data(pie(data))
	.enter()
	.append("g")
	.attr("class", "arc");
pies
	.append("path")
	.attr("d", path)
	.attr("fill", (d) => color(d.data.value));
pies
	.append("text")
	.text((d) => d.data.name)
	.attr("transform", (d) => `translate(${label.centroid(d)})`);  //Pie Chart
/* pies.append('text')
.text(d => d.data.value)
.attr('transform', d=>`translate(${label.centroid(d)})`) */
const sectorSvg = d3.select("#sectorSvg")
.append('svg')
.attr('height', sectorHeight-sectorMargin.top-sectorMargin.bottom)
.attr('width', sectorWidth-sectorMargin.left-sectorMargin.right)
.attr('viewBox', [0,0, sectorWidth, sectorHeight])

const x = d3.scaleBand()
.domain(d3.range(sectorData.length))
.range([sectorMargin.left, sectorWidth-sectorMargin.right])
.padding(0.1);

const y = d3.scaleLinear()
.domain([0,30])
.range([sectorHeight-sectorMargin.bottom, sectorMargin.top])

sectorSvg
.append('g')
.attr('fill','royalblue')
.selectAll('rect')
.data(sectorData.sort((a,b)=> d3.descending(a.value, b.value)))
.join('rect')
  .attr('x',(d, i)=> x(i))
  .attr('y', (d)=> y(d.value))
  .attr('height', d=>y(0)-y(d.value))
  .attr('width', x.bandwidth())

function xAxis(g){
    g.attr('transform', `translate(0, ${sectorHeight-sectorMargin.bottom})`)
    .call(d3.axisBottom(x).tickFormat(i=> sectorData[i].name))
    .attr('font-size', '15px')
}

function yAxis(g){
g.attr('transform', `translate(${sectorMargin.left},0)`)
 .call(d3.axisLeft(y).ticks(null, sectorData.format))
 .attr('font-size', '15px')
}
sectorSvg.append('g').call(yAxis)
sectorSvg.append('g').call(xAxis)
sectorSvg.node()    //Bar Graph