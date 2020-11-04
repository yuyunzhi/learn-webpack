import _ from 'lodash'
import $ from 'jquery'
import {ui} from './jquery.ui'

ui()

const dom = $('div')
dom.html(_.join(['yYY', 'kk']), '-----')
$('body').append(dom)