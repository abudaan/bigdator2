import React, {Component, PropTypes}from 'react'
import ReactDOM from 'react-dom'
import * as d3 from 'd3'
import {getPosition} from '../util'
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';


const GetHoods = gql`
  query economics($start: Int!, $end: Int!, $name: String){
    economics(start: $start, end: $end, name: $name){
      gemeente,
      kleur,
      jaar,
      woz,
      inkomen,
      participatie,
    }
  }
`;


@graphql(GetHoods, {
  options: ({start, end, name}) => ({variables: {start, end, name}})
})
class ScatterPlot extends Component{

  static displayName = 'ScatterPlot'

  static propTypes = {
    data: PropTypes.object,
    name: PropTypes.string,
    height: PropTypes.number,
    margins: PropTypes.object,
    onClick: PropTypes.func,
    width: PropTypes.number,
  }

  constructor(props){
    super(props)
    this.element = null
  }


  componentDidMount() {
    this.element = ReactDOM.findDOMNode(this)
    //this.element = document.getElementById('scatter_plot')

    let {
      width,
      height,
      margins,
    } = this.props

    this.xScale = d3.scaleLinear().range([0, width])
    this.xScale.domain([50, 90])

    this.yScale = d3.scaleLinear().range([height, 0])
    this.xScale.domain([100, 500])

    this.yValue = (d) => {
      return +d.woz
    }

    this.xValue = (d) => {
      return +d.participatie
    }

    this.xMap = (d) => {
      //console.log('x', d)
      return this.xScale(this.xValue(d))
    }

    this.yMap = (d) => {
      //console.log('y', d)
      return this.yScale(this.yValue(d))
    }

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

    this.svg.append('g')
    .append('text')
    .attr('x', width + 40)
    .attr('y', height + 40)
    .attr('class', 'label')
    .style('text-anchor', 'end')
    .text('arbeidsparticipatie')

    //y-axis
    this.svg.append('g')
    .attr('class', 'y axis')
    .call(d3.axisLeft(this.yScale))

    this.svg.append('g')
    .append('text')
    .attr('x', -20)
    .attr('y', -30)
    .attr('class', 'label')
    .style('text-anchor', 'end')
    .text('woz')
    //.attr('transform', 'translate(' + margins.left + ',' + margins.top + ')');

    // add the tooltip area to the webpage
    this.tooltip = d3.select('#scatter_plot').append('div')
    .attr('class', 'tooltip')
    .style('opacity', 0)
  }


  componentDidUpdate() {
    if(typeof this.props.data === 'undefined'){
      return
    }

    let{
      data,
      name,
      width,
      height,
      onClick,
    } = this.props

    data = data.economics

    this.svg
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
      return
    }

    if(name === null){
      //this.xScale.domain([d3.min(data, this.xValue), d3.max(data, this.xValue)])
      this.xScale.domain([50, d3.max(data, this.xValue)])
      this.svg.select('.x.axis').transition().duration(100).call(d3.axisBottom(this.xScale))

      this.yScale.domain([50, d3.max(data, this.yValue)])
      this.svg.select('.y.axis').transition().duration(100).call(d3.axisLeft(this.yScale))
    }

    dot
    .enter()
    .append('circle')
    .attr('class', 'dot')
    .attr('r', (d) => {
      return d.inkomen === 0 ? 10 : Math.sqrt(10 + d.inkomen * 10)
    })
    .attr('cx', this.xMap)
    .attr('cy', this.yMap)
    .style('fill', d => {
      return d.kleur
    })
    .on('mouseover', d => {
      this.tooltip.transition()
      .duration(200)
      .style('opacity', 0.9)

      let offset = getPosition(this.element)
      this.tooltip.html(this._getHTML(d))
      .style('left', (d3.event.clientX - offset.x + 15) + 'px')
      .style('top', (d3.event.clientY - offset.y + 50) + 'px')
    })
    .on('mouseout', () => {
      this.tooltip.transition()
      .duration(500)
      .style('opacity', 0)
    })
    .on('click', e => {
      onClick(e.gemeente)
    })


    dot
    .transition()
    .duration(100)
    .attr('r', (d) => {
      return d.inkomen === 0 ? 10 : Math.sqrt(10 + d.inkomen * 10)
    })
    .attr('cx', this.xMap)
    .attr('cy', this.yMap)
    .style('fill', (d) => {
      return d.kleur
    })
  }


  componentWillUnmount() {
    //d3.destroy(this.element)
  }


  _getHTML(d){
    if(d.jaar === null){
      return `
        <p class="tooltip_data">${d.gemeente}</p>
        <br>woz waarde:&nbsp;${d.woz * 1000}
        <br>inkomen:&nbsp;${d.inkomen * 1000}
        <br>participatie:&nbsp;${d.participatie}%
      `
    }
    return `
      <p class="tooltip_data">${d.jaar}</p>
      <br>woz waarde:&nbsp;${d.woz * 1000}
      <br>inkomen:&nbsp;${d.inkomen * 1000}
      <br>participatie:&nbsp;${d.participatie}%
    `
  }


  render() {
    return <div className="visualisation" id="scatter_plot"/>
  }
}

export default ScatterPlot
