import React, {Component}from 'react'
import * as d3 from 'd3'
import {getPosition} from '../util'
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';


const GetHoods = gql`
  query hoods($start: String!, $end: String!, $name: String){
    hoods(start: $start, end: $end, name: $name){
      bu_code,
      date,
      dumps,
      fillperc,
      meldingen,
    }
  }
`;


@graphql(GetHoods, {
  options: ({start, end, name}) => ({variables: {start, end, name}})
})
class ScatterPlot extends Component{

  static displayName = 'ScatterPlot'

  constructor(props){
    super(props)

    let {
      width,
      height,
      margins,
    } = props

    this.xScale = d3.scaleLinear().range([0, width])
    this.yScale = d3.scaleLinear().range([height, 0])
    this.xScale.domain([0, 100])

    this.yValue = (d) => {
      return +d.dumps
    }

    this.xValue = (d) => {
      if(isNaN(d.fillperc)){
        return 0
      }
      return +d.fillperc
    }

    this.xMap = (d) => {
      //console.log('x', d)
      return this.xScale(this.xValue(d))
    }

    this.yMap = (d) => {
      //console.log('y', d)
      return this.yScale(this.yValue(d))
    }

    this.cValue = (d) => {
      return d.bu_code
    }

    this.element = document.getElementById('scatter_plot')

    this.svg = d3.select('#scatter_plot').append('svg')
    .attr('width', width + margins.left + margins.right)
    .attr('height', height + margins.top + margins.bottom)
    .append('g')
    .attr('transform', 'translate(' + margins.left + ',' + margins.top + ')');

    // x-axis
    this.svg.append('g')
    .attr('class', 'x axis')
    .attr('transform', 'translate(0,' + height + ')')
    .call(d3.axisBottom(this.xScale))
    .append('text')
    .attr('class', 'label')
    .attr('x', width)
    .attr('y', 40)
    .style('text-anchor', 'end')
    .text('gem. vullingsperc. van de containers')
    // .text('gem. vullingsperc. van de containers'+ (app.singleBuurt?'':'per buurt'));

    //y-axis
    this.svg.append('g')
    .attr('class', 'y axis')
    .call(d3.axisLeft(this.yScale))
    .append('text')
    .attr('class', 'label')
    .style('text-anchor', 'end')
    .text('totaal aantal stortingen')
    //.text('totaal aantal stortingen' + (app.singleBuurt?'':'per buurt'))

    // add the tooltip area to the webpage
    this.tooltip = d3.select('#scatter_plot').append('div')
    .attr('class', 'tooltip')
    .style('opacity', 0)
  }


  componentDidMount() {

  }


  _getHTML(d){
    let html

    if(this.props.hoodId === null){
      html = `
        <p class="tooltip_title">${d.name}</p>
        <br>stortingen: ${d.dumps}
        <br>vullingsperc.: ${d.fillperc}
        <br>meldingen.: ${d.meldingen}
      `
    }else{
      html = `
        <p class="tooltip_data">${d3.timeFormat('%x')(new Date(d.date))}</p>
        <br>stortingen: ${d.dumps}
        <br>vullingsperc.: ${d.fillperc}
        <br>meldingen.: ${d.meldingen}
      `
    }
    return html
  }


  render() {
    let{
      data,
      update,
      colors,
      width,
      height,
      hoodId,
      onClick,
    } = this.props

    data = data.hoods
    //console.log(data)
    if(typeof data === 'undefined'){
      return null
    }


    // @todo: should only render if data has changed!
    let warning = this.svg
    .selectAll('.no-data')
    .remove()

    let dot = this.svg
    .selectAll('.dot')
    .data(data)

    dot
    .exit()
    .remove()

    if(data.length === 0){
      this.svg.append('text').attr('class', 'no-data').text('no data')
      .attr('x', width / 2)
      .attr('y', height / 2)
      return null
    }

    this.yScale.domain([0, +d3.max(data, this.yValue)])
    this.svg.select('.y.axis').transition().duration(1000).call(d3.axisLeft(this.yScale))

    dot
    .enter()
    .append('circle')
    .attr('class', 'dot')
    .attr('r', (d) => {
      return(typeof d.meldingen !== 'undefined' ? Math.sqrt(10 + d.meldingen * 10) : 10)
    })
    .attr('cx', this.xMap)
    .attr('cy', this.yMap)
    .style('fill', (d) => {
      return colors[this.cValue(d)]
    })
    .on('mouseover', d => {
      this.tooltip.transition()
      .duration(200)
      .style('opacity', 0.9)

      let offset = getPosition(this.element)
      this.tooltip.html(this._getHTML(d))
      .style('left', (d3.event.clientX - offset.x + 50) + 'px')
      .style('top', (d3.event.clientY - offset.y - 50) + 'px')
    })
    .on('mouseout', () => {
      this.tooltip.transition()
      .duration(500)
      .style('opacity', 0)
    })
    .on('click', e => {
      onClick(e)
    })


    dot
    .transition()
    .duration(1000)
    //.attr('r', function(d) { return( d.meldingen? Math.sqrt(10 + d.meldingen * 10) : 10);})
    .attr('r', (d) => {
      return(typeof d.meldingen !== 'undefined' ? Math.sqrt(10 + d.meldingen * 10) : 10)
    })
    .attr('cx', this.xMap)
    .attr('cy', this.yMap)
    .style('fill', (d) => {
      return colors[this.cValue(d)]
    })

    return null
  }
}

export default ScatterPlot
