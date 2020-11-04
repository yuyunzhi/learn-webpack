import _ from 'lodash'
import $ from 'jquery'

const dom = $('div')
dom.html( _.join(['yYY','kk']), '-----')
$('body').append(dom)