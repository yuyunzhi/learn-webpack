import _ from 'lodash'
import $ from 'jquery'

const dom = $('div')
dom.html( _.join(['yY','kk']), '-----')
$('body').append(dom)