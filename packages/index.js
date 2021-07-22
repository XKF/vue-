import turntableComponent from './turntable';
import registerTurntable from "./registerTurntable";
import './style/index.scss';

var TurnTable = registerTurntable

TurnTable.install = function(Vue) {
    Vue.component('v-turntable', turntableComponent)
}

TurnTable.Component = turntableComponent

export default TurnTable
