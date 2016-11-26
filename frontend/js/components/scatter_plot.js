import React, {Component}from 'react'
import ReactDOM from 'react-dom'
import * as d3 from 'd3'
import {getPosition} from '../util'
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';


const GetHoods = gql`
  query economics($start: Int!, $end: Int!, $name: String){
    economics(start: $start, end: $end, name: $name){
      gemeente,
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

  }

  constructor(props){
    super(props)
    this.element = null
  }


  componentDidMount(props) {
    console.log(this.props)

    let {
      width,
      height,
      margins,
    } = this.props

    this.xScale = d3.scaleLinear().range([0, width])
    this.yScale = d3.scaleLinear().range([height, 0])
    //this.xScale.domain([0, 100])

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

    // this.cValue = (d) => {
    //   return d.bu_code
    // }

    this.element = ReactDOM.findDOMNode(this)

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
    .text('arbeidsparticipatie')
    // .text('gem. vullingsperc. van de containers'+ (app.singleBuurt?'':'per buurt'));

    //y-axis
    this.svg.append('g')
    .attr('class', 'y axis')
    .call(d3.axisLeft(this.yScale))
    .append('text')
    .attr('class', 'label')
    .style('text-anchor', 'end')
    .text('woz waarde')
    //.text('totaal aantal stortingen' + (app.singleBuurt?'':'per buurt'))

    // add the tooltip area to the webpage
    this.tooltip = d3.select('#scatter_plot').append('div')
    .attr('class', 'tooltip')
    .style('opacity', 0)

  }


  componentDidUpdate() {

    //d3.update(this.element, this.getD3State())

    let{
      data,
      colors,
      width,
      height,
      onClick,
    } = this.props

    data = data.economics

    if(typeof data === 'undefined'){
      return
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
      return
    }

    //this.xScale.domain([d3.min(data, this.xValue), d3.max(data, this.xValue)])
    this.xScale.domain([50, d3.max(data, this.xValue)])
    this.svg.select('.y.axis').transition().duration(1000).call(d3.axisLeft(this.yScale))

    this.yScale.domain([0, d3.max(data, this.yValue)])
    this.svg.select('.x.axis').transition().duration(1000).call(d3.axisBottom(this.xScale))

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
      //return colors[this.cValue(d)]
      return '#'+((1<<24)*Math.random()|0).toString(16)
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
      return(typeof d.inkomen !== 'undefined' ? Math.sqrt(10 + d.inkomen * 10) : 10)
    })
    .attr('cx', this.xMap)
    .attr('cy', this.yMap)
    .style('fill', (d) => {
      //return colors[this.cValue(d)]
      return '#'+((1<<24)*Math.random()|0).toString(16)
    })

  }


  componentWillUnmount() {
    //d3.destroy(this.element)
  }


  _getHTML(d){
    return `
      <p class="tooltip_data">${d.gemeente}</p>
      <br>woz waarde: ${d.woz * 1000}
      <br>inkomen: ${d.inkomen * 1000}
      <br>participatie: ${d.participatie}%
    `
  }


  render() {
    return <div id="scatter_plot"/>
  }
}

export default ScatterPlot
