import React, {Children} from 'react'
import PropTypes from 'prop-types'
export class Vview extends React.Component {
	constructor(props) {
    	super(props)
    	//this.handleScroll = this.handleScroll.bind(this)
  	}
  	render() {
    	const {children} = this.props
    	return (
    		<div>
    			hola
    		</div>
    	)
  	}
  	/*componentDidMount(){
  		this.scroll = this.refs.s
  		this.panel = this.scroll.firstChild
  		this.scroll.addEventListener('scroll', this.handleScroll)
  	}
  	componentWillUnmount() {
    	this.scroll.removeEventListener('scroll', this.handleScroll)
  	}
  	handleScroll() {
  		if (this.panel.offsetHeight - this.scroll.offsetHeight <= this.scroll.scrollTop + 2){
  			if (Math.abs(this.anteriorTop-this.scroll.scrollTop)<4){
	  			return
	  		}
	  		this.props.onTop(this.scroll.scrollTop)
        this.anteriorTop = this.scroll.scrollTop
  		}
      this.anteriorTop = this.scroll.scrollTop<this.anteriorTop?this.scroll.scrollTop: this.anteriorTop
  	}*/
}

Vview.propTypes = {
 	//estilo: PropTypes.object,
 	//children: PropTypes.element.isRequired,
 	//onTop: PropTypes.func.isRequired
}

Vview.defaultProps = {
    estilo: {
    	overflowY: 	'auto',
    	height: 	"100%", 
    }
}
