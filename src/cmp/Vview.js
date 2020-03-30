import React, {Children} from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
const Offset = 60
export class Vview extends React.PureComponent {
	constructor(props) {
        super(props)
         this.state = {
            alto: 0,
            scroll: 0
        }
        this.handleScroll = this.handleScroll.bind(this)
    }
    count(){
        return Children.count(this.props.children)
    }
    componentDidUpdate(){
        const heightTotal = this.count()*this.height
        if (this.state.scroll > heightTotal){
            this.panel.scrollTop = heightTotal
            this.setState({scroll: heightTotal})
        }
    }
    calcularHeight(){
        const div = document.createElement('div')
        div.classList.add(...this.props.className.split(" "))
        div.style.overflow = 'hidden'
        div.style.position = 'absolute'
        div.style.top = '-300px'
        div.style.width = String(this.state.ancho) + 'px'
        document.body.appendChild(div)
        setTimeout(()=>{
        ReactDOM.render(Children.toArray(this.props.children)[0], div, ()=>{
            this.height = div.offsetHeight
            div.remove()
            this.forceUpdate()
        })}, 0)
        
    }
    _render(){
        const height = this.height
        const {children} = this.props
        const {alto} = this.state
        const heightTotal = this.count()*height
        let antes = undefined
        let despues= undefined
        let view = undefined
        if (this.state.scroll > (Offset*height)){
            const tmp = (this.state.scroll - Offset*height)/height
            const tmp2 = tmp + (alto+(2*Offset*height))/height
            antes = <div  key='antes' style={{height: String(this.state.scroll - Offset*height) + 'px'}}/>
            view = Children.toArray(children).slice(tmp, tmp2)
            this.count() > tmp2 && (despues = <div key='despues' style={{height: String(heightTotal - alto - this.state.scroll - Offset*2*height) + 'px'}}/>)
        }
        else{
            view = Children.toArray(children).slice(0,(alto + Offset*height)/height)
            despues = <div key='despues' style={{height: String(heightTotal - alto - Offset*height) + 'px'}}/>
        }
        return [antes, view, despues]
    }  
  	render() {
        if (this.count() < 150){
            return(
                <div className={this.props.className} ref={s=>this.panel=s}>
                 {this.props.children}
    		    </div>
            )
        }
        this.state.alto && !this.height && this.calcularHeight()
    	return (
    		<div className={this.props.className} ref={s=>this.panel=s}>
                {this.state.alto > 0 && this.height && this._render()}
    		</div>
    	)
  	}
  	componentDidMount(){
        this.panel.addEventListener('scroll', this.handleScroll)
        this.setState({alto: this.panel.offsetHeight, ancho: this.panel.clientWidth})
  	}
  	componentWillUnmount() {
    	this.panel.removeEventListener('scroll', this.handleScroll)
  	}
  	handleScroll() {
        //const heightTotal = this.count()*this.props.height
        if (this.count() < 150){
            return
        }
        else if (Math.abs(this.panel.scrollTop-this.state.scroll) > (this.height*(Offset/2))){
            this.setState({scroll: this.panel.scrollTop})
        }
  	}
}

Vview.propTypes = {
    //height: PropTypes.number
}

Vview.defaultProps = {
    //height: 16,
}
