import React, {Children} from 'react'
import PropTypes from 'prop-types'
const Offset = 10
export class Vview extends React.PureComponent {
	constructor(props) {
        super(props)
         this.state = {
            alto: 0,
            count: Children.count(this.props.children),
            scroll: 0
        }
        this._render = this._render.bind(this)
    	this.handleScroll = this.handleScroll.bind(this)
    }
    componentWillReceiveProps(nextProps){
        const count = Children.count(nextProps.children)
        const heightTotal = count*nextProps.height
        let scroll = this.state.scroll
        if (scroll > heightTotal){
            scroll = heightTotal
        }
        this.setState({count, scroll})
    }
    _render(){
        const {children, height} = this.props
        const {alto} = this.state
        const heightTotal = this.state.count*height
        let antes = undefined
        let despues= undefined
        let view = undefined
        if (this.state.scroll > (Offset*height)){
            const tmp = (this.state.scroll - Offset*height)/height
            const tmp2 = tmp + (alto+(2*Offset*height))/height
            antes = <div  key='antes' style={{height: String(this.state.scroll - Offset*height) + 'px'}}/>
            view = Children.toArray(children).slice(tmp, tmp2)
            this.state.count > tmp2 && (despues = <div key='despues' style={{height: String(heightTotal - alto - this.state.scroll - Offset*2*height) + 'px'}}/>)
        }
        else{
            view = Children.toArray(children).slice(0,(alto + Offset*height)/height)
            despues = <div key='despues' style={{height: String(heightTotal - alto - Offset*height) + 'px'}}/>
        }
        return [antes, view, despues]
    }  
  	render() {
        if (this.state.count < 150){
            return(
                <div className={this.props.className} ref={s=>this.panel=s}>
                 {this.props.children}
    		    </div>
            )
        }
    	return (
    		<div className={this.props.className} ref={s=>this.panel=s}>
                {this.state.alto > 0 && this._render()}
    		</div>
    	)
  	}
  	componentDidMount(){
        this.panel.addEventListener('scroll', this.handleScroll)
        this.setState({alto: this.panel.offsetHeight})
  	}
  	componentWillUnmount() {
    	this.panel.removeEventListener('scroll', this.handleScroll)
  	}
  	handleScroll() {
        const heightTotal = this.state.count*this.props.height
        if (this.state.count < 150){
            return
        }
        /*if (this.panel.scrollTop >= heightTotal-this.state.alto){
            this.setState({scroll: this.panel.scrollTop})
        }*/
        else if (Math.abs(this.panel.scrollTop-this.state.scroll) > (this.props.height*Offset - 30)){
            this.setState({scroll: this.panel.scrollTop})
        }
  	}
}

Vview.propTypes = {
    height: PropTypes.number
 	//estilo: PropTypes.object,
 	//children: PropTypes.element.isRequired,
 	//onTop: PropTypes.func.isRequired
}

Vview.defaultProps = {
    height: 16,
}
