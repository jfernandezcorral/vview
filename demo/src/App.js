import React from 'react'
import PropTypes from 'prop-types'
import {Vview} from '../../lib/index.js'
import estilos from'./App.scss'
import cn from 'classnames/bind'
const random = ()=>{
    return Math.random().toString(36).substring(2,15)
}
const cx = cn.bind(estilos)
export default class App extends React.Component {
	constructor(props) {
        super(props)
        this.state = {
            numero: 1000
        }
        this.change = this.change.bind(this)
    }
    change(e){
        const n = parseInt(e.target.value)||10000
        this.setState({numero: n})
    }
    registro(i){
        return (
            <div key={i} className={cx('registro')}>
                <div>{random()}</div>
                <div>{random()}</div>
                <div>{random()}</div>
                <div>{random()}</div>
            </div>
        )
    }
  	render() {
        const buf = []
        for (let i=0; i< this.state.numero; i++){
            buf.push(this.registro(i))
        }
    	return (
    		<div className={cx('app')}>
    			<div>generar: <input type='text' value={String(this.state.numero)} onChange={this.change}/> registros <button>v</button> ordenar aleatoriamente <button>^</button></div>
                <Vview className={cx('view')}>
                    {buf}
                </Vview>
    		</div>
    	)
  	}
}

